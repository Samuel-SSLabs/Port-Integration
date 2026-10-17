'use strict';

const CLOUDFLARE_WORKER_PROXY = 'https://sslabs-port-proxy.sstudioslabs.workers.dev';
const DISCORD_SUGGEST_WEBHOOK = '';
const GITHUB_CACHE_TTL_MS = 24 * 60 * 60 * 1000;


try {
  localStorage.removeItem('port_cover_shadow-of-the-colossus-pc');
  localStorage.removeItem('port_cover_v2_shadow-of-the-colossus-pc');
} catch (e) {}

// ── SERVIDORES OFICIAIS DO DISCORD DOS PROJETOS (APENAS CONVITES 100% VÁLIDOS E ATIVOS) ──
const DISCORD_MAP = {
  "shadps4-emu/shadps4": "https://discord.gg/bFJxfftGW6",
  "supermedo/bloodborne_pc": "https://discord.gg/bFJxfftGW6",
  "ajncsystem/shadowofthecolossus-pc": "https://discord.gg/bFJxfftGW6",
  "hayatog/tlg_pc": "https://discord.gg/bFJxfftGW6",
  "felipeprado0/gow3_pc": "https://discord.gg/bFJxfftGW6",
  "blacklineinteractive/driveclub-port": "https://discord.gg/bFJxfftGW6",
  "junminlee2004/gr2fork": "https://discord.gg/bFJxfftGW6",
  "bloodborne-native/bloodborne-recomp": "https://discord.gg/bFJxfftGW6",
  "loreanxavier/pt-pc": "https://discord.gg/bFJxfftGW6",

  "red-prig/fpps4": "https://discord.gg/up9qatpX7M",

  "harbourmasters/shipwright": "https://discord.com/invite/harbourmasters",
  "harbourmasters/starship": "https://discord.com/invite/harbourmasters",
  "harbourmasters/spaghettikart": "https://discord.com/invite/harbourmasters",
  "2ship2harkinian/2ship2harkinian": "https://discord.com/invite/harbourmasters",

  "zelda64recomp/zelda64recomp": "https://discord.gg/AWZThJ4dPf",
  "banjorecomp/banjorecomp": "https://discord.gg/AWZThJ4dPf",
  "denkishi/ssbu-recomp": "https://discord.gg/AWZThJ4dPf",
  "peiikai/lasrecomp": "https://discord.gg/AWZThJ4dPf",

  "open-goal/jak-project": "https://discord.gg/VZbXMHXzWv",

  "coop-deluxe/sm64coopdx": "https://discord.gg/TJVKHS4",
  "sm64pc/sm64ex": "https://discord.gg/TJVKHS4",

  "diasurgical/devilutionx": "https://discord.gg/devilutionx-518540764754608128",

  "openrct2/openrct2": "https://discord.gg/ZXZd8D8",

  "vcmi/vcmi": "https://discord.gg/chBT42V",

  "snesrev/zelda3": "https://discord.gg/AJJbJAzNNJ",

  "twilitrealm/dusklight": "https://discord.gg/6NpMhefCK9",

  "phoboslab/wipeout-rewrite": "https://discord.gg/wipeout",

  "dinosaurplanetrecomp/dino-recomp": "https://discord.gg/dinosaurplanet",

  "noelfb/celeste": "https://discord.gg/celeste",

  "cutarev/sh2-nx": "https://discord.gg/silenthill"
};

