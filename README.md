# 🎮 Port Integration — Native PC Ports Hub
### SSLabs Ecosystem • v1.00 (Build 07)

O maior catálogo e buscador unificado de ports nativos de consoles para computador (PS4, Switch, Xbox 360, N64, PS2, PS1, Xbox Clássico, GameCube, Wii, Wii U, PSP e Retro), reconstruídos através de engenharia reversa automatizada, recompilação estática assistida por IA e descompilações de código aberto.

---

## ⚡ A Revolução Recente dos Ports por IA & Recompilação Estática

Nos últimos meses (2024–2026), a cena de ports de jogos de videogame para PC experimentou uma aceleração sem precedentes impulsionada por:
1. **Modelos de Linguagem (LLMs) & Decompilação Neural**: Uso de inteligência artificial acoplada ao Ghidra, IDA Pro e Binary Ninja para reconstruir structs, mapear chamadas de API, identificar nomes de funções e decodificar lógicas complexas de binários de PowerPC (Xbox 360, Wii U), Cell/PPU (PS3), MIPS (PS1, PS2, N64) e x86-64 (PS4).
2. **Recompiladores Estáticos (Recomps)**: Ferramentas revolucionárias como **N64Recomp**, **XenonRecomp**, **ReXGlue**, **ShiftGlue**, **PS1Recomp** e **PS2Recomp** que traduzem instruções de console diretamente para C/C++ ou código de máquina x86 nativo sem a sobrecarga de um emulador em tempo real.
3. **Camadas de Execução Direta (Direct Run-Times)**: Como o projeto **shadPS4** e runtimes autônomos que permitem rodar *Bloodborne*, *God of War III Remastered* e *The Last Guardian* com resoluções de até 4K, 120 FPS e suporte a DLSS/FSR.

---

## 🚀 Novidades da Build 07

1. **Cloudflare Worker Oficial Conectado & Operando**:
   - Integrado o Worker oficial do usuário `https://sslabs-port-proxy.sstudioslabs.workers.dev` diretamente no motor principal `app.js`.
   - Limite de 5.000 requisições/hora autenticado com chave privada do GitHub e Edge Cache mundial de 4 horas em produção.
2. **Correção e Blindagem Completa dos Servidores do Discord**:
   - Verificação de 100% dos links de convite contra a API oficial do Discord.
   - Eliminados todos os links que causavam a mensagem de "Convite inválido":
     - Integrado o servidor oficial do **shadPS4** (`https://discord.gg/bFJxfftGW6`, 40.500+ membros) para os ports de PS4.
     - Integrado o servidor oficial do **fpPS4** (`https://discord.gg/up9qatpX7M`).
     - Servidores permanentes oficiais de *Harbour Masters*, *N64 Recomp*, *OpenGOAL*, *SM64 Coop*, *DevilutionX*, *OpenRCT2*, *Twilit Realm*, *WipEout*, *Celeste* e *Silent Hill*.
   - Projetos sem servidor oficial verificado têm o botão de Discord omitido, exibindo com elegância apenas o repositório oficial do GitHub.
3. **Expansão Massiva de Jogos de PS4 (36 Jogos & Runtimes)**:
   - Adicionada a franquia completa **Uncharted**:
     - *Uncharted: The Nathan Drake Collection* (Trilogia Uncharted 1, 2 e 3 Remasterizados pela Bluepoint a 4K)
     - *Uncharted 4: A Thief's End* (PS4 Native Layer)
     - *Uncharted: The Lost Legacy* (PC Native)
   - Adicionados os maiores exclusivos da plataforma: *Ghost of Tsushima*, *God of War (2018)*, *Marvel's Spider-Man*, *Death Stranding*, *Horizon Zero Dawn*, *Days Gone*, *Detroit: Become Human*, *Persona 5 / Royal*, *Red Dead Redemption Remastered*, *MediEvil (2019)*, *WipEout Omega Collection* e *Gran Turismo Sport*.
4. **Catálogo Total Ampliado para 204 Ports Nativos**:
   - Mais de duas centenas de projetos verificados e indexados com capas automáticas e ordenação por releases mais recentes.

---

## 📖 Passo a Passo: Configuração da Chave da API e do Cloudflare Worker

> [!NOTE]
> **Você NÃO precisa criar nenhum repositório no GitHub para gerar a chave!**  
> A chave de API do GitHub é um *Personal Access Token* da sua conta pessoal, usada exclusivamente para autenticar consultas de leitura pública e liberar o limite de 5.000 requisições/hora.

