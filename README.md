# 🎮 The Alpha Collection

**A compendium of fun mini-games built to make learning feel like play.**

---

## Overview

The Alpha Collection is a browser-based web application that hosts a growing set of small learning games. The home screen presents a **lime-washed green game board** with large, inviting cards — one per game. Each card shows the game's name, a preview image or icon, and a short description. Clicking a card launches that game.

Games are added one at a time. Currently the collection contains one playable game and three placeholder slots for games that are coming soon.

---

## Project Structure

```
the_alpha_collection/
├── index.html               ← Main game board (home screen)
├── css/
│   └── style.css            ← Shared board styles
└── games/
    └── alphabet/
        ├── index.html       ← Alphabet Quest game page
        ├── style.css        ← Alphabet Quest styles
        └── game.js          ← Alphabet Quest game logic
```

---

## How to Run

The application is pure HTML/CSS/JavaScript with **no build step and no dependencies**.

1. Clone the repository:
   ```bash
   git clone https://github.com/AGhafori/the_alpha_collection.git
   cd the_alpha_collection
   ```

2. Open `index.html` in any modern browser, **or** serve it with a simple local server:
   ```bash
   # Python 3
   python -m http.server 8080
   # then open http://localhost:8080
   ```

---

## Games

### 1 — 🔤 Alphabet Quest *(playable)*

**Goal:** Click all 26 letters of the alphabet in correct order (A → Z) from a scrambled board.

#### How to play
1. The game opens with an **intro modal** that shows:
   - A short description of the rules.
   - The full alphabet displayed in order as a reference.
   - A text field where you can enter your name.
   - A **▶ Play** button (or press **Enter**) to start.
2. Once you press Play the modal disappears and you see the **game board**:
   - 26 letter tiles are laid out in a random scrambled order.
   - A **progress strip** at the top highlights the next letter you need to find (pulsing yellow indicator).
   - A **scoreboard** shows your current score, incorrect-click count, and letters remaining.
3. Click the letters **in alphabetical order**:
   - ✅ **Correct letter** → tile turns green and fades, score increases by **+10 points**.
   - ❌ **Wrong letter** → tile flashes red, incorrect counter increases by 1 (no point penalty).
4. After clicking all 26 letters in order a **win screen** pops up showing your final score and error count, with options to **Play Again** or return to the **Game Board**.

#### Scoring

| Event | Points |
|---|---|
| Correct letter in the right position | +10 |
| Incorrect click | 0 (error counted separately) |

---

### 2 — Game 2 *(coming soon)*

Placeholder — name and game image will be added when the game is designed.

---

### 3 — Game 3 *(coming soon)*

Placeholder — name and game image will be added when the game is designed.

---

### 4 — Game 4 *(coming soon)*

Placeholder — name and game image will be added when the game is designed.

---

## Browser Support

Works in all modern evergreen browsers (Chrome, Firefox, Edge, Safari). No Internet Explorer support.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Add your game inside `games/<game-name>/`.
3. Add a new `<a class="game-card">` entry in `index.html`.
4. Open a pull request with a short description of the game.

---

## License

MIT © AGhafori