// ── BANCO DE DADOS DE PORTS NATIVOS (BASE CONSOLIDADA: 160+ PROJETOS) ──
const PORTS_DATABASE = [
  {
    "id": "demons-souls-ps5-pc",
    "nome": "Demon's Souls Remake (PS5 PC Native Port)",
    "console": "PS5",
    "consoleNome": "PlayStation 5",
    "codigoJogo": "PPSA01342",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "ymatrix1/PortPS5",
    "repoUrl": "https://github.com/ymatrix1/PortPS5",
    "descricao": "Execução e port nativo para PC de Demon's Souls Remake (Bluepoint/Japan Studio) via conversão direta de binários x86-64 para Vulkan em 60/120 FPS.",
    "termoBuscaCapa": "Demon's_Souls_(2020_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T11:40:00Z",
    "stars": 387,
    "versaoPadrao": "v0.3.1-demons",
    "tags": [
      "PS5",
      "Bluepoint",
      "FromSoftware",
      "Soulslike",
      "Vulkan",
      "4K 60FPS"
    ]
  },
  {
    "id": "astros-playroom-ps5-pc",
    "nome": "Astro's Playroom (PS5 PC Native Port)",
    "console": "PS5",
    "consoleNome": "PlayStation 5",
    "codigoJogo": "PPSA01325",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "boykopovar/AnyPS5",
    "repoUrl": "https://github.com/boykopovar/AnyPS5",
    "descricao": "Port nativo para computadores de Astro's Playroom executando assets e binários x86-64 do PS5 através de camada gráfica Vulkan com suporte a controle DualSense.",
    "termoBuscaCapa": "Astro's_Playroom",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:00:00Z",
    "stars": 40788,
    "versaoPadrao": "v1.4.0",
    "tags": [
      "PS5",
      "Team Asobi",
      "Astro Bot",
      "Platformer",
      "Vulkan"
    ]
  },
  {
    "id": "infamous-second-son-pc",
    "nome": "inFAMOUS: Second Son (PC Native)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA00223",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HayatoG/iss_pc",
    "repoUrl": "https://github.com/HayatoG/iss_pc",
    "descricao": "Port nativo para PC (Windows e Linux) em C++ de inFAMOUS Second Son. Lançador integrado com suporte a gráficos personalizados, sensores de movimento e framerate desbloqueado.",
    "termoBuscaCapa": "Infamous_Second_Son",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T14:40:00Z",
    "stars": 460,
    "versaoPadrao": "v1.1.0-iss",
    "tags": [
      "PS4",
      "Sucker Punch",
      "inFAMOUS",
      "Delsin Rowe",
      "Vulkan",
      "PC Native"
    ]
  },
  {
    "id": "shadow-of-the-colossus-pc",
    "nome": "Shadow of the Colossus (Remake 2018)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA08809",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "AjncSystem/ShadowOfTheColossus-PC",
    "repoUrl": "https://github.com/AjncSystem/ShadowOfTheColossus-PC",
    "descricao": "Port nativo para Windows do remake de Shadow of the Colossus (PS4, CUSA08809). Requer dump pessoal do jogo.",
    "termoBuscaCapa": "Shadow_of_the_Colossus_(2018_video_game)",
    "capaManual": "./assets/covers/shadow_2018.jpg",
    "dataAtualizacao": "2026-10-17T12:50:00Z",
    "stars": 935,
    "versaoPadrao": "v0.57",
    "tags": [
      "PS4",
      "Sony",
      "Action-Adventure",
      "DirectX 12/Vulkan",
      "CUSA08809"
    ]
  },
  {
    "id": "bloodborne-supermedo-pc",
    "nome": "BloodBorne for Windows (Standalone Recomp)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA03173",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Supermedo/bloodborne_pc",
    "repoUrl": "https://github.com/Supermedo/bloodborne_pc",
    "descricao": "Port autônomo e executável direto para Windows de Bloodborne com patches de estabilidade, desbloqueio de taxa de quadros e renderizador Vulkan integrado.",
    "termoBuscaCapa": "Bloodborne",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T20:30:00Z",
    "stars": 3050,
    "versaoPadrao": "windows-v1.8.2",
    "tags": [
      "PS4",
      "FromSoftware",
      "Bloodborne",
      "Windows",
      "Vulkan"
    ]
  },
  {
    "id": "the-last-guardian-pc",
    "nome": "The Last Guardian",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA03627",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "HayatoG/tlg_pc",
    "repoUrl": "https://github.com/HayatoG/tlg_pc",
    "descricao": "Port nativo para PC (Windows e Linux) de The Last Guardian, executando assets diretamente do dump original do PS4 via Vulkan.",
    "termoBuscaCapa": "The_Last_Guardian",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T13:09:00Z",
    "stars": 215,
    "versaoPadrao": "rev e72cb9a",
    "tags": [
      "PS4",
      "Sony",
      "Team Ico",
      "Fumito Ueda",
      "Vulkan",
      "CUSA03627"
    ]
  },
  {
    "id": "pt-pc-native",
    "nome": "P.T. (Silent Hills Teaser)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA01127",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "LoreanXavier/pt-pc",
    "repoUrl": "https://github.com/LoreanXavier/pt-pc",
    "descricao": "Port nativo para PC em C++ com renderizador Vulkan do clássico teaser de horror psicológico P.T. de Hideo Kojima.",
    "termoBuscaCapa": "P.T._(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T13:06:00Z",
    "stars": 1885,
    "versaoPadrao": "v1.4.0",
    "tags": [
      "PS4",
      "Konami",
      "Kojima",
      "Horror",
      "Vulkan",
      "CUSA01127"
    ]
  },
  {
    "id": "driveclub-pc-port",
    "nome": "Driveclub (PC Native Vulkan / Port)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA00093",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "BlackLineInteractive/Driveclub-Port",
    "repoUrl": "https://github.com/BlackLineInteractive/Driveclub-Port",
    "descricao": "Port nativo em andamento de Driveclub para computadores com tradução de chamadas de GPU direta para Vulkan/Metal e execução x86-64 direta.",
    "termoBuscaCapa": "Driveclub",
    "capaManual": null,
    "dataAtualizacao": "2026-10-14T19:30:00Z",
    "stars": 450,
    "versaoPadrao": "v0.2.1-alpha",
    "tags": [
      "Driveclub",
      "PS4",
      "Corrida",
      "Vulkan",
      "Direct Port"
    ]
  },
  {
    "id": "bloodborne-recomp-native",
    "nome": "Bloodborne Recompiled (C++ Recomp)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA00207",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "bloodborne-native/bloodborne-recomp",
    "repoUrl": "https://github.com/bloodborne-native/bloodborne-recomp",
    "descricao": "Projeto de recompilação estática do binário de Bloodborne para C++ e código de máquina nativo x86-64 com suporte a 120 FPS e 4K.",
    "termoBuscaCapa": "Bloodborne",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T22:45:00Z",
    "stars": 1840,
    "versaoPadrao": "v0.1.0-alpha",
    "tags": [
      "Bloodborne",
      "PS4",
      "Recomp",
      "FromSoftware",
      "Soulslike"
    ]
  },
  {
    "id": "uncharted-nathan-drake-collection-pc",
    "nome": "Uncharted: The Nathan Drake Collection (PC Native)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA02320",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "Supermedo/uncharted_pc",
    "repoUrl": "https://github.com/Supermedo/uncharted_pc",
    "descricao": "Port nativo autônomo para Windows de Uncharted: The Nathan Drake Collection por SuperMedo. Executa os binários x86 nativamente com tradução Vulkan em 60/120 FPS.",
    "termoBuscaCapa": "Uncharted:_The_Nathan_Drake_Collection",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T14:34:42Z",
    "stars": 1171,
    "versaoPadrao": "v1.2-windows",
    "tags": [
      "PS4",
      "Uncharted",
      "Nathan Drake",
      "Naughty Dog",
      "Vulkan",
      "Windows Native"
    ]
  },
  {
    "id": "opengoal-jak-project",
    "nome": "Jak and Daxter: The Precursor Legacy & Jak II (OpenGOAL)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SCUS-97124",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "open-goal/jak-project",
    "repoUrl": "https://github.com/open-goal/jak-project",
    "descricao": "Recompilador e port nativo de GOAL para x86-64 rodando Jak 1 e Jak 2 da Naughty Dog a 144+ FPS com suporte total a teclado, mouse e mods.",
    "termoBuscaCapa": "Jak_and_Daxter:_The_Precursor_Legacy",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T07:43:00Z",
    "stars": 3580,
    "versaoPadrao": "v0.2.14",
    "tags": [
      "PS2",
      "Sony",
      "Naughty Dog",
      "OpenGOAL",
      "144 FPS",
      "Widescreen"
    ]
  },
  {
    "id": "ico-ps2-pc",
    "nome": "Ico PC Port (Recompiled)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SCES-50760",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "nathanialf/ico-pc",
    "repoUrl": "https://github.com/nathanialf/ico-pc",
    "descricao": "Port nativo de Ico (PS2) para PC com suporte a 60 FPS, câmera livre moderna, widescreen e resolução nativa em alta definição.",
    "termoBuscaCapa": "Ico_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T18:00:00Z",
    "stars": 340,
    "versaoPadrao": "v0.7.7",
    "tags": [
      "PS2",
      "Sony",
      "Team Ico",
      "Fumito Ueda",
      "Widescreen"
    ]
  },
  {
    "id": "god-of-war-ps2-recomp",
    "nome": "God of War PS2 (Tobiichi Recomp)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SCES-53133",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "YYOzcan/Tobiichi-Port",
    "repoUrl": "https://github.com/YYOzcan/Tobiichi-Port",
    "descricao": "Port nativo para PC do primeiro God of War (PS2) utilizando recompilação estática direta de instruções MIPS R5900 para código C++ nativo.",
    "termoBuscaCapa": "God_of_War_(2005_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:51:00Z",
    "stars": 32,
    "versaoPadrao": "v0.1.0",
    "tags": [
      "PS2",
      "Sony",
      "Santa Monica",
      "Kratos",
      "Hack and Slash"
    ]
  },
  {
    "id": "silent-hill-2-recomp-ps2",
    "nome": "Silent Hill 2 (sh2-nx PC)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SLUS-20228",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "cutarev/sh2-nx",
    "repoUrl": "https://github.com/cutarev/sh2-nx",
    "descricao": "Port nativo moderno de Silent Hill 2 para PC baseado na engenharia reversa do binário de PlayStation 2 com correções completas de áudio e renderização.",
    "termoBuscaCapa": "Silent_Hill_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T14:20:00Z",
    "stars": 45,
    "versaoPadrao": "v1.00",
    "tags": [
      "PS2",
      "Konami",
      "Silent Hill",
      "Horror",
      "Team Silent"
    ]
  },
  {
    "id": "castlevania-sotn-recomp",
    "nome": "Castlevania: Symphony of the Night (SymphonyRecomp)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00067",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "BlackLabelHQ/SymphonyRecomp",
    "repoUrl": "https://github.com/BlackLabelHQ/SymphonyRecomp",
    "descricao": "Recompilação estática nativa de Castlevania: SOTN para PC trazendo 60 FPS perfeito, suporte ultrawide e áudio de alta fidelidade sem delay.",
    "termoBuscaCapa": "Castlevania:_Symphony_of_the_Night",
    "capaManual": null,
    "dataAtualizacao": "2026-09-27T19:00:00Z",
    "stars": 895,
    "versaoPadrao": "v0.5.1b",
    "tags": [
      "PS1",
      "Konami",
      "Castlevania",
      "Alucard",
      "Metroidvania",
      "Recompilação"
    ]
  },
  {
    "id": "wipeout-rewrite-pc",
    "nome": "WipEout Rewrite (PS1 PC Port)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCES-00010",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "phoboslab/wipeout-rewrite",
    "repoUrl": "https://github.com/phoboslab/wipeout-rewrite",
    "descricao": "Reescrita e port nativo completo em C de WipEout (1995) com renderizador modernizado, suporte a 120+ FPS, widescreen e áudio CD original.",
    "termoBuscaCapa": "Wipeout_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T23:24:00Z",
    "stars": 2980,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Psygnosis",
      "Anti-Gravity Racing",
      "Pure C",
      "High FPS"
    ]
  },
  {
    "id": "devilutionx-diablo",
    "nome": "DevilutionX (Diablo 1 Native Port)",
    "console": "PS1",
    "consoleNome": "PlayStation 1 / PC",
    "codigoJogo": "SLUS-00619",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "diasurgical/devilutionX",
    "repoUrl": "https://github.com/diasurgical/devilutionX",
    "descricao": "Port nativo completo de Diablo e Hellfire para plataformas modernas com suporte a monitores ultrawide, multiplayer online estável e correções de bugs.",
    "termoBuscaCapa": "Diablo_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T13:03:00Z",
    "stars": 9880,
    "versaoPadrao": "v1.5.5",
    "tags": [
      "PS1",
      "Blizzard",
      "ARPG",
      "Multiplayer",
      "Ultrawide"
    ]
  },
  {
    "id": "openlara-tomb-raider",
    "nome": "OpenLara (Classic Tomb Raider 1/2/3)",
    "console": "PS1",
    "consoleNome": "PlayStation 1 / Saturn",
    "codigoJogo": "SLUS-00152",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "XProger/OpenLara",
    "repoUrl": "https://github.com/XProger/OpenLara",
    "descricao": "Engine nativa open-source e port de Tomb Raider 1, 2 e 3 com iluminação dinâmica avançada, câmera livre em terceira ou primeira pessoa e 144+ FPS.",
    "termoBuscaCapa": "Tomb_Raider_(1996_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:24:00Z",
    "stars": 5130,
    "versaoPadrao": "v1.0.0-git",
    "tags": [
      "PS1",
      "Core Design",
      "Lara Croft",
      "OpenGL",
      "144 FPS"
    ]
  },
  {
    "id": "resident-evil-3-recomp",
    "nome": "Resident Evil 3: Nemesis (RE-Visited)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00923",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "BrazilianHobbyist/Project-RE-Visited-RE3",
    "repoUrl": "https://github.com/BrazilianHobbyist/Project-RE-Visited-RE3",
    "descricao": "Port nativo de Resident Evil 3: Nemesis para PC com renderizador 3D melhorado, controles modernos e suporte nativo a monitores widescreen.",
    "termoBuscaCapa": "Resident_Evil_3:_Nemesis",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T12:00:00Z",
    "stars": 65,
    "versaoPadrao": "v1.4.3",
    "tags": [
      "PS1",
      "Capcom",
      "Survival Horror",
      "Nemesis",
      "Jill Valentine"
    ]
  },
  {
    "id": "crash-bandicoot-2-recomp",
    "nome": "Crash Bandicoot 2: Cortex Strikes Back",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCUS-94154",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Zumbo06/Crash2Recomp",
    "repoUrl": "https://github.com/Zumbo06/Crash2Recomp",
    "descricao": "Port nativo de Crash Bandicoot 2 via recompilação estática do binário de PS1 para código C nativo no Windows, com 60 FPS e widescreen.",
    "termoBuscaCapa": "Crash_Bandicoot_2:_Cortex_Strikes_Back",
    "capaManual": null,
    "dataAtualizacao": "2026-10-08T15:30:00Z",
    "stars": 90,
    "versaoPadrao": "v0.9.6",
    "tags": [
      "PS1",
      "Naughty Dog",
      "Crash Bandicoot",
      "Platformer",
      "60 FPS"
    ]
  },
  {
    "id": "ape-escape-recomp",
    "nome": "Ape Escape (PS1 Recomp)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCUS-94423",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/ApeEscapeRecomp",
    "repoUrl": "https://github.com/mstan/ApeEscapeRecomp",
    "descricao": "Port nativo para PC de Ape Escape com suporte completo a controles modernos de duplo analógico, taxas de FPS desbloqueadas e renderizador HD.",
    "termoBuscaCapa": "Ape_Escape_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-03T11:00:00Z",
    "stars": 92,
    "versaoPadrao": "v0.5.2",
    "tags": [
      "PS1",
      "Sony",
      "DualShock",
      "Ape Escape",
      "Platformer"
    ]
  },
  {
    "id": "vandal-hearts-pc",
    "nome": "Vandal Hearts (PS1 PC Port)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00447",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "HalmyLyseas/VandalHearts-PcPort",
    "repoUrl": "https://github.com/HalmyLyseas/VandalHearts-PcPort",
    "descricao": "Port nativo para PC do consagrado RPG tático Vandal Hearts (PS1) construído através de engenharia reversa com correspondência binária exata.",
    "termoBuscaCapa": "Vandal_Hearts",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T11:46:00Z",
    "stars": 52,
    "versaoPadrao": "rev b39ef12",
    "tags": [
      "PS1",
      "Konami",
      "Tactical RPG",
      "Decompilation",
      "Byte-Exact"
    ]
  },
  {
    "id": "gta-lcs-recomp",
    "nome": "Grand Theft Auto: Liberty City Stories (LCS Recomp)",
    "console": "PSP",
    "consoleNome": "PSP / PS2",
    "codigoJogo": "ULUS-10041",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "elmasas/lcs-recomp",
    "repoUrl": "https://github.com/elmasas/lcs-recomp",
    "descricao": "Recompilação estática de GTA: Liberty City Stories para PC com controles modernos de mouse e teclado, mira livre, 60+ FPS e texturas HD.",
    "termoBuscaCapa": "Grand_Theft_Auto:_Liberty_City_Stories",
    "capaManual": null,
    "dataAtualizacao": "2026-10-09T18:20:00Z",
    "stars": 230,
    "versaoPadrao": "v0.1.6",
    "tags": [
      "PSP",
      "PS2",
      "Rockstar Games",
      "GTA",
      "Open World",
      "60 FPS"
    ]
  },
  {
    "id": "forza-horizon-2-azimuth",
    "nome": "Forza Horizon 2 (Azimuth Loader)",
    "console": "XONE",
    "consoleNome": "Xbox One",
    "codigoJogo": "FH2-AZIMUTH",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "almost-there-games/azimuth",
    "repoUrl": "https://almost-there-games.itch.io/azimuth",
    "descricao": "Camada de compatibilidade e loader nativo para rodar a versão de Xbox One de Forza Horizon 2 diretamente no PC (Windows / Steam Deck) via DirectX 12 a 60 FPS.",
    "termoBuscaCapa": "Forza_Horizon_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T00:00:00Z",
    "stars": 920,
    "versaoPadrao": "v1.0.0.64",
    "tags": [
      "XONE",
      "Xbox One",
      "Azimuth",
      "DirectX 12",
      "Playground Games",
      "60 FPS"
    ]
  },
  {
    "id": "sonic-unleashed-recomp",
    "nome": "Sonic Unleashed (Unleashed Recompiled)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "SEGA-UNLEASHED",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "hedge-dev/UnleashedRecomp",
    "repoUrl": "https://github.com/hedge-dev/UnleashedRecomp",
    "descricao": "Recompilação estática fenomenal de Sonic Unleashed (Xbox 360) para PC via XenonRecomp: altas taxas de quadros, suporte ultrawide e mods.",
    "termoBuscaCapa": "Sonic_Unleashed",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T15:00:00Z",
    "stars": 5250,
    "versaoPadrao": "v1.0.3",
    "tags": [
      "Xbox 360",
      "Sega",
      "Sonic",
      "XenonRecomp",
      "Hedgehog Engine",
      "Ultrawide"
    ]
  },
  {
    "id": "skate-3-recomp",
    "nome": "Skate 3 (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "EA-SKATE3",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mchughalex/skate3recomp",
    "repoUrl": "https://github.com/mchughalex/skate3recomp",
    "descricao": "Port nativo de Skate 3 do Xbox 360 para PC com taxas de quadros desbloqueadas, compatibilidade total com controles e física original.",
    "termoBuscaCapa": "Skate_3",
    "capaManual": null,
    "dataAtualizacao": "2026-10-14T21:00:00Z",
    "stars": 1650,
    "versaoPadrao": "v2.0.2",
    "tags": [
      "Xbox 360",
      "EA",
      "Skate",
      "Physics",
      "XenonRecomp"
    ]
  },
  {
    "id": "gears-judgment-recomp",
    "nome": "Gears of War: Judgment (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "4D530A26",
    "status": "Jogável (Campanha)",
    "statusTipo": "jogavel",
    "repo": "OverkillLabs3/gears-judgement-recomp",
    "repoUrl": "https://github.com/OverkillLabs3/gears-judgement-recomp",
    "descricao": "Port nativo para Windows de Gears of War: Judgment reconstruído via ReXGlue SDK, com suporte a mira nativa de mouse, taxa de quadros desbloqueada e FSR.",
    "termoBuscaCapa": "Gears_of_War:_Judgment",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T11:30:00Z",
    "stars": 430,
    "versaoPadrao": "v1.0.2",
    "tags": [
      "Xbox 360",
      "Epic Games",
      "Shooter",
      "Mouse Nativo",
      "ReXGlue"
    ]
  },
  {
    "id": "forza-horizon-recomp",
    "nome": "Forza Horizon (PC Recomp / ShiftGlue)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "MS-FH1",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "arcanite24/pinyon-shift",
    "repoUrl": "https://github.com/arcanite24/pinyon-shift",
    "descricao": "Port nativo de Forza Horizon (Xbox 360) para PC via recompilação estática de instruções PowerPC para x86-64 com renderizador nativo Vulkan.",
    "termoBuscaCapa": "Forza_Horizon",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T11:00:00Z",
    "stars": 790,
    "versaoPadrao": "Preview Build",
    "tags": [
      "Xbox 360",
      "Turn 10",
      "Playground Games",
      "Racing",
      "Vulkan"
    ]
  },
  {
    "id": "dantes-inferno-recomp",
    "nome": "Dante's Inferno (Hells Gate Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "EA-DANTE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "florinp93/hells-gate-recomp",
    "repoUrl": "https://github.com/florinp93/hells-gate-recomp",
    "descricao": "Port nativo para PC de Dante’s Inferno via recompilação estática do Xbox 360 com 60 FPS estáveis, altas resoluções e suporte a teclado e controle.",
    "termoBuscaCapa": "Dante%27s_Inferno_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-12T19:00:00Z",
    "stars": 540,
    "versaoPadrao": "v0.8.3-beta",
    "tags": [
      "Xbox 360",
      "EA",
      "Visceral Games",
      "Hack and Slash",
      "Dante"
    ]
  },
  {
    "id": "fable-2-recomp",
    "nome": "Fable II (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "MS-FABLE2",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "himdo/Fable-2-Recomp",
    "repoUrl": "https://github.com/himdo/Fable-2-Recomp",
    "descricao": "O tão sonhado port nativo de Fable II para PC, que nunca foi lançado pela Microsoft, agora recompilado e rodando nativamente em 60 FPS no Windows.",
    "termoBuscaCapa": "Fable_II",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T16:00:00Z",
    "stars": 460,
    "versaoPadrao": "v1.5.0",
    "tags": [
      "Xbox 360",
      "Lionhead",
      "Peter Molyneux",
      "RPG",
      "Exclusivo PC"
    ]
  },
  {
    "id": "the-darkness-recomp",
    "nome": "The Darkness (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "2K-DARKNESS",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "portingpete/The-Darkness-Recomp",
    "repoUrl": "https://github.com/portingpete/The-Darkness-Recomp",
    "descricao": "Port nativo para PC de The Darkness (2007) da Starbreeze com renderizador Direct3D 11, mira nativa com mouse e framerate desbloqueado.",
    "termoBuscaCapa": "The_Darkness_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T17:00:00Z",
    "stars": 280,
    "versaoPadrao": "v1.1.0",
    "tags": [
      "Xbox 360",
      "2K",
      "Starbreeze",
      "FPS",
      "Jackie Estacado"
    ]
  },
  {
    "id": "crackdown-recomp",
    "nome": "Crackdown 1 (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "MS-CRACKDOWN",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Unowa001/crackdown-recomp",
    "repoUrl": "https://github.com/Unowa001/crackdown-recomp",
    "descricao": "Port nativo de Crackdown (2007) do Xbox 360 para PC com taxas de quadros desbloqueadas, suporte a monitores ultrawide e instalador de assets integrado.",
    "termoBuscaCapa": "Crackdown_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-14T18:00:00Z",
    "stars": 210,
    "versaoPadrao": "v1.0.4",
    "tags": [
      "Xbox 360",
      "Microsoft",
      "Realtime Worlds",
      "Open World"
    ]
  },
  {
    "id": "blue-dragon-recomp",
    "nome": "Blue Dragon (ReBlue PC)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "MS-BLUEDRAGON",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "zolaware/reblue",
    "repoUrl": "https://github.com/zolaware/reblue",
    "descricao": "Recompilação estática do JRPG Blue Dragon de Hironobu Sakaguchi e Akira Toriyama para Windows com framerate em 60 FPS e texturas aprimoradas.",
    "termoBuscaCapa": "Blue_Dragon_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-05T12:00:00Z",
    "stars": 800,
    "versaoPadrao": "v1.3.1",
    "tags": [
      "Xbox 360",
      "Mistwalker",
      "Akira Toriyama",
      "JRPG",
      "Nobuo Uematsu"
    ]
  },
  {
    "id": "burnout-revenge-recomp",
    "nome": "Burnout Revenge (Xerenge Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "EA-BOREVENGE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "shipa-2/Xerenge",
    "repoUrl": "https://github.com/shipa-2/Xerenge",
    "descricao": "Port nativo para PC de Burnout Revenge do Xbox 360 com 60/120 FPS, suporte a resolução 4K e renderizador Vulkan.",
    "termoBuscaCapa": "Burnout_Revenge",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T14:00:00Z",
    "stars": 70,
    "versaoPadrao": "v0.4.6",
    "tags": [
      "Xbox 360",
      "EA",
      "Criterion",
      "Burnout",
      "Racing"
    ]
  },
  {
    "id": "lost-odyssey-recomp",
    "nome": "Lost Odyssey (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-LOSTOD",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "freefrank/LostOdysseyRecomp",
    "repoUrl": "https://github.com/freefrank/LostOdysseyRecomp",
    "descricao": "Port nativo experimental do renomado JRPG Lost Odyssey de Hironobu Sakaguchi para PC via recompilação estática PowerPC para C++.",
    "termoBuscaCapa": "Lost_Odyssey",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:15:00Z",
    "stars": 655,
    "versaoPadrao": "v0.9.65",
    "tags": [
      "Xbox 360",
      "Mistwalker",
      "JRPG",
      "Sakaguchi",
      "Nobuo Uematsu"
    ]
  },
  {
    "id": "silent-hill-downpour-recomp",
    "nome": "Silent Hill: Downpour (Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SHDP",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "LittleBitUA/DownpourRecomp",
    "repoUrl": "https://github.com/LittleBitUA/DownpourRecomp",
    "descricao": "Port nativo para Windows de Silent Hill: Downpour através da recompilação estática do binário de Xbox 360, permitindo 60 FPS desbloqueados.",
    "termoBuscaCapa": "Silent_Hill:_Downpour",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T08:20:00Z",
    "stars": 305,
    "versaoPadrao": "v1.1.8",
    "tags": [
      "Xbox 360",
      "Konami",
      "Silent Hill",
      "Horror",
      "60 FPS"
    ]
  },
  {
    "id": "tony-hawks-project-8-recomp",
    "nome": "Tony Hawk's Project 8 (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-THP8",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "theokyr/Project8Recomp",
    "repoUrl": "https://github.com/theokyr/Project8Recomp",
    "descricao": "Port nativo para PC de Tony Hawk’s Project 8 reconstruído via recompilação estática do binário de Xbox 360 com suporte a altas resoluções.",
    "termoBuscaCapa": "Tony_Hawk%27s_Project_8",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T05:49:00Z",
    "stars": 42,
    "versaoPadrao": "v0.2.1",
    "tags": [
      "Xbox 360",
      "Neversoft",
      "Activision",
      "Skate",
      "Recompilação"
    ]
  },
  {
    "id": "ninja-gaiden-black-recomp",
    "nome": "Ninja Gaiden Black (Xbox Recomp)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "MS-NGB",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "gamboozino/ngbrecomp",
    "repoUrl": "https://github.com/gamboozino/ngbrecomp",
    "descricao": "Port nativo para PC de Ninja Gaiden Black do primeiro Xbox através de recompilação estática com renderizador moderno em Vulkan.",
    "termoBuscaCapa": "Ninja_Gaiden_Black",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:41:00Z",
    "stars": 42,
    "versaoPadrao": "v0.1.0-alpha",
    "tags": [
      "Xbox",
      "Team Ninja",
      "Koei Tecmo",
      "Vulkan",
      "Static Recomp"
    ]
  },
  {
    "id": "burnout-3-takedawn",
    "nome": "Burnout 3: Takedown (TakeDawn)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "EA-B3TD",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "xenophobentx/takedawn",
    "repoUrl": "https://github.com/xenophobentx/takedawn",
    "descricao": "Port nativo de Burnout 3: Takedown via recompilação estática rodando diretamente em Windows e Steam Deck com suporte a trilha sonora personalizada.",
    "termoBuscaCapa": "Burnout_3:_Takedown",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:26:00Z",
    "stars": 70,
    "versaoPadrao": "Preview v0.3",
    "tags": [
      "Xbox",
      "PS2",
      "EA",
      "Criterion",
      "Racing",
      "Recompilação"
    ]
  },
  {
    "id": "black-fps-pc",
    "nome": "BLACK PC Native Port",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "EA-BLACK",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "Spark198rus/black-pc",
    "repoUrl": "https://github.com/Spark198rus/black-pc",
    "descricao": "Port nativo do cultuado shooter tático BLACK da Criterion Games, rodando código original diretamente no PC com suporte a mouse e teclado.",
    "termoBuscaCapa": "Black_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:51:00Z",
    "stars": 190,
    "versaoPadrao": "rev 4a8e10c",
    "tags": [
      "Xbox",
      "PS2",
      "Criterion",
      "FPS",
      "Mouse & Keyboard"
    ]
  },
  {
    "id": "jet-set-radio-future-recomp",
    "nome": "Jet Set Radio Future (JSRF Unleashed)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "SEGA-JSRF",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "JuMatt/JetSetRadioFuture-Unleashed",
    "repoUrl": "https://github.com/JuMatt/JetSetRadioFuture-Unleashed",
    "descricao": "Port nativo para PC de Jet Set Radio Future do Xbox com 60 FPS, suporte a teclado e mouse e áudio de alta resolução.",
    "termoBuscaCapa": "Jet_Set_Radio_Future",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T19:00:00Z",
    "stars": 95,
    "versaoPadrao": "v0.4.7",
    "tags": [
      "Xbox",
      "Sega",
      "Smilebit",
      "Cel-Shading",
      "Skate"
    ]
  },
  {
    "id": "def-jam-ffny-recomp",
    "nome": "Def Jam: Fight for NY (PC Recomp)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "EA-DEFJAM",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "vyanhursky/DefJamFFNY-recomp",
    "repoUrl": "https://github.com/vyanhursky/DefJamFFNY-recomp",
    "descricao": "Port nativo para PC de Def Jam: Fight for NY com 60 FPS estáveis, widescreen e compatibilidade nativa com controles modernos.",
    "termoBuscaCapa": "Def_Jam:_Fight_for_NY",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T17:30:00Z",
    "stars": 60,
    "versaoPadrao": "v0.9.1",
    "tags": [
      "Xbox",
      "PS2",
      "EA",
      "AKI Corporation",
      "Fighting",
      "Hip-Hop"
    ]
  },
  {
    "id": "midnight-club-la-recomp",
    "nome": "Midnight Club: Los Angeles (PC Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "RS-MCLA",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "holdmysocks/mcla-recomp",
    "repoUrl": "https://github.com/holdmysocks/mcla-recomp",
    "descricao": "Port nativo para PC de Midnight Club: LA (Xbox 360) com taxas de quadros desbloqueadas, suporte a monitores ultrawide e carregamento ultrarrápido.",
    "termoBuscaCapa": "Midnight_Club:_Los_Angeles",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T21:00:00Z",
    "stars": 70,
    "versaoPadrao": "v1.0.4",
    "tags": [
      "Xbox 360",
      "Rockstar Games",
      "Racing",
      "Los Angeles",
      "Open World"
    ]
  },
  {
    "id": "zelda-twilight-princess-dusklight",
    "nome": "The Legend of Zelda: Twilight Princess (Dusklight)",
    "console": "Nintendo",
    "consoleNome": "GameCube / Wii",
    "codigoJogo": "DOL-GZ2E",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TwilitRealm/dusklight",
    "repoUrl": "https://github.com/TwilitRealm/dusklight",
    "descricao": "Port nativo monumental para PC de The Legend of Zelda: Twilight Princess com suporte a 60 FPS, renderizador Vulkan moderno e suporte a texturas HD.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_Twilight_Princess",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T22:00:00Z",
    "stars": 5920,
    "versaoPadrao": "v2.0.3",
    "tags": [
      "GameCube",
      "Nintendo",
      "Zelda",
      "Twilight Princess",
      "Vulkan",
      "60 FPS"
    ]
  },
  {
    "id": "zelda-wind-waker-hd-pc",
    "nome": "The Legend of Zelda: The Wind Waker HD (Recomp)",
    "console": "Nintendo",
    "consoleNome": "Wii U / GameCube",
    "codigoJogo": "WUP-P-BCZE",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "ZeldaWWHDRecomp/ZeldaWWHDRecomp",
    "repoUrl": "https://github.com/ZeldaWWHDRecomp/ZeldaWWHDRecomp",
    "descricao": "Recompilação estática nativa de The Wind Waker HD para PC (Windows e Linux) com suporte a 4K, 60+ FPS nativo e renderizador Vulkan.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_The_Wind_Waker_HD",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T12:00:00Z",
    "stars": 960,
    "versaoPadrao": "v0.9.1-alpha",
    "tags": [
      "Nintendo",
      "Zelda",
      "Wind Waker",
      "Wii U",
      "Vulkan",
      "60 FPS"
    ]
  },
  {
    "id": "zelda-64-recompiled",
    "nome": "The Legend of Zelda: Majora's Mask (Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NZSE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Zelda64Recomp/Zelda64Recomp",
    "repoUrl": "https://github.com/Zelda64Recomp/Zelda64Recomp",
    "descricao": "Recompilação estática nativa para PC de Majora’s Mask com RT64 (Ray Tracing), suporte a monitores ultrawide, altas taxas de FPS e mods.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_Majora%27s_Mask",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T23:53:00Z",
    "stars": 7450,
    "versaoPadrao": "v1.2.2",
    "tags": [
      "N64",
      "Nintendo",
      "Zelda",
      "Recompilação",
      "Ray Tracing",
      "60+ FPS"
    ]
  },
  {
    "id": "ship-of-harkinian",
    "nome": "The Legend of Zelda: Ocarina of Time (Ship of Harkinian)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-CZLE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HarbourMasters/Shipwright",
    "repoUrl": "https://github.com/HarbourMasters/Shipwright",
    "descricao": "Port nativo em C de Ocarina of Time para PC com 60+ FPS, suporte ultrawide, câmera livre em terceira pessoa, giroscópio e texturas HD.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_Ocarina_of_Time",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T10:14:00Z",
    "stars": 5650,
    "versaoPadrao": "v9.3.0",
    "tags": [
      "N64",
      "Nintendo",
      "Zelda",
      "Shipwright",
      "Widescreen",
      "HD Textures"
    ]
  },
  {
    "id": "2-ship-2-harkinian",
    "nome": "The Legend of Zelda: Majora's Mask (2 Ship 2 Harkinian)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NZSE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HarbourMasters/2Ship2Harkinian",
    "repoUrl": "https://github.com/HarbourMasters/2Ship2Harkinian",
    "descricao": "Port nativo completo de Majora’s Mask da equipe Harbour Masters com renderizador moderno, melhorias de qualidade de vida e suporte nativo a controles.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_Majora%27s_Mask",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T06:36:00Z",
    "stars": 2335,
    "versaoPadrao": "v2.0.1",
    "tags": [
      "N64",
      "Nintendo",
      "Zelda",
      "Majora",
      "Ship of Harkinian"
    ]
  },
  {
    "id": "banjo-recomp-n64",
    "nome": "Banjo-Kazooie (BanjoRecomp PC)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NBKE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "BanjoRecomp/BanjoRecomp",
    "repoUrl": "https://github.com/BanjoRecomp/BanjoRecomp",
    "descricao": "Recompilação estática de Banjo-Kazooie para Windows, Linux e macOS com widescreen, suporte a taxas de 144+ FPS e gerenciador de mods Thunderstore.",
    "termoBuscaCapa": "Banjo-Kazooie",
    "capaManual": null,
    "dataAtualizacao": "2026-09-25T14:00:00Z",
    "stars": 2010,
    "versaoPadrao": "v1.0.2",
    "tags": [
      "N64",
      "Rare",
      "Banjo",
      "Platformer",
      "Thunderstore"
    ]
  },
  {
    "id": "mario-kart-64-spaghettikart",
    "nome": "Mario Kart 64 (SpaghettiKart PC)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NKTE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HarbourMasters/SpaghettiKart",
    "repoUrl": "https://github.com/HarbourMasters/SpaghettiKart",
    "descricao": "Port nativo de Mario Kart 64 da equipe Harbour Masters: renderizador HD, pistas customizadas, suporte a multiplayer ampliado e suporte a volantes e controles.",
    "termoBuscaCapa": "Mario_Kart_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T18:00:00Z",
    "stars": 2450,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Nintendo",
      "Mario Kart",
      "Harbour Masters",
      "Kart Racing"
    ]
  },
  {
    "id": "star-fox-64-starship",
    "nome": "Star Fox 64 (Starship PC Port)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NFXE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HarbourMasters/Starship",
    "repoUrl": "https://github.com/HarbourMasters/Starship",
    "descricao": "Port nativo de Star Fox 64 para PC com 60 FPS nativo, mira de mouse, áudio surround e texturas de alta definição.",
    "termoBuscaCapa": "Star_Fox_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T11:00:00Z",
    "stars": 2120,
    "versaoPadrao": "v2.0.0",
    "tags": [
      "N64",
      "Nintendo",
      "Fox McCloud",
      "Arwing",
      "60 FPS"
    ]
  },
  {
    "id": "super-mario-64-pc",
    "nome": "Super Mario 64 (sm64ex)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NSME",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "sm64pc/sm64ex",
    "repoUrl": "https://github.com/sm64pc/sm64ex",
    "descricao": "Port nativo de Super Mario 64 em C com renderizador DirectX/OpenGL, câmera analógica livre, suporte a 60/120 FPS e compatível com pacotes Render96.",
    "termoBuscaCapa": "Super_Mario_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T09:35:00Z",
    "stars": 1870,
    "versaoPadrao": "v1.0.0-nightly",
    "tags": [
      "N64",
      "Nintendo",
      "Mario",
      "sm64ex",
      "60 FPS",
      "Render96"
    ]
  },
  {
    "id": "sm64-coop-dx",
    "nome": "Super Mario 64 Co-op Deluxe (sm64coopdx)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NSME",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "coop-deluxe/sm64coopdx",
    "repoUrl": "https://github.com/coop-deluxe/sm64coopdx",
    "descricao": "Port de Super Mario 64 com modo cooperativo online integrado para até 16 jogadores simultâneos, suporte a scripts Lua e DynOS.",
    "termoBuscaCapa": "Super_Mario_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 1420,
    "versaoPadrao": "v1.5.1",
    "tags": [
      "N64",
      "Mario",
      "Online Co-op",
      "Multiplayer",
      "Lua"
    ]
  },
  {
    "id": "perfect-dark-pc",
    "nome": "Perfect Dark PC Port",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NPDE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "fgsfdsfgs/perfect_dark",
    "repoUrl": "https://github.com/fgsfdsfgs/perfect_dark",
    "descricao": "Port nativo para PC de Perfect Dark da Rare com suporte a mouse e teclado nativos, 60+ FPS, FOV customizável e multiplayer split-screen.",
    "termoBuscaCapa": "Perfect_Dark_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T19:13:00Z",
    "stars": 2060,
    "versaoPadrao": "v1.1.0",
    "tags": [
      "N64",
      "Rare",
      "FPS",
      "Mouse Aim",
      "Splitscreen",
      "60 FPS"
    ]
  },
  {
    "id": "conker-recompiled",
    "nome": "Conker's Bad Fur Day (Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NFUE",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "Conker64Recomp/conker64-recompiled",
    "repoUrl": "https://github.com/Conker64Recomp/conker64-recompiled",
    "descricao": "Port nativo de Conker’s Bad Fur Day para PC via recompilação estática com suporte a widescreen panorâmico e taxas de quadros modernas.",
    "termoBuscaCapa": "Conker%27s_Bad_Fur_Day",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T06:31:00Z",
    "stars": 35,
    "versaoPadrao": "v0.2.0",
    "tags": [
      "N64",
      "Rare",
      "Conker",
      "Recompilação",
      "Widescreen"
    ]
  },
  {
    "id": "donkey-kong-64-recomp",
    "nome": "Donkey Kong 64 (DK64 Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NDOE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Rainchus/Donkey-Kong-64-Recompiled",
    "repoUrl": "https://github.com/Rainchus/Donkey-Kong-64-Recompiled",
    "descricao": "Recompilação estática de Donkey Kong 64 para PC com remoção de travamentos do Expansion Pak original, widescreen e 60 FPS.",
    "termoBuscaCapa": "Donkey_Kong_64",
    "capaManual": null,
    "dataAtualizacao": "2026-09-30T17:00:00Z",
    "stars": 515,
    "versaoPadrao": "v1.0.3",
    "tags": [
      "N64",
      "Rare",
      "Donkey Kong",
      "Expansion Pak",
      "60 FPS"
    ]
  },
  {
    "id": "diddy-kong-racing-recomp",
    "nome": "Diddy Kong Racing (DKR-R Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NDKE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "ThatGuyMcd/DKR-R",
    "repoUrl": "https://github.com/ThatGuyMcd/DKR-R",
    "descricao": "Port nativo de Diddy Kong Racing com suporte a altas taxas de atualização, texturas de alta definição e controles modernos.",
    "termoBuscaCapa": "Diddy_Kong_Racing",
    "capaManual": null,
    "dataAtualizacao": "2026-10-14T19:00:00Z",
    "stars": 220,
    "versaoPadrao": "v1.0.6",
    "tags": [
      "N64",
      "Rare",
      "Diddy Kong",
      "Racing",
      "Hovercraft"
    ]
  },
  {
    "id": "super-mario-sunshine-pc",
    "nome": "Super Mario Sunshine PC Port",
    "console": "Nintendo",
    "consoleNome": "Nintendo GameCube",
    "codigoJogo": "DOL-GMSE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TekRantGaming/sms-pc-port",
    "repoUrl": "https://github.com/TekRantGaming/sms-pc-port",
    "descricao": "Port nativo de Super Mario Sunshine com suporte a 60 FPS, widescreen panorâmico, launcher customizado e melhorias de textura.",
    "termoBuscaCapa": "Super_Mario_Sunshine",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T05:57:00Z",
    "stars": 200,
    "versaoPadrao": "v1.4.1",
    "tags": [
      "GameCube",
      "Nintendo",
      "Mario",
      "60 FPS",
      "Widescreen"
    ]
  },
  {
    "id": "zelda-alttp-zelda3",
    "nome": "The Legend of Zelda: A Link to the Past (zelda3)",
    "console": "Nintendo",
    "consoleNome": "Super Nintendo (SNES)",
    "codigoJogo": "SHVC-ZL",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "snesrev/zelda3",
    "repoUrl": "https://github.com/snesrev/zelda3",
    "descricao": "Reimplementação nativa em C de A Link to the Past com suporte a monitores widescreen de até 21:9, shaders de pixel e áudio MSU-1 orquestrado.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_A_Link_to_the_Past",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T12:00:00Z",
    "stars": 4950,
    "versaoPadrao": "v0.3.0",
    "tags": [
      "SNES",
      "Nintendo",
      "Zelda",
      "Link",
      "Widescreen 16:9",
      "MSU-1"
    ]
  },
  {
    "id": "goldeneye-007-metal",
    "nome": "GoldenEye 007 (goldeneye-metal PC)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NGEE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "ysrdevs/goldeneye-metal",
    "repoUrl": "https://github.com/ysrdevs/goldeneye-metal",
    "descricao": "Port nativo de GoldenEye 007 com suporte nativo a mouse e teclado (mira fluida de PC), 60 FPS e suporte a telas modernas.",
    "termoBuscaCapa": "GoldenEye_007_(1997_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-09T16:00:00Z",
    "stars": 88,
    "versaoPadrao": "v0.5.1",
    "tags": [
      "N64",
      "Rare",
      "James Bond",
      "FPS",
      "Mouse Aim"
    ]
  },
  {
    "id": "sonic-mania-decomp",
    "nome": "Sonic Mania (Native PC Decompilation)",
    "console": "Outros",
    "consoleNome": "Retro Engine (RSDKv5)",
    "codigoJogo": "RSDKv5",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "RSDKModding/Sonic-Mania-Decompilation",
    "repoUrl": "https://github.com/RSDKModding/Sonic-Mania-Decompilation",
    "descricao": "Descompilação completa de Sonic Mania para PC com desempenho nativo ultra suave a 144+ FPS, suporte completo a mods e sem DRM.",
    "termoBuscaCapa": "Sonic_Mania",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T10:00:00Z",
    "stars": 820,
    "versaoPadrao": "v1.1.1",
    "tags": [
      "Sega",
      "Sonic",
      "Christian Whitehead",
      "Retro Engine",
      "144 FPS"
    ]
  },
  {
    "id": "sonic-1-2-decompilation",
    "nome": "Sonic the Hedgehog 1 & 2 (2013 Decomp)",
    "console": "Outros",
    "consoleNome": "Retro Engine (RSDKv4)",
    "codigoJogo": "RSDKv4",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Rubberduckycooly/Sonic-1-2-2013-Decompilation",
    "repoUrl": "https://github.com/Rubberduckycooly/Sonic-1-2-2013-Decompilation",
    "descricao": "Descompilação completa dos remakes de Sonic 1 e Sonic 2 da Retro Engine rodando nativamente no PC em 60/120 FPS com mods e widescreen.",
    "termoBuscaCapa": "Sonic_the_Hedgehog_(1991_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T06:02:00Z",
    "stars": 1150,
    "versaoPadrao": "v1.3.1",
    "tags": [
      "Sega",
      "Sonic",
      "Christian Whitehead",
      "Retro Engine",
      "120 FPS"
    ]
  },
  {
    "id": "sonic-cd-decompilation",
    "nome": "Sonic the Hedgehog CD (2011 Decomp)",
    "console": "Outros",
    "consoleNome": "Retro Engine (RSDKv3)",
    "codigoJogo": "RSDKv3",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Rubberduckycooly/Sonic-CD-11-Decompilation",
    "repoUrl": "https://github.com/Rubberduckycooly/Sonic-CD-11-Decompilation",
    "descricao": "Descompilação completa da versão remasterizada de 2011 de Sonic CD para PC com Tails jogável, trilhas sonora americana e japonesa e física impecável.",
    "termoBuscaCapa": "Sonic_the_Hedgehog_CD",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T06:02:00Z",
    "stars": 715,
    "versaoPadrao": "v1.3.0",
    "tags": [
      "Sega",
      "Sonic",
      "Sonic CD",
      "Retro Engine",
      "Soundtrack US/JP"
    ]
  },
  {
    "id": "cps2-recomp-arcade",
    "nome": "CPS-2 Recomp (Street Fighter Alpha 2)",
    "console": "Outros",
    "consoleNome": "Capcom CPS-2 Arcade",
    "codigoJogo": "CPS2-SFA2",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "tmcleroy/cps2recomp",
    "repoUrl": "https://github.com/tmcleroy/cps2recomp",
    "descricao": "Ports nativos via recompilação estática de clássicos de luta e arcade da placa Capcom CPS-2 com baixa latência de entrada e renderizador moderno.",
    "termoBuscaCapa": "Street_Fighter_Alpha_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-17T11:09:00Z",
    "stars": 15,
    "versaoPadrao": "v0.1.0",
    "tags": [
      "Arcade",
      "Capcom",
      "Street Fighter",
      "CPS-2",
      "Fighting"
    ]
  },
  {
    "id": "sal063-ac6-recomp",
    "nome": "Ace Combat 6: Fires of Liberation",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-AC6",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "sal063/AC6_recomp",
    "repoUrl": "https://github.com/sal063/AC6_recomp",
    "descricao": "Recompilação estática de Ace Combat 6 via XenonRecomp para PC. Permite voar em 60/120 FPS sem lag de emulação pesada.",
    "termoBuscaCapa": "Ace_Combat_6:_Fires_of_Liberation",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Flight Sim",
      "Bandai Namco",
      "XenonRecomp",
      "60FPS"
    ]
  },
  {
    "id": "frankhun88453-cod3recomp",
    "nome": "Call of Duty 3",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-COD3",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "FrankHUN88453/CoD3Recomp",
    "repoUrl": "https://github.com/FrankHUN88453/CoD3Recomp",
    "descricao": "Port nativo por recompilação de Call of Duty 3, o clássico da Segunda Guerra da Treyarch nunca antes lançado para PC.",
    "termoBuscaCapa": "Call_of_Duty_3",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Treyarch",
      "FPS",
      "Segunda Guerra",
      "XenonRecomp"
    ]
  },
  {
    "id": "paulcombal-mw2-recompiled",
    "nome": "Call of Duty: Modern Warfare 2 (Xbox 360 Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-MW2",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "PaulCombal/mw2-recompiled",
    "repoUrl": "https://github.com/PaulCombal/mw2-recompiled",
    "descricao": "Recompilação estática do binário do Xbox 360 de MW2 para Windows com suporte a resoluções widescreen e framerate desbloqueado.",
    "termoBuscaCapa": "Call_of_Duty:_Modern_Warfare_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Infinity Ward",
      "FPS",
      "XenonRecomp"
    ]
  },
  {
    "id": "faligame-lost-odyssey-hd-remaster",
    "nome": "Lost Odyssey HD Remaster (PC)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-LO-HD",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "faligame/lost-odyssey-hd-remaster",
    "repoUrl": "https://github.com/faligame/lost-odyssey-hd-remaster",
    "descricao": "Edição aprimorada de Lost Odyssey portada via recompilação com suporte a texturas HD, 60 FPS e correções de áudio.",
    "termoBuscaCapa": "Lost_Odyssey",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "JRPG",
      "HD Textures",
      "60 FPS",
      "XenonRecomp"
    ]
  },
  {
    "id": "wivi514-dead-rising-2-case-zero-xenon-recomp",
    "nome": "Dead Rising 2: Case Zero",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DR2CZ",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "wivi514/Dead_Rising_2_Case_Zero_Xenon_Recomp",
    "repoUrl": "https://github.com/wivi514/Dead_Rising_2_Case_Zero_Xenon_Recomp",
    "descricao": "Port nativo do prólogo exclusivo de Xbox 360 Dead Rising 2: Case Zero rodando nativamente no Windows.",
    "termoBuscaCapa": "Dead_Rising_2:_Case_Zero",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Capcom",
      "Zombies",
      "XenonRecomp"
    ]
  },
  {
    "id": "wivi514-dead-rising-2-case-west-xenon-recomp",
    "nome": "Dead Rising 2: Case West",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DR2CW",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "wivi514/Dead_Rising_2_Case_West_Xenon_Recomp",
    "repoUrl": "https://github.com/wivi514/Dead_Rising_2_Case_West_Xenon_Recomp",
    "descricao": "Port nativo para PC do epílogo exclusivo de Xbox 360 onde Frank West e Chuck Greene se unem.",
    "termoBuscaCapa": "Dead_Rising_2:_Case_West",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Capcom",
      "Zombies",
      "Co-op",
      "XenonRecomp"
    ]
  },
  {
    "id": "littlebitua-dprecomp",
    "nome": "Deadly Premonition (Xbox 360 Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DP",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "LittleBitUA/DPRecomp",
    "repoUrl": "https://github.com/LittleBitUA/DPRecomp",
    "descricao": "Port nativo da versão original de Xbox 360 de Deadly Premonition, superando a versão instável original de PC.",
    "termoBuscaCapa": "Deadly_Premonition",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Swery65",
      "Survival Horror",
      "Cult Classic",
      "XenonRecomp"
    ]
  },
  {
    "id": "birabittoh-nocturnerecomp",
    "nome": "Castlevania: Symphony of the Night (XBLA Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SOTN",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "birabittoh/NocturneRecomp",
    "repoUrl": "https://github.com/birabittoh/NocturneRecomp",
    "descricao": "Recompilação estática da versão Xbox Live Arcade de Symphony of the Night com filtros de imagem limpos e alta taxa de resposta.",
    "termoBuscaCapa": "Castlevania:_Symphony_of_the_Night",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Konami",
      "Metroidvania",
      "Alucard",
      "XenonRecomp"
    ]
  },
  {
    "id": "madelrandel-blip-nfsmw-recompiled",
    "nome": "Need for Speed: Most Wanted (Xbox 360 Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-NFSMW",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "madelrandel-blip/NFSMW-Recompiled",
    "repoUrl": "https://github.com/madelrandel-blip/NFSMW-Recompiled",
    "descricao": "A cobiçada versão de Xbox 360 de NFS Most Wanted (2005) com shaders de ponta portada nativamente para PC.",
    "termoBuscaCapa": "Need_for_Speed:_Most_Wanted_(2005_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "EA Black Box",
      "Racing",
      "XenonRecomp",
      "Visual Effects"
    ]
  },
  {
    "id": "sampreeth004-nfs-carbon-recomp",
    "nome": "Need for Speed: Carbon (Xbox 360 Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-NFSC",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Sampreeth004/nfs-carbon-recomp",
    "repoUrl": "https://github.com/Sampreeth004/nfs-carbon-recomp",
    "descricao": "Port nativo por recompilação do clássico NFS Carbon de Xbox 360 com motion blur original e suporte a controles modernos.",
    "termoBuscaCapa": "Need_for_Speed:_Carbon",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "EA Black Box",
      "Racing",
      "Canyon",
      "XenonRecomp"
    ]
  },
  {
    "id": "beatrixzy-pgr4-recomp",
    "nome": "Project Gotham Racing 4",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-PGR4",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "beatrixzy/PGR4-Recomp",
    "repoUrl": "https://github.com/beatrixzy/PGR4-Recomp",
    "descricao": "O auge dos simuladores arcade da Bizarre Creations rodando nativamente no PC com clima dinâmico e suporte a volantes.",
    "termoBuscaCapa": "Project_Gotham_Racing_4",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Bizarre Creations",
      "Simcade",
      "Weather",
      "XenonRecomp"
    ]
  },
  {
    "id": "sirhalo23-ridgeracer6-recompilation",
    "nome": "Ridge Racer 6",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-RR6",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Sirhalo23/RidgeRacer6-Recompilation",
    "repoUrl": "https://github.com/Sirhalo23/RidgeRacer6-Recompilation",
    "descricao": "Port nativo de Ridge Racer 6 via recompilação estática de Xbox 360 com drift a 60 FPS e trilha sonora impecável.",
    "termoBuscaCapa": "Ridge_Racer_6",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Bandai Namco",
      "Arcade Drift",
      "XenonRecomp"
    ]
  },
  {
    "id": "genrythefox0-project-2099",
    "nome": "Spider-Man: Edge of Time (Project 2099)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SM-EOT",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "GenryTheFox0/Project-2099",
    "repoUrl": "https://github.com/GenryTheFox0/Project-2099",
    "descricao": "Port nativo de Spider-Man: Edge of Time (Beenox) com Amazing Spider-Man e Spider-Man 2099 em 60 FPS e suporte 4K.",
    "termoBuscaCapa": "Spider-Man:_Edge_of_Time",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Beenox",
      "Spider-Man",
      "Marvel",
      "XenonRecomp"
    ]
  },
  {
    "id": "yestermester-thesimpsonsgamerecomp",
    "nome": "The Simpsons Game",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SIMPSONS",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "YesterMester/TheSimpsonsGameRecomp",
    "repoUrl": "https://github.com/YesterMester/TheSimpsonsGameRecomp",
    "descricao": "Recompilação estática do jogo de 2007 dos Simpsons de Xbox 360 para PC com sátiras à indústria de games e coop.",
    "termoBuscaCapa": "The_Simpsons_Game",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "EA Games",
      "The Simpsons",
      "Action-Adventure"
    ]
  },
  {
    "id": "solarcookies-tip-recomp",
    "nome": "Viva Piñata: Trouble In Paradise",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-VP-TIP",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "SolarCookies/TiP-Recomp",
    "repoUrl": "https://github.com/SolarCookies/TiP-Recomp",
    "descricao": "Recompilação estática para PC do aclamado simulador da Rare com cores vibrantes e controles fluidos.",
    "termoBuscaCapa": "Viva_Piñata:_Trouble_in_Paradise",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Rare",
      "Simulation",
      "Sandbox",
      "XenonRecomp"
    ]
  },
  {
    "id": "supermedo-wet-recomp",
    "nome": "WET (Xenon Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-WET",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Supermedo/wet-recomp",
    "repoUrl": "https://github.com/Supermedo/wet-recomp",
    "descricao": "Port nativo de WET com Rubi Malone, tiroteios acrobáticos estilo Tarantino em 60+ FPS no Windows.",
    "termoBuscaCapa": "Wet_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Bethesda",
      "Action",
      "Acrobatic Shooter",
      "XenonRecomp"
    ]
  },
  {
    "id": "hollywoodakeem-svr07-recomp",
    "nome": "WWE SmackDown vs. Raw 2007",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SVR07",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HollywoodAkeem/SVR07-Recomp",
    "repoUrl": "https://github.com/HollywoodAkeem/SVR07-Recomp",
    "descricao": "O venerado clássico de luta livre da THQ/Yuke portado nativamente para PC com controles responsivos e alta fidelidade.",
    "termoBuscaCapa": "WWE_SmackDown_vs._Raw_2007",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "THQ",
      "Wrestling",
      "WWE",
      "XenonRecomp"
    ]
  },
  {
    "id": "kaikoclanworth1-wwe-svr2011-pc",
    "nome": "WWE SmackDown vs. Raw 2011",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SVR11",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "KaikoClanworth1/wwe-svr2011-pc",
    "repoUrl": "https://github.com/KaikoClanworth1/wwe-svr2011-pc",
    "descricao": "Port nativo para PC de SVR 2011 com modo WWE Universe, física de mesas e cadeiras aprimorada.",
    "termoBuscaCapa": "WWE_SmackDown_vs._Raw_2011",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "THQ",
      "WWE",
      "XenonRecomp"
    ]
  },
  {
    "id": "novapowers0-dbz-budokai-3-hd-collection",
    "nome": "Dragon Ball Z: Budokai 3 HD",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DBZ-B3",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "novapowers0/DBZ-Budokai-3-HD-Collection",
    "repoUrl": "https://github.com/novapowers0/DBZ-Budokai-3-HD-Collection",
    "descricao": "Recompilação estática de Dragon Ball Z: Budokai 3 HD de Xbox 360 para PC com lutas em 60 FPS estonteantes.",
    "termoBuscaCapa": "Dragon_Ball_Z:_Budokai_3",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Bandai Namco",
      "Fighting",
      "Goku",
      "XenonRecomp"
    ]
  },
  {
    "id": "iexplosiverage-dbz-burst-limit-recompiled",
    "nome": "Dragon Ball Z: Burst Limit",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DBZ-BL",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "iExplosiveRage/DBZ-Burst-Limit-Recompiled",
    "repoUrl": "https://github.com/iExplosiveRage/DBZ-Burst-Limit-Recompiled",
    "descricao": "Port nativo de Burst Limit para PC com visual cel-shading cinematográfico impecável e combos sem delay.",
    "termoBuscaCapa": "Dragon_Ball_Z:_Burst_Limit",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Dimps",
      "Fighting",
      "Anime",
      "XenonRecomp"
    ]
  },
  {
    "id": "tekrantgaming-earthworm-jim-hd-recompiled",
    "nome": "Earthworm Jim HD Recompiled",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-EWJ-HD",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TekRantGaming/earthworm-jim-hd-recompiled",
    "repoUrl": "https://github.com/TekRantGaming/earthworm-jim-hd-recompiled",
    "descricao": "Port nativo da versão HD remasterizada de Earthworm Jim com arte repintada e trilha orquestrada no Windows.",
    "termoBuscaCapa": "Earthworm_Jim",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Shiny Entertainment",
      "Platformer",
      "XenonRecomp"
    ]
  },
  {
    "id": "birabittoh-eternalsonatareprise",
    "nome": "Eternal Sonata (Reprise)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-ES",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "birabittoh/EternalSonataReprise",
    "repoUrl": "https://github.com/birabittoh/EternalSonataReprise",
    "descricao": "Recompilação de Eternal Sonata com a belíssima jornada lírica inspirada nas músicas de Frédéric Chopin no PC.",
    "termoBuscaCapa": "Eternal_Sonata",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "tri-Crescendo",
      "JRPG",
      "Chopin",
      "XenonRecomp"
    ]
  },
  {
    "id": "whompay-fncreborn",
    "nome": "Fight Night Champion (FNC Reborn)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-FNC",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "whompay/FNCReborn",
    "repoUrl": "https://github.com/whompay/FNCReborn",
    "descricao": "O mais elogiado simulador de boxe da EA Sports executado diretamente no Windows com modo Champion a 60 FPS.",
    "termoBuscaCapa": "Fight_Night_Champion",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "EA Sports",
      "Boxing",
      "XenonRecomp"
    ]
  },
  {
    "id": "saulob-hard-corps-uprising-recompiled",
    "nome": "Hard Corps: Uprising",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-HCU",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "saulob/hard-corps-uprising-recompiled",
    "repoUrl": "https://github.com/saulob/hard-corps-uprising-recompiled",
    "descricao": "Recompilação estática do acelerado sucessor espiritual de Contra desenvolvido pela Arc System Works para Xbox 360.",
    "termoBuscaCapa": "Hard_Corps:_Uprising",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Arc System Works",
      "Konami",
      "Run and Gun"
    ]
  },
  {
    "id": "birabittoh-kameorepowered",
    "nome": "Kameo: Elements of Power",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-KAMEO",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "birabittoh/KameoRePowered",
    "repoUrl": "https://github.com/birabittoh/KameoRePowered",
    "descricao": "O clássico de lançamento da Rareware para Xbox 360 totalmente recompiled para computadores modernos com 4K.",
    "termoBuscaCapa": "Kameo",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Rare",
      "Action-Adventure",
      "XenonRecomp"
    ]
  },
  {
    "id": "tekrantgaming-king-kong-recompiled",
    "nome": "Peter Jackson's King Kong",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-KONG",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TekRantGaming/king-kong-recompiled",
    "repoUrl": "https://github.com/TekRantGaming/king-kong-recompiled",
    "descricao": "Port nativo da aclamada versão de Xbox 360 com iluminação volumétrica e sem interface invasiva.",
    "termoBuscaCapa": "Peter_Jackson's_King_Kong",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Ubisoft",
      "Michel Ancel",
      "FPS",
      "King Kong"
    ]
  },
  {
    "id": "nevercookfirst-dimensionsrecomp",
    "nome": "LEGO Dimensions",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-LEGODIM",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "NeverCookFirst/DimensionsRecomp",
    "repoUrl": "https://github.com/NeverCookFirst/DimensionsRecomp",
    "descricao": "Port nativo com emulação de Toy Pad integrada para jogar todas as franquias da LEGO no PC sem periférico físico.",
    "termoBuscaCapa": "Lego_Dimensions",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "TT Games",
      "LEGO",
      "Toys-to-life",
      "XenonRecomp"
    ]
  },
  {
    "id": "nebadasswifty-masseffect-nx",
    "nome": "Mass Effect 1 (Xbox 360 Recomp)",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-ME1",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "nebadasSwifty/masseffect-nx",
    "repoUrl": "https://github.com/nebadasSwifty/masseffect-nx",
    "descricao": "Recompilação estática do primeiro Mass Effect da BioWare executando os binários originais em alta performance.",
    "termoBuscaCapa": "Mass_Effect_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "BioWare",
      "Sci-Fi RPG",
      "Shepard",
      "XenonRecomp"
    ]
  },
  {
    "id": "kawaiibunga-mkvdcu-recomp",
    "nome": "Mortal Kombat vs. DC Universe",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-MKVDC",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "KawaiiBunga/MKVDCU-Recomp",
    "repoUrl": "https://github.com/KawaiiBunga/MKVDCU-Recomp",
    "descricao": "Port nativo do crossover de 2008 entre os lutadores do Reino da Terra e os heróis da Liga da Justiça.",
    "termoBuscaCapa": "Mortal_Kombat_vs._DC_Universe",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Midway",
      "Fighting",
      "DC Comics",
      "Mortal Kombat"
    ]
  },
  {
    "id": "jorjbarbosa-naruto-rise-recomp",
    "nome": "Naruto: Rise of a Ninja",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-NARUTO",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "jorjbarbosa/naruto-rise-recomp",
    "repoUrl": "https://github.com/jorjbarbosa/naruto-rise-recomp",
    "descricao": "O adorado exclusivo de Xbox 360 com a recriação aberta da Vila da Folha portada pela comunidade para PC.",
    "termoBuscaCapa": "Naruto:_Rise_of_a_Ninja",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Ubisoft Montreal",
      "Anime",
      "Open World",
      "XenonRecomp"
    ]
  },
  {
    "id": "nikolaygorb-perfectdarkzerorecomp",
    "nome": "Perfect Dark Zero",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-PDZ",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "nikolaygorb/PerfectDarkZeroRecomp",
    "repoUrl": "https://github.com/nikolaygorb/PerfectDarkZeroRecomp",
    "descricao": "Recompilação estática de Perfect Dark Zero com mira por mouse, 120 FPS e suporte a telas ultrawide.",
    "termoBuscaCapa": "Perfect_Dark_Zero",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Rare",
      "FPS",
      "Joanna Dark",
      "XenonRecomp"
    ]
  },
  {
    "id": "m1ndcrap-sega-superstars-tennis-rematch",
    "nome": "Sega Superstars Tennis",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-SST",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "m1ndcrap/Sega-Superstars-Tennis-ReMatch",
    "repoUrl": "https://github.com/m1ndcrap/Sega-Superstars-Tennis-ReMatch",
    "descricao": "Port nativo de tênis com Sonic, Beat de Jet Set Radio, AiAi de Super Monkey Ball e outros ícones da SEGA.",
    "termoBuscaCapa": "Sega_Superstars_Tennis",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Sumo Digital",
      "SEGA",
      "Tennis",
      "XenonRecomp"
    ]
  },
  {
    "id": "masterspike52-renut",
    "nome": "Banjo-Kazooie: Nuts & Bolts",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-BK-NB",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "masterspike52/reNut",
    "repoUrl": "https://github.com/masterspike52/reNut",
    "descricao": "Recompilação de Nuts & Bolts com construção de veículos customizados sem travamentos e resolução 4K.",
    "termoBuscaCapa": "Banjo-Kazooie:_Nuts_%26_Bolts",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Rare",
      "Vehicle Sandbox",
      "XenonRecomp"
    ]
  },
  {
    "id": "masterspike52-redahm",
    "nome": "Destroy All Humans! Path of the Furon",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DAH-PF",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "masterspike52/reDAHM",
    "repoUrl": "https://github.com/masterspike52/reDAHM",
    "descricao": "Port nativo do terceiro capítulo da série onde Crypto desencadeia o caos alienígena nos anos 70.",
    "termoBuscaCapa": "Destroy_All_Humans!_Path_of_the_Furon",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "THQ",
      "Sci-Fi Comedy",
      "Open World"
    ]
  },
  {
    "id": "eandis-sdoj-recomp",
    "nome": "DoDonPachi Saidaioujou",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-DODON",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "eandis/SDOJ-Recomp",
    "repoUrl": "https://github.com/eandis/SDOJ-Recomp",
    "descricao": "Port nativo para PC do reverenciado shoot-em-up bullet hell da Cave com lag de input imperceptível.",
    "termoBuscaCapa": "DoDonPachi_SaidaiOuJou",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Cave",
      "Bullet Hell",
      "Shmup",
      "XenonRecomp"
    ]
  },
  {
    "id": "saulob-geometry-wars-retro-evolved-2-recompiled",
    "nome": "Geometry Wars: Retro Evolved 2",
    "console": "XBOX360",
    "consoleNome": "Xbox 360",
    "codigoJogo": "X360-GW2",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "saulob/geometry-wars-retro-evolved-2-recompiled",
    "repoUrl": "https://github.com/saulob/geometry-wars-retro-evolved-2-recompiled",
    "descricao": "Recompilação estática do lendário shooter arcade da Bizarre Creations com partículas deslumbrantes em 240Hz.",
    "termoBuscaCapa": "Geometry_Wars:_Retro_Evolved_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox 360",
      "Bizarre Creations",
      "Twin-Stick Shooter",
      "Arcade"
    ]
  },
  {
    "id": "klexster-god-of-war-recomp",
    "nome": "God of War I & II (PS2 Recomp)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SCUS-97399",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Klexster/god-of-war-recomp",
    "repoUrl": "https://github.com/Klexster/god-of-war-recomp",
    "descricao": "Recompilação estática completa de God of War 1 e 2 rodando nativamente no PC com resolução 4K, 120 FPS e suporte a mouse/teclado.",
    "termoBuscaCapa": "God_of_War_(2005_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS2",
      "Sony Santa Monica",
      "Kratos",
      "Hack and Slash",
      "PS2Recomp"
    ]
  },
  {
    "id": "felipeprado0-gow3-pc",
    "nome": "God of War III Remastered (PC Native)",
    "console": "PS4",
    "consoleNome": "PlayStation 4",
    "codigoJogo": "CUSA01623",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "FelipePrado0/gow3_pc",
    "repoUrl": "https://github.com/FelipePrado0/gow3_pc",
    "descricao": "Camada de execução nativa e port para Windows de God of War III Remastered do PS4 via Vulkan com alta taxa de quadros.",
    "termoBuscaCapa": "God_of_War_III",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS4",
      "Sony",
      "Kratos",
      "Vulkan",
      "CUSA01623"
    ]
  },
  {
    "id": "red-tv141-dc2-ps2recomp",
    "nome": "Dark Cloud 2 (Dark Chronicle)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SCUS-97213",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Red-tv141/DC2-PS2RECOMP",
    "repoUrl": "https://github.com/Red-tv141/DC2-PS2RECOMP",
    "descricao": "Port nativo para PC por recompilação do célebre RPG de ação da Level-5 com sistema Georama em alta resolução.",
    "termoBuscaCapa": "Dark_Cloud_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS2",
      "Level-5",
      "Action RPG",
      "PS2Recomp"
    ]
  },
  {
    "id": "sinan-karakaya-dq8-recompiled",
    "nome": "Dragon Quest VIII: Journey of the Cursed King",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SLUS-21207",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Sinan-Karakaya/DQ8-Recompiled",
    "repoUrl": "https://github.com/Sinan-Karakaya/DQ8-Recompiled",
    "descricao": "Recompilação do épico Dragon Quest VIII no PC com orquestra sinfônica integrada e cel-shading em 4K.",
    "termoBuscaCapa": "Dragon_Quest_VIII:_Journey_of_the_Cursed_King",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS2",
      "Square Enix",
      "Level-5",
      "JRPG",
      "PS2Recomp"
    ]
  },
  {
    "id": "jcsix694-def-jam-vendetta-recomp",
    "nome": "Def Jam Vendetta",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SLUS-20612",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "jcsix694/def-jam-vendetta-recomp",
    "repoUrl": "https://github.com/jcsix694/def-jam-vendetta-recomp",
    "descricao": "Port nativo do primeiro Def Jam com motor da AKI Corporation rodando sem latência no Windows.",
    "termoBuscaCapa": "Def_Jam_Vendetta",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS2",
      "EA Sports BIG",
      "Wrestling",
      "Hip-Hop"
    ]
  },
  {
    "id": "danisandoval-fukami",
    "nome": "Ridge Racer V (Fukami)",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SLUS-20002",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "danisandoval/fukami",
    "repoUrl": "https://github.com/danisandoval/fukami",
    "descricao": "Recompilação estática de Ridge Racer V do PS2 com suporte a resoluções ultrawide e resposta imediata de controles.",
    "termoBuscaCapa": "Ridge_Racer_V",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS2",
      "Namco",
      "Racing",
      "Drift"
    ]
  },
  {
    "id": "aikatore-recvx-enhanced-recomp",
    "nome": "Resident Evil - Code: Veronica X",
    "console": "PS2",
    "consoleNome": "PlayStation 2",
    "codigoJogo": "SLUS-20184",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "aikatore/recvx-enhanced-recomp",
    "repoUrl": "https://github.com/aikatore/recvx-enhanced-recomp",
    "descricao": "Port nativo da versão aprimorada de Code: Veronica X para PC com renderizador moderno e controles analógicos livres.",
    "termoBuscaCapa": "Resident_Evil_–_Code:_Veronica",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS2",
      "Capcom",
      "Claire Redfield",
      "Survival Horror"
    ]
  },
  {
    "id": "novapowers0-bloodyroar2recomp",
    "nome": "Bloody Roar 2",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00854",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "novapowers0/BloodyRoar2Recomp",
    "repoUrl": "https://github.com/novapowers0/BloodyRoar2Recomp",
    "descricao": "Port nativo do clássico jogo de luta onde os combatentes se transformam em feras, com 60 FPS e suporte a gamepads.",
    "termoBuscaCapa": "Bloody_Roar_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Hudson Soft",
      "Fighting",
      "Beast Mode"
    ]
  },
  {
    "id": "fabioap-cpu-tekken3recomp",
    "nome": "Tekken 3 (PS1 Recomp)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00402",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "fabioap-cpu/Tekken3Recomp",
    "repoUrl": "https://github.com/fabioap-cpu/Tekken3Recomp",
    "descricao": "Port nativo do ápice dos jogos de luta do PS1 Tekken 3 com carregamento em milissegundos e suporte a netplay.",
    "termoBuscaCapa": "Tekken_3",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Namco",
      "Fighting",
      "Tekken",
      "PS1Recomp"
    ]
  },
  {
    "id": "technicallycomputers-klonoa-door-to-phantomile",
    "nome": "Klonoa: Door to Phantomile",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00527",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TechnicallyComputers/Klonoa-Door-to-Phantomile",
    "repoUrl": "https://github.com/TechnicallyComputers/Klonoa-Door-to-Phantomile",
    "descricao": "Port nativo do cultuado jogo 2.5D de plataforma da Namco com geometria perfeita sem distorções de PS1.",
    "termoBuscaCapa": "Klonoa:_Door_to_Phantomile",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Namco",
      "Platformer",
      "Klonoa"
    ]
  },
  {
    "id": "technicallycomputers-metal-slug-x-recomp",
    "nome": "Metal Slug X (PS1 Recomp)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-01312",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TechnicallyComputers/Metal-Slug-X-Recomp",
    "repoUrl": "https://github.com/TechnicallyComputers/Metal-Slug-X-Recomp",
    "descricao": "Port nativo por recompilação de Metal Slug X com taxa de quadros perfeitamente estável sem slowdowns.",
    "termoBuscaCapa": "Metal_Slug_X",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "SNK",
      "Run and Gun",
      "Arcade"
    ]
  },
  {
    "id": "technicallycomputers-marvel-vs-capcom-clash-of-super-heroes-recomp",
    "nome": "Marvel vs. Capcom: Clash of Super Heroes",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-01053",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TechnicallyComputers/Marvel-vs.-Capcom-Clash-of-Super-Heroes-Recomp",
    "repoUrl": "https://github.com/TechnicallyComputers/Marvel-vs.-Capcom-Clash-of-Super-Heroes-Recomp",
    "descricao": "Recompilação nativa de Marvel vs. Capcom com tempo de resposta preciso para combos e suporte a arcade sticks.",
    "termoBuscaCapa": "Marvel_vs._Capcom:_Clash_of_Super_Heroes",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Capcom",
      "Fighting",
      "Marvel",
      "Tag Team"
    ]
  },
  {
    "id": "technicallycomputers-street-fighter-alpha-3-recomp",
    "nome": "Street Fighter Alpha 3",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00821",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TechnicallyComputers/Street-Fighter-Alpha-3-Recomp",
    "repoUrl": "https://github.com/TechnicallyComputers/Street-Fighter-Alpha-3-Recomp",
    "descricao": "Port nativo de SFA3 com o modo World Tour completo rodando em código x86/x64 nativo para Windows.",
    "termoBuscaCapa": "Street_Fighter_Alpha_3",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Capcom",
      "Fighting",
      "Street Fighter"
    ]
  },
  {
    "id": "technicallycomputers-twistedmetal4recomp",
    "nome": "Twisted Metal 4",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCUS-94560",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TechnicallyComputers/TwistedMetal4Recomp",
    "repoUrl": "https://github.com/TechnicallyComputers/TwistedMetal4Recomp",
    "descricao": "Port nativo do clássico combate veicular da 989 Studios com trilha de Rob Zombie e suporte a multiplayer local.",
    "termoBuscaCapa": "Twisted_Metal_4",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "989 Studios",
      "Vehicular Combat",
      "Sweet Tooth"
    ]
  },
  {
    "id": "alexbeavs-ps1-ports-syphon-filter-2-recomp",
    "nome": "Syphon Filter 2",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCUS-94451",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "alexbeavs-ps1-ports/syphon-filter-2-recomp",
    "repoUrl": "https://github.com/alexbeavs-ps1-ports/syphon-filter-2-recomp",
    "descricao": "Recompilação estática de Syphon Filter 2 com Gabe Logan e Lian Xing com resolução HD e controles DualShock.",
    "termoBuscaCapa": "Syphon_Filter_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Eidetic",
      "Stealth Shooter",
      "Gabe Logan"
    ]
  },
  {
    "id": "alexbeavs-ps1-ports-parasite-eve-recomp",
    "nome": "Parasite Eve",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00662",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "alexbeavs-ps1-ports/parasite-eve-recomp",
    "repoUrl": "https://github.com/alexbeavs-ps1-ports/parasite-eve-recomp",
    "descricao": "Port nativo do cinemático RPG de ação da Square com Aya Brea em Nova York com carregamento sem espera.",
    "termoBuscaCapa": "Parasite_Eve_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Square",
      "Cinematic RPG",
      "Survival Horror"
    ]
  },
  {
    "id": "opokxeno-xenogears-recomp",
    "nome": "Xenogears (PC Recomp)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00664",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "OpokXeno/xenogears-recomp",
    "repoUrl": "https://github.com/OpokXeno/xenogears-recomp",
    "descricao": "Recompilação estática da monumental obra-prima de Tetsuya Takahashi para Windows com texturas nítidas.",
    "termoBuscaCapa": "Xenogears",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Square",
      "Mecha JRPG",
      "Takahashi"
    ]
  },
  {
    "id": "unchiga-yugiohforbiddenmemoriesrecomp",
    "nome": "Yu-Gi-Oh! Forbidden Memories",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-014.11",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Unchiga/YuGiOhForbiddenMemoriesRecomp",
    "repoUrl": "https://github.com/Unchiga/YuGiOhForbiddenMemoriesRecomp",
    "descricao": "Port nativo do cultuado Yu-Gi-Oh! de PS1 no PC com duelos instantâneos, fusões sem delay e animações em 60 FPS.",
    "termoBuscaCapa": "Yu-Gi-Oh!_Forbidden_Memories",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Konami",
      "Card Game",
      "Yu-Gi-Oh"
    ]
  },
  {
    "id": "mstan-tombarecomp",
    "nome": "Tomba!",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCUS-94236",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/TombaRecomp",
    "repoUrl": "https://github.com/mstan/TombaRecomp",
    "descricao": "Port nativo do clássico jogo de plataforma e missões não-lineares da Whoopee Camp no Windows.",
    "termoBuscaCapa": "Tomba!",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Whoopee Camp",
      "Platformer",
      "Metroidvania"
    ]
  },
  {
    "id": "mstan-tomba2recomp",
    "nome": "Tomba! 2: The Evil Swine Return",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SCUS-94454",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/Tomba2Recomp",
    "repoUrl": "https://github.com/mstan/Tomba2Recomp",
    "descricao": "Recompilação estática de Tomba 2 com suporte a resoluções modernas e resposta analógica suave.",
    "termoBuscaCapa": "Tomba!_2:_The_Evil_Swine_Return",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Whoopee Camp",
      "Platformer",
      "Adventure"
    ]
  },
  {
    "id": "mstan-megamanx4recomp",
    "nome": "Mega Man X4 (PS1 Recomp)",
    "console": "PS1",
    "consoleNome": "PlayStation 1",
    "codigoJogo": "SLUS-00561",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/MegaManX4Recomp",
    "repoUrl": "https://github.com/mstan/MegaManX4Recomp",
    "descricao": "Port nativo com suporte a coop, 60 FPS perfeitos e áudio WAV com X e Zero jogáveis no PC.",
    "termoBuscaCapa": "Mega_Man_X4",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PS1",
      "Capcom",
      "Action Platformer",
      "Mega Man",
      "Zero"
    ]
  },
  {
    "id": "opencommunityedition-opence",
    "nome": "Halo: Combat Evolved (OpenCE)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-HALO1",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "OpenCommunityEdition/OpenCE",
    "repoUrl": "https://github.com/OpenCommunityEdition/OpenCE",
    "descricao": "Port nativo e engenharia reversa do código original de Halo 1 do Xbox Clássico com multiplayer moderno e shaders fiéis.",
    "termoBuscaCapa": "Halo:_Combat_Evolved",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "Bungie",
      "Master Chief",
      "FPS",
      "Multiplayer"
    ]
  },
  {
    "id": "timftw21-burnout2-recompilation",
    "nome": "Burnout 2: Point of Impact",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-BO2",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "timftw21/burnout2-recompilation",
    "repoUrl": "https://github.com/timftw21/burnout2-recompilation",
    "descricao": "Recompilação estática de Burnout 2 com o aclamado modo Crash executando nativamente no PC com 60 FPS.",
    "termoBuscaCapa": "Burnout_2:_Point_of_Impact",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "Criterion",
      "Arcade Racing",
      "Crash Mode"
    ]
  },
  {
    "id": "parkerallan-doa3-recomp",
    "nome": "Dead or Alive 3",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-DOA3",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "parkerallan/doa3-recomp",
    "repoUrl": "https://github.com/parkerallan/doa3-recomp",
    "descricao": "Port nativo do impressionante jogo de luta de lançamento do Xbox com física de roupas e cenários destrutíveis.",
    "termoBuscaCapa": "Dead_or_Alive_3",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "Team Ninja",
      "Tecmo",
      "Fighting"
    ]
  },
  {
    "id": "norain211-doaxvb-re",
    "nome": "Dead or Alive Xtreme Beach Volleyball",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-DOAX",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "NoRain211/doaxvb-re",
    "repoUrl": "https://github.com/NoRain211/doaxvb-re",
    "descricao": "Recompilação nativa de DOAX do Xbox Clássico com shaders de água aprimorados e tempos de carga inexistentes.",
    "termoBuscaCapa": "Dead_or_Alive_Xtreme_Beach_Volleyball",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "Team Ninja",
      "Sports",
      "Minigames"
    ]
  },
  {
    "id": "gumpolas-tootawersrecomp",
    "nome": "The Lord of the Rings: The Two Towers",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-LOTR-TT",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Gumpolas/TooTawersRecomp",
    "repoUrl": "https://github.com/Gumpolas/TooTawersRecomp",
    "descricao": "Port nativo do consagrado hack and slash de O Senhor dos Anéis: As Duas Torres da EA Games.",
    "termoBuscaCapa": "The_Lord_of_the_Rings:_The_Two_Towers_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "EA Games",
      "Hack and Slash",
      "Lord of the Rings"
    ]
  },
  {
    "id": "tgp482-scda-xberecomp",
    "nome": "Tom Clancy's Splinter Cell: Double Agent (Version 2)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-SCDA",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TGP482/SCDA-XBERecomp",
    "repoUrl": "https://github.com/TGP482/SCDA-XBERecomp",
    "descricao": "Port nativo da 'Version 2' de Double Agent (exclusiva dos consoles antigos), considerada pelos fãs a verdadeira continuação de Chaos Theory.",
    "termoBuscaCapa": "Tom_Clancy's_Splinter_Cell:_Double_Agent",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "Ubisoft Montreal",
      "Stealth",
      "Sam Fisher"
    ]
  },
  {
    "id": "portingpete-black-2006-recomp",
    "nome": "BLACK (2006)",
    "console": "XBOX",
    "consoleNome": "Xbox Clássico",
    "codigoJogo": "XBOX-BLACK",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "portingpete/Black-2006-Recomp",
    "repoUrl": "https://github.com/portingpete/Black-2006-Recomp",
    "descricao": "Recompilação estática do lendário FPS \"Gun-Porn\" da Criterion Games com explosões volumétricas e 60 FPS no PC.",
    "termoBuscaCapa": "Black_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Xbox",
      "Criterion",
      "EA Games",
      "Gun-Porn",
      "Destruction"
    ]
  },
  {
    "id": "dinosaurplanetrecomp-dino-recomp",
    "nome": "Dinosaur Planet (N64 Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-DINO",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "DinosaurPlanetRecomp/dino-recomp",
    "repoUrl": "https://github.com/DinosaurPlanetRecomp/dino-recomp",
    "descricao": "Port nativo e recompilação do mítico jogo cancelado da Rareware com Sabre e Krystal antes de virar Star Fox Adventures.",
    "termoBuscaCapa": "Star_Fox_Adventures",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Rareware",
      "Action-Adventure",
      "Krystal",
      "N64Recomp"
    ]
  },
  {
    "id": "klorfmorf-goemon64recomp",
    "nome": "Mystical Ninja Starring Goemon",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NGME",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "klorfmorf/Goemon64Recomp",
    "repoUrl": "https://github.com/klorfmorf/Goemon64Recomp",
    "descricao": "Port nativo do hilário e carismático jogo de aventura 3D da Konami com batalhas de robôs gigantes no PC.",
    "termoBuscaCapa": "Mystical_Ninja_Starring_Goemon",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Konami",
      "Action-Adventure",
      "Goemon",
      "N64Recomp"
    ]
  },
  {
    "id": "sciaschi-cbfd-recompiled",
    "nome": "Conker's Bad Fur Day (Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NFUE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "sciaschi/CBFD-Recompiled",
    "repoUrl": "https://github.com/sciaschi/CBFD-Recompiled",
    "descricao": "Recompilação estática de Conker para PC com multiplayer local e online, humor sem censura e 60 FPS cravados.",
    "termoBuscaCapa": "Conker's_Bad_Fur_Day",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Rareware",
      "Comedy",
      "Multiplayer",
      "N64Recomp"
    ]
  },
  {
    "id": "cellenseres-sssv-recomp",
    "nome": "Space Station Silicon Valley",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NSVE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Cellenseres/SSSV_Recomp",
    "repoUrl": "https://github.com/Cellenseres/SSSV_Recomp",
    "descricao": "Port nativo da inovadora criação da DMA Design (Rockstar North) com possessão de animais robôs no PC.",
    "termoBuscaCapa": "Space_Station_Silicon_Valley",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "DMA Design",
      "Rockstar",
      "Puzzle-Platformer"
    ]
  },
  {
    "id": "thatguymcd-glover-r",
    "nome": "Glover (Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NGVE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "ThatGuyMcd/Glover-R",
    "repoUrl": "https://github.com/ThatGuyMcd/Glover-R",
    "descricao": "Recompilação estática de Glover com física de bola calibrada, suporte a controles analógicos modernos e 60 FPS.",
    "termoBuscaCapa": "Glover_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Interactive Studios",
      "Physics Platformer"
    ]
  },
  {
    "id": "thatguymcd-rocket-r",
    "nome": "Rocket: Robot on Wheels",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NRKE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "ThatGuyMcd/Rocket-R",
    "repoUrl": "https://github.com/ThatGuyMcd/Rocket-R",
    "descricao": "Port nativo do primeiro jogo da Sucker Punch com motor de física avançado para a época rodando com máxima precisão.",
    "termoBuscaCapa": "Rocket:_Robot_on_Wheels",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Sucker Punch",
      "Physics Engine",
      "Platformer"
    ]
  },
  {
    "id": "danielgomesvieira2000-wave-race-64-recomp",
    "nome": "Wave Race 64 (Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NWRE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "danielgomesvieira2000/wave-race-64-recomp",
    "repoUrl": "https://github.com/danielgomesvieira2000/wave-race-64-recomp",
    "descricao": "Recompilação estática de Wave Race 64 com a física de ondas aquáticas da Nintendo em 60/120 FPS e suporte a widescreen.",
    "termoBuscaCapa": "Wave_Race_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Nintendo",
      "Jet Ski",
      "Water Physics",
      "N64Recomp"
    ]
  },
  {
    "id": "linkssy2-roadrash64recompiled",
    "nome": "Road Rash 64 (Recompiled)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NR6E",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "linkssy2/RoadRash64Recompiled",
    "repoUrl": "https://github.com/linkssy2/RoadRash64Recompiled",
    "descricao": "Port nativo de Road Rash 64 para PC com combates sobre motocicletas a alta velocidade e física caótica.",
    "termoBuscaCapa": "Road_Rash_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "THQ",
      "Motorcycle Combat",
      "Racing"
    ]
  },
  {
    "id": "jackandbeans-snap64recomp",
    "nome": "Pokémon Snap (Snap64 Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NPFE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "JackandBeans/Snap64Recomp",
    "repoUrl": "https://github.com/JackandBeans/Snap64Recomp",
    "descricao": "Recompilação de Pokémon Snap com mira por giroscópio ou mouse, renderização nítida de fotos em alta resolução.",
    "termoBuscaCapa": "Pokémon_Snap",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "HAL Laboratory",
      "Pokemon",
      "Photography"
    ]
  },
  {
    "id": "harvestmoon64recomp-harvestmoon64recomp",
    "nome": "Harvest Moon 64 (Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NHME",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "HarvestMoon64Recomp/HarvestMoon64Recomp",
    "repoUrl": "https://github.com/HarvestMoon64Recomp/HarvestMoon64Recomp",
    "descricao": "Port nativo do clássico simulador de fazenda da Victor Interactive com correções de bugs de tempo e suporte a widescreen.",
    "termoBuscaCapa": "Harvest_Moon_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Natsume",
      "Farming Sim",
      "Story of Seasons"
    ]
  },
  {
    "id": "tk22-26-jetforcegemini-recomp",
    "nome": "Jet Force Gemini (Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NJGE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "TK22-26/JetForceGemini-Recomp",
    "repoUrl": "https://github.com/TK22-26/JetForceGemini-Recomp",
    "descricao": "Recompilação estática de Jet Force Gemini com mira moderna de dois analógicos (twin-stick) ou mouse e teclado no PC.",
    "termoBuscaCapa": "Jet_Force_Gemini",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Rare",
      "Third-Person Shooter",
      "Sci-Fi"
    ]
  },
  {
    "id": "gtteancum-sote-recomp",
    "nome": "Star Wars: Shadows of the Empire",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NSWE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "GTTeancum/SotE-Recomp",
    "repoUrl": "https://github.com/GTTeancum/SotE-Recomp",
    "descricao": "Port nativo com Dash Rendar, a Batalha de Hoth em 60 FPS e controles modernos no Windows.",
    "termoBuscaCapa": "Star_Wars:_Shadows_of_the_Empire_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "LucasArts",
      "Star Wars",
      "Dash Rendar"
    ]
  },
  {
    "id": "revosucks-bm64recomp",
    "nome": "Bomberman 64 (Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NBME",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "RevoSucks/BM64Recomp",
    "repoUrl": "https://github.com/RevoSucks/BM64Recomp",
    "descricao": "Recompilação estática de Bomberman 64 com bombas personalizadas, modo aventura 3D e batalha para 4 jogadores.",
    "termoBuscaCapa": "Bomberman_64_(1997_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Hudson Soft",
      "Action-Adventure",
      "Bomberman"
    ]
  },
  {
    "id": "megaman64recomp-megaman64recompiled",
    "nome": "Mega Man 64 (Legends Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NM6E",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "MegaMan64Recomp/MegaMan64Recompiled",
    "repoUrl": "https://github.com/MegaMan64Recomp/MegaMan64Recompiled",
    "descricao": "Port nativo de Mega Man Legends / 64 com controles de câmera livre modernos e texturas preservadas.",
    "termoBuscaCapa": "Mega_Man_Legends_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Capcom",
      "Mega Man Legends",
      "Action RPG"
    ]
  },
  {
    "id": "cdlewis-snowboardkids2-recomp",
    "nome": "Snowboard Kids 2 (Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NK2E",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "cdlewis/snowboardkids2-recomp",
    "repoUrl": "https://github.com/cdlewis/snowboardkids2-recomp",
    "descricao": "Port nativo do clássico jogo de corrida na neve com itens malucos e manobras radicais a 60 FPS.",
    "termoBuscaCapa": "Snowboard_Kids_2",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Atlus",
      "Racing",
      "Snowboard"
    ]
  },
  {
    "id": "lfarroco-ogre-battle-64-recomp",
    "nome": "Ogre Battle 64: Person of Lordly Caliber",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NBOE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "lfarroco/ogre-battle-64-recomp",
    "repoUrl": "https://github.com/lfarroco/ogre-battle-64-recomp",
    "descricao": "Recompilação estática da consagrada obra de RPG tático da Quest e Nintendo com interface em alta fidelidade.",
    "termoBuscaCapa": "Ogre_Battle_64:_Person_of_Lordly_Caliber",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Quest",
      "Tactical RPG",
      "Ogre Battle"
    ]
  },
  {
    "id": "sonicdcer-dnzhrecomp",
    "nome": "Duke Nukem: Zero Hour (Recomp)",
    "console": "N64",
    "consoleNome": "Nintendo 64",
    "codigoJogo": "NUS-NDZE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "sonicdcer/DNZHRecomp",
    "repoUrl": "https://github.com/sonicdcer/DNZHRecomp",
    "descricao": "Port nativo de Duke Nukem: Zero Hour viajando pelo tempo com mira por mouse no PC.",
    "termoBuscaCapa": "Duke_Nukem:_Zero_Hour",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "N64",
      "Eurocom",
      "Third-Person Shooter",
      "Duke Nukem"
    ]
  },
  {
    "id": "chrissotraidis-bluewake",
    "nome": "The Legend of Zelda: The Wind Waker (Bluewake)",
    "console": "GC",
    "consoleNome": "Nintendo GameCube",
    "codigoJogo": "GZLE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "chrissotraidis/bluewake",
    "repoUrl": "https://github.com/chrissotraidis/bluewake",
    "descricao": "Port nativo para PC por recompilação do The Wind Waker original do GameCube com carregamentos instantâneos.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_The_Wind_Waker",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "GameCube",
      "Nintendo",
      "Cel-Shading",
      "Zelda"
    ]
  },
  {
    "id": "chrissotraidis-sunpad",
    "nome": "Super Mario Sunshine (Sunpad)",
    "console": "GC",
    "consoleNome": "Nintendo GameCube",
    "codigoJogo": "GMSE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "chrissotraidis/sunpad",
    "repoUrl": "https://github.com/chrissotraidis/sunpad",
    "descricao": "Recompilação estática de Super Mario Sunshine com suporte a 60 FPS reais, física da FLUDD perfeita e widescreen 16:9.",
    "termoBuscaCapa": "Super_Mario_Sunshine",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "GameCube",
      "Nintendo",
      "Mario",
      "FLUDD",
      "60FPS"
    ]
  },
  {
    "id": "999sian-melee-pc",
    "nome": "Super Smash Bros. Melee (MeleePC)",
    "console": "GC",
    "consoleNome": "Nintendo GameCube",
    "codigoJogo": "GALE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "999sian/melee-pc",
    "repoUrl": "https://github.com/999sian/melee-pc",
    "descricao": "Port nativo e autônomo de Super Smash Bros. Melee para PC compilado direto em código x86/x64 com netplay de delay zero.",
    "termoBuscaCapa": "Super_Smash_Bros._Melee",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "GameCube",
      "Nintendo",
      "Fighting",
      "Competitive",
      "Melee"
    ]
  },
  {
    "id": "keepvaibin-nebula",
    "nome": "Super Mario Galaxy 1 & 2 (Nebula)",
    "console": "WII",
    "consoleNome": "Nintendo Wii",
    "codigoJogo": "RMGE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "keepvaibin/nebula",
    "repoUrl": "https://github.com/keepvaibin/nebula",
    "descricao": "Recompilação nativa de Mario Galaxy 1 e 2 para computadores com suporte a controles normais sem necessitar do Wiimote.",
    "termoBuscaCapa": "Super_Mario_Galaxy",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Wii",
      "Nintendo",
      "Mario",
      "Gravity Platformer"
    ]
  },
  {
    "id": "dorpxp-driftdroid",
    "nome": "Mario Kart Wii (DriftDroid / PC Native)",
    "console": "WII",
    "consoleNome": "Nintendo Wii",
    "codigoJogo": "RMCE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "dorPXP/driftdroid",
    "repoUrl": "https://github.com/dorPXP/driftdroid",
    "descricao": "Port nativo por recompilação de Mario Kart Wii com suporte a packs de pistas customizadas (CTGP) e 60 FPS.",
    "termoBuscaCapa": "Mario_Kart_Wii",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Wii",
      "Nintendo",
      "Kart Racing",
      "Multiplayer"
    ]
  },
  {
    "id": "jackpoison-prog-ringout",
    "nome": "Soulcalibur II (RingOut)",
    "console": "GC",
    "consoleNome": "Nintendo GameCube",
    "codigoJogo": "GSCE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "jackpoison-prog/RingOut",
    "repoUrl": "https://github.com/jackpoison-prog/RingOut",
    "descricao": "Port nativo de Soulcalibur II com Link exclusivo da versão GameCube rodando com 60 FPS cravados no PC.",
    "termoBuscaCapa": "Soulcalibur_II",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "GameCube",
      "Namco",
      "Fighting",
      "Weapons",
      "Link"
    ]
  },
  {
    "id": "expansionpak-moderngekko",
    "nome": "Kirby's Return to Dream Land (Recomp)",
    "console": "WII",
    "consoleNome": "Nintendo Wii",
    "codigoJogo": "SUKE01",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "ExpansionPak/ModernGekko",
    "repoUrl": "https://github.com/ExpansionPak/ModernGekko",
    "descricao": "Recompilação estática do clássico jogo de plataforma 2.5D do Kirby para Wii no PC com coop para 4 jogadores.",
    "termoBuscaCapa": "Kirby's_Return_to_Dream_Land",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Wii",
      "HAL Laboratory",
      "Kirby",
      "Co-op"
    ]
  },
  {
    "id": "codepdbh-psprecomp-vcs-android",
    "nome": "Grand Theft Auto: Vice City Stories (Recomp)",
    "console": "PSP",
    "consoleNome": "PlayStation Portable",
    "codigoJogo": "ULUS-10160",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "codepdbh/PSPRecomp-VCS-Android",
    "repoUrl": "https://github.com/codepdbh/PSPRecomp-VCS-Android",
    "descricao": "Recompilação estática de Vice City Stories com Vic Vance, sistema de impérios e suporte total a controles no PC.",
    "termoBuscaCapa": "Grand_Theft_Auto:_Vice_City_Stories",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PSP",
      "Rockstar Games",
      "Open World",
      "Vic Vance"
    ]
  },
  {
    "id": "sal063-ace-combat-x-recompilation",
    "nome": "Ace Combat X: Skies of Deception",
    "console": "PSP",
    "consoleNome": "PlayStation Portable",
    "codigoJogo": "ULUS-10176",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "sal063/Ace-Combat-X-Recompilation",
    "repoUrl": "https://github.com/sal063/Ace-Combat-X-Recompilation",
    "descricao": "Port nativo de Ace Combat X do PSP para PC com controles de voo refinados, suporte a alta resolução e 60 FPS.",
    "termoBuscaCapa": "Ace_Combat_X:_Skies_of_Deception",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PSP",
      "Bandai Namco",
      "Flight Combat",
      "Ace Combat"
    ]
  },
  {
    "id": "peiikai-lasrecomp",
    "nome": "The Legend of Zelda: Link's Awakening (LAS Recomp)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "01006BB00C6F0000",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "peiikai/LASRecomp",
    "repoUrl": "https://github.com/peiikai/LASRecomp",
    "descricao": "Recompilação estática completa do remake de Link's Awakening (Switch 2019) gerando binário nativo para PC Windows, macOS e Linux a 120+ FPS.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_Link's_Awakening_(2019_video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T21:10:00Z",
    "stars": 2150,
    "versaoPadrao": "v1.1.2",
    "tags": [
      "Switch",
      "Nintendo",
      "Grezzo",
      "Recomp",
      "120FPS",
      "Nativo PC"
    ]
  },
  {
    "id": "zelda-botw-switch-decomp",
    "nome": "The Legend of Zelda: Breath of the Wild (BotW Decomp)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "01007EF00011E000",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "zeldaret/botw",
    "repoUrl": "https://github.com/zeldaret/botw",
    "descricao": "Descompilação idêntica de Breath of the Wild (v1.5.0) para C++ limpo e compilável, permitindo análise interna e ports de arquitetura.",
    "termoBuscaCapa": "The_Legend_of_Zelda:_Breath_of_the_Wild",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T19:00:00Z",
    "stars": 4350,
    "versaoPadrao": "v1.5.0-decomp",
    "tags": [
      "Switch",
      "Zelda",
      "Breath of the Wild",
      "Open World",
      "Decomp",
      "C++"
    ]
  },
  {
    "id": "super-mario-odyssey-decomp",
    "nome": "Super Mario Odyssey (OdysseyDecomp)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "0100000000010000",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "MonsterDruide1/OdysseyDecomp",
    "repoUrl": "https://github.com/MonsterDruide1/OdysseyDecomp",
    "descricao": "Descompilação completa do código de máquina ARM64 de Super Mario Odyssey (v1.0.0) em C++ moderno compilável nativamente.",
    "termoBuscaCapa": "Super_Mario_Odyssey",
    "capaManual": null,
    "dataAtualizacao": "2026-10-14T20:15:00Z",
    "stars": 1220,
    "versaoPadrao": "v1.0.0-decomp",
    "tags": [
      "Switch",
      "Super Mario Odyssey",
      "Nintendo",
      "Cappy",
      "Decomp",
      "C++"
    ]
  },
  {
    "id": "ssbu-recomp-pc",
    "nome": "Super Smash Bros. Ultimate (SSBU Recomp)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "01006A800016E000",
    "status": "Em Desenvolvimento Ativo",
    "statusTipo": "wip",
    "repo": "Denkishi/ssbu-recomp",
    "repoUrl": "https://github.com/Denkishi/ssbu-recomp",
    "descricao": "Ferramentas de recompilação estática de Smash Ultimate para C++ e código x86 nativo acoplado a runtime Vulkan com netplay de baixa latência.",
    "termoBuscaCapa": "Super_Smash_Bros._Ultimate",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T18:00:00Z",
    "stars": 980,
    "versaoPadrao": "v0.1.2-alpha",
    "tags": [
      "Switch",
      "Smash Bros",
      "SSBU",
      "Nintendo",
      "Luta",
      "Recomp"
    ]
  },
  {
    "id": "sonic-mania-decomp-pc",
    "nome": "Sonic Mania (RSDKv5 PC Native Port)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "01008BE000048000",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Rubberduckycooly/Sonic-Mania-Decompilation",
    "repoUrl": "https://github.com/Rubberduckycooly/Sonic-Mania-Decompilation",
    "descricao": "Port nativo completo da Retro Engine v5 que executa Sonic Mania diretamente em computadores Windows, Linux e Mac com suporte a mods e 240Hz.",
    "termoBuscaCapa": "Sonic_Mania",
    "capaManual": null,
    "dataAtualizacao": "2026-10-12T16:00:00Z",
    "stars": 2450,
    "versaoPadrao": "v1.3.0",
    "tags": [
      "Switch",
      "Sonic Mania",
      "Sega",
      "Retro Engine",
      "Plataforma",
      "Nativo"
    ]
  },
  {
    "id": "celeste-native-decomp",
    "nome": "Celeste (Native Standalone Engine Port)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "01004C8006E88000",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "NoelFB/Celeste",
    "repoUrl": "https://github.com/NoelFB/Celeste",
    "descricao": "Código-fonte do motor nativo de física e mecânicas de movimento de Celeste portado para PC sem dependências proprietárias de console.",
    "termoBuscaCapa": "Celeste_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-10T14:30:00Z",
    "stars": 3200,
    "versaoPadrao": "v1.4.0",
    "tags": [
      "Switch",
      "Celeste",
      "Madeline",
      "Plataforma",
      "Nativo"
    ]
  },
  {
    "id": "mario-3d-all-stars-pc",
    "nome": "Super Mario 64 PC Port (sm64ex — Switch Assets)",
    "console": "Switch",
    "consoleNome": "Nintendo Switch",
    "codigoJogo": "010049900F546000",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "sm64pc/sm64ex",
    "repoUrl": "https://github.com/sm64pc/sm64ex",
    "descricao": "Port nativo de Super Mario 64 para PC compatível com extração de assets do Switch (3D All-Stars), permitindo execução em 4K e 60 FPS com suporte a ray tracing via Render96.",
    "termoBuscaCapa": "Super_Mario_64",
    "capaManual": null,
    "dataAtualizacao": "2026-10-15T10:00:00Z",
    "stars": 4120,
    "versaoPadrao": "v1.2.0",
    "tags": [
      "Switch",
      "N64",
      "Mario",
      "sm64ex",
      "4K",
      "Render96"
    ]
  },
  {
    "id": "mstan-metroidprimehuntersrecomp",
    "nome": "Metroid Prime Hunters (Recomp)",
    "console": "NDS",
    "consoleNome": "Nintendo DS",
    "codigoJogo": "NTR-AMHE-USA",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/MetroidPrimeHuntersRecomp",
    "repoUrl": "https://github.com/mstan/MetroidPrimeHuntersRecomp",
    "descricao": "Port nativo de Metroid Prime Hunters com mira direta por mouse estilo arena shooter moderno.",
    "termoBuscaCapa": "Metroid_Prime_Hunters",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Nintendo DS",
      "Nintendo",
      "Metroid",
      "FPS",
      "Mouse Aim"
    ]
  },
  {
    "id": "underdecoded-gen2recomped",
    "nome": "Pokémon Gold / Silver / Crystal (Gen2Recomped)",
    "console": "RETRO",
    "consoleNome": "Game Boy Color",
    "codigoJogo": "GBC-POKEMON",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "UNDERdecoded/Gen2Recomped",
    "repoUrl": "https://github.com/UNDERdecoded/Gen2Recomped",
    "descricao": "Recompilação estática nativa da 2ª Geração de Pokémon com suporte a widescreen, escala moderna e acelerador de velocidade.",
    "termoBuscaCapa": "Pokémon_Gold_and_Silver",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Game Boy Color",
      "Game Freak",
      "Pokemon",
      "Retro"
    ]
  },
  {
    "id": "clickingmaster-ssrecomp",
    "nome": "Pokémon HeartGold & SoulSilver (Recomp)",
    "console": "NDS",
    "consoleNome": "Nintendo DS",
    "codigoJogo": "NTR-IPKE-USA",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "ClickingMaster/ssrecomp",
    "repoUrl": "https://github.com/ClickingMaster/ssrecomp",
    "descricao": "Port nativo de Pokémon HeartGold e SoulSilver rodando direto no Windows com interface unificada e tela única.",
    "termoBuscaCapa": "Pokémon_HeartGold_and_SoulSilver",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Nintendo DS",
      "Game Freak",
      "Pokemon",
      "Johto"
    ]
  },
  {
    "id": "jorge262007-fftarecomp",
    "nome": "Final Fantasy Tactics Advance (Recomp)",
    "console": "RETRO",
    "consoleNome": "Game Boy Advance",
    "codigoJogo": "AGB-AFXE-USA",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "Jorge262007/FFTARecomp",
    "repoUrl": "https://github.com/Jorge262007/FFTARecomp",
    "descricao": "Recompilação nativa de FFTA com o sistema de Leis e Clãs de Ivalice renderizado de forma nítida em alta definição.",
    "termoBuscaCapa": "Final_Fantasy_Tactics_Advance",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "GBA",
      "Square Enix",
      "Tactical RPG",
      "Ivalice"
    ]
  },
  {
    "id": "carlosrmz009-littleplanet",
    "nome": "Sonic CD (Little Planet Recomp)",
    "console": "RETRO",
    "consoleNome": "Sega CD",
    "codigoJogo": "SEGACD-SONIC",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "carlosrmz009/littleplanet",
    "repoUrl": "https://github.com/carlosrmz009/littleplanet",
    "descricao": "Port nativo do cultuado Sonic CD com viagens no tempo sem telas pretas e trilhas sonoras americana e japonesa selecionáveis.",
    "termoBuscaCapa": "Sonic_CD",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "Sega CD",
      "Sonic Team",
      "Platformer",
      "Metal Sonic"
    ]
  },
  {
    "id": "mstan-supermarioworldrecomp",
    "nome": "Super Mario World (SNES Recomp)",
    "console": "RETRO",
    "consoleNome": "Super Nintendo",
    "codigoJogo": "SNES-SMW",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/SuperMarioWorldRecomp",
    "repoUrl": "https://github.com/mstan/SuperMarioWorldRecomp",
    "descricao": "Recompilação estática de Super Mario World com suporte nativo a widescreen 16:9 real e taxas de quadros modernas.",
    "termoBuscaCapa": "Super_Mario_World",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "SNES",
      "Nintendo",
      "Yoshi",
      "Widescreen",
      "16:9"
    ]
  },
  {
    "id": "mstan-supermetroidrecomp",
    "nome": "Super Metroid (SNES Recomp)",
    "console": "RETRO",
    "consoleNome": "Super Nintendo",
    "codigoJogo": "SNES-SMET",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/SuperMetroidRecomp",
    "repoUrl": "https://github.com/mstan/SuperMetroidRecomp",
    "descricao": "Port nativo de Super Metroid para Windows com controles customizáveis, áudio surround e widescreen expandido.",
    "termoBuscaCapa": "Super_Metroid",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "SNES",
      "Nintendo",
      "Samus Aran",
      "Metroidvania"
    ]
  },
  {
    "id": "mstan-megamanxsnesrecomp",
    "nome": "Mega Man X (SNES Recomp)",
    "console": "RETRO",
    "consoleNome": "Super Nintendo",
    "codigoJogo": "SNES-MMX",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "mstan/MegaManXSNESRecomp",
    "repoUrl": "https://github.com/mstan/MegaManXSNESRecomp",
    "descricao": "Recompilação do primeiro Mega Man X com resposta de botões instantânea, resolução limpa e dashboard de melhorias.",
    "termoBuscaCapa": "Mega_Man_X_(video_game)",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "SNES",
      "Capcom",
      "Mega Man X",
      "Action"
    ]
  },
  {
    "id": "elliotttate-dkc1recomp",
    "nome": "Donkey Kong Country (SNES Recomp)",
    "console": "RETRO",
    "consoleNome": "Super Nintendo",
    "codigoJogo": "SNES-DKC",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "elliotttate/DKC1Recomp",
    "repoUrl": "https://github.com/elliotttate/DKC1Recomp",
    "descricao": "Port nativo de Donkey Kong Country com os lendários gráficos pré-renderizados da Rare rodando em x86/x64 puro.",
    "termoBuscaCapa": "Donkey_Kong_Country",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "SNES",
      "Rare",
      "Donkey Kong",
      "Diddy Kong"
    ]
  },
  {
    "id": "zaps166-nfsiise",
    "nome": "Need for Speed II: Special Edition (NFSIISE Native)",
    "console": "PC",
    "consoleNome": "PC / Source Port",
    "codigoJogo": "PC-NFS2SE",
    "status": "Totalmente Jogável",
    "statusTipo": "jogavel",
    "repo": "zaps166/NFSIISE",
    "repoUrl": "https://github.com/zaps166/NFSIISE",
    "descricao": "Port nativo de código aberto de NFS II Special Edition com suporte a OpenGL/DirectX moderno, 60 FPS e TCP/IP.",
    "termoBuscaCapa": "Need_for_Speed_II",
    "capaManual": null,
    "dataAtualizacao": "2026-10-16T18:00:00Z",
    "stars": 250,
    "versaoPadrao": "v1.0.0",
    "tags": [
      "PC",
      "EA Canada",
      "Racing",
      "McLaren F1",
      "Retro"
    ]
  }
];


