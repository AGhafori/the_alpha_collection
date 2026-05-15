const COUNTRIES = [
  { id: 'US', name: 'United States', continent: 'North America', aliases: ['usa', 'us', 'united states of america'] },
  { id: 'CA', name: 'Canada', continent: 'North America' },
  { id: 'MX', name: 'Mexico', continent: 'North America' },
  { id: 'CU', name: 'Cuba', continent: 'North America' },
  { id: 'BR', name: 'Brazil', continent: 'South America' },
  { id: 'AR', name: 'Argentina', continent: 'South America' },
  { id: 'CO', name: 'Colombia', continent: 'South America' },
  { id: 'CL', name: 'Chile', continent: 'South America' },
  { id: 'PE', name: 'Peru', continent: 'South America' },
  { id: 'VE', name: 'Venezuela', continent: 'South America' },
  { id: 'GB', name: 'United Kingdom', continent: 'Europe', aliases: ['uk', 'britain', 'great britain'] },
  { id: 'FR', name: 'France', continent: 'Europe' },
  { id: 'DE', name: 'Germany', continent: 'Europe' },
  { id: 'IT', name: 'Italy', continent: 'Europe' },
  { id: 'ES', name: 'Spain', continent: 'Europe' },
  { id: 'PT', name: 'Portugal', continent: 'Europe' },
  { id: 'SE', name: 'Sweden', continent: 'Europe' },
  { id: 'NO', name: 'Norway', continent: 'Europe' },
  { id: 'GR', name: 'Greece', continent: 'Europe' },
  { id: 'PL', name: 'Poland', continent: 'Europe' },
  { id: 'NL', name: 'Netherlands', continent: 'Europe' },
  { id: 'CH', name: 'Switzerland', continent: 'Europe' },
  { id: 'IE', name: 'Ireland', continent: 'Europe' },
  { id: 'DK', name: 'Denmark', continent: 'Europe' },
  { id: 'EG', name: 'Egypt', continent: 'Africa' },
  { id: 'ZA', name: 'South Africa', continent: 'Africa' },
  { id: 'NG', name: 'Nigeria', continent: 'Africa' },
  { id: 'KE', name: 'Kenya', continent: 'Africa' },
  { id: 'MA', name: 'Morocco', continent: 'Africa' },
  { id: 'DZ', name: 'Algeria', continent: 'Africa' },
  { id: 'GH', name: 'Ghana', continent: 'Africa' },
  { id: 'ET', name: 'Ethiopia', continent: 'Africa' },
  { id: 'CN', name: 'China', continent: 'Asia' },
  { id: 'IN', name: 'India', continent: 'Asia' },
  { id: 'JP', name: 'Japan', continent: 'Asia' },
  { id: 'KR', name: 'South Korea', continent: 'Asia', aliases: ['korea', 'republic of korea'] },
  { id: 'RU', name: 'Russia', continent: 'Asia' },
  { id: 'ID', name: 'Indonesia', continent: 'Asia' },
  { id: 'TH', name: 'Thailand', continent: 'Asia' },
  { id: 'SA', name: 'Saudi Arabia', continent: 'Asia' },
  { id: 'TR', name: 'Turkey', continent: 'Asia' },
  { id: 'IR', name: 'Iran', continent: 'Asia' },
  { id: 'AU', name: 'Australia', continent: 'Oceania' },
  { id: 'NZ', name: 'New Zealand', continent: 'Oceania' },
];

const SCORE_CORRECT = 10;

const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('world-map');
const outlineSvg = document.getElementById('country-outline');

const scoreEl = document.getElementById('score-value');
const missesEl = document.getElementById('lives-value');
const progressEl = document.getElementById('question-count');
const continentNameEl = document.getElementById('continent-name');
const countryNameEl = document.getElementById('country-name');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
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
const countriesByContinent = COUNTRIES.reduce((groups, country) => {
  if (!groups.has(country.continent)) {
    groups.set(country.continent, []);
  }

  groups.get(country.continent).push(country);
  return groups;
}, new Map());

let score = 0;
let wrongCount = 0;
let correctCount = 0;
let answeredCount = 0;
let activeContinent = '';
let roundCountryIds = [];
let roundIndex = 0;
let revealedCountries = new Set();
let missedCountries = new Set();
let gameActive = false;
let activeCountryId = null;
let answerLocked = false;
let feedbackTimer = null;

function log(message) {
  console.log('[KnowYourContinents]', message);
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function setGuessEnabled(enabled) {
  guessInput.disabled = !enabled;
  guessBtn.disabled = !enabled;
}

function updateScoreboard() {
  scoreEl.textContent = score;
  missesEl.textContent = wrongCount;
  progressEl.textContent = `${answeredCount}/${roundCountryIds.length}`;
}

function renderMapState() {
  countryElements.forEach((element, countryId) => {
    element.classList.toggle('is-current-country', countryId === activeCountryId);
    element.classList.toggle('is-found', revealedCountries.has(countryId));
    element.classList.toggle('is-missed', missedCountries.has(countryId));
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
  }, 1700);
}

function buildMap() {
  if (!mapData?.countries?.length) {
    throw new Error('Know Your Continents map data is missing.');
  }

  svg.setAttribute('viewBox', `0 0 ${mapData.width} ${mapData.height}`);
  const fragment = document.createDocumentFragment();

  (mapData.backgroundCountries ?? []).forEach((country) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', country.path);
    path.setAttribute('class', 'map-country-background');
    path.setAttribute('aria-hidden', 'true');
    fragment.appendChild(path);
  });

  mapData.countries.forEach((country) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', country.path);
    path.setAttribute('class', 'map-country');
    path.dataset.countryId = country.id;
    path.setAttribute('aria-hidden', 'true');
    fragment.appendChild(path);
    countryElements.set(country.id, path);
  });

  svg.appendChild(fragment);
}

