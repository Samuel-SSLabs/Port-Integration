(function () {
  const card = document.getElementById('pw-card');
  if (!card) return;

  const MILESTONES = [
    { key: 'groundwork', at: 0 },
    { key: 'loads', at: 10 },
    { key: 'boots', at: 20 },
    { key: 'menu', at: 30 },
    { key: 'world', at: 40 },
    { key: 'playable', at: 50 },
    { key: 'complete', at: 100 },
  ];

  const I18N = {
    pt: {
      kicker: 'Progresso geral · projeto mais perto de ser jogável',
      title: 'Corrida do GTA VI no PC',
      live: 'Ao Vivo',
      statStage: 'Marco mais avançado',
      statTop3: 'Média do top 3',
      statBoot: 'Iniciam o GTA VI',
      statTracked: 'Projetos acompanhados',
      leaderPrefix: 'Líder:',
      byOwner: (o) => 'de ' + o + '.',
      privateOn: (names) => 'versão privada baseada em ' + names + '.',
      stillGroundwork: 'Ainda na preparação. Nada rodou o GTA VI até agora.',
      reached: (label) => 'Chegou a “' + label + '”.',
      verified: 'Verificado pelo PortWatch',
      unverified: 'Autorrelatado',
      since: 'desde o lançamento do executável',
      until: 'até o executável (estimativa)',
      cta: 'Abrir PortWatch VI',
      updated: 'Atualizado',
      loading: 'Carregando rastreador ao vivo...',
      errorNote: 'Dados ao vivo indisponíveis no momento — clique para abrir o PortWatch VI',
      tracksZone: 'História · Gráficos · Desempenho · Estabilidade',
      ms: {
        groundwork: 'Preparação',
        loads: 'Exe rodando',
        boots: 'Primeiro frame',
        menu: 'Menu principal',
        world: 'No mundo',
        playable: 'Jogável',
        complete: 'Completo',
      },
    },
    en: {
      kicker: 'Overall progress · closest effort to playable',
      title: 'The GTA VI PC race',
      live: 'Live',
      statStage: 'Furthest milestone',
      statTop3: 'Top-3 average',
      statBoot: 'Boot GTA VI',
      statTracked: 'Efforts tracked',
      leaderPrefix: 'Leader:',
      byOwner: (o) => 'by ' + o + '.',
      privateOn: (names) => 'private build on ' + names + '.',
      stillGroundwork: 'Still groundwork. Nothing has run GTA VI yet.',
      reached: (label) => 'Has reached “' + label + '”.',
      verified: 'Verified by PortWatch',
      unverified: 'Self-reported',
      since: 'since the executable dropped',
      until: 'until the executable (estimate)',
      cta: 'Open PortWatch VI',
      updated: 'Updated',
      loading: 'Loading live tracker...',
      errorNote: 'Live data temporarily unavailable — click to open PortWatch VI',
      tracksZone: 'Story progress · Rendering · Performance · Stability',
      ms: {
        groundwork: 'Groundwork',
        loads: 'Exe runs',
        boots: 'First frame',
        menu: 'Main menu',
        world: 'In the world',
        playable: 'Playable',
        complete: 'Complete',
      },
    },
    es: {
      kicker: 'Progreso general · el proyecto más cerca de ser jugable',
      title: 'La carrera del GTA VI en PC',
      live: 'En Vivo',
      statStage: 'Hito más avanzado',
      statTop3: 'Promedio del top 3',
      statBoot: 'Arrancan GTA VI',
      statTracked: 'Proyectos seguidos',
      leaderPrefix: 'Líder:',
      byOwner: (o) => 'de ' + o + '.',
      privateOn: (names) => 'versión privada basada en ' + names + '.',
      stillGroundwork: 'Todavía en preparación. Nada ha ejecutado GTA VI aún.',
      reached: (label) => 'Ha llegado a “' + label + '”.',
      verified: 'Verificado por PortWatch',
      unverified: 'Autorreportado',
      since: 'desde el lanzamiento del ejecutable',
      until: 'hasta el ejecutable (estimación)',
      cta: 'Abrir PortWatch VI',
      updated: 'Actualizado',
      loading: 'Cargando tracker en vivo...',
      errorNote: 'Datos en vivo no disponibles — haz clic para abrir PortWatch VI',
      tracksZone: 'Historia · Gráficos · Rendimiento · Estabilidad',
      ms: {
        groundwork: 'Preparación',
        loads: 'Exe en marcha',
        boots: 'Primer frame',
        menu: 'Menú principal',
        world: 'En el mundo',
        playable: 'Jugable',
        complete: 'Completo',
      },
    },
  };

  const LOCK_SVG =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2h.5a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 12 15H4a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 4 7h.5Zm1.5 0h4V5a2 2 0 1 0-4 0v2Z"/></svg>';

  const CHECK_SVG =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5"/></svg>';

  const INFO_SVG =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.2"/><line x1="8" y1="5.2" x2="8" y2="8.4"/><circle cx="8" cy="11" r="0.6" fill="currentColor" stroke="none"/></svg>';

  let data = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function currentLang() {
    const raw = (document.documentElement.lang || (typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt')).slice(0, 2).toLowerCase();
    return I18N[raw] ? raw : 'pt';
  }

  function localeCode(lang) {
    return lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  }

  function fmtPct(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return '0';
    const r = Math.round(n * 10) / 10;
    return Number.isInteger(r) ? String(r) : r.toFixed(1);
  }

  function q(k) {
    return card.querySelector('[data-pw="' + k + '"]');
  }

  function span(ms) {
    const m = Math.max(0, Math.floor(ms / 60000));
    return Math.floor(m / 1440) + 'd ' + Math.floor((m % 1440) / 60) + 'h ' + (m % 60) + 'm';
  }

  function renderTicksAndLabels(t, furthestKey) {
    const ticksEl = card.querySelector('.pw-ticks');
    if (ticksEl) {
      ticksEl.innerHTML = MILESTONES.slice(1, -1)
        .map(function (m) {
          return '<i class="' + (m.key === 'playable' ? 'pw-tick-playable' : '') + '" style="left:' + m.at + '%"></i>';
        })
        .join('');
    }

    const labelsEl = card.querySelector('.pw-mega-labels');
    if (!labelsEl) return;

    const furthestIdx = furthestKey ? MILESTONES.findIndex(function (m) { return m.key === furthestKey; }) : -1;

    labelsEl.innerHTML =
      MILESTONES.map(function (m, i) {
        const cls = furthestIdx >= 0
          ? (i <= furthestIdx ? 'is-reached' : (i === furthestIdx + 1 ? 'is-next' : ''))
          : '';
        return (
          '<div class="pw-mega-label ' + cls + '" style="left:' + m.at + '%">' +
          '<b>' + m.at + '%</b>' +
          '<span class="pw-dot"></span>' +
          esc(t.ms[m.key] || m.key) +
          '</div>'
        );
      }).join('') +
      '<p class="pw-mega-zone">' + esc(t.tracksZone) + '</p>';
  }

  function layoutMegaLabels() {
    const box = card.querySelector('.pw-mega-labels');
    if (!box || !box.clientWidth) return;
    const labels = Array.prototype.slice.call(box.querySelectorAll('.pw-mega-label'));
    if (!labels.length) return;

    labels.forEach(function (l) { l.style.top = '0px'; });

    function getSpan(el) {
      const r = el.getBoundingClientRect();
      return [r.left, r.right];
    }

    const spans = labels.map(getSpan);
    const zone = box.querySelector('.pw-mega-zone');
    const zoneSpan = zone && zone.getClientRects().length ? getSpan(zone) : null;
    const last = labels.length - 1;
    const GAP = 10;

    function clear(a, b) {
      return a[1] + GAP <= b[0] || b[1] + GAP <= a[0];
    }

    function fits(rows) {
      return spans.every(function (a, i) {
        if ((i % rows === 0) && i !== last && zoneSpan && !clear(a, zoneSpan)) return false;
        return spans.every(function (b, j) {
          return j <= i || ((j - i) % rows !== 0) || clear(a, b);
        });
      });
    }

    let rows = 1;
    while (rows < labels.length && !fits(rows)) rows++;

    const h = Math.max.apply(null, labels.map(function (l) { return l.offsetHeight || 28; }));
    const step = h + 6;
    labels.forEach(function (l, i) {
      l.style.top = ((i % rows) * step) + 'px';
    });
    box.style.height = ((rows - 1) * step + h + 8) + 'px';
  }

  function drawMarkers(markers, leaderId) {
    const box = card.querySelector('.pw-mega-markers');
    if (!box) return;
    const W = box.clientWidth;
    const H = box.clientHeight;
    if (!W || !markers || !markers.length) {
      box.innerHTML = '';
      return;
    }

    const compact = W < 540;
    const avatarSize = compact ? 26 : 32;
    const maxGap = Math.max(24, Math.floor((W - 36) / Math.max(1, markers.length)));
    const GAP = Math.min(compact ? 34 : 42, maxGap);
    const padX = Math.max(18, Math.ceil(avatarSize / 2) + 4);

    const items = markers
      .map(function (m) {
        return { m: m, x: (Math.max(0, Math.min(100, Number(m.progress) || 0)) / 100) * W };
      })
      .sort(function (a, b) { return a.x - b.x; });

    items.forEach(function (it, i) {
      it.a = i ? Math.max(it.x, items[i - 1].a + GAP) : it.x;
    });

    const shift = items.reduce(function (s, it) { return s + (it.x - it.a); }, 0) / Math.max(1, items.length);
    items.forEach(function (it, i) {
      it.a += shift;
      it.a = Math.max(padX, i ? Math.max(it.a, items[i - 1].a + GAP) : it.a);
    });

    const overflow = items.length ? items[items.length - 1].a - (W - padX) : 0;
    if (overflow > 0) {
      items.forEach(function (it) {
        it.a = Math.max(padX, it.a - overflow);
      });
    }

    const avatarY = H - (compact ? 54 : 62);
    const lines = items
      .map(function (it) {
        const y0 = avatarY + avatarSize;
        const isLead = it.m.id === leaderId;
        const priv = !!it.m.private;
        const color = isLead ? '#ff2e7e' : (priv ? 'var(--pw-violet, #7a5cff)' : 'var(--pw-line-2, #475569)');
        const dotColor = isLead ? '#ff2e7e' : (priv ? 'var(--pw-violet, #7a5cff)' : 'var(--pw-faint, #64748b)');
        return (
          '<path d="M' + it.a.toFixed(1) + ' ' + y0 + ' C ' + it.a.toFixed(1) + ' ' + (y0 + 16) + ', ' + it.x.toFixed(1) + ' ' + (H - 16) + ', ' + it.x.toFixed(1) + ' ' + H +
          '" fill="none" stroke="' + color + '" stroke-width="1.6"' + (priv ? ' stroke-dasharray="3 3"' : '') + '/>' +
          '<circle cx="' + it.x.toFixed(1) + '" cy="' + (H - 1) + '" r="3" fill="' + dotColor + '"/>'
        );
      })
      .join('');

    const markersHtml = items
      .map(function (it, i) {
        const m = it.m;
        const isLead = m.id === leaderId;
        const priv = !!m.private;
        const initials = esc((m.name || '?').slice(0, 2).toUpperCase());
        const safeAvatar = typeof m.avatar === 'string' && /^https:\/\//.test(m.avatar) ? m.avatar : '';
        const face = safeAvatar
          ? '<img src="' + esc(safeAvatar) + '" alt="' + esc(m.name) + '" loading="lazy" data-pw-fallback="' + initials + '">'
          : '<span class="pw-mk-fallback">' + initials + '</span>';

        return (
          '<span class="pw-marker' + (isLead ? ' is-leader' : '') + (priv ? ' is-private' : '') +
          '" style="left:' + it.a.toFixed(1) + 'px;bottom:' + (H - avatarY - avatarSize) + 'px;--i:' + i + '">' +
            '<span class="pw-mk-name">' + esc(m.name) + ' · ' + fmtPct(m.progress) + '%</span>' +
            (priv
              ? '<span class="pw-mk-face">' + face + '<span class="pw-bp-lock" aria-hidden="true">' + LOCK_SVG + '</span></span>'
              : face) +
          '</span>'
        );
      })
      .join('');

    box.innerHTML =
      '<svg width="' + W + '" height="' + H + '" style="position:absolute;inset:0;overflow:visible;pointer-events:none" aria-hidden="true">' +
      lines +
      '</svg>' +
      markersHtml;

    box.querySelectorAll('img[data-pw-fallback]').forEach(function (img) {
      img.addEventListener('error', function () {
        const fb = document.createElement('span');
        fb.className = 'pw-mk-fallback';
        fb.textContent = img.getAttribute('data-pw-fallback') || '?';
        img.replaceWith(fb);
      }, { once: true });
    });
  }

  function renderVisualLayout() {
    layoutMegaLabels();
    if (data && data.leader && Array.isArray(data.markers)) {
      drawMarkers(data.markers, data.leader.id);
    }
  }

  function render() {
    const lang = currentLang();
    const t = I18N[lang];

    card.querySelectorAll('[data-pw-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-pw-i18n');
      if (t[key]) el.textContent = t[key];
    });

    const errEl = q('errorNote');
    if (errEl) errEl.textContent = t.errorNote;

    const furthestKey = data && data.stats ? data.stats.furthest : (data && data.leader ? data.leader.reached : null);
    renderTicksAndLabels(t, furthestKey);

    if (!data || !data.leader) {
      const leaderLine = q('leaderLine');
      if (leaderLine) {
        leaderLine.textContent = card.dataset.state === 'loading' ? t.loading : '';
      }
      requestAnimationFrame(layoutMegaLabels);
      return;
    }

    const p = Math.max(0, Math.min(100, Number(data.leader.progress) || 0));
    const fill = card.querySelector('.pw-fill');
    const bar = card.querySelector('.pw-bar');
    if (fill) {
      fill.style.setProperty('--p', p + '%');
    }
    if (bar) {
      bar.setAttribute('aria-valuenow', String(p));
    }

    const pctEl = q('pct');
    if (pctEl) pctEl.textContent = fmtPct(p);

    const leaderLine = q('leaderLine');
    if (leaderLine) {
      const ld = data.leader;
      const reachedKey = ld.reached || furthestKey || 'playable';
      const stageLabel = t.ms[reachedKey] || reachedKey;
      const ownerPart = ld.owner
        ? ' ' + esc(t.byOwner(ld.owner))
        : (ld.private && Array.isArray(ld.basedOn) && ld.basedOn.length
            ? ' <span class="pw-leader-private">' + LOCK_SVG + esc(t.privateOn(ld.basedOn.join(', '))) + '</span>'
            : '');
      const statusPart = reachedKey === 'groundwork'
        ? ' ' + esc(t.stillGroundwork)
        : ' ' + esc(t.reached(stageLabel));

      const isVerified = ld.verification === 'portwatch';
      const verifBadge =
        '<span class="pw-verif-badge ' + (isVerified ? 'is-verified' : 'is-self') + '">' +
        (isVerified ? CHECK_SVG : INFO_SVG) +
        esc(isVerified ? t.verified : t.unverified) +
        '</span>';

      leaderLine.innerHTML =
        esc(t.leaderPrefix) +
        ' <strong class="pw-leader-name">' + esc(ld.name) + '</strong>' +
        ownerPart +
        statusPart +
        ' ' +
        verifBadge;
    }

    const stats = data.stats || {};
    const stageEl = q('stage');
    if (stageEl) stageEl.textContent = t.ms[stats.furthest || data.leader.reached] || '--';

    const top3El = q('top3');
    if (top3El) top3El.textContent = stats.top3 != null ? fmtPct(stats.top3) + '%' : fmtPct(p) + '%';

    const bootedEl = q('booted');
    if (bootedEl) {
      const total = stats.total != null ? stats.total : data.tracked;
      bootedEl.textContent = (stats.booted != null && total != null) ? (stats.booted + ' / ' + total) : String(total || '--');
    }

    const trackedEl = q('tracked');
    if (trackedEl) trackedEl.textContent = data.tracked != null ? String(data.tracked) : '--';

    const at = data.exe && data.exe.at ? new Date(data.exe.at).getTime() : null;
    if (at && Number.isFinite(at)) {
      const released = data.exe.status === 'released';
      const exeEl = q('exe');
      const exeLabelEl = q('exeLabel');
      if (exeEl) exeEl.textContent = span(released ? Date.now() - at : at - Date.now());
      if (exeLabelEl) exeLabelEl.textContent = released ? t.since : t.until;
    }

    const updatedEl = q('updated');
    if (updatedEl) {
      updatedEl.textContent = data.updated
        ? t.updated + ' · ' + new Date(data.updated).toLocaleString(localeCode(lang), { dateStyle: 'short', timeStyle: 'short' })
        : '';
    }

    const newsEl = q('news');
    if (newsEl) {
      newsEl.textContent = data.news && data.news.title ? data.news.title : '';
    }

    card.dataset.state = 'ready';
    requestAnimationFrame(renderVisualLayout);
  }

  function markError() {
    data = null;
    card.dataset.state = 'error';
    const pctEl = q('pct');
    if (pctEl) pctEl.textContent = '0';
    ['stage', 'top3', 'booted', 'tracked'].forEach(function (k) {
      const el = q(k);
      if (el) el.textContent = '--';
    });
    const fill = card.querySelector('.pw-fill');
    const bar = card.querySelector('.pw-bar');
    if (fill) fill.style.setProperty('--p', '0%');
    if (bar) bar.setAttribute('aria-valuenow', '0');
    const markersBox = card.querySelector('.pw-mega-markers');
    if (markersBox) markersBox.innerHTML = '';
    render();
  }

  async function loadPortWatch() {
    try {
      let res = await fetch('/api/portwatch', { headers: { Accept: 'application/json' } });

      // Se a rota local /api/portwatch não existir em servidor estático local (404/405 ou resposta HTML),
      // tenta o Cloudflare Worker proxy como fallback; já 5xx da Function oficial dispara o estado de erro.
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      if ((res.status === 404 || res.status === 405 || (res.ok && ct.indexOf('text/html') !== -1)) &&
          typeof CLOUDFLARE_WORKER_PROXY !== 'undefined' && CLOUDFLARE_WORKER_PROXY) {
        const workerUrl = CLOUDFLARE_WORKER_PROXY.replace(/\/$/, '') + '/api/portwatch';
        res = await fetch(workerUrl, { headers: { Accept: 'application/json' } });
      }

      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (!json || !json.leader) {
        markError();
        return;
      }

      data = json;
      render();
    } catch (err) {
      markError();
    }
  }

  window.pwRender = render;
  render();
  loadPortWatch();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(renderVisualLayout);
  }

  let resizeRaf = null;
  window.addEventListener('resize', function () {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(renderVisualLayout);
  });

  setInterval(render, 60000);
})();
