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
├── sw.js                  ← Service worker (PWA offline support)
├── manifest.json           ← PWA manifest
└── games/
    └── alphabet/
        ├── index.html       ← Alphabet Quest game page
        ├── style.css        ← Alphabet Quest styles
        ├── game.js          ← Alphabet Quest game logic
        └── i18n.js          ← Translations & text-to-speech
```

---

## How to Run

The application is pure HTML/CSS/JavaScript with **no build step and no dependencies**.

### Running Locally

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

### Run with Docker

Build the image locally:

```bash
docker build -t alpha-collection .
```

Run the container and publish it on port `8080`:

```bash
docker run -d \
   --name alpha-collection \
   -p 8080:80 \
   --restart unless-stopped \
   alpha-collection
```

If your laptop already has a fixed IP address and you want Docker to bind only to that interface, publish the port with the host IP explicitly:

```bash
docker run -d \
   --name alpha-collection \
   -p YOUR_LAPTOP_IP:8080:80 \
   --restart unless-stopped \
   alpha-collection
```

Example:

```bash
docker run -d \
   --name alpha-collection \
   -p 192.168.1.50:8080:80 \
   --restart unless-stopped \
   alpha-collection
```

Then open:

- `http://localhost:8080` on the laptop itself
- `http://YOUR_LAPTOP_IP:8080` from another device on the same network

### Run with Docker Compose

You can also use the included compose file:

```bash
HOST_IP=192.168.1.50 HOST_PORT=8080 docker compose up -d --build
```

If you do not set `HOST_IP`, Docker will bind on all host interfaces.

### Publish the image to GitHub

This repository includes a GitHub Actions workflow that builds and pushes the Docker image to GitHub Container Registry:

```text
ghcr.io/aghafori/the_alpha_collection
```

What it does:

- Push to any branch: publishes branch and SHA tags.
- Push a version tag like `v1.0.0`: publishes the matching version tag.
- Push to the default branch: also publishes `latest`.
- Manual run from GitHub Actions: supported through `workflow_dispatch`.

To trigger it:

```bash
git add .
git commit -m "Add Docker deployment setup"
git push origin YOUR_BRANCH_NAME
```

After the workflow runs, you can pull the image with:

```bash
docker pull ghcr.io/aghafori/the_alpha_collection:latest
```

If the repository is private, make sure the package visibility and pull permissions in GitHub match how you want to use the image.

---

## Games

### 1 — 🔤 Alphabet Quest *(playable)*

**Goal:** Click all letters of the alphabet in correct order (A → Z) from a scrambled board.

**Features:**
- 🗣️ **Text-to-Speech** — Letters are spoken aloud when clicked (in the selected language)
- 🌍 **Multilingual** — Play in English, Swedish, Spanish, or Farsi
  - Use the language switcher (top-right) to change language
  - Language preference is saved to your browser
- ↔️ **RTL Support** — Full right-to-left layout for Farsi

#### How to play
1. The game opens with an **intro modal** that shows:
   - A short description of the rules.
   - The full alphabet displayed in order as a reference.
   - A text field where you can enter your name.
   - A **▶ Play** button (or press **Enter**) to start.
2. Once you press Play the modal disappears and you see the **game board**:
   - Letter tiles are laid out in a random scrambled order.
   - A **progress strip** at the top highlights the next letter you need to find (pulsing yellow indicator).
   - A **scoreboard** shows your current score, incorrect-click count, and letters remaining.
3. Click the letters **in alphabetical order**:
   - ✅ **Correct letter** → tile turns green and fades, score increases by **+10 points**, letter is spoken.
   - ❌ **Wrong letter** → tile flashes red, incorrect counter increases by 1 (no point penalty).
4. After clicking all letters in order a **win screen** pops up showing your final score and error count, with options to **Play Again** or return to the **Game Board**.

#### Scoring

| Event | Points |
|---|---|
| Correct letter in the right position | +10 |
| Incorrect click | 0 (error counted separately) |

#### Letters by Language

| Language | Count |
|---|---|
| English | 26 (A–Z) |
| Swedish | 29 (A–Ö) |
| Spanish | 27 (A–Z + Ñ) |
| Farsi | 32 (الف–ی) |

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
