# Portfólio — António Faustino

Site pessoal e portfólio de projetos desenvolvidos no curso de **Engenharia Informática e Multimédia (LEIM)** do **ISEL**.

O site junta uma página de apresentação pessoal (escutismo, atividades, competências e contacto) com quatro projetos web interativos: um visualizador de áudio, um jogo de Blackjack e dois dashboards de dados feitos em Quarto.

🌐 **Site:** [tobi-a4454.web.app](https://tobi-a4454.web.app)

---

## Projetos

### 🎧 WaveCanvas — Visualizador de Áudio
[`public/WaveCanvas/`](public/WaveCanvas/)

Sistema de visualização de áudio em tempo real, feito com a **Web Audio API** e a **Canvas 2D API**.

- Entrada de áudio pelo **microfone** ou por um **ficheiro** local
- Quatro modos de visualização: **espectro de frequências**, **forma de onda**, **partículas** e **circular**
- Propriedades da visualização ajustáveis em tempo real
- Exportação do frame atual em **PNG** ou **JPEG**

A arquitetura é orientada a objetos e usa módulos ES. A classe base `AudioVisualization` tem uma subclasse por modo, gerida pelo `VisualizationEngine`. O `AudioProcessor` processa o áudio, o `UIManager` trata da interface e o `ExportManager` faz a exportação.

### 🃏 Blackjack
[`public/blackjack/`](public/blackjack/)

Uma variante de Blackjack contra a casa, em JavaScript puro, com o limite em **25** pontos em vez de 21.

- Novo jogo, pedir carta (*hit*) e parar (*stand*)
- Quando o jogador para, a casa revela a carta escondida (com animação) e continua a tirar cartas até chegar a 20
- Um Ás conta 1 ou 11, consoante o que for melhor para a mão
- Cartas com o estilo do baralho do *Balatro*, numa mesa de feltro verde

Está organizado nas classes `Card`, `Deck`, `Pile` e `Blackjack`.

### 🗳️ Dashboard Eleições Legislativas 2025
[`public/EleicoesDashboard/`](public/EleicoesDashboard/)

Dashboard sobre os resultados das Legislativas 2025 em Portugal Continental, feito com **Quarto** e **Observable JS (D3)**.

- **Dados**: totais nacionais, mapa interativo dos distritos colorido pelo partido mais votado, tabela de resultados do distrito selecionado e gráfico de barras com a distribuição dos votos de um partido por distrito
- **Resultados por Partido**: gráfico *sunburst* interativo com os votos de cada partido por distrito
- **Dados Completos**: tabela com todos os dados importados (votos, área, número de concelhos, …)

Os dados vêm dos ficheiros `.xlsx` em `data/` e são convertidos para JSON com [`cleanData.js`](public/EleicoesDashboard/cleanData.js) e [`dataProcessor.html`](public/EleicoesDashboard/dataProcessor.html).

### 🎵 Spotify Dashboard
[`public/SpotifyDashboard/`](public/SpotifyDashboard/)

Dashboard em **Quarto** que usa a **Spotify Web API** e reaproveita o motor de visualização do WaveCanvas.

- **Top Hits**: playlists públicas incorporadas (Top Global, Top Portugal, Viral 50)
- **Your Top**: as tuas top tracks e o teu perfil do Spotify. Precisa de um token de acesso, que dura 1 hora
- **Top 10 Local 2025**: leitor de áudio com visualização *waveform*, controlos multimédia e atalhos de teclado (`Espaço`, `←`, `→`)

A documentação completa, incluindo como obter o token, está no [README do projeto](public/SpotifyDashboard/README.md).

---

## Estrutura

```
.
├── firebase.json          # Configuração do Firebase Hosting
├── .firebaserc            # Projeto Firebase (tobi-a4454)
└── public/                # Tudo o que é publicado
    ├── index.html         # Página principal do portfólio
    ├── 404.html
    ├── css/  fonts/  images/
    ├── WaveCanvas/
    ├── blackjack/
    ├── EleicoesDashboard/ # Fonte: tp4.qmd   → publicado: tp4.html
    └── SpotifyDashboard/  # Fonte: index.qmd → publicado: _site/index.html
```

## Tecnologias

HTML5 · CSS3 · JavaScript (módulos ES) · Bootstrap 5 · Font Awesome · Web Audio API · Canvas 2D · D3.js · Observable JS · Quarto · Spotify Web API · Firebase Hosting

---

## Correr localmente

Os projetos usam módulos ES e carregam ficheiros JSON, por isso **não funcionam se abrires o `index.html` diretamente** (`file://`). Tens de os servir por HTTP, de uma destas formas:

```bash
# Opção 1 — servidor do Firebase (igual à produção)
firebase serve

# Opção 2 — qualquer servidor estático
npx serve public
# ou
python -m http.server --directory public
```

Depois abre `http://localhost:5000` (Firebase), `http://localhost:3000` (serve) ou `http://localhost:8000` (Python).

### Voltar a gerar os dashboards Quarto

Tens de ter o [Quarto](https://quarto.org/docs/get-started/) instalado.

```bash
cd public/EleicoesDashboard && quarto render tp4.qmd
cd public/SpotifyDashboard  && quarto render
```

## Deploy

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

O conteúdo publicado é a pasta `public/`. Os ficheiros e pastas ocultos (como `.quarto/`) são ignorados, como está definido em [`firebase.json`](firebase.json).

---

**Autor:** António Faustino · 50414 · ISEL — LEIM
