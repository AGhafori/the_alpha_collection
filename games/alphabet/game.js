/**
 * Alphabet Quest – Game Logic
 */

let playerName  = '';
let score       = 0;
let errors      = 0;
let nextIndex   = 0;
let tileMap     = {};

function getAlphabet() {
  return TRANSLATIONS[currentLang].alphabet;
}

function t(key) {
  return TRANSLATIONS[currentLang][key];
}

function isRTL() {
  return currentLang === 'fa';
}

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

/* ─── Update UI text ─────────────────────────────── */
function updateUIText() {
  document.querySelector('.game-header h1').textContent = t('title');
  document.querySelector('.back-link').innerHTML = `<span>${t('backToBoard')}</span>`;
  document.querySelector('.back-link').style.direction = isRTL() ? 'rtl' : 'ltr';
  
  const scoreItems = document.querySelectorAll('.score-item .label');
  scoreItems[0].textContent = t('score');
  scoreItems[1].textContent = t('incorrect');
  scoreItems[2].textContent = t('lettersLeft');
  
  document.querySelector('.progress-track p').textContent = t('progress');
  
  document.getElementById('modal-title').textContent = t('modalTitle');
  document.getElementById('modal-description')?.remove();
  const modalDesc = document.createElement('p');
  modalDesc.id = 'modal-description';
  modalDesc.className = 'description';
  modalDesc.innerHTML = t('description');
  document.querySelector('.modal-card h2').after(modalDesc);
  
  document.querySelector('.name-field label').textContent = t('yourName');
  nameInput.placeholder = t('enterName');
  playBtn.textContent = t('play');
  
  document.getElementById('win-title').textContent = t('youDidIt');
  document.getElementById('play-again-btn').textContent = t('playAgain');
  document.getElementById('back-home-btn').textContent = t('backHome');
  
  document.querySelector('.language-btn').textContent = LANGUAGES.find(l => l.code === currentLang)?.flag || '🌐';
  
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.lang === currentLang);
  });
  
  document.body.dir = isRTL() ? 'rtl' : 'ltr';
  
  buildAlphaStrip();
}

/* ─── Language Switcher ──────────────────────────── */
function setupLanguageSwitcher() {
  const langBtn = document.querySelector('.language-btn');
  const dropdown = document.querySelector('.language-dropdown');
  
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem('alpha-lang', currentLang);
      dropdown.classList.remove('open');
      updateUIText();
      buildLetterGrid();
    });
  });
  
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });
  
  const saved = localStorage.getItem('alpha-lang');
  if (saved && TRANSLATIONS[saved]) {
    currentLang = saved;
  }
}

/* ─── Build the alphabet strip (progress track) ── */
function buildAlphaStrip() {
  alphaStrip.innerHTML = '';
  const ALPHABET = getAlphabet();
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
  const ALPHABET = getAlphabet();
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
  const ALPHABET = getAlphabet();
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
  updateLeftCount();
}

/* ─── Handle a tile click ────────────────────────── */
function handleTileClick(letter, btn) {
  if (btn.disabled) return;
  const ALPHABET = getAlphabet();

  if (letter === ALPHABET[nextIndex]) {
    score += 10;
    nextIndex++;
    btn.classList.add('correct');
    btn.disabled = true;
    scoreEl.textContent = score;
    updateStrip();
    updateLeftCount();

    if (nextIndex === ALPHABET.length) {
      setTimeout(showWinScreen, 400);
    }
  } else {
    errors++;
    errorsEl.textContent = errors;
    btn.classList.remove('wrong-flash');
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

/* ─── Update left count ─────────────────────────── */
function updateLeftCount() {
  const ALPHABET = getAlphabet();
  const leftEl = document.getElementById('left-value');
  if (leftEl) {
    leftEl.textContent = ALPHABET.length - document.querySelectorAll('.letter-tile.correct').length;
  }
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
  setupLanguageSwitcher();
  updateUIText();
  
  const container = document.getElementById('modal-alpha-display');
  container.innerHTML = '';
  const ALPHABET = getAlphabet();
  ALPHABET.forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    container.appendChild(span);
  });
})();