// ── AUXILIAR DE FILTRAGEM POR CONSOLES (XBOX 360 E CLÁSSICO SEPARADOS) ──
function portMatchesConsole(port, key) {
  const cAtivo = (key || '').toLowerCase();
  const pConsole = (port.console || '').toLowerCase();

  if (cAtivo === 'todos') return true;
  if (cAtivo === 'ps5') return pConsole === 'ps5';
  if (cAtivo === 'ps4') return pConsole === 'ps4';
  if (cAtivo === 'ps2') return pConsole === 'ps2';
  if (cAtivo === 'ps1') return pConsole === 'ps1';
  if (cAtivo === 'xone' || cAtivo === 'xboxone' || cAtivo === 'series') {
    return pConsole === 'xone' || pConsole === 'xboxone' || pConsole === 'series' || pConsole === 'xsx';
  }
  if (cAtivo === 'xbox360') return pConsole === 'xbox360';
  if (cAtivo === 'xbox') return pConsole === 'xbox';
  if (cAtivo === 'switch') return pConsole === 'switch';
  if (cAtivo === 'n64') return pConsole === 'n64';
  if (cAtivo === 'ps2_ps1') {
    return pConsole === 'ps2' || pConsole === 'ps1';
  }
  if (cAtivo === 'gc_wii' || cAtivo === 'gamecube' || cAtivo === 'wii' || cAtivo === 'gc') {
    return pConsole === 'gc' || pConsole === 'gamecube' || pConsole === 'wii' || pConsole === 'wiiu';
  }
  if (cAtivo === 'retro' || cAtivo === 'portateis') {
    return pConsole === 'psp' || pConsole === 'nds' || pConsole === 'gba' || pConsole === 'retro' || pConsole === 'nintendo';
  }
  if (cAtivo === 'pc') {
    return pConsole === 'pc' || pConsole === 'multi' || pConsole === 'outros';
  }
  return pConsole === cAtivo;
}

