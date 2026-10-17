// ── DICIONÁRIO DE INTERNACIONALIZAÇÃO (i18n) — SSLABS PORT INTEGRATION ──
// Suporte nativo completo a 3 idiomas: Português (pt), English (en), Español (es)
// Bandeiras em formato SVG vetorial (garantem renderização perfeita no Windows, Mac, Linux e mobile)

const FLAG_SVGS = {
  pt: `<svg class="svg-flag" viewBox="0 0 640 480" width="18" height="13" aria-hidden="true"><path fill="#009b3a" d="M0 0h640v480H0z"/><path fill="#fedf00" d="M320 40l280 200-280 200L40 240z"/><circle fill="#002776" cx="320" cy="240" r="120"/><path fill="#fff" d="M200 240c0-66.27 53.73-120 120-120 23.3 0 45.1 6.64 63.6 18.1-13.6-6.6-28.8-10.3-44.8-10.3-55.2 0-100 44.8-100 100 0 4.1.2 8.1.8 12.2H200z"/></svg>`,
  en: `<svg class="svg-flag" viewBox="0 0 640 480" width="18" height="13" aria-hidden="true"><g fill-rule="evenodd"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/><path fill="#192f5d" d="M0 0h260v259H0z"/><circle fill="#fff" cx="35" cy="35" r="8"/><circle fill="#fff" cx="95" cy="35" r="8"/><circle fill="#fff" cx="155" cy="35" r="8"/><circle fill="#fff" cx="215" cy="35" r="8"/><circle fill="#fff" cx="65" cy="70" r="8"/><circle fill="#fff" cx="125" cy="70" r="8"/><circle fill="#fff" cx="185" cy="70" r="8"/><circle fill="#fff" cx="35" cy="105" r="8"/><circle fill="#fff" cx="95" cy="105" r="8"/><circle fill="#fff" cx="155" cy="105" r="8"/><circle fill="#fff" cx="215" cy="105" r="8"/><circle fill="#fff" cx="65" cy="140" r="8"/><circle fill="#fff" cx="125" cy="140" r="8"/><circle fill="#fff" cx="185" cy="140" r="8"/><circle fill="#fff" cx="35" cy="175" r="8"/><circle fill="#fff" cx="95" cy="175" r="8"/><circle fill="#fff" cx="155" cy="175" r="8"/><circle fill="#fff" cx="215" cy="175" r="8"/><circle fill="#fff" cx="65" cy="210" r="8"/><circle fill="#fff" cx="125" cy="210" r="8"/><circle fill="#fff" cx="185" cy="210" r="8"/></g></svg>`,
  es: `<svg class="svg-flag" viewBox="0 0 640 480" width="18" height="13" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/><rect fill="#c60b1e" x="140" y="200" width="40" height="60" rx="6"/><circle fill="#c60b1e" cx="160" cy="180" r="10"/></svg>`
};

