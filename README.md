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

### Running with Docker

Build and run locally with Docker only:

```bash
docker build -t alpha-collection:local .
docker run -d --name alpha-collection -p 8080:80 --restart unless-stopped alpha-collection:local
```

The repository also includes a `Makefile` for one-command Docker management:

```bash
make docker-run
make docker-status
make docker-logs
make docker-stop
```

If you want to bind Docker to a specific host interface, override the host IP and port:

```bash
make docker-run HOST_IP=192.168.1.136 HOST_PORT=8080
```

If Docker refuses a specific interface bind on your machine, use the default `HOST_IP=0.0.0.0`. The app will still be reachable at your laptop's LAN IP, for example `http://192.168.1.136:8080`.

You can also use the included compose file:

```bash
HOST_IP=0.0.0.0 HOST_PORT=8080 docker-compose up -d --build
```

### Embed in WordPress

The simplest WordPress integration is to host this repository as static files and embed the collection with an `iframe`.

Recommended setup:

1. Deploy the repo to a public path such as `/the-alpha-collection/` on your web server.
2. Open [wordpress-page.html](/home/lahlas/Repositories/Apps/the_alpha_collection/wordpress-page.html).
3. Paste its contents into a WordPress `Custom HTML` block or your page builder HTML module.
4. If your game is hosted at a different URL, replace each `/the-alpha-collection/...` link in that file with the final public URL.

This keeps the game logic, styles, and multilingual support inside the static app while making it playable directly from the WordPress page.

If you are using WordPress.com or another hosted editor that strips `iframe` markup, use [wordpress-page-no-iframe.html](/home/lahlas/Repositories/Apps/the_alpha_collection/wordpress-page-no-iframe.html) instead. That version is a WordPress-safe launch page with styled buttons linking into the hosted game.

If the editor also treats `<style>` as text or strips inline styling, use [wordpress-page-basic.html](/home/lahlas/Repositories/Apps/the_alpha_collection/wordpress-page-basic.html). That version contains only plain HTML content and links, so it can be rebuilt easily with standard Gutenberg blocks.

### Host on GitHub Pages

This repository can be hosted directly on GitHub Pages as a static site.

What is already configured:

1. A workflow at `.github/workflows/deploy-pages.yml` deploys the site when you push to `main`.
2. The app paths are set up to work from a repository subpath such as `/the_alpha_collection/`.

How to publish:

1. Push this repository to GitHub.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions` as the source.
4. Push to `main`, or run the `Deploy GitHub Pages` workflow manually from the `Actions` tab.

Expected site URL:

```text
https://YOUR_GITHUB_USERNAME.github.io/the_alpha_collection/
```

After that, update the WordPress links in [wordpress-page-basic.html](/home/lahlas/Repositories/Apps/the_alpha_collection/wordpress-page-basic.html), [wordpress-page-no-iframe.html](/home/lahlas/Repositories/Apps/the_alpha_collection/wordpress-page-no-iframe.html), or [wordpress-page.html](/home/lahlas/Repositories/Apps/the_alpha_collection/wordpress-page.html) to the final GitHub Pages URL.

### Running with Kubernetes

The repository includes Kubernetes manifests in `k8s/` for a `Deployment` and a `NodePort` `Service`.

Default behavior:
- Namespace: `alpha-collection`
- Image: `ghcr.io/aghafori/the_alpha_collection:latest`
- Service type: `NodePort`
- Exposed port: `30080`

If `kubectl` is installed and your local cluster is already running, deploy with:

```bash
make k8s-deploy
make k8s-status
```

To use a different image tag:

```bash
make k8s-deploy K8S_IMAGE=ghcr.io/aghafori/the_alpha_collection:main
```

To restart, inspect, or remove the workload:

```bash
make k8s-restart
make k8s-logs
make k8s-delete
```

On local Kubernetes distributions that expose NodePort directly on the host network, the app will be reachable at:

```text
http://YOUR_LAPTOP_IP:30080
```

For your current network, that would typically be:

```text
http://192.168.1.136:30080
```

If you are using `kind` or `minikube`, NodePort may not be reachable directly from your LAN without extra cluster networking. In that case, either use an ingress controller or expose it temporarily with `kubectl port-forward`.

### PWA (Install as App)

The app works as a PWA (Progressive Web App):
- Opens in **standalone mode** (no browser chrome) when installed
- Works **offline** after first visit
- Add to home screen on mobile:
  - **iOS**: Share button → "Add to Home Screen"
  - **Android**: Chrome menu → "Install App" or "Add to Home Screen"

2. Open `index.html` in any modern browser, **or** serve it with a simple local server:
   ```bash
   # Python 3
   python -m http.server 8080
   # then open http://localhost:8080
   ```

### Publish Docker image to GitHub

This repository now includes a GitHub Actions workflow at `.github/workflows/docker-publish.yml` that publishes the image to GitHub Container Registry:

```text
ghcr.io/aghafori/the_alpha_collection
```

Publishing behavior:
- Push to any branch publishes branch and SHA tags.
- Push to the default branch also publishes `latest`.
- Push a tag like `v1.0.0` publishes the matching version tag.
- Manual runs are supported through GitHub Actions.

To trigger publishing:

```bash
git add .
git commit -m "Add Docker helpers and GHCR publishing"
git push origin YOUR_BRANCH_NAME
```

After the workflow finishes, pull the image with:

```bash
docker pull ghcr.io/aghafori/the_alpha_collection:latest
```

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
