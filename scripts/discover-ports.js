#!/usr/bin/env node

/**
 * PORT INTEGRATION — DISCOVER PORTS SCRIPT (SSLABS ECOSYSTEM) - V2 (FILTRO AVANÇADO)
 * 
 * Script autônomo para varredura e descoberta automatizada de ports nativos REAIS no GitHub.
 * 
 * Filtros de Qualidade Implementados:
 *  1. ❌ Exclusão de Forks e Repositórios Arquivados.
 *  2. ❌ Exclusão de Listas/Agregadores ("awesome", "curated", "list", etc.).
 *  3. ❌ Exclusão de Ferramentas, Scripts e Descompiladores puros (ex: decomp.wtf, scraper).
 *  4. ❌ Exclusão de Ports exclusivos para Android/iOS ou Emuladores genéricos.
 *  5. ⭐ Mínimo de 25 estrelas para evitar projetos abandonados ou testes individuais.
 *  6. 📦 OBRIGATÓRIO: O repositório DEVE possuir pelo menos 1 Release publicada no GitHub.
 *     (Garante que há binários, compilações ou tags oficiais prontas para uso).
 * 
 * Uso:
 *   node scripts/discover-ports.js
 *   node scripts/discover-ports.js --append   (adiciona os novos ports aprovados ao app.js)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const WORKER_PROXY = 'https://sslabs-port-proxy.sstudioslabs.workers.dev';
const APP_JS_PATH = path.resolve(__dirname, '../app.js');
const OUTPUT_FILE = path.resolve(__dirname, '../novos_ports_sugeridos.json');

const MIN_STARS_COM_EXECUTAVEL = 10; // Para ports recém-criados que já publicaram executáveis (.zip, .exe, .7z)
const MIN_STARS_SEM_EXECUTAVEL = 25; // Para ports que possuem release apenas com código-fonte

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

// Termos que indicam listas, emuladores, ferramentas ou mobile (não são ports nativos de jogos para PC)
const REJECT_KEYWORDS = [
  'awesome',
  'curated',
  'collection',
  'emulator',
  'decomp.wtf',
  'ai agent',
  'scraper',
  'crawler',
  'tutorial',
  'guide',
  'launcher only',
  'android port',
  'android only',
  'ios port',
  'homebrew menu',
  'devkit',
  'asset extractor only'
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
        console.warn(`[Aviso] Limite de requisições atingido (${res.status}).`);
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

function formatarNomeAmigavel(nome) {
  return nome
    .replace(/[-_]/g, ' ')
    .replace(/\b(pc|port|recomp|recompiled|standalone)\b/gi, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

async function descobrirNovosPorts() {
  console.log('=====================================================');
  console.log('   PORT INTEGRATION — DESCOBERTA RIGOROSA DE PORTS   ');
  console.log('   Filtros: >= 25 estrelas + Com Releases no GitHub   ');
  console.log('=====================================================\n');

  const reposJaCadastrados = carregarReposCadastrados();
  console.log(`Repositórios já catalogados: ${reposJaCadastrados.size}\n`);

  const candidatos = new Map();

  for (const query of SEARCH_QUERIES) {
    console.log(`Buscando por: "${query}"...`);
    const searchResult = await fetchFromGithub(`/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`);
    
    if (searchResult && Array.isArray(searchResult.items)) {
      for (const item of searchResult.items) {
        const fullRepo = item.full_name.toLowerCase();
        const nomeLower = item.name.toLowerCase();
        const descLower = (item.description || '').toLowerCase();
        const combinedText = `${nomeLower} ${descLower}`;

        // 1. Já catalogado?
        if (reposJaCadastrados.has(fullRepo) || candidatos.has(fullRepo)) {
          continue;
        }

        // 2. É fork ou arquivado?
        if (item.fork || item.archived) {
          continue;
        }

        // 3. Estrelas preliminares (aceita a partir de 10 ⭐ para checagem de binários)
        if (item.stargazers_count < MIN_STARS_COM_EXECUTAVEL) {
          continue;
        }

        // 4. Termos rejeitados (listas, emuladores, IA, ferramentas)
        const temTermoRejeitado = REJECT_KEYWORDS.some(keyword => combinedText.includes(keyword));
        if (temTermoRejeitado) {
          continue;
        }

        // Adiciona à lista preliminar para checagem de releases
        candidatos.set(fullRepo, item);
      }
    }
  }

  console.log(`\nCandidatos preliminares encontrados: ${candidatos.size}`);
  console.log('Verificando existência de Releases publicadas no GitHub...\n');

  const novosAprovados = [];

  for (const [fullRepo, item] of candidatos.entries()) {
    // 5. OBRIGATÓRIO: Verificar se o repositório possui Releases oficiais
    const releases = await fetchFromGithub(`/repos/${item.full_name}/releases`);

    if (!releases || !Array.isArray(releases) || releases.length === 0) {
      console.log(`  ❌ [Descartado] ${item.full_name} (${item.stargazers_count} ⭐) — Sem releases publicadas.`);
      continue;
    }

    const latestRelease = releases[0];
    const assets = latestRelease.assets || [];
    const hasDownloadableBinaries = assets.some(a => {
      const aName = (a.name || '').toLowerCase();
      return aName.endsWith('.zip') || aName.endsWith('.7z') || aName.endsWith('.exe') || aName.endsWith('.tar.gz') || aName.endsWith('.rar');
    });

    // Regra Híbrida Inteligente:
    // Se NÃO tiver binários compilados para download (.zip, .exe), exige o corte maior de estrelas (>= 25)
    if (!hasDownloadableBinaries && item.stargazers_count < MIN_STARS_SEM_EXECUTAVEL) {
      console.log(`  ❌ [Descartado] ${item.full_name} (${item.stargazers_count} ⭐) — Release sem executável anexado (exige >= ${MIN_STARS_SEM_EXECUTAVEL} ⭐).`);
      continue;
    }

    const versaoDetectada = latestRelease.tag_name || latestRelease.name || 'v1.0.0';
    const dataRelease = latestRelease.published_at || item.updated_at;
    const isPreRelease = latestRelease.prerelease === true;
    const plataforma = adivinharConsole(item);

    const tagsList = [plataforma.code, 'AutoDiscover'];
    if (hasDownloadableBinaries) tagsList.push('Binário Disponível');
    if (item.language) tagsList.push(item.language);

    const portAprovado = {
      id: item.name.toLowerCase().replace(/[^a-z0-9_-]/g, '-') + '-pc',
      nome: formatarNomeAmigavel(item.name) || item.name,
      console: plataforma.code,
      consoleNome: plataforma.name,
      codigoJogo: 'AUTODISCOVER',
      status: isPreRelease ? 'Em Desenvolvimento Ativo' : (hasDownloadableBinaries ? 'Totalmente Jogável' : 'Jogável (Source Port)'),
      statusTipo: isPreRelease ? 'wip' : 'jogavel',
      repo: item.full_name,
      repoUrl: item.html_url,
      descricao: item.description || 'Port nativo para PC com compilações oficiais disponíveis no GitHub.',
      termoBuscaCapa: formatarNomeAmigavel(item.name) || item.name,
      capaManual: null,
      dataAtualizacao: dataRelease,
      stars: item.stargazers_count,
      versaoPadrao: versaoDetectada,
      tags: tagsList
    };

    const seloExecutavel = hasDownloadableBinaries ? '📦 [Binário .zip/.exe detectado]' : '📄 [Código-Fonte]';
    console.log(`  ✅ [APROVADO] ${portAprovado.nome} (${portAprovado.console}) — ⭐ ${portAprovado.stars} | Release: ${versaoDetectada} ${seloExecutavel}`);
    novosAprovados.push(portAprovado);
  }

  console.log(`\n=====================================================`);
  console.log(`Total de ports novos aprovados com Releases: ${novosAprovados.length}`);
  console.log(`=====================================================\n`);

  if (novosAprovados.length > 0) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(novosAprovados, null, 2), 'utf8');
    console.log(`Lista salva com sucesso em: novos_ports_sugeridos.json`);

    const deveAdicionar = process.argv.includes('--append');
    if (deveAdicionar) {
      console.log('\nAdicionando novos ports aprovados ao app.js...');
      let appCode = fs.readFileSync(APP_JS_PATH, 'utf8');
      const match = appCode.match(/const PORTS_DATABASE = (\[[\s\S]*?\n\];)/);
      if (match) {
        const atual = new Function(`return ${match[1]}`)();
        const combinado = [...novosAprovados, ...atual];
        const novoDb = 'const PORTS_DATABASE = ' + JSON.stringify(combinado, null, 2) + ';';
        appCode = appCode.replace(/const PORTS_DATABASE = \[[\s\S]*?\n\];/, novoDb);
        fs.writeFileSync(APP_JS_PATH, appCode, 'utf8');
        console.log(`app.js atualizado com sucesso! Total no banco agora: ${combinado.length}`);
      }
    } else {
      console.log('\nPara incluir esses ports automaticamente no site, execute:');
      console.log('  node scripts/discover-ports.js --append\n');
    }
  } else {
    // Se nenhum passou no filtro rigoroso, limpa o arquivo para evitar PR vazio
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE);
    }
    console.log('Nenhum novo port atendeu a todos os critérios de qualidade hoje.');
  }
}

descobrirNovosPorts();