const LOCALES = {
  pt: {
    flagSvg: FLAG_SVGS.pt,
    langName: "Português (BR)",
    langCode: "PT",
    header: {
      searchPlaceholder: "Buscar port, jogo, console (PS4, N64, PS2, Xbox...) ou autor...",
      searchShortcut: "Pressione / para buscar",
      searchClear: "Limpar pesquisa",
      searchDrawerTitle: "Sugestões de Ports",
      searchDrawerFound: "encontrados",
      searchResultsFor: "Resultados para a busca:",
      searchClearBtn: "Limpar busca",
      themeToggle: "Alternar tema claro/escuro",
      github: "Explorar SSLabs no GitHub"
    },
    hero: {
      title: "Ports Nativos para Computador",
      desc: "Catálogo unificado de recompilações estáticas e ports nativos de consoles para PC (PS5, PS4, Switch, Xbox 360, N64, PS2, GameCube, Wii e outros).",
      statActive: "Ports Ativos",
      statPlayable: "Totalmente Jogáveis",
      statDev: "Em Desenvolvimento",
      statConsoles: "Plataformas",
      anyps5Live: "Ao Vivo",
      anyps5Desc: "Relinker nativo e reimplementação de bibliotecas PRX de PS5 para Windows e Linux sem emulação nem máquina virtual.",
      anyps5Repo: "Acessar repositório oficial no GitHub ↗"
    },
    filters: {
      todos: "Todos",
      PS5: "PlayStation 5",
      PS4: "PlayStation 4",
      PS2: "PlayStation 2",
      PS1: "PlayStation 1",
      XONE: "Xbox One / Series",
      XBOX360: "Xbox 360",
      XBOX: "Xbox Clássico",
      Switch: "Nintendo Switch",
      N64: "Nintendo 64",
      GC_WII: "GameCube & Wii",
      Retro: "Portáteis & Retro",
      PC: "PC / Remakes"
    },
    sort: {
      label: "Ordenar:",
      recentes: "Releases Mais Recentes",
      estrelas: "Mais Estrelas (Stars)",
      nome: "Nome (A - Z)"
    },
    cards: {
      stars: "estrelas",
      btnGithub: "GitHub",
      btnGithubTitle: "Ver código e releases no GitHub",
      btnDiscord: "Discord",
      btnDiscordTitle: "Entrar no servidor oficial do Discord",
      btnDownload: "Download / Releases",
      coverOfficial: "Capa Oficial",
      coverRemake: "Capa Oficial Remake",
      coverSearching: "Buscando Capa...",
      coverGithub: "GitHub Preview",
      emptyTitle: "Nenhum port encontrado",
      emptyDesc: "Não localizamos nenhum port ou repositório correspondente aos filtros atuais.",
      btnClearFilters: "Limpar filtros e ver todos os ports",
      status: {
        "Totalmente Jogável": "Totalmente Jogável",
        "Jogável": "Totalmente Jogável",
        "Em Desenvolvimento": "Em Desenvolvimento",
        "Experimental": "Experimental",
        "Alpha / Beta": "Alpha / Beta",
        "Requer Compilação": "Requer Compilação"
      }
    },
    floating: {
      backToTop: "Voltar ao topo da página",
      suggestPort: "Sugerir Port"
    },
    suggestModal: {
      title: "Sugerir Novo Port / Atualização",
      subtitle: "Conhece um port nativo ou recompilação que não está no site? Envie para indexarmos!",
      closeAria: "Fechar modal",
      labelName: "Nome do Jogo / Port",
      labelPlatform: "Plataforma Original",
      labelRepo: "Link do Repositório (GitHub / GitLab / Website)",
      labelDetails: "Informações Adicionais / Observações",
      labelContact: "Seu Nome, Usuário do Discord ou E-mail (Opcional)",
      placeholderName: "Ex: Demon's Souls, Jak II, Burnout 3...",
      placeholderRepo: "https://github.com/autor/nome-do-port",
      placeholderDetails: "Estado do port (jogável, em desenvolvimento), instruções de compilação ou requisitos...",
      placeholderContact: "Ex: @seu_usuario ou seu_email@exemplo.com",
      btnSubmit: "Enviar Sugestão",
      submitting: "Enviando...",
      success: "Sugestão enviada com sucesso! Obrigado por apoiar a comunidade.",
      error: "Erro ao enviar sugestão. Tente novamente."
    },
    supportModal: {
      title: "Apoie o Port Integration",
      subtitle: "Ajude a manter nossos rastreadores e catálogo 100% livres e gratuitos!",
      closeAria: "Fechar modal",
      pixTitle: "PIX Direto (Brasil)",
      pixTag: "Instantâneo • Sem Taxas",
      pixDesc: "Copie a chave aleatória ou aponte a câmera no app do seu banco:",
      pixCopy: "Copiar Chave",
      pixCopied: "Copiado! ✓",
      pixShowQr: "Mostrar QR Code",
      pixHideQr: "Ocultar QR Code",
      pixScanNotice: "Aponte a câmera no app do seu banco",
      kofiTitle: "Ko-fi (Internacional & Cartão)",
      kofiTag: "Global • PayPal & Cartão",
      kofiDesc: "Contribuição online em Dólar, Euro ou Real via cartão de crédito ou PayPal:",
      kofiBtn: "Apoiar no Ko-fi (ko-fi.com/sslabs)",
      binanceTitle: "Binance • Criptomoedas",
      binanceTag: "Cripto • USDT, BTC, ETH",
      binanceDesc: "Envie via Binance Pay com taxa zero usando o UID ou crie sua conta pelo link:",
      binanceCopy: "Copiar ID",
      binanceBtn: "Acessar via Binance (UID 1058817517)"
    },
    footer: {
      brandDesc: "Hub oficial da SSLabs para localização, catalogação e acompanhamento em tempo real de ports nativos de consoles para PC.",
      disclaimer: "⚠️ <strong>Aviso legal:</strong> Os ports nativos exigem que o usuário possua uma cópia legalmente adquirida do jogo original (bring your own game dump). Este site não armazena, hospeda nem compartilha arquivos executáveis protegidos por direitos autorais, ROMs ou ISOs.",
      supportBtn: "Apoie o Projeto",
      themeLabelLight: "Modo Claro",
      themeLabelDark: "Modo Escuro",
      rights: "© 2026 SSLabs Ecosystem. Todos os direitos reservados."
    }
  },

  en: {
    flagSvg: FLAG_SVGS.en,
    langName: "English (US)",
    langCode: "EN",
    header: {
      searchPlaceholder: "Search port, game, console (PS4, N64, PS2, Xbox...) or author...",
      searchShortcut: "Press / to search",
      searchClear: "Clear search",
      searchDrawerTitle: "Port Suggestions",
      searchDrawerFound: "found",
      searchResultsFor: "Search results for:",
      searchClearBtn: "Clear search",
      themeToggle: "Toggle light/dark theme",
      github: "Explore SSLabs on GitHub"
    },
    hero: {
      title: "Native PC Console Ports",
      desc: "Unified catalog of static recompilations and native console ports for PC (PS5, PS4, Switch, Xbox 360, N64, PS2, GameCube, Wii, and more).",
      statActive: "Active Ports",
      statPlayable: "Fully Playable",
      statDev: "In Progress",
      statConsoles: "Platforms",
      anyps5Live: "Live",
      anyps5Desc: "Native relinker and PRX library reimplementation from PS5 to Windows and Linux without emulation or virtual machines.",
      anyps5Repo: "Access official GitHub repository ↗"
    },
    filters: {
      todos: "All",
      PS5: "PlayStation 5",
      PS4: "PlayStation 4",
      PS2: "PlayStation 2",
      PS1: "PlayStation 1",
      XONE: "Xbox One / Series",
      XBOX360: "Xbox 360",
      XBOX: "Original Xbox",
      Switch: "Nintendo Switch",
      N64: "Nintendo 64",
      GC_WII: "GameCube & Wii",
      Retro: "Handhelds & Retro",
      PC: "PC / Remakes"
    },
    sort: {
      label: "Sort by:",
      recentes: "Latest Releases",
      estrelas: "Most Stars",
      nome: "Name (A - Z)"
    },
    cards: {
      stars: "stars",
      btnGithub: "GitHub",
      btnGithubTitle: "View code and releases on GitHub",
      btnDiscord: "Discord",
      btnDiscordTitle: "Join official Discord server",
      btnDownload: "Download / Releases",
      coverOfficial: "Official Cover",
      coverRemake: "Official Remake Cover",
      coverSearching: "Fetching Cover...",
      coverGithub: "GitHub Preview",
      emptyTitle: "No ports found",
      emptyDesc: "No ports match your selected filters or search query.",
      btnClearFilters: "Clear filters and view all ports",
      status: {
        "Totalmente Jogável": "Fully Playable",
        "Jogável": "Fully Playable",
        "Em Desenvolvimento": "In Development",
        "Experimental": "Experimental",
        "Alpha / Beta": "Alpha / Beta",
        "Requer Compilação": "Requires Build"
      }
    },
    floating: {
      backToTop: "Scroll to top",
      suggestPort: "Suggest Port"
    },
    suggestModal: {
      title: "Suggest New Port / Update",
      subtitle: "Know of a native port or decompilation not listed here? Submit it for indexing!",
      closeAria: "Close modal",
      labelName: "Game / Port Name",
      labelPlatform: "Original Platform",
      labelRepo: "Repository URL (GitHub / GitLab / Website)",
      labelDetails: "Additional Information / Notes",
      labelContact: "Your Name, Discord Handle or Email (Optional)",
      placeholderName: "E.g. Demon's Souls, Jak II, Burnout 3...",
      placeholderRepo: "https://github.com/author/port-name",
      placeholderDetails: "Status (playable, in progress), build instructions or requirements...",
      placeholderContact: "E.g. @your_username or user@example.com",
      btnSubmit: "Submit Suggestion",
      submitting: "Submitting...",
      success: "Suggestion sent successfully! Thank you for helping the community.",
      error: "Error sending suggestion. Please try again."
    },
    supportModal: {
      title: "Support Port Integration",
      subtitle: "Help keep our daily scanners, servers, and catalog 100% free and open!",
      closeAria: "Close modal",
      pixTitle: "Direct PIX (Brazil)",
      pixTag: "Instant • Zero Fees",
      pixDesc: "Copy the random key or scan the QR Code using your banking app:",
      pixCopy: "Copy Key",
      pixCopied: "Copied! ✓",
      pixShowQr: "Show QR Code",
      pixHideQr: "Hide QR Code",
      pixScanNotice: "Scan with your banking app",
      kofiTitle: "Ko-fi (International & Card)",
      kofiTag: "Global • PayPal & Card",
      kofiDesc: "Online support in USD, EUR or BRL via credit card or PayPal:",
      kofiBtn: "Support on Ko-fi (ko-fi.com/sslabs)",
      binanceTitle: "Binance • Cryptocurrencies",
      binanceTag: "Crypto • USDT, BTC, ETH",
      binanceDesc: "Send via Binance Pay with zero network fees using the UID or register via link:",
      binanceCopy: "Copy ID",
      binanceBtn: "Open via Binance (UID 1058817517)"
    },
    footer: {
      brandDesc: "Official SSLabs hub for tracking, indexing, and real-time status of native console ports for PC.",
      disclaimer: "⚠️ <strong>Legal disclaimer:</strong> Native ports require users to possess a legally acquired copy of the original game (bring your own game dump). This site does not host, store, or share copyrighted game executables, ROMs, or ISOs.",
      supportBtn: "Support Project",
      themeLabelLight: "Light Mode",
      themeLabelDark: "Dark Mode",
      rights: "© 2026 SSLabs Ecosystem. All rights reserved."
    }
  },

  es: {
    flagSvg: FLAG_SVGS.es,
    langName: "Español",
    langCode: "ES",
    header: {
      searchPlaceholder: "Buscar port, juego, consola (PS4, N64, PS2, Xbox...) o autor...",
      searchShortcut: "Presiona / para buscar",
      searchClear: "Limpiar búsqueda",
      searchDrawerTitle: "Sugerencias de Ports",
      searchDrawerFound: "encontrados",
      searchResultsFor: "Resultados para la búsqueda:",
      searchClearBtn: "Limpiar búsqueda",
      themeToggle: "Alternar tema claro/oscuro",
      github: "Explorar SSLabs en GitHub"
    },
    hero: {
      title: "Ports Nativos para Ordenador",
      desc: "Catálogo unificado de recompilaciones estáticas y ports nativos de consolas para PC (PS5, PS4, Switch, Xbox 360, N64, PS2, GameCube, Wii y otros).",
      statActive: "Ports Activos",
      statPlayable: "Totalmente Jugables",
      statDev: "En Desarrollo",
      statConsoles: "Plataformas",
      anyps5Live: "En Vivo",
      anyps5Desc: "Relinker nativo y reimplementación de librerías PRX de PS5 para Windows y Linux sin emulación ni máquina virtual.",
      anyps5Repo: "Acceder al repositorio oficial en GitHub ↗"
    },
    filters: {
      todos: "Todos",
      PS5: "PlayStation 5",
      PS4: "PlayStation 4",
      PS2: "PlayStation 2",
      PS1: "PlayStation 1",
      XONE: "Xbox One / Series",
      XBOX360: "Xbox 360",
      XBOX: "Xbox Clásico",
      Switch: "Nintendo Switch",
      N64: "Nintendo 64",
      GC_WII: "GameCube & Wii",
      Retro: "Portátiles y Retro",
      PC: "PC / Remakes"
    },
    sort: {
      label: "Ordenar:",
      recentes: "Lanzamientos Más Recientes",
      estrelas: "Más Estrellas",
      nome: "Nombre (A - Z)"
    },
    cards: {
      stars: "estrellas",
      btnGithub: "GitHub",
      btnGithubTitle: "Ver código y lanzamientos en GitHub",
      btnDiscord: "Discord",
      btnDiscordTitle: "Entrar al servidor oficial de Discord",
      btnDownload: "Descargar / Releases",
      coverOfficial: "Portada Oficial",
      coverRemake: "Portada Oficial Remake",
      coverSearching: "Buscando Portada...",
      coverGithub: "GitHub Preview",
      emptyTitle: "No se encontraron ports",
      emptyDesc: "Ningún port coincide con los filtros seleccionados o término de búsqueda.",
      btnClearFilters: "Limpiar filtros y ver todos los ports",
      status: {
        "Totalmente Jogável": "Totalmente Jugable",
        "Jogável": "Totalmente Jugable",
        "Em Desenvolvimento": "En Desarrollo",
        "Experimental": "Experimental",
        "Alpha / Beta": "Alpha / Beta",
        "Requer Compilação": "Requiere Compilación"
      }
    },
    floating: {
      backToTop: "Volver arriba",
      suggestPort: "Sugerir Port"
    },
    suggestModal: {
      title: "Sugerir Nuevo Port / Actualización",
      subtitle: "¿Conoces un port nativo o recompilación que no esté aquí? ¡Envíalo para indexarlo!",
      closeAria: "Cerrar modal",
      labelName: "Nombre del Juego / Port",
      labelPlatform: "Plataforma Original",
      labelRepo: "Enlace del Repositorio (GitHub / GitLab / Website)",
      labelDetails: "Información Adicional / Observaciones",
      labelContact: "Tu Nombre, Usuario de Discord o Email (Opcional)",
      placeholderName: "Ej: Demon's Souls, Jak II, Burnout 3...",
      placeholderRepo: "https://github.com/autor/nombre-del-port",
      placeholderDetails: "Estado del port (jugable, en desarrollo), instrucciones de compilación o requisitos...",
      placeholderContact: "Ej: @tu_usuario o tu_email@ejemplo.com",
      btnSubmit: "Enviar Sugerencia",
      submitting: "Enviando...",
      success: "¡Sugerencia enviada con éxito! Gracias por apoyar a la comunidad.",
      error: "Error al enviar la sugerencia. Inténtalo de nuevo."
    },
    supportModal: {
      title: "Apoya a Port Integration",
      subtitle: "¡Ayuda a mantener nuestros rastreadores diarios y catálogo 100% libres y gratuitos!",
      closeAria: "Cerrar modal",
      pixTitle: "PIX Directo (Brasil)",
      pixTag: "Instantáneo • Sin Comisiones",
      pixDesc: "Copia la clave aleatoria o escanea el código QR con tu app bancaria:",
      pixCopy: "Copiar Clave",
      pixCopied: "¡Copiado! ✓",
      pixShowQr: "Mostrar Código QR",
      pixHideQr: "Ocultar Código QR",
      pixScanNotice: "Apunta la cámara con tu app bancaria",
      kofiTitle: "Ko-fi (Internacional y Tarjeta)",
      kofiTag: "Global • PayPal y Tarjeta",
      kofiDesc: "Donación online en Dólar, Euro o Real mediante tarjeta de crédito o PayPal:",
      kofiBtn: "Apoyar en Ko-fi (ko-fi.com/sslabs)",
      binanceTitle: "Binance • Criptomonedas",
      binanceTag: "Cripto • USDT, BTC, ETH",
      binanceDesc: "Envía mediante Binance Pay sin comisiones usando el UID o regístrate mediante el enlace:",
      binanceCopy: "Copiar ID",
      binanceBtn: "Acceder mediante Binance (UID 1058817517)"
    },
    footer: {
      brandDesc: "Hub oficial de SSLabs para localización, catalogación y seguimiento en tiempo real de ports nativos de consolas para PC.",
      disclaimer: "⚠️ <strong>Aviso legal:</strong> Los ports nativos requieren que el usuario posea una copia legalmente adquirida del juego original (bring your own game dump). Este sitio no almacena, aloja ni comparte ejecutables protegidos por derechos de autor, ROMs o ISOs.",
      supportBtn: "Apoya el Proyecto",
      themeLabelLight: "Modo Claro",
      themeLabelDark: "Modo Oscuro",
      rights: "© 2026 SSLabs Ecosystem. Todos los derechos reservados."
    }
  }
};
