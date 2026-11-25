const SOURCE = 'https://portwatch-vi.xyz/data/tracker.json';
const ORIGIN_BASE = 'https://portwatch-vi.xyz/';
const REPO_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

const MILESTONES = [
  { key: 'groundwork', at: 0 },
  { key: 'loads', at: 10 },
  { key: 'boots', at: 20 },
  { key: 'menu', at: 30 },
  { key: 'world', at: 40 },
  { key: 'playable', at: 50 },
  { key: 'complete', at: 100 },
];

const TICK = Object.fromEntries(MILESTONES.map((m) => [m.key, m.at]));
const LADDER = ['loads', 'boots', 'menu', 'world', 'playable'];

const GROUNDWORK = [
  { key: 'loader', weight: 0.2 },
  { key: 'shaders', weight: 0.28 },
  { key: 'graphics', weight: 0.32 },
  { key: 'proven', weight: 0.2 },
];

const TRACKS = [
  { key: 'story', weight: 0.35 },
  { key: 'render', weight: 0.25 },
  { key: 'perf', weight: 0.2 },
  { key: 'stability', weight: 0.2 },
];

const STABILITY = {
  unknown: 0,
  constant: 0,
  often: 0.25,
  sometimes: 0.55,
  rarely: 0.8,
  stable: 1,
};

const n = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);
const clamp01 = (v) => {
  const num = Number(v);
  return Number.isFinite(num) ? Math.min(1, Math.max(0, num)) : 0;
};

function ladderValue(v) {
  if (v === true) return 1;
  if (v === false || v == null) return 0;
  return clamp01(v);
}

function groundworkFraction(gw) {
  return GROUNDWORK.reduce((sum, g) => sum + g.weight * clamp01(gw && gw[g.key]), 0);
}

function stabilityValue(v) {
  if (typeof v === 'number') return clamp01(v);
  return Object.prototype.hasOwnProperty.call(STABILITY, v) ? STABILITY[v] : 0;
}

function scoreEffort(effort = {}) {
  const gw = groundworkFraction(effort.groundwork);
  const gta = effort.gta || {};
  let score = TICK.loads * gw;
  let reached = 'groundwork';
  let prevTick = score;

  for (const key of LADDER) {
    const v = ladderValue(gta[key]);
    if (v >= 1) {
      score = TICK[key];
      prevTick = score;
      reached = key;
      continue;
    }
    if (v > 0) score = Math.max(score, prevTick + v * (TICK[key] - prevTick));
    break;
  }

  const tracks = {
    story: clamp01(gta.story),
    render: clamp01(gta.render),
    perf: clamp01(n(gta.fps) / 30),
    stability: stabilityValue(gta.stability),
  };

  const quality = TRACKS.reduce((sum, tr) => sum + tr.weight * tracks[tr.key], 0);
  if (reached === 'playable') {
    score = TICK.playable + quality * (TICK.complete - TICK.playable);
    if (quality >= 1) reached = 'complete';
  }

  if (typeof effort.manualScore === 'number' && Number.isFinite(effort.manualScore)) {
    score = Math.min(100, Math.max(0, effort.manualScore));
  }

  return {
    score: Math.round(score * 10) / 10,
    reached,
  };
}

function isPrivateBuild(e) {
  return !(typeof e.repo === 'string' && e.repo.includes('/'));
}

function repoOwner(repo) {
  return REPO_RE.test(repo || '') ? repo.split('/')[0] : null;
}

function resolveAvatar(e) {
  if (typeof e.avatar === 'string' && /^assets\/img\/[\w/.-]+$/.test(e.avatar)) {
    return ORIGIN_BASE + e.avatar;
  }
  const owner = repoOwner(e.repo);
  return owner ? `https://github.com/${encodeURIComponent(owner)}.png?size=88` : null;
}

export async function onRequestGet() {
  try {
    const res = await fetch(SOURCE, {
      headers: { 'User-Agent': 'PortIntegration-Pages/1.0' },
      cf: { cacheTtl: 900, cacheEverything: true },
    });
    if (!res.ok) throw new Error('upstream ' + res.status);
    const data = await res.json();

    const efforts = Array.isArray(data.efforts) ? data.efforts : [];
    const nameById = new Map(efforts.map((e) => [e.id, e.name]));

    const all = efforts.filter((e) => !e.nuked);
    const ranked = all
      .map((e) => ({ e, ...scoreEffort(e) }))
      .sort((a, b) => b.score - a.score || ((b.e.stats && b.e.stats.stars) || 0) - ((a.e.stats && a.e.stats.stars) || 0));

    const lead = ranked[0] || null;
    const top3List = ranked.slice(0, 3);
    const top3 = top3List.length
      ? Math.round((top3List.reduce((acc, r) => acc + r.score, 0) / top3List.length) * 10) / 10
      : 0;

    const furthestIdx = ranked.reduce((best, r) => {
      const idx = MILESTONES.findIndex((m) => m.key === r.reached);
      return idx > best ? idx : best;
    }, 0);

    const booted = all.filter((e) => ladderValue(e.gta && e.gta.boots) >= 1).length;
    const news = Array.isArray(data.news) ? data.news[0] : null;
    const exe = data.exe || {};
    const exeAt = exe.releasedAt || exe.expectedAt || (exe.expected ? `${exe.expected}T00:00:00Z` : null);

    const resolveBasedOn = (e) => (Array.isArray(e.basedOn)
      ? e.basedOn.map((id) => nameById.get(id) || id)
      : []);

    const body = {
      updated: data.updated || null,
      exe: {
        status: exe.status || null,
        at: exeAt,
        announced: !!exe.timeAnnounced,
      },
      leader: lead
        ? {
            id: lead.e.id,
            name: lead.e.name,
            owner: repoOwner(lead.e.repo),
            progress: lead.score,
            reached: lead.reached,
            verification: lead.e.verification || 'self-reported',
            fps: n(lead.e.gta && lead.e.gta.fps),
            private: isPrivateBuild(lead.e),
            basedOn: resolveBasedOn(lead.e),
          }
        : null,
      stats: {
        furthest: (MILESTONES[furthestIdx] && MILESTONES[furthestIdx].key) || 'groundwork',
        top3,
        booted,
        total: all.length,
      },
      markers: ranked.slice(0, 6).map((r) => ({
        id: r.e.id,
        name: r.e.name,
        progress: r.score,
        reached: r.reached,
        avatar: resolveAvatar(r.e),
        private: isPrivateBuild(r.e),
        verification: r.e.verification || 'self-reported',
        approach: r.e.approach || '',
        basedOn: resolveBasedOn(r.e),
      })),
      tracked: all.length,
      news: news ? { title: news.title, date: news.date } : null,
    };

    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=900',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'unavailable' }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }
}
