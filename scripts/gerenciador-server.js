/**
 * ============================================================================
 * SSLABS ECOSYSTEM — PORT INTEGRATION GERENCIADOR SERVER (BUILD 1.042)
 * ============================================================================
 * Servidor local leve em Node.js para gerenciamento visual, consulta com
 * preview, fila de ports em lote, geração de capas locais e manutenção do catálogo.
 * ============================================================================
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync, exec } = require('child_process');

const PORT = 3847;
const ROOT_DIR = path.resolve(__dirname, '..');
const APP_JS_PATH = path.join(ROOT_DIR, 'app.js');
const LOCALES_JS_PATH = path.join(ROOT_DIR, 'locales.js');
const COVERS_DIR = path.join(ROOT_DIR, 'assets', 'covers');
const MANIFEST_PATH = path.join(COVERS_DIR, 'manifest.json');

// Mime types suportados para servir os arquivos estáticos locais
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function extrairOwnerRepo(input) {
  if (!input) return null;
  const limpo = input.trim().replace(/\/$/, '');
  const match = limpo.match(/(?:github\.com\/)?([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/);
  if (match) return `${match[1]}/${match[2]}`;
  return null;
}

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'SSLabs-Port-Manager/1.0',
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
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetchJson(`https://api.github.com${endpoint}`, headers);
}

function adivinharConsole(name, desc = '', topics = []) {
  const t = `${name} ${desc} ${(topics || []).join(' ')}`.toLowerCase();
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
  let n = repoName
    .replace(/-pc$/i, '')
    .replace(/-recomp$/i, '')
    .replace(/_pc$/i, '')
    .replace(/-port$/i, '')
    .replace(/-decomp$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();
  return n.split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

async function buscarCapaWikipediaInfo(nomeJogo) {
  try {
    const tituloBusca = encodeURIComponent(nomeJogo.replace(/\s+/g, '_'));
    const summary = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${tituloBusca}`);
    if (summary.originalimage && summary.originalimage.source) {
      return { url: summary.originalimage.source, thumb: summary.thumbnail ? summary.thumbnail.source : summary.originalimage.source };
    }
  } catch (e) {}

  try {
    const search = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(nomeJogo + ' video game')}&gsrlimit=1&prop=pageimages&pithumbsize=600&piprop=thumbnail|original&format=json&origin=*`);
    if (search.query && search.query.pages) {
      const first = Object.values(search.query.pages)[0];
      if (first && first.original) {
        return { url: first.original.source, thumb: first.thumbnail ? first.thumbnail.source : first.original.source };
      }
    }
  } catch (e) {}

  return null;
}

async function processarPipelinePort(portData) {
  const { id, nome, consoleCode, consoleNome, codigoJogo, repo, descricao, capaUrl, stars, versaoPadrao, tags } = portData;
  const webpPath = path.join(COVERS_DIR, `${id}.webp`);
  const avifPath = path.join(COVERS_DIR, `${id}.avif`);
  const tempInput = path.join(COVERS_DIR, `temp_${id}.jpg`);

  let temCapa = false;

  // 1. Processar Capa se informada
  if (capaUrl && capaUrl.startsWith('http')) {
    try {
      const buf = await fetchUrl(capaUrl);
      fs.writeFileSync(tempInput, buf);
      execSync(`magick "${tempInput}" -resize "600x>" -quality 82 -strip "${webpPath}"`, { stdio: 'ignore' });
      execSync(`magick "${tempInput}" -resize "600x>" -quality 65 -strip "${avifPath}"`, { stdio: 'ignore' });
      if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
      temCapa = true;
    } catch (err) {
      if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    }
  }

  // 2. Atualizar app.js
  let appJs = fs.readFileSync(APP_JS_PATH, 'utf8');
  const matchPorts = appJs.match(/const PORTS_DATABASE = (\[[\s\S]*?\n\];)/);
  if (!matchPorts) throw new Error('PORTS_DATABASE não encontrado em app.js');

  const database = new Function(`return ${matchPorts[1]}`)();
  const indexExistente = database.findIndex(p => p.id === id || p.repo.toLowerCase() === repo.toLowerCase());

  const novoPort = {
    id,
    nome,
    console: consoleCode,
    consoleNome: consoleNome || consoleCode,
    codigoJogo: codigoJogo || `${consoleCode}-PORT`,
    status: 'Port Nativo PC',
    statusTipo: 'playable',
    repo,
    repoUrl: `https://github.com/${repo}`,
    descricao,
    termoBuscaCapa: nome.replace(/\s+/g, '_'),
    capaManual: null,
    dataAtualizacao: new Date().toISOString(),
    stars: Number(stars) || 0,
    versaoPadrao: versaoPadrao || 'Port Nativo',
    tags: Array.isArray(tags) ? tags : [consoleCode, 'AutoDiscover', 'Port Nativo']
  };

  if (indexExistente >= 0) {
    database[indexExistente] = { ...database[indexExistente], ...novoPort };
  } else {
    database.unshift(novoPort);
  }

  const eol = appJs.includes('\r\n') ? '\r\n' : '\n';
  const novoDbStr = 'const PORTS_DATABASE = ' + JSON.stringify(database, null, 2).replace(/\n/g, eol) + ';';
  appJs = appJs.replace(/const PORTS_DATABASE = \[[\s\S]*?\n\];/, novoDbStr);

  // 3. Atualizar Manifesto se houver capa local
  if (temCapa || fs.existsSync(webpPath)) {
    let manifest = [];
    try { manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')); } catch (e) {}
    if (!manifest.includes(id)) {
      manifest.push(id);
      manifest.sort();
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    }

    const matchManifest = appJs.match(/const LOCAL_COVERS_MANIFEST = (\[[\s\S]*?\n\];)/);
    if (matchManifest) {
      const currentManifest = new Function(`return ${matchManifest[1]}`)();
      if (!currentManifest.includes(id)) {
        currentManifest.push(id);
        currentManifest.sort();
        const newManifestStr = 'const LOCAL_COVERS_MANIFEST = ' + JSON.stringify(currentManifest, null, 2).replace(/\n/g, eol) + ';';
        appJs = appJs.replace(/const LOCAL_COVERS_MANIFEST = \[[\s\S]*?\n\];/, newManifestStr);
      }
    }
  }

  fs.writeFileSync(APP_JS_PATH, appJs, 'utf8');

  // 4. Atualizar locales.js
  let localesJs = fs.readFileSync(LOCALES_JS_PATH, 'utf8');
  if (!localesJs.includes(`"${id}":`)) {
    const descEscapada = descricao.replace(/"/g, '\\"');
    const descEn = `"${id}": "${descEscapada}",`;
    localesJs = localesJs.replace('portDescriptions: {', `portDescriptions: {\n  ${descEn}`);
    const lastIndex = localesJs.lastIndexOf('portDescriptions: {');
    if (lastIndex !== -1) {
      localesJs = localesJs.substring(0, lastIndex) +
        `portDescriptions: {\n  ${descEn}` +
        localesJs.substring(lastIndex + 'portDescriptions: {'.length);
    }
    fs.writeFileSync(LOCALES_JS_PATH, localesJs, 'utf8');
  }

  return { success: true, id, nome, totalNoBanco: database.length };
}

// ── SERVIDOR HTTP LOCAL ──
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlParsed = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlParsed.pathname;

  // ── ROTAS DE API ──
  if (pathname === '/api/status' && req.method === 'GET') {
    let totalPorts = 0;
    try {
      const appJs = fs.readFileSync(APP_JS_PATH, 'utf8');
      const m = appJs.match(/const PORTS_DATABASE = (\[[\s\S]*?\n\];)/);
      if (m) totalPorts = new Function(`return ${m[1]}`)().length;
    } catch (e) {}

    let totalCapas = 0;
    try {
      totalCapas = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')).length;
    } catch (e) {}

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ecosystemVersion: '1.042',
      totalPorts,
      totalCapas,
      status: 'online',
      horaServidor: new Date().toISOString()
    }));
    return;
  }

  if (pathname === '/api/consultar' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { repoInput } = JSON.parse(body || '{}');
        const repoSlug = extrairOwnerRepo(repoInput);
        if (!repoSlug) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Formato de repositório inválido. Use "usuario/repo" ou URL do GitHub.' }));
          return;
        }

        const repoData = await fetchGitHubApi(`/repos/${repoSlug}`);
        let latestVersion = 'Port Nativo';
        try {
          const releases = await fetchGitHubApi(`/repos/${repoSlug}/releases`);
          if (Array.isArray(releases) && releases.length > 0) {
            latestVersion = releases[0].tag_name || releases[0].name || latestVersion;
          }
        } catch (e) {}

        const consoleInfo = adivinharConsole(repoData.name, repoData.description, repoData.topics);
        const nomeJogo = formatarNomeJogo(repoData.name, repoData.description);
        const idJogo = repoData.name.toLowerCase().replace(/[^a-z0-9_-]/g, '') + '-pc';
        const capaInfo = await buscarCapaWikipediaInfo(nomeJogo);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          id: idJogo,
          nome: nomeJogo,
          repo: repoSlug,
          repoUrl: repoData.html_url,
          consoleCode: consoleInfo.code,
          consoleNome: consoleInfo.name,
          codigoJogo: `${consoleInfo.code}-PORT`,
          descricao: repoData.description || `Port nativo para PC de ${nomeJogo} rodando nativamente com alto desempenho.`,
          stars: repoData.stargazers_count,
          versaoPadrao: latestVersion,
          capaUrl: capaInfo ? capaInfo.url : null,
          capaThumb: capaInfo ? capaInfo.thumb : null,
          tags: [consoleInfo.code, 'AutoDiscover', repoData.language || 'C++', 'Port Nativo']
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/adicionar' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const portData = JSON.parse(body || '{}');
        const resultado = await processarPipelinePort(portData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resultado));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/processar-fila' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { repos } = JSON.parse(body || '{}');
        if (!Array.isArray(repos) || repos.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Nenhum repositório enviado na fila.' }));
          return;
        }

        const resultados = [];
        for (const item of repos) {
          try {
            const repoSlug = extrairOwnerRepo(typeof item === 'string' ? item : item.repo);
            if (!repoSlug) throw new Error('URL de repositório inválida');

            const repoData = await fetchGitHubApi(`/repos/${repoSlug}`);
            let latestVersion = 'Port Nativo';
            try {
              const releases = await fetchGitHubApi(`/repos/${repoSlug}/releases`);
              if (Array.isArray(releases) && releases.length > 0) {
                latestVersion = releases[0].tag_name || releases[0].name || latestVersion;
              }
            } catch (e) {}

            const consoleInfo = adivinharConsole(repoData.name, repoData.description, repoData.topics);
            const nomeJogo = formatarNomeJogo(repoData.name, repoData.description);
            const idJogo = repoData.name.toLowerCase().replace(/[^a-z0-9_-]/g, '') + '-pc';
            const capaInfo = await buscarCapaWikipediaInfo(nomeJogo);

            const portData = {
              id: idJogo,
              nome: nomeJogo,
              consoleCode: consoleInfo.code,
              consoleNome: consoleInfo.name,
              codigoJogo: `${consoleInfo.code}-PORT`,
              repo: repoSlug,
              descricao: repoData.description || `Port nativo para PC de ${nomeJogo}.`,
              capaUrl: capaInfo ? capaInfo.url : null,
              stars: repoData.stargazers_count,
              versaoPadrao: latestVersion,
              tags: [consoleInfo.code, 'AutoDiscover', repoData.language || 'C++', 'Port Nativo']
            };

            const r = await processarPipelinePort(portData);
            resultados.push({ repo: repoSlug, status: 'sucesso', nome: nomeJogo });
          } catch (e) {
            resultados.push({ repo: item, status: 'erro', erro: e.message });
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ total: repos.length, resultados }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── SERVIR ARQUIVOS ESTÁTICOS LOCAIS ──
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/gerenciador.html';

  const filePath = path.join(ROOT_DIR, safePath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Arquivo não encontrado.');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log('   SSLabs EcoSystem • Port Integration Gerenciador (v1.042)    ');
  console.log('================================================================');
  console.log(` Servidor local ativo em: http://localhost:${PORT}/gerenciador.html`);
  console.log(' Pressione Ctrl+C para encerrar.');
  console.log('================================================================\n');

  // Abre automaticamente no navegador padrão do Windows
  try {
    exec(`start http://localhost:${PORT}/gerenciador.html`);
  } catch (e) {}
});