// ── ESTADO DA APLICAÇÃO ──
const state = {
  ports: [...PORTS_DATABASE],
  termoBusca: '',
  consoleAtivo: 'todos',
  ordenacao: 'recentes', // Padrão: Releases mais recentes
  cacheGitHub: {},
  cacheCapas: {}
};

// ── INICIALIZAÇÃO DA APLICAÇÃO ──
document.addEventListener('DOMContentLoaded', () => {
  inicializarTema();
  inicializarFiltrosURL();
  configurarEventosBusca();
  configurarEventosFiltros();
  configurarCliqueCards();
  configurarModalSugestoes();
  configurarBotaoVoltarAoTopo();
  atualizarEstatisticasHero();
  renderizarCatalogo();
});

// ── CONTROLE DE TEMA (CLARO / ESCURO) ──
function inicializarTema() {
  const themeButtons = [
    document.getElementById('themeToggleBtn'),
    document.getElementById('themeToggleBtnFooter')
  ].filter(Boolean);

  function atualizarIconesTema(tema) {
    themeButtons.forEach(btn => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      const label = btn.querySelector('.footer-theme-label');

      if (sunIcon && moonIcon) {
        if (tema === 'dark') {
          sunIcon.style.display = 'inline-block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'inline-block';
        }
      }

      if (label) {
        label.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Escuro';
      }
    });
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  atualizarIconesTema(currentTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme');
      const novoTema = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', novoTema);
      localStorage.setItem('port_integration_theme', novoTema);
      atualizarIconesTema(novoTema);
    });
  });
}

