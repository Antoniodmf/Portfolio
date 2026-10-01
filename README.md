# Portfólio 50414

Site pessoal / portfólio, alojado no **Firebase Hosting** (projeto `tobi-a4454`).

## Projetos incluídos

| Pasta | Descrição |
|-------|-----------|
| `public/index.html` | Página principal do portfólio |
| `public/WaveCanvas/` | Visualizador de áudio em canvas (waveform, espectro, partículas, círculo) |
| `public/blackjack/` | Jogo de Blackjack em JavaScript |
| `public/EleicoesDashboard/` | Dashboard Quarto das Legislativas 2025 |
| `public/SpotifyDashboard/` | Dashboard Quarto com dados da API do Spotify (output em `_site/`) |

## Deploy

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```
