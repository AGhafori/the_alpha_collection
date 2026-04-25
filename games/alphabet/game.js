/**
 * Alphabet Quest – Game Logic
 * Rules:
 *  • 26 letter tiles are shown in a scrambled order.
 *  • The player must click them in alphabetical order (A → Z).
 *  • Each correct click awards 10 points.
 *  • Each incorrect click increments the error counter (no point deduction).
 *  • When all 26 letters are correctly clicked the win screen appears.
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let playerName  = '';
let score       = 0;
let errors      = 0;
let nextIndex   = 0;   // index into ALPHABET of the letter that must be clicked next
let tileMap     = {};  // letter → DOM tile element

/* ─── Grab DOM references ─────────────────────── */
const introModal   = document.getElementById('intro-modal');
const nameInput    = document.getElementById('player-name');
const playBtn      = document.getElementById('play-btn');
const letterGrid   = document.getElementById('letter-grid');
const scoreEl      = document.getElementById('score-value');
const errorsEl     = document.getElementById('errors-value');
const winBanner    = document.getElementById('win-banner');
const winName      = document.getElementById('win-name');
const winScore     = document.getElementById('win-score');
const winErrors    = document.getElementById('win-errors');
const playAgainBtn = document.getElementById('play-again-btn');
const backHomeBtn  = document.getElementById('back-home-btn');
const alphaStrip   = document.getElementById('alpha-strip');

/* ─── Build the alphabet strip (progress track) ── */
function buildAlphaStrip() {
  alphaStrip.innerHTML = '';
  ALPHABET.forEach(letter => {
    const span = document.createElement('span');
    span.className = 'strip-letter';
    span.id        = `strip-${letter}`;
    span.textContent = letter;
    alphaStrip.appendChild(span);
  });
  updateStrip();
}

function updateStrip() {
  ALPHABET.forEach((letter, i) => {
    const el = document.getElementById(`strip-${letter}`);
    if (!el) return;
    el.classList.remove('done', 'next');
    if (i < nextIndex)       el.classList.add('done');
    else if (i === nextIndex) el.classList.add('next');
  });
}

/* ─── Shuffle helper (Fisher-Yates) ─────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Build the scrambled letter tile grid ───────── */
function buildLetterGrid() {
  letterGrid.innerHTML = '';
  tileMap = {};
  const shuffled = shuffle(ALPHABET);
  shuffled.forEach(letter => {
    const btn = document.createElement('button');
    btn.className    = 'letter-tile';
    btn.textContent  = letter;
    btn.dataset.letter = letter;
    btn.addEventListener('click', () => handleTileClick(letter, btn));
    letterGrid.appendChild(btn);
    tileMap[letter] = btn;
  });
}

/* ─── Handle a tile click ────────────────────────── */
function handleTileClick(letter, btn) {
  if (btn.disabled) return;

  if (letter === ALPHABET[nextIndex]) {
    // Correct!
    score += 10;
    nextIndex++;
    btn.classList.add('correct');
    btn.disabled = true;
    scoreEl.textContent = score;
    updateStrip();

    if (nextIndex === ALPHABET.length) {
      setTimeout(showWinScreen, 400);
    }
  } else {
    // Incorrect
    errors++;
    errorsEl.textContent = errors;
    btn.classList.remove('wrong-flash');
    // Force reflow to restart animation
    void btn.offsetWidth;
    btn.classList.add('wrong-flash');
    btn.addEventListener('animationend', () => btn.classList.remove('wrong-flash'), { once: true });
  }
}

/* ─── Show win screen ─────────────────────────────── */
function showWinScreen() {
  winName.textContent   = playerName || 'Player';
  winScore.textContent  = score;
  winErrors.textContent = errors;
  winBanner.classList.add('visible');
}

/* ─── Start / reset game ──────────────────────────── */
function startGame(name) {
  playerName = name.trim() || 'Player';
  score      = 0;
  errors     = 0;
  nextIndex  = 0;
  scoreEl.textContent  = 0;
  errorsEl.textContent = 0;
  winBanner.classList.remove('visible');
  buildAlphaStrip();
  buildLetterGrid();
}

/* ─── Event: Play button in modal ────────────────── */
playBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  introModal.classList.add('hidden');
  startGame(name);
});

nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') playBtn.click();
});

/* ─── Event: Play again / back to home ──────────── */
playAgainBtn.addEventListener('click', () => {
  winBanner.classList.remove('visible');
  startGame(playerName);
});

backHomeBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

/* ─── Boot: populate the modal alphabet display ─── */
(function initModal() {
  const container = document.getElementById('modal-alpha-display');
  ALPHABET.forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    container.appendChild(span);
  });
})();