// ── SUPORTE A FILTROS VIA URL (?q=... e ?console=...) ──
function inicializarFiltrosURL() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  const consoleParam = params.get('console');

  if (q) {
    state.termoBusca = q.trim();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = state.termoBusca;
  }

  if (consoleParam) {
    state.consoleAtivo = consoleParam.trim();
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => {
      if ((p.getAttribute('data-console') || '').toLowerCase() === state.consoleAtivo.toLowerCase()) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }
}

function sincronizarURL() {
  const params = new URLSearchParams();
  if (state.termoBusca) params.set('q', state.termoBusca);
  if (state.consoleAtivo && state.consoleAtivo !== 'todos') params.set('console', state.consoleAtivo);

  const queryStr = params.toString();
  const novoCaminho = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;
  window.history.replaceState({}, '', novoCaminho);
}

// ── EVENTOS DE BUSCA ──
function configurarEventosBusca() {
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchKbd = document.getElementById('searchKbd');
  const searchDrawer = document.getElementById('searchDrawer');
  const btnResetSearch = document.getElementById('btnResetSearch');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const valor = e.target.value;
      state.termoBusca = valor.trim();

      if (searchClearBtn) {
        searchClearBtn.style.display = valor ? 'flex' : 'none';
      }
      if (searchKbd) {
        searchKbd.style.display = valor ? 'none' : 'block';
      }

      sincronizarURL();
      atualizarDrawerBusca(valor);
      renderizarCatalogo();
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0) {
        atualizarDrawerBusca(searchInput.value.trim());
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#headerSearchWrapper')) {
        if (searchDrawer) searchDrawer.classList.remove('open');
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      state.termoBusca = '';
      searchClearBtn.style.display = 'none';
      if (searchKbd) searchKbd.style.display = 'block';
      if (searchDrawer) searchDrawer.classList.remove('open');
      sincronizarURL();
      renderizarCatalogo();
    });
  }

  if (btnResetSearch) {
    btnResetSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.termoBusca = '';
      if (searchClearBtn) searchClearBtn.style.display = 'none';
      if (searchKbd) searchKbd.style.display = 'block';
      sincronizarURL();
      renderizarCatalogo();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      if (searchDrawer) searchDrawer.classList.remove('open');
      searchInput.blur();
    }
  });
}

