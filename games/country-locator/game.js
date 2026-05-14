const COUNTRIES = [
  { id: 'US', name: 'United States', flag: '🇺🇸' },
  { id: 'CA', name: 'Canada', flag: '🇨🇦' },
  { id: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { id: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { id: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { id: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { id: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { id: 'CL', name: 'Chile', flag: '🇨🇱' },
  { id: 'PE', name: 'Peru', flag: '🇵🇪' },
  { id: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { id: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'FR', name: 'France', flag: '🇫🇷' },
  { id: 'DE', name: 'Germany', flag: '🇩🇪' },
  { id: 'IT', name: 'Italy', flag: '🇮🇹' },
  { id: 'ES', name: 'Spain', flag: '🇪🇸' },
  { id: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { id: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { id: 'NO', name: 'Norway', flag: '🇳🇴' },
  { id: 'GR', name: 'Greece', flag: '🇬🇷' },
  { id: 'PL', name: 'Poland', flag: '🇵🇱' },
  { id: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { id: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { id: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { id: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { id: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { id: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { id: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { id: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { id: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { id: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { id: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { id: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { id: 'CN', name: 'China', flag: '🇨🇳' },
  { id: 'IN', name: 'India', flag: '🇮🇳' },
  { id: 'JP', name: 'Japan', flag: '🇯🇵' },
  { id: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { id: 'RU', name: 'Russia', flag: '🇷🇺' },
  { id: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { id: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { id: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { id: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { id: 'IR', name: 'Iran', flag: '🇮🇷' },
  { id: 'AU', name: 'Australia', flag: '🇦🇺' },
  { id: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
];

const SCORE_CORRECT = 10;
const SCORE_WRONG = -5;
const MAX_LIVES = 4;

const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('world-map');

const scoreEl = document.getElementById('score-value');
const livesEl = document.getElementById('lives-value');
const progressEl = document.getElementById('question-count');
const flagDisplay = document.getElementById('flag-display');
const countryNameEl = document.getElementById('country-name');
const introModal = document.getElementById('intro-modal');
const nameInput = document.getElementById('player-name');
const playBtn = document.getElementById('play-btn');
const gameOverModal = document.getElementById('game-over-modal');
const gameoverName = document.getElementById('gameover-name');
const gameoverScore = document.getElementById('gameover-score');
const gameoverErrors = document.getElementById('gameover-errors');
const gameoverCorrect = document.getElementById('gameover-correct');
const gameoverTitle = document.getElementById('gameover-title');
const playAgainBtn = document.getElementById('play-again-btn');
const backHomeBtn = document.getElementById('back-home-btn');
const feedbackEl = document.getElementById('feedback');
const mapData = window.COUNTRY_LOCATOR_MAP;

const countryById = new Map(COUNTRIES.map((country) => [country.id, country]));
const mapCountryById = new Map((mapData?.countries ?? []).map((country) => [country.id, country]));
const countryElements = new Map();

let score = 0;
let lives = MAX_LIVES;
let questionIndex = 0;
let wrongCount = 0;
let correctCount = 0;
let questionOrder = [];
let foundCountries = new Set();
let gameActive = false;
let activeCountryId = null;
let answerLocked = false;
let wrongCountryId = null;
let feedbackTimer = null;

function log(message) {
  console.log('[CountryLocator]', message);
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function updateScoreboard() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  progressEl.textContent = `${correctCount}/${COUNTRIES.length}`;
}

function renderMapState() {
  countryElements.forEach((element, countryId) => {
    element.classList.toggle('is-found', foundCountries.has(countryId));
    element.classList.toggle('is-wrong-guess', wrongCountryId === countryId);
  });
}

function showFeedback(message, type) {
  if (feedbackTimer) {
    window.clearTimeout(feedbackTimer);
  }

  feedbackEl.textContent = message;
  feedbackEl.className = `feedback ${type}`;
  feedbackEl.classList.remove('hidden');

  feedbackTimer = window.setTimeout(() => {
    feedbackEl.classList.add('hidden');
  }, 1500);
}

function buildMap() {
  if (!mapData?.countries?.length) {
    throw new Error('Country Locator map data is missing.');
  }

  svg.setAttribute('viewBox', `0 0 ${mapData.width} ${mapData.height}`);
  const fragment = document.createDocumentFragment();
  const baseLayer = document.createElementNS(svgNS, 'g');
  const interactiveLayer = document.createElementNS(svgNS, 'g');
  const allCountries = [
    ...(mapData.backgroundCountries ?? []),
    ...mapData.countries,
  ];

  allCountries.forEach((country) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', country.path);
    path.setAttribute('class', 'map-country-base');
    path.dataset.countryName = country.name;
    path.setAttribute('aria-hidden', 'true');
    baseLayer.appendChild(path);
  });

  mapData.countries.forEach((country) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', country.path);
    path.setAttribute('class', 'map-country');
    path.dataset.countryId = country.id;
    path.dataset.countryName = country.name;
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.setAttribute('aria-label', `Select ${country.name}`);
    interactiveLayer.appendChild(path);
    countryElements.set(country.id, path);
  });

  fragment.appendChild(baseLayer);
  fragment.appendChild(interactiveLayer);
  svg.appendChild(fragment);
}

function queueNextStep(callback, delay) {
  answerLocked = true;
  window.setTimeout(() => {
    answerLocked = false;
    callback();
  }, delay);
}

function nextQuestion() {
  if (!gameActive) {
    return;
  }

  wrongCountryId = null;
  renderMapState();

  const availableCountries = COUNTRIES.filter((country) => !foundCountries.has(country.id));
  if (availableCountries.length === 0) {
    gameActive = false;
    activeCountryId = null;
    renderMapState();
    window.setTimeout(() => {
      gameoverTitle.textContent = '🏆 You found them all!';
      gameoverName.textContent = nameInput.value.trim() || 'Player';
      gameoverScore.textContent = score;
      gameoverErrors.textContent = wrongCount;
      gameoverCorrect.textContent = correctCount;
      gameOverModal.classList.add('visible');
    }, 500);
    return;
  }

  if (questionIndex >= questionOrder.length) {
    questionOrder = shuffle(availableCountries.map((country) => country.id));
    questionIndex = 0;
  }

  const nextCountryId = questionOrder[questionIndex];
  questionIndex += 1;

  const nextCountry = countryById.get(nextCountryId);
  if (!nextCountry || foundCountries.has(nextCountry.id)) {
    nextQuestion();
    return;
  }

  activeCountryId = nextCountry.id;
  flagDisplay.textContent = nextCountry.flag;
  countryNameEl.textContent = nextCountry.name;
  renderMapState();
  log(`Find ${nextCountry.name}`);
}

function gameOver() {
  gameActive = false;
  activeCountryId = null;
  renderMapState();
  gameoverTitle.textContent = '💀 Game Over';
  gameoverName.textContent = nameInput.value.trim() || 'Player';
  gameoverScore.textContent = score;
  gameoverErrors.textContent = wrongCount;
  gameoverCorrect.textContent = correctCount;
  gameOverModal.classList.add('visible');
}

function handleCountrySelection(countryId) {
  if (!gameActive || answerLocked) {
    return;
  }

  if (!countryId) {
    showFeedback('Click on a country!', 'wrong');
    return;
  }

  const targetCountry = countryById.get(activeCountryId);
  if (!targetCountry) {
    return;
  }

  if (countryId === targetCountry.id) {
    if (foundCountries.has(targetCountry.id)) {
      nextQuestion();
      return;
    }

    score += SCORE_CORRECT;
    correctCount += 1;
    foundCountries.add(targetCountry.id);
    updateScoreboard();
    renderMapState();
    showFeedback(`✓ Correct! +${SCORE_CORRECT}`, 'correct');
    queueNextStep(nextQuestion, 900);
    return;
  }

  score += SCORE_WRONG;
  lives -= 1;
  wrongCount += 1;
  wrongCountryId = countryId;
  updateScoreboard();
  renderMapState();

  showFeedback(`✗ Wrong! -${Math.abs(SCORE_WRONG)}`, 'wrong');

  if (lives <= 0) {
    queueNextStep(gameOver, 700);
  } else {
    queueNextStep(nextQuestion, 1100);
  }
}

function startGame() {
  score = 0;
  lives = MAX_LIVES;
  wrongCount = 0;
  correctCount = 0;
  questionIndex = 0;
  questionOrder = shuffle(COUNTRIES.map((country) => country.id));
  foundCountries = new Set();
  gameActive = true;
  activeCountryId = null;
  answerLocked = false;
  wrongCountryId = null;

  updateScoreboard();
  flagDisplay.textContent = '';
  countryNameEl.textContent = 'Find the country...';
  gameOverModal.classList.remove('visible');
  introModal.classList.add('hidden');
  renderMapState();

  window.setTimeout(nextQuestion, 350);
}

function handleMapClick(event) {
  const countryPath = event.target.closest('.map-country');
  handleCountrySelection(countryPath?.dataset.countryId ?? null);
}

function handleMapKeydown(event) {
  const countryPath = event.target.closest('.map-country');
  if (!countryPath) {
    return;
  }

  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  handleCountrySelection(countryPath.dataset.countryId);
}

playBtn.addEventListener('click', startGame);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    playBtn.click();
  }
});
playAgainBtn.addEventListener('click', () => {
  gameOverModal.classList.remove('visible');
  startGame();
});
backHomeBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

svg.addEventListener('click', handleMapClick);
svg.addEventListener('keydown', handleMapKeydown);

function init() {
  try {
    buildMap();
    updateScoreboard();
    renderMapState();
    flagDisplay.textContent = '🌍';
    countryNameEl.textContent = 'Click Start to play!';
    progressEl.textContent = `0/${COUNTRIES.length}`;
    log('Country Locator loaded with SVG country outlines. Ready to play!');
  } catch (error) {
    console.error(error);
    countryNameEl.textContent = 'Map data failed to load';
    showFeedback('Map data failed to load.', 'wrong');
  }
}

init();