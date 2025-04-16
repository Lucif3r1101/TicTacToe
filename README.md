# Tic Tac Toe vs Bot

A single‑player Tic Tac Toe game built with React and Hooks. Play against a simple AI bot via a remote API. Supports symbol selection, smooth CSS animations, responsive design, dark/light theme toggle, and confetti celebration on a win.

---

## Table of Contents

1. [Features](#features)  
2. [Demo](#demo)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Available Scripts](#available-scripts)  
6. [Project Structure](#project-structure)  
7. [Configuration & Customization](#configuration--customization)  
8. [Usage](#usage)  
9. [Dependencies & Tools](#dependencies--tools)  
10. [Contributing](#contributing)   

---

## Features

- **Symbol Selection**: Choose to play as **X** or **O**.  
- **Bot Opponent**: Moves fetched from a remote API (`https://hiring-react-assignment.vercel.app/api/bot`).  
- **Responsive Design**: Adapts to desktop, tablet, and mobile screens.  
- **CSS Animations**: Fade‑in for moves; pulsing effect for winning line.  
- **Confetti Celebration**: Celebrates **only** when you win.  
- **Dark/Light Theme**: Toggle between themes.  
- **Optimized Rendering**: Only updated squares re‑render (via `React.memo`).  
- **Eslint‑Compliant**: No warnings or errors; proper React Hook dependencies.  
- **Play Again**: Reset the board while keeping your symbol.  
- **Restart Game**: Return to symbol selection after a win or draw.

---

---

## Prerequisites

- **Node.js** v14 or higher  
- **npm** v6+ (bundled with Node.js) or **Yarn** v1.22+  

---

## Installation

```bash
git clone https://github.com/yourusername/tictactoe-bot.git
cd tictactoe-bot
npm install
# or
yarn install
```

---

## Available Scripts

In the project directory:

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm start`     | Run in development mode at localhost    |
| `npm run build` | Build for production in the `build/`    |
| `npm test`      | Launch test runner                      |
| `npm run eject` | Eject CRA configuration (irreversible)  |

---

## Project Structure

```
tictactoe-bot/
├── public/
│   ├── index.html       # HTML template
│   ├── favicon.ico      # App icon (overwritten)
│   ├── logo.png         # Custom logo for tab and app
│   └── manifest.json    # PWA metadata
├── src/
│   ├── components/
│   │   ├── Board.js
│   │   ├── Square.js
│   │   └── SymbolSelector.js
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   └── helpers.js   # Winner calculation
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
├── package.json         # Dependencies & scripts
└── README.md            # This file
```

---

## Configuration & Customization

- **Change App Title**: Edit `<title>` in `public/index.html`.  
- **Change Favicon**: Overwrite `public/favicon.ico` or update `<link rel="icon">`.  
- **PWA Icons**: Replace icons in `public/manifest.json`.  
- **Theme Colors**: Modify CSS variables or `App.css`.  
- **Animations**: Adjust `@keyframes` in `App.css`.  
- **Bot API**: Update `API_URL` in `src/App.js` to point at any compatible endpoint.

---

## Usage

1. **Select Symbol**: X or O.  
2. **Play**: Click empty squares to move; bot responds automatically.  
3. **End**:
   - Player win → confetti + "You Win!"  
   - Bot win → "Bot Wins!"  
   - Draw → "It’s a Draw!"  
4. **Next**:
   - **Play Again** resets board, keeps symbol.  
   - **Restart Game** returns to symbol selection.

---

## Dependencies & Tools

- **React** v18  
- **react-dom**  
- **react-confetti**  
- **eslint** & **eslint-plugin-react-hooks**  

---

## Contributing

1. Fork the repo  
2. `git checkout -b feature/your-feature`  
3. `npm install`  
4. Make changes & commit  
5. `git push origin feature/your-feature`  
6. Open a Pull Request  

---