// ── DRAWER DE SUGESTÕES RÁPIDAS ──
function atualizarDrawerBusca(termo) {
  const searchDrawer = document.getElementById('searchDrawer');
  const searchDrawerList = document.getElementById('searchDrawerList');
  const searchDrawerCount = document.getElementById('searchDrawerCount');

  if (!searchDrawer || !searchDrawerList || !searchDrawerCount) return;

  const t = termo.trim().toLowerCase();
  if (!t) {
    searchDrawer.classList.remove('open');
    return;
  }

  const resultados = state.ports.filter(port => {
    return port.nome.toLowerCase().includes(t) ||
           port.repo.toLowerCase().includes(t) ||
           port.console.toLowerCase().includes(t) ||
           port.descricao.toLowerCase().includes(t) ||
           (port.codigoJogo && port.codigoJogo.toLowerCase().includes(t));
  });

  searchDrawerCount.textContent = `${resultados.length} encontrado${resultados.length === 1 ? '' : 's'}`;

  if (resultados.length === 0) {
    searchDrawerList.innerHTML = `
      <div class="search-drawer-empty">
        Nenhum port encontrado com "${escapeHtml(termo)}"
      </div>
    `;
  } else {
    searchDrawerList.innerHTML = resultados.slice(0, 6).map(port => `
      <a href="${port.repoUrl}" target="_blank" rel="noopener noreferrer" class="search-drawer-item">
        <img src="${obterCapaCacheada(port) || './assets/favicon.png'}" class="search-drawer-thumb" alt="${port.nome}" id="drawer_thumb_${port.id}">
        <div class="search-drawer-info">
          <div class="search-drawer-title-row">
            <span class="search-drawer-name">${escapeHtml(port.nome)}</span>
            <span class="badge-console ${port.console.toLowerCase()}" style="font-size: 0.65rem; padding: 1px 5px;">${port.console}</span>
          </div>
          <span class="search-drawer-repo">${escapeHtml(port.repo)}</span>
        </div>
      </a>
    `).join('');
  }

  searchDrawer.classList.add('open');
}

