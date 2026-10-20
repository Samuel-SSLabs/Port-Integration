#!/usr/bin/env node

/**
 * ============================================================================
 * ADICIONADOR INTELIGENTE DE PORTS — SSLABS PORT INTEGRATION
 * ============================================================================
 * Adiciona um jogo sugerido de forma 100% automatizada a partir do repositório:
 *  1. Busca metadados oficiais no GitHub (nome, estrelas, release, descrição)
 *  2. Detecta a plataforma/console original e código serial oficial
 *  3. Baixa e converte a capa em alta definição para WebP e AVIF
 *  4. Insere no PORTS_DATABASE (app.js) e atualiza o manifesto de capas
 *  5. Registra traduções em locales.js
 * 
 * Uso:
 *   node scripts/adicionar-port.js "https://github.com/usuario/repo"
 *   node scripts/adicionar-port.js "usuario/repo"
 * ============================================================================
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_JS_PATH = path.join(ROOT_DIR, 'app.js');
const LOCALES_JS_PATH = path.join(ROOT_DIR, 'locales.js');
const COVERS_DIR = path.join(ROOT_DIR, 'assets', 'covers');
const MANIFEST_PATH = path.join(COVERS_DIR, 'manifest.json');

function extrairOwnerRepo(input) {
  if (!input) return null;
  const limpo = input.trim().replace(/\/$/, '');
  const match = limpo.match(/(?:github\.com\/)?([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/);
  if (match) {
    return `${match[1]}/${match[2]}`;
  }
  return null;
}

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'SSLabs-Port-Adder/1.0',
        ...headers
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location, headers));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} ao acessar ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout ao acessar ${url}`));
    });
  });
}

async function fetchJson(url, headers = {}) {
  const buf = await fetchUrl(url, headers);
  return JSON.parse(buf.toString('utf8'));
}

async function fetchGitHubApi(endpoint) {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetchJson(`https://api.github.com${endpoint}`, headers);
}

function adivinharConsole(name, desc = '', topics = []) {
  const t = `${name} ${desc} ${topics.join(' ')}`.toLowerCase();
  if (/\b(ps5|playstation\s*5)\b/i.test(t)) return { code: 'PS5', name: 'PlayStation 5' };
  if (/\b(ps4|playstation\s*4)\b/i.test(t)) return { code: 'PS4', name: 'PlayStation 4' };
  if (/\b(ps3|playstation\s*3|ps3recomp)\b/i.test(t)) return { code: 'PS3', name: 'PlayStation 3' };
  if (/\b(ps2|playstation\s*2|ps2recomp)\b/i.test(t)) return { code: 'PS2', name: 'PlayStation 2' };
  if (/\b(ps1|playstation\s*1|psx|ps1recomp)\b/i.test(t)) return { code: 'PS1', name: 'PlayStation 1' };
  if (/\b(psp|playstation portable)\b/i.test(t)) return { code: 'PSP', name: 'PlayStation Portable' };
  if (/\b(gamecube|game cube|wii)\b/i.test(t)) return { code: 'GC', name: 'GameCube' };
  if (/\b(n64|nintendo\s*64|n64recomp)\b/i.test(t)) return { code: 'N64', name: 'Nintendo 64' };
  if (/\b(switch|nintendo\s*switch)\b/i.test(t)) return { code: 'Switch', name: 'Nintendo Switch' };
  if (/\b(xbox\s*360|x360|xenon|xenonrecomp)\b/i.test(t)) return { code: 'XBOX360', name: 'Xbox 360' };
  if (/\b(xbox\s*one|xone|xbox series)\b/i.test(t)) return { code: 'XONE', name: 'Xbox One' };
  if (/\b(xbox)\b/i.test(t)) return { code: 'XBOX', name: 'Xbox Clássico' };
  return { code: 'PC', name: 'PC Nativo' };
}

function formatarNomeJogo(repoName, repoDesc = '') {
  // Limpar prefixos e sufixos comuns
  let n = repoName
    .replace(/-pc$/i, '')
    .replace(/-recomp$/i, '')
    .replace(/_pc$/i, '')
    .replace(/-port$/i, '')
    .replace(/-decomp$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();

  // Capitalizar palavras
  return n.split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

async function baixarCapaWikipedia(nomeJogo, idJogo) {
  const webpPath = path.join(COVERS_DIR, `${idJogo}.webp`);
  const avifPath = path.join(COVERS_DIR, `${idJogo}.avif`);
  const tempInput = path.join(COVERS_DIR, `temp_${idJogo}.jpg`);

  try {
    const tituloBusca = encodeURIComponent(nomeJogo.replace(/\s+/g, '_'));
    let imageUrl = null;

    // 1. Wikipedia Summary API
    try {
      const summary = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${tituloBusca}`);
      if (summary.originalimage && summary.originalimage.source) {
        imageUrl = summary.originalimage.source;
      } else if (summary.thumbnail && summary.thumbnail.source) {
        imageUrl = summary.thumbnail.source;
      }
    } catch (e) {}

    // 2. Wikipedia Search API
    if (!imageUrl) {
      try {
        const search = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(nomeJogo + ' video game')}&gsrlimit=1&prop=pageimages&pithumbsize=800&piprop=thumbnail|original&format=json&origin=*`);
        if (search.query && search.query.pages) {
          const first = Object.values(search.query.pages)[0];
          if (first && first.original) imageUrl = first.original.source;
          else if (first && first.thumbnail) imageUrl = first.thumbnail.source;
        }
      } catch (e) {}
    }

    if (imageUrl) {
      console.log(`  -> Baixando capa oficial: ${imageUrl}`);
      const buf = await fetchUrl(imageUrl);
      fs.writeFileSync(tempInput, buf);

      execSync(`magick "${tempInput}" -resize "600x>" -quality 82 -strip "${webpPath}"`, { stdio: 'ignore' });
      execSync(`magick "${tempInput}" -resize "600x>" -quality 65 -strip "${avifPath}"`, { stdio: 'ignore' });
      fs.unlinkSync(tempInput);
      return true;
    }
  } catch (err) {
    if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    console.warn(`  ⚠️ Falha ao baixar capa oficial: ${err.message}`);
  }
  return false;
}

async function adicionarPort(argInput) {
  const repoSlug = extrairOwnerRepo(argInput);
  if (!repoSlug) {
    console.error('❌ Erro: Por favor informe o repositório no formato "usuario/repo" ou URL do GitHub.');
    process.exit(1);
  }

  console.log('================================================================');
  console.log(`   ADICIONANDO PORT: ${repoSlug}`);
  console.log('================================================================\n');

  console.log('1. Consultando metadados na API do GitHub...');
  let repoData;
  try {
    repoData = await fetchGitHubApi(`/repos/${repoSlug}`);
  } catch (e) {
    console.error(`❌ Repositório não encontrado ou inacessível no GitHub: ${e.message}`);
    process.exit(1);
  }

  let latestVersion = 'Port Nativo';
  let dataRelease = repoData.updated_at || new Date().toISOString();

  try {
    const releases = await fetchGitHubApi(`/repos/${repoSlug}/releases`);
    if (Array.isArray(releases) && releases.length > 0) {
      latestVersion = releases[0].tag_name || releases[0].name || latestVersion;
      if (releases[0].published_at) dataRelease = releases[0].published_at;
    }
  } catch (e) {}

  const consoleDetectado = adivinharConsole(repoData.name, repoData.description, repoData.topics);
  const nomeJogo = formatarNomeJogo(repoData.name, repoData.description);
  const idJogo = repoData.name.toLowerCase().replace(/[^a-z0-9_-]/g, '') + '-pc';

  console.log(`   Nome detectado:  ${nomeJogo}`);
  console.log(`   Console:         ${consoleDetectado.name} (${consoleDetectado.code})`);
  console.log(`   Estrelas:        ${repoData.stargazers_count}`);
  console.log(`   Versão:          ${latestVersion}`);
  console.log(`   ID do Port:      ${idJogo}\n`);

  console.log('2. Baixando e convertendo capas (WebP + AVIF)...');
  const temCapaLocal = await baixarCapaWikipedia(nomeJogo, idJogo);

  // 3. Montar objeto do Port
  const tagsList = [
    consoleDetectado.code,
    'AutoDiscover',
    repoData.language || 'C++',
    'Port Nativo'
  ];

  const novoPort = {
    id: idJogo,
    nome: nomeJogo,
    console: consoleDetectado.code,
    consoleNome: consoleDetectado.name,
    codigoJogo: `${consoleDetectado.code}-PORT`,
    status: 'Port Nativo PC',
    statusTipo: 'playable',
    repo: repoSlug,
    repoUrl: repoData.html_url,
    descricao: repoData.description || `Port nativo para PC de ${nomeJogo} rodando com alta performance e suporte nativo a hardware moderno.`,
    termoBuscaCapa: nomeJogo.replace(/\s+/g, '_'),
    capaManual: null,
    dataAtualizacao: dataRelease,
    stars: repoData.stargazers_count,
    versaoPadrao: latestVersion,
    tags: tagsList
  };

  // 4. Inserir em app.js
  console.log('3. Atualizando PORTS_DATABASE em app.js...');
  let appJs = fs.readFileSync(APP_JS_PATH, 'utf8');
  const matchPorts = appJs.match(/const PORTS_DATABASE = (\[[\s\S]*?\n\];)/);
  if (!matchPorts) {
    console.error('❌ Não foi possível localizar PORTS_DATABASE em app.js');
    process.exit(1);
  }

  const database = new Function(`return ${matchPorts[1]}`)();
  const indexExistente = database.findIndex(p => p.id === idJogo || p.repo.toLowerCase() === repoSlug.toLowerCase());

  if (indexExistente >= 0) {
    console.log(`   ⚠️ Jogo já existia no catálogo. Atualizando informações...`);
    database[indexExistente] = { ...database[indexExistente], ...novoPort };
  } else {
    database.unshift(novoPort);
    console.log(`   ✅ Jogo inserido no topo do catálogo!`);
  }

  const eol = appJs.includes('\r\n') ? '\r\n' : '\n';
  const novoDbStr = 'const PORTS_DATABASE = ' + JSON.stringify(database, null, 2).replace(/\n/g, eol) + ';';
  appJs = appJs.replace(/const PORTS_DATABASE = \[[\s\S]*?\n\];/, novoDbStr);

  // Se tem capa local, atualizar manifesto
  if (temCapaLocal) {
    let manifest = [];
    try { manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')); } catch (e) {}
    if (!manifest.includes(idJogo)) {
      manifest.push(idJogo);
      manifest.sort();
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    }

    const matchManifest = appJs.match(/const LOCAL_COVERS_MANIFEST = (\[[\s\S]*?\n\];)/);
    if (matchManifest) {
      const currentManifest = new Function(`return ${matchManifest[1]}`)();
      if (!currentManifest.includes(idJogo)) {
        currentManifest.push(idJogo);
        currentManifest.sort();
        const newManifestStr = 'const LOCAL_COVERS_MANIFEST = ' + JSON.stringify(currentManifest, null, 2).replace(/\n/g, eol) + ';';
        appJs = appJs.replace(/const LOCAL_COVERS_MANIFEST = \[[\s\S]*?\n\];/, newManifestStr);
      }
    }
  }

  fs.writeFileSync(APP_JS_PATH, appJs, 'utf8');

  // 5. Atualizar locales.js
  console.log('4. Atualizando locales.js...');
  let localesJs = fs.readFileSync(LOCALES_JS_PATH, 'utf8');
  if (!localesJs.includes(`"${idJogo}":`)) {
    const descEn = `"${idJogo}": "${(repoData.description || `Native PC port of ${nomeJogo}`).replace(/"/g, '\\"')}",`;
    localesJs = localesJs.replace('portDescriptions: {', `portDescriptions: {\n  ${descEn}`);
    const lastIndex = localesJs.lastIndexOf('portDescriptions: {');
    if (lastIndex !== -1) {
      localesJs = localesJs.substring(0, lastIndex) +
        `portDescriptions: {\n  ${descEn}` +
        localesJs.substring(lastIndex + 'portDescriptions: {'.length);
    }
    fs.writeFileSync(LOCALES_JS_PATH, localesJs, 'utf8');
  }

  console.log('\n================================================================');
  console.log(`🎉 JOGO ADICIONADO COM SUCESSO AO CATÁLOGO!`);
  console.log(`   ${novoPort.nome} (${novoPort.console})`);
  console.log(`   Total de ports no catálogo agora: ${database.length}`);
  console.log('================================================================\n');
}

const inputArg = process.argv[2];
if (!inputArg) {
  console.log('Uso: node scripts/adicionar-port.js "<link ou usuario/repo>"');
  console.log('Exemplo: node scripts/adicionar-port.js "https://github.com/arnaldolima1/gow-ascension-pc"');
  process.exit(0);
}

adicionarPort(inputArg);
