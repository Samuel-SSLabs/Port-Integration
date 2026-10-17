#!/usr/bin/env node

/**
 * PORT INTEGRATION — DISCOVER PORTS SCRIPT (SSLABS ECOSYSTEM) - V4 (PERFEIÇÃO E PRECISÃO)
 * 
 * Script autônomo e de alta precisão para descoberta de PORTS NATIVOS DE JOGOS PARA PC.
 * 
 * Filtros de Qualidade:
 *  1. 🎮 Apenas Jogos: Rejeita toolchains e compiladores base (PS2Recomp, N64Recomp, XenonRecomp, ReXGlue, etc.).
 *  2. 🚫 Bloqueio de Emuladores: Rejeita PPSSPP, RPCS3, PCSX2, etc. (mesmo rodando no PS5).
 *  3. 🎯 Destino PC: O jogo DEVE ter como alvo PC (Windows, Linux, Steam Deck, Vulkan, DirectX, Recomp engines).
 *     Descarta automaticamente homebrews que rodam DENTRO de consoles (PS5 jailbreak, Switch atmosphere).
 *  4. 🛠️ Bloqueio de Não-Jogos: Descarta IAs (llama.cpp), descompiladores de Java/Android, Spring Boot, etc.
 *  5. 💻 Linguagens Nativas: Aceita apenas C, C++, Rust, C#, Zig ou Assembly. Rejeita Python, Java, JS.
 *  6. 📦 Regra Híbrida de Releases:
 *     - Release com executáveis (.zip, .exe, .7z) = Aceita com apenas 10 ⭐.
 *     - Release apenas com código-fonte = Exige 25+ ⭐.
 *  7. ❌ Exclusão imediata de Forks, Repositórios Arquivados e Listas ("awesome-", etc.).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const WORKER_PROXY = 'https://sslabs-port-proxy.sstudioslabs.workers.dev';
const APP_JS_PATH = path.resolve(__dirname, '../app.js');
const OUTPUT_FILE = path.resolve(__dirname, '../novos_ports_sugeridos.json');

const MIN_STARS_COM_EXECUTAVEL = 10;
const MIN_STARS_SEM_EXECUTAVEL = 25;

// Queries abrangentes para encontrar ports de jogos de todas as eras
const SEARCH_QUERIES = [
  '"native pc port"',
  '"native windows port"',
  'topic:pc-port',
  'topic:recomp',
  'topic:decomp',
  '"recompiled" "pc" in:description',
  '"pc port" in:name',
  '"n64recomp" in:description',
  '"xenonrecomp" in:description',
  '"ps2recomp" in:description',
  '"ps1recomp" in:description',
  '"rexglue" in:description',
  '"ps4" "pc port"',
  '"ps5" "pc port"',
  '"xbox one" "pc port"',
  '"xbox series" "pc port"',
  '"azimuth" "forza"',
  '"azimuth" "pc port"'
];

// Nomes de repositórios que são compiladores/ferramentas base, NÃO jogos específicos
const REJECT_EXACT_NAMES = new Set([
  'ps2recomp',
  'xenonrecomp',
  'n64recomp',
  'ps1recomp',
  'rexglue',
  'wiicompiled',
  'anyps5',
  'the-forge',
  'the_forge',
  'libretro',
  'retroarch',
  'gamecuberecompiled',
  'gcrecomp',
  'gcrecompilation',
  'ps3recomp',
  'recompfrontend',
  'recomp-frontend'
]);

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
  'recompilation tool',
  'static recompilation tool',
  'static recompiler for',
  'recompiler tool',
  // IA / Modelos de linguagem / Inference engines
  'inference engine',
  'rtx 5090',
  'qwen',
  'llm',
  'language model',
  'deep learning',
  'neural network',
  'ninfer',
  'ai model',
  // Aplicativos de produtividade / Documentos / Utilitários de desktop
  'document viewer',
  'pdf viewer',
  'comic books, and tiffs',
  'gnome papers',
  'reader for pdf',
  'office suite',
  // Mobile / Outros
  'android port',
  'android only',
  'ios port'
];

// Palavras que indicam que o jogo roda em computador ou usa motores nativos de PC
const PC_TARGET_KEYWORDS = [
  'pc',
  'windows',
  'win32',
  'win64',
  'linux',
  'steam deck',
  'steamdeck',
  'x86',
  'x64',
  'crossplatform',
  'multiplatform',
  'rexglue',
  'xenonrecomp',
  'n64recomp',
  'ps2recomp',
  'ps1recomp'
];

// Linguagens nativas de jogos compilados
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

  // Consoles específicos por ordem de precedência (evitando que 'xbox' genérico capture outros consoles)
  if (text.includes('ps5') || text.includes('playstation 5')) return { code: 'PS5', name: 'PlayStation 5' };
  if (text.includes('ps4') || text.includes('playstation 4') || text.includes('nathan drake collection')) return { code: 'PS4', name: 'PlayStation 4' };
  if (text.includes('ps2') || text.includes('playstation 2') || text.includes('ps2recomp')) return { code: 'PS2', name: 'PlayStation 2' };
  if (text.includes('ps1') || text.includes('playstation 1') || text.includes('psx') || text.includes('ps1recomp') || text.includes('crash team racing')) return { code: 'PS1', name: 'PlayStation 1' };
  if (text.includes('psp') || text.includes('playstation portable')) return { code: 'PSP', name: 'PlayStation Portable' };
  if (text.includes('gamecube') || text.includes('game cube') || text.includes('wii') || text.includes('super mario sunshine')) return { code: 'GC', name: 'GameCube' };
  if (text.includes('n64') || text.includes('nintendo 64') || text.includes('n64recomp') || text.includes('banjo-tooie') || text.includes('banjo tooie')) return { code: 'N64', name: 'Nintendo 64' };
  if (text.includes('gba') || text.includes('game boy advance') || text.includes('gameboy advance')) return { code: 'GBA', name: 'Game Boy Advance' };
  if (text.includes('3ds') || text.includes('nintendo 3ds')) return { code: '3DS', name: 'Nintendo 3DS' };
  if (text.includes('nds') || text.includes('nintendo ds')) return { code: 'NDS', name: 'Nintendo DS' };
  if (text.includes('switch') || text.includes('nx') || text.includes('nintendo switch')) return { code: 'Switch', name: 'Nintendo Switch' };
  if (text.includes('xbox series') || text.includes('series x') || text.includes('series s')) return { code: 'XONE', name: 'Xbox Series X/S' };
  if (text.includes('xbox one') || text.includes('xone') || text.includes('xb1') || text.includes('azimuth')) return { code: 'XONE', name: 'Xbox One' };
  if (text.includes('xbox 360') || text.includes('x360') || text.includes('xenon') || text.includes('xenonrecomp') || text.includes('rexglue')) return { code: 'XBOX360', name: 'Xbox 360' };
  if (text.includes('xbox')) return { code: 'XBOX', name: 'Xbox Clássico' };
  if (text.includes('dreamcast')) return { code: 'DC', name: 'Dreamcast' };
  if (text.includes('saturn') || text.includes('sega saturn')) return { code: 'SAT', name: 'Sega Saturn' };
  if (text.includes('genesis') || text.includes('mega drive')) return { code: 'MD', name: 'Mega Drive' };

  return { code: 'PC', name: 'PC Nativo' };
}

const SIGLAS_JOGOS = {
  'sms': 'Super Mario Sunshine',
  'cvlod': 'Castlevania: Legacy of Darkness',
  'gr2': 'Gravity Rush 2',
  'xmd': 'X-Men Destiny',
  'swrots': 'Star Wars: Episode III - Revenge of the Sith',
  'acgc': 'Animal Crossing (GameCube)',
  'ctr': 'Crash Team Racing',
  'tka': 'Techno Kitten Adventure',
  'doa3': 'Dead or Alive 3',
  'sf': 'Star Fox'
};

function formatarNomeAmigavel(nome, desc = '') {
  const baseLimpa = nome
    .replace(/[-_]/g, ' ')
    .replace(/\b(pc|port|recomp|recompiled|standalone|decomp)\b/gi, '')
    .trim()
    .toLowerCase();

  if (SIGLAS_JOGOS[baseLimpa]) {
    return SIGLAS_JOGOS[baseLimpa];
  }

  // Tenta extrair o título real da descrição se disponível
  if (desc) {
    const match = desc.match(/(?:native\s+(?:windows|pc)\s+port\s+of|unofficial\s+(?:windows|pc)\s+port\s+of|recompilation\s+of)\s+([^,.:;()]+?)(?:\s+(?:for|using|with|by|done|\(|based|built|\.|$))/i);
    if (match && match[1]) {
      const extraido = match[1].replace(/^(a|an|the)\s+/i, '').trim();
      if (extraido.length >= 3 && extraido.length <= 40 && !extraido.toLowerCase().includes('engine') && !extraido.toLowerCase().includes('decompilation')) {
        return extraido.replace(/\b\w/g, l => l.toUpperCase());
      }
    }
  }

  return nome
    .replace(/[-_]/g, ' ')
    .replace(/\b(pc|port|recomp|recompiled|standalone|decomp)\b/gi, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

async function descobrirNovosPorts() {
  console.log('=====================================================');
  console.log('   PORT INTEGRATION — DISCOVER PORTS V5 (JOGOS PC)   ');
  console.log('   Filtro Rígido: Apenas Games Nativos para Computador');
  console.log('=====================================================\n');

  const reposJaCadastrados = carregarReposCadastrados();
  console.log(`Repositórios já catalogados: ${reposJaCadastrados.size}\n`);

  const candidatos = new Map();

  for (const query of SEARCH_QUERIES) {
    console.log(`Buscando por: "${query}"...`);
    const searchResult = await fetchFromGithub(`/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=25`);
    
    if (searchResult && Array.isArray(searchResult.items)) {
      for (const item of searchResult.items) {
        const fullRepo = item.full_name.toLowerCase();
        const nomeLower = item.name.toLowerCase();
        const descLower = (item.description || '').toLowerCase();
        const combinedText = `${nomeLower} ${descLower} ${(item.topics || []).join(' ')}`.toLowerCase();
        const repoShort = fullRepo.split('/')[1] || '';

        // 1. Já catalogado?
        if (reposJaCadastrados.has(fullRepo) || candidatos.has(fullRepo)) {
          continue;
        }

        // 2. É fork ou arquivado?
        if (item.fork || item.archived) {
          continue;
        }

        // 3. É a ferramenta/compilador em si (PS2Recomp, N64Recomp, etc.) em vez de um jogo?
        if (REJECT_EXACT_NAMES.has(nomeLower) || REJECT_EXACT_NAMES.has(repoShort)) {
          continue;
        }

        // 4. Estrelas preliminares (mínimo 10 ⭐)
        if (item.stargazers_count < MIN_STARS_COM_EXECUTAVEL) {
          continue;
        }

        // 5. Linguagem permitida (C, C++, Rust, C#, Zig, Assembly)
        if (item.language && !ALLOWED_LANGUAGES.has(item.language)) {
          continue;
        }

        // 6. Termos proibidos (emuladores, homebrew em console, IA, utilitários)
        const temTermoRejeitado = REJECT_KEYWORDS.some(keyword => combinedText.includes(keyword));
        if (temTermoRejeitado) {
          continue;
        }

        // 7. Descarta repositórios explicitamente focados em Android ou iOS
        if (fullRepo.includes('-android') || fullRepo.includes('_android') || fullRepo.endsWith('android') || fullRepo.includes('-ios')) {
          continue;
        }

        // 8. O projeto DEVE ser voltado para PC (Windows / Linux / Steam Deck)
        const ehParaPC = PC_TARGET_KEYWORDS.some(pcWord => combinedText.includes(pcWord));
        if (!ehParaPC) {
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

    // 9. OBRIGATÓRIO: Ter pelo menos uma release oficial
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

    // 10. Regra Híbrida: Sem executáveis para download exige >= 25 estrelas
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
      nome: formatarNomeAmigavel(item.name, item.description) || item.name,
      console: plataforma.code,
      consoleNome: plataforma.name,
      codigoJogo: 'AUTODISCOVER',
      status: isPreRelease ? 'Em Desenvolvimento Ativo' : (hasDownloadableBinaries ? 'Totalmente Jogável' : 'Jogável (Source Port)'),
      statusTipo: isPreRelease ? 'wip' : 'jogavel',
      repo: item.full_name,
      repoUrl: item.html_url,
      descricao: item.description || 'Port nativo para PC com compilações oficiais disponíveis no GitHub.',
      termoBuscaCapa: formatarNomeAmigavel(item.name, item.description) || item.name,
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
  console.log(`Total de jogos aprovados: ${novosAprovados.length}`);
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