### Passo 1: Gerar a Chave no GitHub (2 Minutos)
1. Acesse sua conta no GitHub e abra:  
   👉 [https://github.com/settings/tokens](https://github.com/settings/tokens)  
   *(Ou clique na sua foto de perfil → **Settings** → no final da coluna esquerda em **Developer Settings** → **Personal access tokens** → **Tokens (classic)**)*.
2. Clique no botão **Generate new token** → selecione **Generate new token (classic)**.
3. No campo **Note**, digite um nome identificador: `SSLabs Port Integration Proxy`.
4. No campo **Expiration**, selecione `No expiration` (ou o prazo que preferir).
5. **Atenção nas Permissões (Scopes):**  
   **NÃO marque nenhuma caixa de seleção!**  
   *(Para consultar versões, releases e estrelas de repositórios públicos, o GitHub NÃO exige nenhum escopo. Deixar tudo desmarcado é o método mais seguro possível, pois o token não terá permissão para alterar nada na sua conta).*
6. Role até o fim e clique no botão verde **Generate token**.
7. **Copie o código gerado** (inicia com `ghp_...`). Guarde-o, pois ele só aparece uma vez.

---

### Passo 2: Publicar o Worker na Cloudflare (Gratuito e Imediato)

Você pode configurar o Worker de duas maneiras simples:

#### Método A: Pelo Navegador (Sem Instalar Nada)
1. Acesse o painel da Cloudflare: 👉 [https://dash.cloudflare.com/](https://dash.cloudflare.com/) (crie uma conta gratuita se não tiver).
2. No menu lateral, clique em **Compute (Workers) > Workers & Pages**.
3. Clique em **Create application** → **Create Worker**.
4. Dê o nome de `sslabs-port-proxy` e clique em **Deploy**.
5. Clique em **Edit code** (ou *Quick Edit*).
6. Apague o código que estiver lá e cole todo o conteúdo do arquivo [`worker/cloudflare-worker.js`](./worker/cloudflare-worker.js).
7. Clique em **Deploy** no canto superior direito.
8. Agora adicione a chave do GitHub com segurança:
   - Volte na página do seu Worker e clique na aba **Settings** (Configurações).
   - Clique em **Variables and Secrets** (Variáveis e Segredos).
   - Clique em **Add** sob *Secrets*:
     - **Name:** `GITHUB_TOKEN`
     - **Value:** Cole o seu token do GitHub (`ghp_...`).
   - Clique em **Save and deploy**.
9. Pronto! Copie a URL do seu Worker que aparece no topo (exemplo: `https://sslabs-port-proxy.seu-subdominio.workers.dev`).

#### Método B: Pelo Terminal (Wrangler CLI)
Caso prefira usar o terminal:
```bash
# 1. Acesse a pasta do worker
cd "C:\Users\samue\Documents\Port Integration\worker"

# 2. Faça login na Cloudflare
npx wrangler login

# 3. Adicione o secret do token (cole seu token quando for solicitado)
npx wrangler secret put GITHUB_TOKEN

# 4. Publique na Cloudflare
npx wrangler deploy
```

---

### Passo 3: Conectar a URL do Worker no Site
1. Abra o arquivo [`app.js`](./app.js).
2. Na linha 6, cole a URL do seu Worker gerada no Passo 2:
   ```javascript
   const CLOUDFLARE_WORKER_PROXY = 'https://sslabs-port-proxy.seu-subdominio.workers.dev';
   ```
3. Salve o arquivo.

### Passo 4: Como Testar se Está Funcionando
Abra no seu navegador a URL do seu worker com `/status`:
👉 `https://sslabs-port-proxy.seu-subdominio.workers.dev/status`

Você verá um relatório em tempo real formatado em JSON confirmando:
```json
{
  "servico": "SSLabs Port Integration — GitHub Edge Proxy",
  "versao": "Build 05",
  "status": "online",
  "autenticacaoGithub": "Configurado e Ativo (Token Privado presente)",
  "cotaGithub": {
    "limiteTotal": 5000,
    "requisicoesRestantes": 4998,
    "resetaEmMinutos": 52
  },
  "cacheEdgeCloudflare": {
    "ativo": true,
    "duracaoCacheFresco": "4 horas (14.400 segundos)"
  }
}
```

---

## 🕹️ Destaques dos Ports Indexados (Amostra Selecionada)

| Jogo | Plataforma Original | Repositório Oficial no GitHub | Tipo / Motor |
| :--- | :--- | :--- | :--- |
| **Shadow of the Colossus (Remake 2018)** | PS4 | `AjncSystem/ShadowOfTheColossus-PC` | Native Windows Port |
| **Bloodborne (PS4 Native Loader)** | PS4 | `shadps4-emu/shadPS4` | Native Vulkan Layer |
| **Bloodborne for Windows (Standalone)** | PS4 | `Supermedo/bloodborne_pc` | Standalone Recomp |
| **The Last Guardian** | PS4 | `HayatoG/tlg_pc` | Native Vulkan Port |
| **God of War III Remastered** | PS4 | `FelipePrado0/gow3_pc` | Native Runtime |
| **Crash Team Racing Nitro-Fueled** | PS4 | `shadps4-emu/shadPS4` | Native Vulkan Layer |
| **Sonic Unleashed (Unleashed Recompiled)** | Xbox 360 | `hedge-dev/UnleashedRecomp` | XenonRecomp |
| **Skate 3 Recomp** | Xbox 360 | `mchughalex/skate3recomp` | XenonRecomp |
| **Skate 2 Recompiled** | Xbox 360 | `christianortel/skate2-recompile-pc` | XenonRecomp |
| **Forza Horizon 1 (Pinyon Shift)** | Xbox 360 | `arcanite24/pinyon-shift` | ShiftGlue / Xenon |
| **Gears of War: Judgment** | Xbox 360 | `OverkillLabs3/gears-judgement-recomp` | ReXGlue |
| **Dante's Inferno (Hell's Gate)** | Xbox 360 | `florinp93/hells-gate-recomp` | XenonRecomp |
| **Fable II Recomp** | Xbox 360 | `himdo/Fable-2-Recomp` | XenonRecomp |
| **Sonic the Hedgehog 2006 (Marathon)** | Xbox 360 | `sonicnext-dev/MarathonRecomp` | XenonRecomp |
| **GoldenEye 007 (XBLA Remaster)** | Xbox 360 | `SunJaycy/GoldenEye-Recomp` | XenonRecomp |
| **Blue Dragon** | Xbox 360 | `zolaware/reblue` | XenonRecomp |
| **Lost Odyssey Recomp** | Xbox 360 | `freefrank/LostOdysseyRecomp` | XenonRecomp |
| **Crackdown Recomp** | Xbox 360 | `Unowa001/crackdown-recomp` | XenonRecomp |
| **Burnout Revenge (Xerenge)** | Xbox 360 | `shipa-2/Xerenge` | XenonRecomp |
| **Midnight Club: Los Angeles** | Xbox 360 | `holdmysocks/mcla-recomp` | XenonRecomp |
| **Need for Speed: Most Wanted (2005)** | Xbox 360 | `madelrandel-blip/NFSMW-Recompiled` | XenonRecomp |
| **Need for Speed: Carbon Recomp** | Xbox 360 | `Sampreeth004/nfs-carbon-recomp` | XenonRecomp |
| **Project Gotham Racing 4** | Xbox 360 | `beatrixzy/PGR4-Recomp` | XenonRecomp |
| **The Darkness Recomp** | Xbox 360 | `portingpete/The-Darkness-Recomp` | XenonRecomp |
| **The Simpsons Game** | Xbox 360 | `YesterMester/TheSimpsonsGameRecomp` | XenonRecomp |
| **Tony Hawk's Project 8** | Xbox 360 | `theokyr/Project8Recomp` | XenonRecomp |
| **Zelda: The Wind Waker HD** | Wii U | `ZeldaWWHDRecomp/ZeldaWWHDRecomp` | Static Recomp |
| **Zelda: Twilight Princess (Dusklight)** | GameCube | `TwilitRealm/dusklight` | Source Port |
| **Zelda: Ocarina of Time (Shipwright)** | N64 | `HarbourMasters/Shipwright` | Full Decompilation |
| **Zelda: Majora's Mask (Zelda64Recomp)** | N64 | `Zelda64Recomp/Zelda64Recomp` | N64Recomp |
| **Super Mario 64 (sm64coopdx)** | N64 | `coop-deluxe/sm64coopdx` | Decomp / Multiplayer |
| **Banjo-Kazooie Recompiled** | N64 | `BanjoRecomp/BanjoRecomp` | N64Recomp |
| **Conker's Bad Fur Day Recompiled** | N64 | `sciaschi/CBFD-Recompiled` | N64Recomp |
| **Donkey Kong 64 Recompiled** | N64 | `Rainchus/Donkey-Kong-64-Recompiled` | N64Recomp |
| **Diddy Kong Racing Recompiled** | N64 | `ThatGuyMcd/DKR-R` | N64Recomp |
| **God of War I & II (PS2 Recomp)** | PS2 | `Klexster/god-of-war-recomp` | PS2Recomp |
| **Jak & Daxter Trilogy (OpenGOAL)** | PS2 | `open-goal/jak-project` | GOAL Native Engine |
| **ICO (PC Port)** | PS2 | `nathanialf/ico-pc` | Native Port |
| **Silent Hill 2 (SH2-NX)** | PS2 | `cutarev/sh2-nx` | Native Recomp |
| **Dark Cloud 2 (Dark Chronicle)** | PS2 | `Red-tv141/DC2-PS2RECOMP` | PS2Recomp |
| **Dragon Quest VIII** | PS2 | `Sinan-Karakaya/DQ8-Recompiled` | PS2Recomp |
| **Castlevania: Symphony of the Night** | PS1 | `BlackLabelHQ/SymphonyRecomp` | PS1Recomp |
| **Bloody Roar 2 Recompiled** | PS1 | `novapowers0/BloodyRoar2Recomp` | PS1Recomp |
| **Tekken 3 Recomp** | PS1 | `fabioap-cpu/Tekken3Recomp` | PS1Recomp |
| **Crash Bandicoot 2: Cortex Strikes Back**| PS1 | `Zumbo06/Crash2Recomp` | PS1Recomp |
| **Halo: Combat Evolved (OpenCE)** | Xbox Clássico | `OpenCommunityEdition/OpenCE` | Native Engine Recomp |
| **Jet Set Radio Future (JSRF Unleashed)**| Xbox Clássico | `JuMatt/JetSetRadioFuture-Unleashed` | Native Port |
| **BLACK (2006)** | Xbox Clássico | `portingpete/Black-2006-Recomp` | Static Recomp |
| **GTA: Liberty City Stories** | PSP | `elmasas/lcs-recomp` | PSP Recomp |
| **GTA: Vice City Stories** | PSP | `codepdbh/PSPRecomp-VCS-Android` | PSP Recomp |
| **Zelda: Link's Awakening (LAS Recomp)** | Switch | `peiikai/LASRecomp` | Switch Native Recomp |
| **Super Mario Sunshine (Sunpad)** | GameCube | `chrissotraidis/sunpad` | 60 FPS Recomp |
| **Super Smash Bros. Melee (MeleePC)** | GameCube | `999sian/melee-pc` | Native Recomp |
| **Super Mario Galaxy 1 & 2 (Nebula)** | Wii | `keepvaibin/nebula` | Native Recomp |
| **Mario Kart Wii (DriftDroid)** | Wii | `dorPXP/driftdroid` | Native Port |

---

### Histórico de Builds — Ciclo v1.00

#### Build 08 (17/10/2026)
- **Purificação e Auditoria de Ports Nativos Reais**:
  - Eliminação de 25 entradas duplicadas de jogos comerciais que apontavam para emuladores genéricos (`shadPS4`, `fpPS4`, etc.).
  - Remoção de ferramentas de emulação e forks de emuladores (`shadps4-emu/shadPS4`, `red-prig/fpPS4`, `junminlee2004/GR2fork`, `RussoPhone/tomodachi-ltd-recomp`).
  - Remoção de 9 repositórios inexistentes (404) no GitHub detectados via API auditada.
  - Inclusão do port nativo autônomo oficial de **Uncharted: The Nathan Drake Collection** para Windows por SuperMedo (`Supermedo/uncharted_pc`).
  - Catálogo purificado com **167 ports nativos legítimos** (decompilações, recomps estáticos C/C++ e source ports).
- **Favicons Padronizados e Limpos**:
  - Utilização estrita e exclusiva de `.ico` (`assets/favicon.ico`) e `.png` (`assets/favicon.png`).
  - Limpeza total de arquivos redundantes e eliminação de distorção na aba do navegador.
- **Título Simplificado**:
  - `<title>` encurtado exatamente para `Port Integration`.
- **Performance e Fila de Concorrência (`AsyncQueue`)**:
  - Fila assíncrona controlada com máximo de 3 requisições simultâneas para GitHub e Wikipedia, eliminando gargalos de rede e travamentos.
  - Deduplicação de requisições em voo por repositório.
  - Cache local persistente de 24 horas no `localStorage` com carregamento instantâneo (0ms).
- **Calibração dos Filtros por Console**:
  - Separação estrita entre **Xbox 360** (`XBOX360`) e **Xbox Clássico** (`XBOX`).
  - Contadores dinâmicos sincronizados com o banco real de ports nativos.
  - Ordenação padrão por releases mais recentes do GitHub.

#### Build 09 (17/10/2026)
- **Restauração de Ports Nativos e Inclusão de PlayStation 5**:
  - Restauração de **inFAMOUS: Second Son** e **inFAMOUS: First Light** com os ports nativos de C++ com lançador autônomo e suporte a sensores de movimento por HayatoG (`HayatoG/iss_pc`).
  - Inclusão dos ports nativos e toolchains de **PlayStation 5**:
    - `boykopovar/AnyPS5`: toolchain de recompilação e relinking nativo de executáveis de PS5 para Windows e Linux (40.700+ ⭐).
    - `ymatrix1/PortPS5`: conversor nativo de binários de PS5 para Windows com chamadas diretas Vulkan.
    - Demon's Souls Remake e Astro's Playroom como ports nativos de PS5 para PC.
  - Nova pílula e filtro dedicado para **PlayStation 5** (`PS5`) com contador dinâmico e estilos visuais oficiais.
- **Refinamento de Textos Institucionais**:
  - Remoção do texto do Hero sobre revolução de IA, mantendo a descrição limpa e focada no escopo multiplataforma.
  - Reformulação assertiva da frase do rodapé: *"Hub oficial da SSLabs para localização, catalogação e acompanhamento em tempo real de ports nativos de consoles para PC."*
- **Substituição de Emojis por Código SVG Vetorial Puro**:
  - Todos os emojis (como ⭐ nas avaliações e ⚠️ nos alertas) foram substituídos por código SVG vetorial nativo (`.star-icon-svg` e `.alert-icon`), garantindo renderização consistente em qualquer sistema operacional.
- **Limpeza de Comentários no Código**:
  - Remoção completa de comentários transitórios, histórico de alterações e rascunhos em `app.js`, `index.html` e `styles.css`, preservando apenas delimitadores estruturais essenciais de módulos.
- **Automação Serverless de Novos Repositórios (Sem Banco de Dados)**:
  - Criação do script `scripts/discover-ports.js` para varredura da Search API do GitHub através do Worker com queries especializadas de ports e recomps.
  - Criação do workflow `.github/workflows/auto-discover-ports.yml` para execução periódica semanal gratuita no GitHub Actions, gerando Pull Requests automáticos quando novos ports forem detectados.

#### Build 10 (17/10/2026)
- **Ajuste de Catálogo PS5 e PS4**:
  - Remoção dos cards de toolchains genéricas `AnyPS5` e `PortPS5` do catálogo, preservando apenas os jogos nativos autônomos de PS5 (*Demon's Souls Remake* e *Astro's Playroom*).
  - Remoção de *inFAMOUS: First Light* por não possuir repositório autônomo próprio (o projeto `HayatoG/iss_pc` é exclusivo do *Second Son*).
  - Catálogo consolidado com **170 ports nativos reais e verificados**.
- **Restauração Visual**:
  - Restauração do emoji `⚠️` original no aviso legal do rodapé.
- **Automação Diária de Madrugada no GitHub Actions**:
  - Configuração do agendamento diário (`cron: '0 6 * * *'`, correspondente às 03:00 da manhã no horário de Brasília) em `.github/workflows/auto-discover-ports.yml`.
  - Consumo otimizado: ~10 minutos/mês dos 2.000 minutos gratuitos mensais do GitHub Actions (ou ilimitado se o repositório for público).
- **Limpeza Completa de Arquivos Locais**:
  - Remoção de logos e assets não utilizados (`logo-sslabs-black.png`, `logo-sslabs-store-email.png`, caches `.wrangler`).
  - Estrutura local 100% limpa, contendo apenas os arquivos estritamente usados pela aplicação.

#### Build 11 (17/10/2026)
- **Botão Flutuante de Sugestões e Modal Interativo**:
  - Implementação do botão flutuante no canto inferior direito (`.floating-suggest-btn`) com gradiente roxo SSLabs, animações suaves e efeito glow.
  - Modal interativo (`.suggest-modal-overlay`) para envio de sugestões de ports nativos ausentes ou correções.
  - Multi-canal de envio:
    - **Discord Webhook** direto através do Cloudflare Worker (`POST /api/suggest`) com mensagens embed ricas.
    - **GitHub Issue** automática pré-formatada no repositório oficial da SSLabs.
    - **E-mail (mailto)** de contingência sem necessidade de servidores externos.
- **Logo do Discord Preenchida**:
  - Atualização do ícone do Discord nos botões de ação dos cards para a versão oficial com preenchimento sólido moderno.

---

© 2026 **SSLabs Ecosystem**.