function renderOutline(countryId) {
  outlineSvg.replaceChildren();

  if (!countryId) {
    outlineSvg.setAttribute('viewBox', '0 0 100 100');
    return;
  }

  const mapCountry = mapCountryById.get(countryId);
  if (!mapCountry) {
    outlineSvg.setAttribute('viewBox', '0 0 100 100');
    return;
  }

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', mapCountry.path);
  path.setAttribute('class', 'preview-country');
  outlineSvg.appendChild(path);

  const bounds = path.getBBox();
  const pad = Math.max(bounds.width, bounds.height) * 0.18 + 8;
  const viewBox = [
    bounds.x - pad,
    bounds.y - pad,
    Math.max(bounds.width + pad * 2, 32),
    Math.max(bounds.height + pad * 2, 32),
  ].join(' ');

  outlineSvg.setAttribute('viewBox', viewBox);
}

function queueNextStep(callback, delay) {
  answerLocked = true;
  setGuessEnabled(false);

  window.setTimeout(() => {
    answerLocked = false;
    callback();
  }, delay);
}

function finishGame() {
  gameActive = false;
  activeCountryId = null;
  renderOutline(null);
  renderMapState();
  setGuessEnabled(false);

  gameoverTitle.textContent = `🏁 ${activeContinent} complete`;
  gameoverName.textContent = `${nameInput.value.trim() || 'Player'} • ${activeContinent}`;
  gameoverScore.textContent = score;
  gameoverErrors.textContent = wrongCount;
  gameoverCorrect.textContent = correctCount;
  gameOverModal.classList.add('visible');
}

function nextQuestion() {
  if (!gameActive) {
    return;
  }

  if (roundIndex >= roundCountryIds.length) {
    finishGame();
    return;
  }

  activeCountryId = roundCountryIds[roundIndex];
  roundIndex += 1;

  renderOutline(activeCountryId);
  renderMapState();
  countryNameEl.textContent = 'Name the country shown by the outline.';
  guessInput.value = '';
  setGuessEnabled(true);
  guessInput.focus();

  const country = countryById.get(activeCountryId);
  log(`Guess ${country?.name ?? activeCountryId} in ${activeContinent}`);
}

function isCorrectGuess(country, guess) {
  const acceptedAnswers = [country.name, ...(country.aliases ?? [])].map(normalizeAnswer);
  return acceptedAnswers.includes(normalizeAnswer(guess));
}

function handleGuessSubmit(event) {
  event.preventDefault();

  if (!gameActive || answerLocked) {
    return;
  }

  const guess = guessInput.value.trim();
  if (!guess) {
    showFeedback('Type a country name first.', 'wrong');
    guessInput.focus();
    return;
  }

  const targetCountry = countryById.get(activeCountryId);
  if (!targetCountry) {
    return;
  }

  answeredCount += 1;

  if (isCorrectGuess(targetCountry, guess)) {
    score += SCORE_CORRECT;
    correctCount += 1;
    revealedCountries.add(targetCountry.id);
    updateScoreboard();
    renderMapState();
    showFeedback(`Correct. ${targetCountry.name} is now revealed on the map.`, 'correct');
    queueNextStep(nextQuestion, 900);
    return;
  }

  wrongCount += 1;
  missedCountries.add(targetCountry.id);
  updateScoreboard();
  renderMapState();
  showFeedback(`Missed. The outline was ${targetCountry.name}.`, 'wrong');
  queueNextStep(nextQuestion, 1100);
}

function pickRandomContinent() {
  return shuffle([...countriesByContinent.keys()])[0];
}

function startGame() {
  activeContinent = pickRandomContinent();
  roundCountryIds = shuffle(countriesByContinent.get(activeContinent).map((country) => country.id));
  roundIndex = 0;
  score = 0;
  wrongCount = 0;
  correctCount = 0;
  answeredCount = 0;
  revealedCountries = new Set();
  missedCountries = new Set();
  gameActive = true;
  activeCountryId = null;
  answerLocked = false;

  continentNameEl.textContent = activeContinent;
  countryNameEl.textContent = 'Get ready for the first outline.';
  updateScoreboard();
  renderMapState();
  renderOutline(null);
  gameOverModal.classList.remove('visible');
  introModal.classList.add('hidden');

  window.setTimeout(nextQuestion, 250);
}

playBtn.addEventListener('click', startGame);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    playBtn.click();
  }
});
guessForm.addEventListener('submit', handleGuessSubmit);
playAgainBtn.addEventListener('click', () => {
  gameOverModal.classList.remove('visible');
  startGame();
});
backHomeBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

function init() {
  try {
    buildMap();
    updateScoreboard();
    renderMapState();
    renderOutline(null);
    setGuessEnabled(false);
    continentNameEl.textContent = 'Random at start';
    countryNameEl.textContent = 'Press Start to get your first outline.';
    progressEl.textContent = '0/0';
    log('Know Your Continents loaded with continent-based reveal mode.');
  } catch (error) {
    console.error(error);
    countryNameEl.textContent = 'Map data failed to load';
    showFeedback('Map data failed to load.', 'wrong');
  }
}

init();