# **Documentação do Projeto**

**António Faustino - 50414**

ISEL - LEIM

## Spotify Dashboard - Quarto OJS

![](assets/images/Spotify_Full_Logo_RGB_Green.png)

## **Introdução**

Este projeto final visa consolidar as competências adquiridas nos Trabalhos Práticos 3 e 4, através do desenvolvimento de um dashboard interativo em Quarto que explora e visualiza conteúdos relacionados com áudio.

Inicialmente e inspirado pelo projeto referenciado pelos docentes, [Spotify Dashboard Example](https://melissavanbussel.github.io/spotify-dashboard/dashboard.html), o objetivo era criar um dashboard que mostrasse métricas de músicas, utilizando a API do Spotify. Este objetivo rapidamente encontrou obstáculos ao descobrir que o Spotify removeu o acesso a estas métricas, tanto como a tantas outras finalidades. Acrescendo o facto de não ser possível gerar um token de acesso que dure mais de uma hora, limitando as _features_ utilizáveis.

Apesar destes contra-tempos foram desenvolvidos os seguintes painéis:

- 🎵 **Playlists públicas Spotify** (Top Hits Diário Global/PT e Top 50 Global)
- 🔐 **Spotify Web API** (Top Tracks pessoais + Perfil utilizador)
- 📱 **Player local** (ficheiros MP3 via JSON)
- 🎚️ **Controles multimédia** (play/pause/next/prev/volume)
- 🎨 **Visualizador Web Audio API** (waveform/spectrum)
- ⌨️ **Atalhos teclado** (Space=play, ←/→=navegação)

## 📁 **Estrutura do Projeto**

```

projeto/
├── index.qmd                    \# Dashboard principal
├── _quarto.yml                  \# Configurações projeto
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/                   \# Logo/Avatar/Thumbnails
│   │   ├── Spotify_Full_Logo_RGB_Green.png
│   │   |── DEFAULT_AVATAR.png
|   |   └── ...
│   ├── data/
│   │   └── localTopTracks.json   \# Info Músicas locais
│   ├── audio/
│   │   └── ...                   \# Músicas locais
│   ├── Fonts/
│   │   └── ...                   \# Fontes Utilizadas
│   └── js/
│       ├── AudioProcessor.js     \# Web Audio API
│       |── VisualizationEngine.js
|       └── ...

```

## 🎵 **Funcionalidades**

### **1. TOP HITS (Público)**

Este separador é composto por três células simples, cada uma com uma célula que utiliza a _feature_ de _embed_ fornecida pelo spotify.
Para isto foram escolhidas as seguintes playlists:

```
      ID da playlist        playlist
── 37i9dQZF1DXcBWIGoYBM5M (Top Mundial)
── 37i9dQZEVXbKyJS56d1pgi (Top Português)
── 37i9dQZEVXbMDoHDwVN2tF (Viral 50)

```

### **2. YOUR TOP (Spotify API)**

Esta aba é a que teve mais problemas com as alterações (relativamente recentes) que o Spotify implementou na sua API.
Atualmente já não é possível aceder aos meta dados das músicas da plataforma, isto quer dizer a quantidade de direções que este projeto poderia ter foram reduzidas em grande parte aqui.

Para além disto foi preciso lidar com o problema de não ser possível adquirir um token de acesso a longo prazo.
Por esta razão, infelizmente, as células que utilizam os dados retirado da API ficam num estado de erro enquanto o utilizador não inserir um token válido no seu respetivo sítio.

Inserindo um token válido esta é a informação a que foi possível ter acesso:

```
✅ Top 50 tracks (long_term)
✅ Player interativo clicável
✅ Perfil utilizador (v1/me + v1/users/{id})
✅ Botão "Abrir Spotify"
✅ Card perfil (avatar/followers)
```

### **3. TOP 10 LOCAL 2025**

Na terceira e última página deste dashboard está o top 10 músicas mais ouvidas em 2025, segundo a [playlist do Spotify](https://open.spotify.com/playlist/37i9dQZF1DX18jTM2l2fJY?si=WYlzqydQSBag2bYtcpV__g).

Devido ao facto do Spotify não permitir o acesso a dados como a frequência das músicas, foi necessário realizar o _download_ manual do top 10, tanto como guardar as suas informações num ficheiro .json.

O trabalho sobre estas músicas foi relativamente simples, tendo em conta que foi possível "reciclar" código anterior, como a classe AudioProcessing e VisualizationEngine. Estas classes dão uso da Web Audio API para processar dados áudio.

Para este projeto foi decidido manter alguma simplicidade em relação às _features_ disponíveis, mantendo o aspeto de um _player_ básico, com o acréscimo de apenas um modo de visualização - _waveform_.

As características deste _player_ são:

```
✅ Player HTML5 nativo
✅ Controles: ⏮️ ▶️/⏸️ ⏭️ 🎚️
✅ Volume reativo
✅ Loop playlist automática
✅ Estado play/pause dinâmico

```

## **Como Utilizar**

### **1. Spotify API (Your Top)**

Para poder utilizar o separador **Your Top** é necessário um token de acesso, que pode ser encontrado seguindo os seguintes passos:

```
1. https://developer.spotify.com/
2. Fazer login no Spotify
3. Descer na página até encontrar uma caixa de código
4. Na linha 2 do código copiar a string (sem ``) de carateres que segue const token = ...
5. Colar este token no espaço dedicado da página Your Top
```

### **2. Controles**

| Ação       | Tecla    | Botão |
| :--------- | :------- | :---- |
| Play/Pause | `Espaço` | ▶️/⏸️ |
| Anterior   | `←`      | ⏮️    |
| Próxima    | `→`      | ⏭️    |
| Volume     | Slider   | 🎚️    |

### **3. Músicas Locais**

Este é o formato do json que guarda a informação das músicas guardadas localmente

```json
[
  {
    "name": "Minha Música",
    "artist": "Artista",
    "path": "assets/audio/minha.mp3",
    "duration": "3:45",
    "img": "assets/images/cover.jpg"
  }
]
```

### **Visualizações**

Embora só tenha sido implementado um modo de visualização, estão presentes na pasta **js** outros três modos, também reutilizados de um dos trabalho anteriores da disciplina.

Estas são as _keywords_ que podem ser utilizadas no código do ficheiro quarto para mudar o tipo de visualização:

```
- "spectrum"     (barras frequência)
- "waveform"     (forma onda)
- "particles"    (partículas)
- "circular"     (círculo radial)
```

## Utilização de IA

Este projeto contou com o auxílio de modelos LLM, de forma a otimizar o desenvolvimento do projeto, tanto como a detetar erros e a auxiliar com a estilização do mesmo.

A estilização do ficheiro styles.css foi principalmente desenvolvida com base no código fornecido por estes modelos.

A integração de **html** no código **ojs** também contou com forte apoio em _inteligência artificial_.

Apesar de tudo mantém-se o toque e olhar humano, que garante coerência e objetividade no todo do trabalho.

Estes foram os modelos utilizados e as respetivas threads:

- [ChatGPT](https://chatgpt.com/share/6965b355-a218-8008-b2a2-aa736cb2d5e6)
- [Claude](https://claude.ai/share/4696a283-95a0-4d28-9339-ba5c71e7dde1)
- [Gemini](https://gemini.google.com/share/9a5f79682395)

## 🔗 **Dependências Técnicas**

```
🌐 Spotify Web API v1
🎵 Web Audio API (AnalyserNode)
📊 Quarto Dashboard (columns)
⚡ Observable JS (reactive)
🎨 Canvas 2D API (visualizer)

```

## Conclusões

O desenvolvimento deste trabalho mostrou as vantagens da utilização de Quarto para criação de dashboards e/ou websites, sendo uma ferramenta que facilita muito a organização de projetos simples.

Infelizmente o projeto ficou áquem do desejado, em parte por causa da alteração de política do Spotify em relação à sua API e em parte por causa do desenvolvimento sob pressão do projeto, tendo sido cada vez mais difícil conciliar os trabalhos, projetos e exames das disiplinas do terceiro semestre e estando sozinho neste projeto.

Em relação a melhorias a este projeto seria positivo adicionar uma forma de ter um token fundional por _default_ na aba Your Top, ou então ter uma forma de colocar conteúdo _place holder_ enquanto não existisse um token válido. Na parte dos ficheiros locais também seria possível adicionar visualizações novas e possivelmente um modo de iterar entre elas.

Em suma é um projeto que mostra muito bem as possibilidades de desenvolvimento com o quarto e principalmente trabalha a utilização de APIs. No entanto, demonstra também o tempo que é realmente necessário para se familiarizar com tantos protocolos e sintaxes diferentes.
