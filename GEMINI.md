# Regras do Projeto (Port Integration)

Este documento define as diretrizes e regras obrigatórias para o desenvolvimento deste projeto.

---

### 1. Idioma e Comunicação
- Sempre falar e comunicar-se em Português do Brasil (pt-BR).

---

### 2. Padrão Unificado do SSLabs EcoSystem (A.BBB) e Papel de Infraestrutura
- O SSLabs EcoSystem opera exclusivamente nos bastidores como infraestrutura de base e design system, nunca sendo o "rosto" do produto.
- A única citação ao SSLabs EcoSystem deve ser feita no rodapé da página acompanhada da versão unificada no formato `A.BBB`.

---

### 3. Proibição Estrita de Emojis e Uso Obrigatório de SVG
- Nesta bancada é expressamente proibido o uso de emojis (interfaces, botões, títulos, cards, badges, menus, logs, textos).
- Exceção: Somente quando expressamente autorizado pelo usuário (como o símbolo de aviso `⚠️` no rodapé/disclaimer do PortIntegration).
- Todo e qualquer ícone, símbolo ou elemento visual deve ser implementado via código vetorial **SVG**.

---

### 4. Ciclo de Modificações e Builds
- Manter o versionamento estático e subir o número de build a cada ciclo de alteração (`A.BBB`).
- Backups obrigatórios em `backups/<versao>_<build>_<data_hora>/`.

---

### 5. Não Abrir Arquivos Após Modificações
- Não abrir arquivos no editor/IDE após realizar alterações ou criações de arquivos.