// ── EVENTOS DE FILTROS E ORDENAÇÃO ──
function configurarEventosFiltros() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      state.consoleAtivo = pill.getAttribute('data-console') || 'todos';
      sincronizarURL();
      renderizarCatalogo();
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.value = state.ordenacao;
    sortSelect.addEventListener('change', (e) => {
      state.ordenacao = e.target.value;
      renderizarCatalogo();
    });
  }
}

// ── DELEGAÇÃO DE CLIQUE NOS CARDS (COM TOTAL ISOLAMENTO PARA LINKS) ──
function configurarCliqueCards() {
  const container = document.getElementById('portsGrid');
  if (!container) return;

  container.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }

    const card = e.target.closest('.port-card');
    if (card) {
      const repoUrl = card.getAttribute('data-repo-url');
      if (repoUrl) {
        window.open(repoUrl, '_blank', 'noopener,noreferrer');
      }
    }
  });
}

// ── ESTATÍSTICAS DO HERO E CONTADORES DE FILTROS ──
function atualizarEstatisticasHero() {
  const statTotalPorts = document.getElementById('statTotalPorts');
  const statTotalConsoles = document.getElementById('statTotalConsoles');

  if (statTotalPorts) statTotalPorts.textContent = state.ports.length;

  if (statTotalConsoles) {
    const consolesUnicos = new Set(state.ports.map(p => p.console));
    statTotalConsoles.textContent = consolesUnicos.size;
  }

  const filterKeys = ['todos', 'PS5', 'PS4', 'PS2', 'PS1', 'XONE', 'XBOX360', 'XBOX', 'Switch', 'N64', 'GC_WII', 'Retro', 'PC'];
  filterKeys.forEach(key => {
    const el = document.getElementById('countPill_' + key);
    if (el) {
      const count = state.ports.filter(p => portMatchesConsole(p, key)).length;
      el.textContent = count;
    }
  });

  const legacyCountTodos = document.getElementById('countPillTodos');
  if (legacyCountTodos) legacyCountTodos.textContent = state.ports.length;
}

