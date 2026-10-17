/**
 * CLOUDFLARE WORKER — GITHUB PROXY & SMART EDGE CACHE
 * SSLabs Ecosystem — Port Integration (Build 05)
 * 
 * Funcionalidades:
 * 1. Eleva o limite da API do GitHub de 60 req/h (anônimo) para 5.000 req/h (autenticado com GITHUB_TOKEN).
 * 2. Guarda a chave privada em segurança no servidor Cloudflare (Secret seguro, sem expor no front-end).
 * 3. Cache de Borda Mundial (Cloudflare Edge Cache):
 *    - Chave de cache baseada na URL do Worker (compatibilidade total com Cloudflare Cache API).
 *    - TTL: 4 horas de cache fresco (14.400s) + 24 horas de Stale-While-Revalidate (86.400s).
 * 4. Rota de Diagnóstico Inteligente (/status):
 *    - Testa a chave GITHUB_TOKEN em tempo real.
 *    - Mostra cota restante, limite total e status do cache.
 * 5. CORS universal liberado para todas as origens (*).
 */

export default {
  async fetch(request, env, ctx) {
    // ── 1. TRATAMENTO DE PRÉ-VOO CORS (OPTIONS) ──
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent, If-None-Match',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);

    // ── ENDPOINT DE SUGESTÃO PARA O DISCORD (POST /api/suggest) ──
    if (request.method === 'POST' && url.pathname === '/api/suggest') {
      try {
        const body = await request.json();
        const { jogo, plataforma, repoUrl, detalhes, contato } = body || {};

        if (!jogo) {
          return new Response(JSON.stringify({ error: 'Nome do jogo é obrigatório.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }

        // Se o Webhook do Discord estiver configurado nas variáveis de ambiente da Cloudflare:
        if (env.DISCORD_WEBHOOK_URL && env.DISCORD_WEBHOOK_URL.startsWith('https://discord.com/api/webhooks/')) {
          const discordPayload = {
            username: 'SSLabs Port Integration Bot',
            avatar_url: 'https://raw.githubusercontent.com/Samuel-SSLabs/port-integration/main/assets/favicon.png',
            embeds: [
              {
                title: `🎮 Nova Sugestão de Port: ${jogo}`,
                color: 0x7c3aed, // Roxo SSLabs (#7c3aed)
                fields: [
                  { name: '🕹️ Plataforma', value: plataforma || 'Não informada', inline: true },
                  { name: '🔗 Repositório / Link', value: repoUrl ? `[Acessar Código](${repoUrl})` : 'Não informado', inline: true },
                  { name: '📝 Observações', value: detalhes || 'Nenhuma informação adicional fornecida.', inline: false },
                  { name: '👤 Sugerido por', value: contato || 'Anônimo / Comunidade SSLabs', inline: true }
                ],
                footer: { text: 'Port Integration • SSLabs Ecosystem' },
                timestamp: new Date().toISOString()
              }
            ]
          };

          await fetch(env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
          });

          return new Response(JSON.stringify({ success: true, message: 'Sugestão enviada com sucesso ao Discord da SSLabs!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }

        return new Response(JSON.stringify({ success: false, fallback: 'mailto', message: 'Webhook não configurado. Use mailto.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Erro ao processar sugestão.', details: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(JSON.stringify({ error: 'Método não permitido. Utilize apenas GET ou HEAD.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // ── 2. ENDPOINT DE STATUS E DIAGNÓSTICO EM TEMPO REAL (/status OU /health) ──
    if (url.pathname === '/' || url.pathname === '/health' || url.pathname === '/status') {
      let githubStatus = 'Não configurado (Usando limite anônimo de 60 req/h)';
      let rateLimitInfo = null;

      if (env.GITHUB_TOKEN && env.GITHUB_TOKEN.trim().length > 0) {
        githubStatus = 'Configurado e Ativo (Token Privado presente)';
        try {
          const rateCheck = await fetch('https://api.github.com/rate_limit', {
            headers: {
              'User-Agent': 'SSLabs-Port-Integration-Proxy/2.0',
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${env.GITHUB_TOKEN.trim()}`
            }
          });
          if (rateCheck.ok) {
            const rateData = await rateCheck.json();
            const core = rateData.resources && rateData.resources.core;
            if (core) {
              const resetDate = new Date(core.reset * 1000);
              const minutosRestantes = Math.max(0, Math.round((resetDate.getTime() - Date.now()) / 60000));
              rateLimitInfo = {
                limiteTotal: core.limit,
                requisicoesRestantes: core.remaining,
                utilizadas: core.used,
                resetaEmMinutos: minutosRestantes,
                resetaAs: resetDate.toLocaleTimeString('pt-BR')
              };
            }
          }
        } catch (e) {
          rateLimitInfo = { erroVerificacao: e.message };
        }
      }

      const statusPayload = {
        servico: 'SSLabs Port Integration — GitHub Edge Proxy',
        versao: 'Build 05',
        status: 'online',
        autenticacaoGithub: githubStatus,
        cotaGithub: rateLimitInfo,
        cacheEdgeCloudflare: {
          ativo: true,
          duracaoCacheFresco: '4 horas (14.400 segundos)',
          staleWhileRevalidate: '24 horas (86.400 segundos)',
          estrategia: 'Cloudflare Default Cache API'
        },
        instrucoesUso: {
          exemploConsultaRepo: `${url.origin}/api/repos/AjncSystem/ShadowOfTheColossus-PC`,
          exemploConsultaReleases: `${url.origin}/api/repos/AjncSystem/ShadowOfTheColossus-PC/releases`
        },
        horaServidor: new Date().toISOString()
      };

      return new Response(JSON.stringify(statusPayload, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store'
        }
      });
    }

    // ── 3. VALIDAÇÃO DE ROTA DE CONSULTA AO GITHUB ──
    let targetPath = url.pathname;
    if (targetPath.startsWith('/api/')) {
      targetPath = targetPath.replace('/api/', '/');
    }

    // Permitir apenas leitura em /repos/
    if (!targetPath.startsWith('/repos/')) {
      return new Response(JSON.stringify({
        error: 'Acesso negado. Apenas endpoints em /api/repos/ são permitidos.',
        exemploValido: '/api/repos/AjncSystem/ShadowOfTheColossus-PC'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // ── 4. VERIFICAÇÃO DE CACHE NA BORDA CLOUDFLARE (CACHE API) ──
    // A chave de cache DEVE pertencer ao domínio do Worker para conformidade com a Cache API
    const cacheKey = new Request(url.toString(), { method: 'GET' });
    const cache = caches.default;
    let cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) {
      const responseHeaders = new Headers(cachedResponse.headers);
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      responseHeaders.set('Access-Control-Expose-Headers', 'X-Proxy-Cache, X-Proxy-Provider, X-RateLimit-Remaining');
      responseHeaders.set('X-Proxy-Cache', 'HIT');
      responseHeaders.set('X-Proxy-Provider', 'Cloudflare-Worker-SSLabs');

      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: responseHeaders
      });
    }

    // ── 5. CONSULTA AUTENTICADA AO GITHUB (CACHE MISS) ──
    const githubApiUrl = `https://api.github.com${targetPath}${url.search}`;
    const reqHeaders = {
      'User-Agent': 'SSLabs-Port-Integration-Proxy/2.0',
      'Accept': 'application/vnd.github.v3+json',
    };

    if (env.GITHUB_TOKEN && env.GITHUB_TOKEN.trim().length > 0) {
      reqHeaders['Authorization'] = `Bearer ${env.GITHUB_TOKEN.trim()}`;
    }

    try {
      const githubRes = await fetch(githubApiUrl, {
        headers: reqHeaders,
        cf: {
          cacheTtl: 14400, // 4 horas
          cacheEverything: true
        }
      });

      const responseHeaders = new Headers();
      responseHeaders.set('Content-Type', githubRes.headers.get('Content-Type') || 'application/json; charset=utf-8');
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      responseHeaders.set('Access-Control-Expose-Headers', 'X-Proxy-Cache, X-Proxy-Provider, X-RateLimit-Remaining, X-RateLimit-Limit');
      responseHeaders.set('X-Proxy-Cache', 'MISS');
      responseHeaders.set('X-Proxy-Provider', 'Cloudflare-Worker-SSLabs');

      // Repassa cabeçalhos úteis do GitHub
      const rlLimit = githubRes.headers.get('x-ratelimit-limit');
      const rlRemain = githubRes.headers.get('x-ratelimit-remaining');
      const rlReset = githubRes.headers.get('x-ratelimit-reset');
      if (rlLimit) responseHeaders.set('X-RateLimit-Limit', rlLimit);
      if (rlRemain) responseHeaders.set('X-RateLimit-Remaining', rlRemain);
      if (rlReset) responseHeaders.set('X-RateLimit-Reset', rlReset);

      // Leitura do corpo da resposta
      const responseBody = await githubRes.text();

      // Salva no Cache da Cloudflare se o retorno for 200 (OK)
      if (githubRes.status === 200) {
        responseHeaders.set('Cache-Control', 'public, max-age=14400, s-maxage=14400, stale-while-revalidate=86400');
        
        const responseToCache = new Response(responseBody, {
          status: 200,
          statusText: 'OK',
          headers: responseHeaders
        });

        // Grava no cache de forma assíncrona sem bloquear a resposta ao usuário
        ctx.waitUntil(cache.put(cacheKey, responseToCache.clone()));
      }

      return new Response(responseBody, {
        status: githubRes.status,
        statusText: githubRes.statusText,
        headers: responseHeaders
      });

    } catch (err) {
      return new Response(JSON.stringify({
        error: 'Falha na comunicação com a API do GitHub',
        mensagem: err.message,
        instrucao: 'Verifique se a URL informada é válida ou se a Cloudflare possui acesso de rede.'
      }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
