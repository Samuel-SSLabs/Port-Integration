#!/usr/bin/env node

/**
 * PORT INTEGRATION — DISCOVER PORTS SCRIPT (SSLABS ECOSYSTEM) - V3 (BLINDAGEM TOTAL)
 * 
 * Script autônomo e de alta precisão para descoberta exclusiva de PORTS NATIVOS DE JOGOS PARA PC.
 * 
 * Filtros de Qualidade Reforçados:
 *  1. 🎯 Destino Obrigatório: O projeto DEVE ser direcionado para PC (Windows / Linux / Steam Deck).
 *     Descarta automaticamente ports que rodam NO PS5, NO Switch ou em consoles (homebrew/jailbreak).
 *  2. 🚫 Bloqueio de Emuladores: Rejeita PPSSPP, RPCS3, PCSX2, etc. (mesmo se portados para PS5).
 *  3. 🛠️ Bloqueio de Ferramentas / Frameworks / IA: Descarta llama.cpp, descompiladores de Android/Java, Spring Boot, etc.
 *  4. 💻 Linguagens Compiladas Nativas: Aceita apenas C, C++, Rust, C#, Zig ou Assembly. Rejeita Python/Java/JS.
 *  5. 📦 Releases com Executáveis (.zip, .exe, .7z) = Aceita com apenas 10 ⭐.
 *     Releases apenas com código-fonte = Exige 25+ ⭐.
 *  6. ❌ Exclusão imediata de Forks, Repositórios Arquivados e Listas ("awesome-", etc.).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const WORKER_PROXY = 'https://sslabs-port-proxy.sstudioslabs.workers.dev';
const APP_JS_PATH = path.resolve(__dirname, '../app.js');
const OUTPUT_FILE = path.resolve(__dirname, '../novos_ports_sugeridos.json');

const MIN_STARS_COM_EXECUTAVEL = 10;
const MIN_STARS_SEM_EXECUTAVEL = 25;

// Queries focadas EXCLUSIVAMENTE em ports com destino para PC
const SEARCH_QUERIES = [
  '"native pc port"',
  '"native windows port"',
  'topic:pc-port',
  '"recompiled" "pc" in:description',
  '"pc port" in:name',
  '"n64recomp" in:description',
  '"xenonrecomp" in:description',
  '"ps2recomp" in:description',
  '"ps1recomp" in:description',
  '"ps4" "pc port"',
  '"ps5" "pc port"'
];

// Termos que indicam homebrew em console, emuladores, IA, ferramentas ou listas
const REJECT_KEYWORDS = [
  // Listas e agregadores
  'awesome',
  'curated',
  'collection of',
  // Emuladores puros
  'emulator',
  'ppsspp',
  'rpcs3',
  'pcsx2',
  'yuzu',
  'ryujinx',
  'xenia',
  'cemu',
  'dolphin',
  // Homebrew rodando NO console (não no PC)
  'for ps5',
  'for the ps5',
  'on ps5',
  'on the ps5',
  'jailbroken ps5',
  'ps5 homebrew',
  'ps5 app store',
  'for nintendo switch',
  'switch homebrew',
  'atmosphere',
  // Ferramentas, IA e utilitários não-jogos
  'decomp.wtf',
  'ai agent',
  'llama.cpp',
  'gguf',
  'scraper',
  'crawler',
  'tutorial',
  'guide',
  'boilerplate',
  'framework',
  'sdk',
  'spring boot',
  'download manager',
  'adaptive triggers',
  // Mobile / Outros
  'android port',
  'android only',
  'ios port'
];

// Palavras obrigatórias: o projeto DEVE falar que roda em computador
const PC_TARGET_KEYWORDS = [
  'pc',
  'windows',
  'win32',
  'win64',
  'linux',
  'steam deck',
  'steamdeck',
  'x86',
  'x64'
];

// Linguagens aceitas para ports nativos de jogos
const ALLOWED_LANGUAGES = new Set(['C', 'C++', 'Rust', 'C#', 'Zig', 'Assembly']);

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
  console.log('   PORT INTEGRATION — DISCOVER PORTS V3 (BLINDADO)   ');
  console.log('   Foco Exclusivo: Ports de Console para Computador  ');
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
        const combinedText = `${nomeLower} ${descLower} ${(item.topics || []).join(' ')}`.toLowerCase();

        // 1. Já catalogado?
        if (reposJaCadastrados.has(fullRepo) || candidatos.has(fullRepo)) {
          continue;
        }

        // 2. É fork ou arquivado?
        if (item.fork || item.archived) {
          continue;
        }

        // 3. Estrelas preliminares (mínimo 10 ⭐)
        if (item.stargazers_count < MIN_STARS_COM_EXECUTAVEL) {
          continue;
        }

        // 4. Linguagem de programação permitida (C, C++, Rust, C#, Zig)
        if (item.language && !ALLOWED_LANGUAGES.has(item.language)) {
          // Rejeita linguagens como Python, Java, JavaScript, HTML que não são ports de jogos
          continue;
        }

        // 5. Rejeição de palavras proibidas (emuladores, homebrew em console, IA, ferramentas)
        const temTermoRejeitado = REJECT_KEYWORDS.some(keyword => combinedText.includes(keyword));
        if (temTermoRejeitado) {
          continue;
        }

        // 6. DEVE ser destinado para PC (Windows / Linux / Steam Deck)
        const ehParaPC = PC_TARGET_KEYWORDS.some(pcWord => {
          const regex = new RegExp(`\\b${pcWord}\\b`, 'i');
          return regex.test(combinedText);
        });

        if (!ehParaPC) {
          // Se não menciona que roda em PC, descarta (evita homebrews de console)
          continue;
        }

        // 7. Descarta repositórios explicitamente focados em Android/iOS
        if (fullRepo.includes('-android') || fullRepo.includes('_android') || fullRepo.endsWith('android') || fullRepo.includes('-ios')) {
          continue;
        }

        candidatos.set(fullRepo, item);
      }
    }
  }

  console.log(`\nCandidatos preliminares válidos: ${candidatos.size}`);
  console.log('Inspecionando Releases oficiais no GitHub...\n');

  const novosAprovados = [];

  for (const [fullRepo, item] of candidatos.entries()) {
    const releases = await fetchFromGithub(`/repos/${item.full_name}/releases`);

    // 7. OBRIGATÓRIO: Ter pelo menos uma release oficial
    if (!releases || !Array.isArray(releases) || releases.length === 0) {
      console.log(`  ❌ [Descartado] ${item.full_name} (${item.stargazers_count} ⭐) — Sem releases.`);
      continue;
    }

    const latestRelease = releases[0];
    const assets = latestRelease.assets || [];
    const hasDownloadableBinaries = assets.some(a => {
      const aName = (a.name || '').toLowerCase();
      return aName.endsWith('.zip') || aName.endsWith('.7z') || aName.endsWith('.exe') || aName.endsWith('.tar.gz') || aName.endsWith('.rar');
    });

    // 8. Regra Híbrida: Sem executáveis para download exige >= 25 estrelas
    if (!hasDownloadableBinaries && item.stargazers_count < MIN_STARS_SEM_EXECUTAVEL) {
      console.log(`  ❌ [Descartado] ${item.full_name} (${item.stargazers_count} ⭐) — Sem executável anexado (exige >= ${MIN_STARS_SEM_EXECUTAVEL} ⭐).`);
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
  console.log(`Total de ports novos aprovados: ${novosAprovados.length}`);
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
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE);
    }
    console.log('Nenhum novo port atendeu a todos os critérios de qualidade hoje.');
  }
}

descobrirNovosPorts();