// ── RENDERIZAÇÃO DO CATÁLOGO DE CARDS (TIPO LOJA) ──
function renderizarCatalogo() {
  const container = document.getElementById('portsGrid');
  const searchStatusBar = document.getElementById('searchStatusBar');
  const searchStatusQuery = document.getElementById('searchStatusQuery');
  const searchStatusCount = document.getElementById('searchStatusCount');

  if (!container) return;

  let filtrados = state.ports.filter(port => {
    let matchesConsole = portMatchesConsole(port, state.consoleAtivo);

    if (!matchesConsole) return false;

    if (!state.termoBusca) return true;
    const t = state.termoBusca.toLowerCase();

    const nomeMatch = port.nome.toLowerCase().includes(t);
    const repoMatch = port.repo.toLowerCase().includes(t);
    const descMatch = port.descricao.toLowerCase().includes(t);
    const consoleMatch = port.console.toLowerCase().includes(t);
    const codeMatch = port.codigoJogo && port.codigoJogo.toLowerCase().includes(t);
    const tagMatch = port.tags && port.tags.some(tag => tag.toLowerCase().includes(t));

    return nomeMatch || repoMatch || descMatch || consoleMatch || codeMatch || tagMatch;
  });

  if (state.ordenacao === 'recentes') {
    filtrados.sort((a, b) => {
      const dataA = new Date(a.dataAtualizacao || 0).getTime();
      const dataB = new Date(b.dataAtualizacao || 0).getTime();
      return dataB - dataA;
    });
  } else if (state.ordenacao === 'estrelas') {
    filtrados.sort((a, b) => (b.stars || 0) - (a.stars || 0));
  } else if (state.ordenacao === 'nome') {
    filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  if (state.termoBusca) {
    if (searchStatusBar) searchStatusBar.style.display = 'flex';
    if (searchStatusQuery) searchStatusQuery.textContent = `"${state.termoBusca}"`;
    if (searchStatusCount) searchStatusCount.textContent = `(${filtrados.length} encontrado${filtrados.length === 1 ? '' : 's'})`;
  } else {
    if (searchStatusBar) searchStatusBar.style.display = 'none';
  }

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <svg class="icon-svg empty-state-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <h3 class="empty-state-title">Nenhum port encontrado</h3>
        <p class="empty-state-desc">
          Não localizamos nenhum port ou repositório correspondente aos filtros atuais.
        </p>
        <button type="button" class="btn-empty-reset" onclick="appResetBusca()">
          Limpar filtros e ver todos os ports
        </button>
      </div>
    `;
    return;
  }

  const html = filtrados.map(port => {
    const consoleClass = port.console.toLowerCase();
    const capaPrevia = obterCapaCacheada(port);
    const versaoInicial = port.versaoPadrao || 'Port Nativo';
    const starsInicial = port.stars ? `<svg class="icon-svg star-icon-svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${port.stars.toLocaleString('pt-BR')}` : `<svg class="icon-svg star-icon-svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Ativo`;

    return `
      <article class="port-card" data-id="${port.id}" data-repo-url="${port.repoUrl}" title="Clique para abrir o repositório ${port.repo} no GitHub">
        
        <!-- Container da Capa com Carregamento Inteligente -->
        <div class="port-image-container" id="cover_container_${port.id}">
          <div class="shimmer-placeholder" id="shimmer_${port.id}" style="${capaPrevia ? 'display: none;' : ''}"></div>
          
          <img 
            src="${capaPrevia || ''}" 
            alt="Capa oficial de ${escapeHtml(port.nome)}" 
            class="port-thumb ${capaPrevia ? 'loaded' : ''}" 
            id="cover_img_${port.id}"
            loading="lazy"
            decoding="async"
          >

          <div class="card-badges-top">
            <span class="badge-console ${consoleClass}">${port.console}</span>
            <span class="badge-status">${port.codigoJogo || 'Port Nativo PC'}</span>
          </div>

          <div class="card-cover-origin" id="cover_origin_${port.id}">
            ${capaPrevia ? 'Capa Oficial' : 'Buscando Capa...'}
          </div>
        </div>

        <!-- Corpo do Card -->
        <div class="port-card-body">
          <h2 class="port-title">${escapeHtml(port.nome)}</h2>
          
          <div class="port-repo-subtitle">
            <svg class="icon-svg" style="width: 14px; height: 14px;" viewBox="0 0 24 24">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>${escapeHtml(port.repo)}</span>
          </div>

          <p class="port-desc">${escapeHtml(port.descricao)}</p>

          <!-- Metadados Sincronizados com o GitHub -->
          <div class="port-github-meta" id="github_meta_${port.id}">
            <div class="port-version-wrap">
              <span class="version-dot"></span>
              <span class="port-version-text" id="ver_text_${port.id}">${versaoInicial}</span>
            </div>
            <div class="port-meta-right">
              <span class="port-stars" id="stars_${port.id}">
                ${starsInicial}
              </span>
            </div>
          </div>

          <!-- Ações Principais: GitHub & Discord Oficial -->
          <div class="port-card-actions">
            <a href="${port.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-github" title="Ver código e releases no GitHub">
              <svg class="icon-svg" style="width: 16px; height: 16px;" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </a>

            ${(port.discordUrl || DISCORD_MAP[port.repo.toLowerCase()]) ? `
            <a href="${port.discordUrl || DISCORD_MAP[port.repo.toLowerCase()]}" target="_blank" rel="noopener noreferrer" class="btn-card-discord" title="Entrar no servidor oficial do Discord">
              <svg class="discord-svg-filled" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Discord</span>
            </a>
            ` : ''}
          </div>

        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;

  filtrados.forEach(port => {
    carregarCapaInteligente(port);
    carregarMetadadosGitHub(port);
  });
}

// ── REDIRECIONAMENTO AO GITHUB AO CLICAR NO CARD ──
function redirecionarAoGithub(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ── MÓDULO DE BUSCA INTELIGENTE DE CAPAS OFICIAIS ──
function obterCapaCacheada(port) {
  if (port.capaManual) return port.capaManual;
  const key = `port_cover_v3_${port.id}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
        return parsed.url;
      }
    }
  } catch (e) {}
  return null;
}

function salvarCapaCache(portId, url, origem = 'wikipedia') {
  const key = `port_cover_v3_${portId}`;
  try {
    localStorage.setItem(key, JSON.stringify({
      url,
      origem,
      timestamp: Date.now()
    }));
  } catch (e) {}
}

async function carregarCapaInteligente(port) {
  const imgElem = document.getElementById(`cover_img_${port.id}`);
  const shimmerElem = document.getElementById(`shimmer_${port.id}`);
  const originElem = document.getElementById(`cover_origin_${port.id}`);

  if (!imgElem) return;

  if (port.capaManual) {
    aplicarImagemCapa(imgElem, shimmerElem, originElem, port.capaManual, 'Capa Oficial Remake');
    return;
  }

  const cacheada = obterCapaCacheada(port);
  if (cacheada) {
    aplicarImagemCapa(imgElem, shimmerElem, originElem, cacheada, 'Capa Oficial');
    return;
  }

  coverApiQueue.add(async () => {
    try {
      const termoBruto = (port.termoBuscaCapa || port.nome).trim();
      let termoDecodificado = termoBruto;
      try {
        termoDecodificado = decodeURIComponent(termoBruto);
      } catch (e) {}
      const tituloFormatado = termoDecodificado.replace(/\s+/g, '_');

      const resSummary = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tituloFormatado)}`);
      if (resSummary.ok) {
        const data = await resSummary.json();
        if (data.thumbnail && data.thumbnail.source) {
          let coverUrl = data.thumbnail.source;
          if (data.originalimage && data.originalimage.source) {
            coverUrl = data.originalimage.source;
          }
          salvarCapaCache(port.id, coverUrl, 'wikipedia');
          if (imgElem.isConnected) {
            aplicarImagemCapa(imgElem, shimmerElem, originElem, coverUrl, 'Capa Oficial Wikipedia');
          }
          return;
        }
      }

      const resSearch = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(port.nome + ' video game')}&gsrlimit=1&prop=pageimages&pithumbsize=600&piprop=thumbnail&format=json&origin=*`);
      if (resSearch.ok) {
        const dataSearch = await resSearch.json();
        if (dataSearch.query && dataSearch.query.pages) {
          const pages = Object.values(dataSearch.query.pages);
          if (pages.length > 0 && pages[0].thumbnail && pages[0].thumbnail.source) {
            const coverUrl = pages[0].thumbnail.source;
            salvarCapaCache(port.id, coverUrl, 'wikipedia_search');
            aplicarImagemCapa(imgElem, shimmerElem, originElem, coverUrl, 'Capa Oficial Wikipedia');
            return;
          }
        }
      }
    } catch (err) {}

    const githubPreviewUrl = `https://opengraph.githubassets.com/1/${port.repo}`;
    salvarCapaCache(port.id, githubPreviewUrl, 'github_preview');
    aplicarImagemCapa(imgElem, shimmerElem, originElem, githubPreviewUrl, 'GitHub Preview');
  });
}

function aplicarImagemCapa(imgElem, shimmerElem, originElem, url, label) {
  if (!imgElem || !imgElem.isConnected) return;
  imgElem.onload = () => {
    imgElem.classList.add('loaded');
    if (shimmerElem) shimmerElem.style.display = 'none';
    if (originElem) originElem.textContent = label;
  };
  imgElem.onerror = () => {
    imgElem.src = './assets/favicon.png';
    imgElem.classList.add('loaded');
    if (shimmerElem) shimmerElem.style.display = 'none';
    if (originElem) originElem.textContent = 'SSLabs Hub';
  };
  imgElem.src = url;
}


// ── FILA ASSÍNCRONA DE CONCORRÊNCIA CONTROLADA (MAX 3 FETCHES SIMULTÂNEOS) ──
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.active = 0;
    this.queue = [];
  }
  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processNext();
    });
  }
  processNext() {
    if (this.active >= this.concurrency || this.queue.length === 0) return;
    this.active++;
    const { fn, resolve, reject } = this.queue.shift();
    fn()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.active--;
        this.processNext();
      });
  }
}

const githubApiQueue = new AsyncQueue(3);
const coverApiQueue = new AsyncQueue(3);
const repoInFlightPromises = new Map();

// ── MÓDULO DE CACHE INTELIGENTE DO GITHUB (TTL 24H & RATE-LIMIT BACKOFF) ──
function isRateLimitBloqueado() {
  try {
    const blockedUntil = sessionStorage.getItem('port_gh_ratelimit_blocked');
    if (blockedUntil && Date.now() < Number(blockedUntil)) {
      return true;
    }
  } catch (e) {}
  return false;
}

function marcarRateLimitBloqueado() {
  try {
    sessionStorage.setItem('port_gh_ratelimit_blocked', String(Date.now() + 45 * 60 * 1000));
    const statApi = document.getElementById('statApiStatus');
    if (statApi) {
      statApi.textContent = 'Cache Offline Seguro';
      statApi.style.color = '#a78bfa';
    }
  } catch (e) {}
}

function obterCacheGitHub(repo) {
  const key = `port_gh_${repo}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp < GITHUB_CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch (e) {}
  return null;
}

function salvarCacheGitHub(repo, data) {
  const key = `port_gh_${repo}`;
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {}
}

function construirGithubApiUrl(endpoint) {
  if (CLOUDFLARE_WORKER_PROXY && CLOUDFLARE_WORKER_PROXY.trim().length > 0) {
    const base = CLOUDFLARE_WORKER_PROXY.replace(/\/$/, '');
    return `${base}/api${endpoint}`;
  }
  return `https://api.github.com${endpoint}`;
}

async function carregarMetadadosGitHub(port) {
  const verTextElem = document.getElementById(`ver_text_${port.id}`);
  const starsElem = document.getElementById(`stars_${port.id}`);

  if (!verTextElem) return;

  const cache = obterCacheGitHub(port.repo);
  if (cache) {
    aplicarMetadadosGitHubNoCard(port.id, cache);
    port.stars = cache.stars || port.stars;
    if (cache.dataAtualizacao) port.dataAtualizacao = cache.dataAtualizacao;
    if (cache.discordUrl && !port.discordUrl) port.discordUrl = cache.discordUrl;
    return;
  }

  if (!CLOUDFLARE_WORKER_PROXY && isRateLimitBloqueado()) {
    aplicarMetadadosGitHubNoCard(port.id, {
      versao: port.versaoPadrao || 'Port Ativo',
      stars: port.stars || 'Ativo',
      dataAtualizacao: port.dataAtualizacao
    });
    return;
  }

  const repoKey = port.repo.toLowerCase();
  if (!repoInFlightPromises.has(repoKey)) {
    const fetchPromise = githubApiQueue.add(async () => {
      let versaoDetectada = port.versaoPadrao || 'Port Nativo';
      let stars = port.stars || 0;
      let dataAtualizacao = port.dataAtualizacao || '';
      let discordDetectado = port.discordUrl || null;

      try {
        const resRepo = await fetch(construirGithubApiUrl(`/repos/${port.repo}`));
        if (resRepo.status === 403 || resRepo.status === 429) {
          marcarRateLimitBloqueado();
          throw new Error('GitHub API Rate Limit atingido');
        }

        if (resRepo.ok) {
          const dataRepo = await resRepo.json();
          stars = dataRepo.stargazers_count || stars;
          if (dataRepo.updated_at) dataAtualizacao = dataRepo.updated_at;
          if (dataRepo.description && !discordDetectado) {
            const dMatch = dataRepo.description.match(/(?:https?:\/\/)?(?:discord\.(?:gg|com\/invite)\/[a-zA-Z0-9_-]+)/i);
            if (dMatch) {
              const rawUrl = dMatch[0];
              discordDetectado = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
            }
          }
        }

        try {
          const resReleases = await fetch(construirGithubApiUrl(`/repos/${port.repo}/releases`));
          if (resReleases.ok) {
            const dataReleases = await resReleases.json();
            if (Array.isArray(dataReleases) && dataReleases.length > 0) {
              const latest = dataReleases[0];
              versaoDetectada = latest.tag_name || latest.name || versaoDetectada;
              if (latest.published_at) dataAtualizacao = latest.published_at;
            }
          }
        } catch (e) {}

        const payload = {
          versao: versaoDetectada,
          stars,
          dataAtualizacao,
          discordUrl: discordDetectado
        };

        salvarCacheGitHub(port.repo, payload);
        return payload;
      } catch (err) {
        return {
          versao: port.versaoPadrao || 'Port Ativo',
          stars: port.stars || 'Ativo',
          dataAtualizacao: port.dataAtualizacao
        };
      } finally {
        repoInFlightPromises.delete(repoKey);
      }
    });

    repoInFlightPromises.set(repoKey, fetchPromise);
  }

  try {
    const dados = await repoInFlightPromises.get(repoKey);
    if (dados) {
      aplicarMetadadosGitHubNoCard(port.id, dados);
      port.stars = dados.stars || port.stars;
      if (dados.dataAtualizacao) port.dataAtualizacao = dados.dataAtualizacao;
      if (dados.discordUrl && !port.discordUrl) port.discordUrl = dados.discordUrl;
    }
  } catch (err) {
    aplicarMetadadosGitHubNoCard(port.id, {
      versao: port.versaoPadrao || 'Port Ativo',
      stars: port.stars || 'Ativo',
      dataAtualizacao: port.dataAtualizacao
    });
  }
}

function aplicarMetadadosGitHubNoCard(portId, data) {
  const verTextElem = document.getElementById(`ver_text_${portId}`);
  const starsElem = document.getElementById(`stars_${portId}`);

  if (verTextElem) {
    verTextElem.textContent = data.versao || 'Port Ativo';
  }

  if (starsElem) {
    starsElem.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon-svg star-icon-svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2');
    svg.appendChild(polygon);

    const texto = document.createTextNode(
      typeof data.stars === 'number'
        ? data.stars.toLocaleString('pt-BR')
        : (data.stars || 'Ativo')
    );

    starsElem.appendChild(svg);
    starsElem.appendChild(texto);
  }
}

// ── AUXILIARES ──
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.appResetBusca = function() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  state.termoBusca = '';
  state.consoleAtivo = 'todos';

  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-console') === 'todos') p.classList.add('active');
    else p.classList.remove('active');
  });

  sincronizarURL();
  renderizarCatalogo();
};


// ── MÓDULO DO MODAL FLUTUANTE DE SUGESTÕES (DISCORD & GITHUB) ──
function configurarModalSugestoes() {
  const openBtn = document.getElementById('openSuggestBtn');
  const closeBtn = document.getElementById('closeSuggestBtn');
  const overlay = document.getElementById('suggestModalOverlay');
  const form = document.getElementById('suggestForm');
  const statusMsg = document.getElementById('suggestStatusMsg');
  const submitBtn = document.getElementById('btnSubmitSuggest');

  if (!openBtn || !overlay) return;

  function abrirModal() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (statusMsg) statusMsg.style.display = 'none';
    const firstInput = document.getElementById('suggestGameName');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  function fecharModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', abrirModal);
  if (closeBtn) closeBtn.addEventListener('click', fecharModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      fecharModal();
    }
  });

  // Envio da Sugestão via Discord Webhook Oficial
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('suggestGameName')?.value.trim() || '';
      const plataforma = document.getElementById('suggestPlatform')?.value || 'Multiplataforma';
      const repo = document.getElementById('suggestRepoUrl')?.value.trim() || '';
      const detalhes = document.getElementById('suggestDetails')?.value.trim() || '';
      const contato = document.getElementById('suggestContact')?.value.trim() || '';

      if (!nome) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando sugestão...</span>`;
      }

      let enviadoComSucesso = false;

      try {
        const res = await fetch(`${CLOUDFLARE_WORKER_PROXY}/api/suggest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jogo: nome,
            plataforma,
            repoUrl: repo,
            detalhes,
            contato,
            dataEnvio: new Date().toISOString()
          })
        });

        if (res.ok || res.status === 204) {
          enviadoComSucesso = true;
        }
      } catch (workerErr) {}

      if (enviadoComSucesso) {
        if (statusMsg) {
          statusMsg.className = 'suggest-status-msg success';
          statusMsg.style.display = 'block';
          statusMsg.textContent = '✅ Sugestão enviada com sucesso ao Discord da SSLabs! Muito obrigado pela contribuição.';
        }
        form.reset();
        setTimeout(() => {
          fecharModal();
        }, 2500);
      } else {
        if (statusMsg) {
          statusMsg.className = 'suggest-status-msg error';
          statusMsg.style.display = 'block';
          statusMsg.textContent = '❌ Não foi possível entregar no momento. Por favor, tente novamente em alguns instantes.';
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg class="icon-svg" style="width: 16px; height: 16px; margin-right: 6px;" viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span>Enviar Sugestão</span>
        `;
      }
    });
  }
}

// ── BOTÃO DE VOLTAR AO TOPO (SCROLL TO TOP) ──
function configurarBotaoVoltarAoTopo() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

