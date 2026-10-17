#!/usr/bin/env node

/**
 * PORT INTEGRATION — DISCOVER PORTS SCRIPT (SSLABS ECOSYSTEM)
 * 
 * Script autônomo para varredura e descoberta automatizada de novos ports
 * nativos no GitHub, sem necessidade de banco de dados ou servidor dedicado.
 * 
 * Suporta execução local (via Cloudflare Proxy) e execução em CI/CD
 * via GitHub Actions (com autenticação GITHUB_TOKEN).
 * 
 * Uso:
 *   node scripts/discover-ports.js
 *   node scripts/discover-ports.js --append   (adiciona novos ports direto ao app.js)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const WORKER_PROXY = 'https://sslabs-port-proxy.sstudioslabs.workers.dev';
const APP_JS_PATH = path.resolve(__dirname, '../app.js');
const OUTPUT_FILE = path.resolve(__dirname, '../novos_ports_sugeridos.json');

const SEARCH_QUERIES = [
  'topic:pc-port',
  'topic:recomp',
  'topic:decompilation',
  '"recompiled" "pc" in:description',
  '"native windows port" in:description',
  '"static recompiler" in:description',
  '"ps4" "pc port" in:description',
  '"ps5" "native" in:description'
];

async function fetchFromGithub(endpoint) {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    'User-Agent': 'Port-Integration-Scanner',
    'Accept': 'application/vnd.github.v3+json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = token 
    ? `https://api.github.com${endpoint}`
    : `${WORKER_PROXY}/api${endpoint}`;

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        console.warn(`[Aviso] Limite de requisições na API do GitHub atingido (${res.status}).`);
      }
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[Erro de Rede] ${err.message}`);
    return null;
  }
}

function carregarReposCadastrados() {
  try {
    const content = fs.readFileSync(APP_JS_PATH, 'utf8');
    const match = content.match(/const PORTS_DATABASE = (\[[\s\S]*?\n\];)/);
    if (!match) return new Set();
    const list = new Function(`return ${match[1]}`)();
    return new Set(list.map(p => (p.repo || '').toLowerCase()));
  } catch (e) {
    return new Set();
  }
}

function adivinharConsole(repoData) {
  const text = `${repoData.name} ${repoData.description || ''} ${(repoData.topics || []).join(' ')}`.toLowerCase();
  if (text.includes('ps5') || text.includes('playstation 5')) return { code: 'PS5', name: 'PlayStation 5' };
  if (text.includes('ps4') || text.includes('playstation 4')) return { code: 'PS4', name: 'PlayStation 4' };
  if (text.includes('xbox 360') || text.includes('x360') || text.includes('xenon')) return { code: 'XBOX360', name: 'Xbox 360' };
  if (text.includes('xbox')) return { code: 'XBOX', name: 'Xbox Clássico' };
  if (text.includes('n64') || text.includes('nintendo 64')) return { code: 'N64', name: 'Nintendo 64' };
  if (text.includes('switch') || text.includes('nx')) return { code: 'Switch', name: 'Nintendo Switch' };
  if (text.includes('ps2') || text.includes('playstation 2')) return { code: 'PS2', name: 'PlayStation 2' };
  if (text.includes('ps1') || text.includes('playstation 1') || text.includes('psx')) return { code: 'PS1', name: 'PlayStation 1' };
  if (text.includes('gamecube') || text.includes('wii')) return { code: 'GC', name: 'GameCube' };
  if (text.includes('psp')) return { code: 'PSP', name: 'PlayStation Portable' };
  return { code: 'PC', name: 'PC Nativo' };
}

async function descobrirNovosPorts() {
  console.log('=====================================================');
  console.log('   PORT INTEGRATION — DESCOBERTA AUTOMÁTICA DE PORTS ');
  console.log('=====================================================\n');

  const reposJaCadastrados = carregarReposCadastrados();
  console.log(`Repositórios já catalogados: ${reposJaCadastrados.size}\n`);

  const novosEncontrados = new Map();

  for (const query of SEARCH_QUERIES) {
    console.log(`Buscando por: "${query}"...`);
    const searchResult = await fetchFromGithub(`/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=15`);
    
    if (searchResult && Array.isArray(searchResult.items)) {
      for (const item of searchResult.items) {
        const fullRepo = item.full_name.toLowerCase();
        
        // Ignora emuladores genéricos ou repositórios já catalogados
        const isEmu = item.name.toLowerCase().includes('emu') || (item.description || '').toLowerCase().includes('emulator');
        if (reposJaCadastrados.has(fullRepo) || isEmu || item.stargazers_count < 10) {
          continue;
        }

        if (!novosEncontrados.has(fullRepo)) {
          const plataforma = adivinharConsole(item);
          novosEncontrados.set(fullRepo, {
            id: item.name.toLowerCase().replace(/[^a-z0-9_-]/g, '-') + '-pc',
            nome: item.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            console: plataforma.code,
            consoleNome: plataforma.name,
            codigoJogo: 'AUTODISCOVER',
            status: 'Em Desenvolvimento Ativo',
            statusTipo: 'wip',
            repo: item.full_name,
            repoUrl: item.html_url,
            descricao: item.description || 'Port nativo para PC descoberto automaticamente no GitHub.',
            termoBuscaCapa: item.name.replace(/[-_]/g, ' '),
            capaManual: null,
            dataAtualizacao: item.updated_at || new Date().toISOString(),
            stars: item.stargazers_count,
            versaoPadrao: 'v1.0.0',
            tags: [plataforma.code, 'AutoDiscover', item.language || 'C++']
          });
        }
      }
    }
  }

  const listaNovos = Array.from(novosEncontrados.values());
  console.log(`\nNovos ports candidatos encontrados: ${listaNovos.length}`);

  if (listaNovos.length > 0) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(listaNovos, null, 2), 'utf8');
    console.log(`\nLista salva em: novos_ports_sugeridos.json`);

    listaNovos.slice(0, 10).forEach((p, idx) => {
      console.log(`  [${idx + 1}] ${p.nome} (${p.console}) - ⭐ ${p.stars} -> ${p.repoUrl}`);
    });

    const deveAdicionar = process.argv.includes('--append');
    if (deveAdicionar) {
      console.log('\nAdicionando novos ports diretamente ao app.js...');
      let appCode = fs.readFileSync(APP_JS_PATH, 'utf8');
      const match = appCode.match(/const PORTS_DATABASE = (\[[\s\S]*?\n\];)/);
      if (match) {
        const atual = new Function(`return ${match[1]}`)();
        const combinado = [...listaNovos, ...atual];
        const novoDb = 'const PORTS_DATABASE = ' + JSON.stringify(combinado, null, 2) + ';';
        appCode = appCode.replace(/const PORTS_DATABASE = \[[\s\S]*?\n\];/, novoDb);
        fs.writeFileSync(APP_JS_PATH, appCode, 'utf8');
        console.log(`app.js atualizado com sucesso! Total agora: ${combinado.length}`);
      }
    } else {
      console.log('\nPara incluir esses ports automaticamente no site, execute:');
      console.log('  node scripts/discover-ports.js --append\n');
    }
  } else {
    console.log('Nenhum port novo inédito encontrado nesta varredura.');
  }
}

descobrirNovosPorts();
