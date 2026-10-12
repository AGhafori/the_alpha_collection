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

const CITIES = [
  { name: 'New York', countryId: 'US', lat: 40.7128, lon: -74.006, aliases: ['new york city', 'nyc'] },
  { name: 'Toronto', countryId: 'CA', lat: 43.6532, lon: -79.3832 },
  { name: 'Mexico City', countryId: 'MX', lat: 19.4326, lon: -99.1332, aliases: ['ciudad de mexico'] },
  { name: 'Sao Paulo', countryId: 'BR', lat: -23.5505, lon: -46.6333, aliases: ['sao paulo'] },
  { name: 'Buenos Aires', countryId: 'AR', lat: -34.6037, lon: -58.3816 },
  { name: 'Bogota', countryId: 'CO', lat: 4.711, lon: -74.0721 },
  { name: 'Santiago', countryId: 'CL', lat: -33.4489, lon: -70.6693 },
  { name: 'Lima', countryId: 'PE', lat: -12.0464, lon: -77.0428 },
  { name: 'London', countryId: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', countryId: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: 'Berlin', countryId: 'DE', lat: 52.52, lon: 13.405 },
  { name: 'Rome', countryId: 'IT', lat: 41.9028, lon: 12.4964 },
  { name: 'Madrid', countryId: 'ES', lat: 40.4168, lon: -3.7038 },
  { name: 'Lisbon', countryId: 'PT', lat: 38.7223, lon: -9.1393 },
  { name: 'Stockholm', countryId: 'SE', lat: 59.3293, lon: 18.0686 },
  { name: 'Athens', countryId: 'GR', lat: 37.9838, lon: 23.7275 },
  { name: 'Warsaw', countryId: 'PL', lat: 52.2297, lon: 21.0122 },
  { name: 'Cairo', countryId: 'EG', lat: 30.0444, lon: 31.2357 },
  { name: 'Nairobi', countryId: 'KE', lat: -1.2921, lon: 36.8219 },
  { name: 'Lagos', countryId: 'NG', lat: 6.5244, lon: 3.3792 },
  { name: 'Beijing', countryId: 'CN', lat: 39.9042, lon: 116.4074 },
  { name: 'Mumbai', countryId: 'IN', lat: 19.076, lon: 72.8777, aliases: ['bombay'] },
  { name: 'Tokyo', countryId: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: 'Seoul', countryId: 'KR', lat: 37.5665, lon: 126.978 },
  { name: 'Moscow', countryId: 'RU', lat: 55.7558, lon: 37.6173 },
  { name: 'Jakarta', countryId: 'ID', lat: -6.2088, lon: 106.8456 },
  { name: 'Bangkok', countryId: 'TH', lat: 13.7563, lon: 100.5018 },
  { name: 'Riyadh', countryId: 'SA', lat: 24.7136, lon: 46.6753 },
  { name: 'Istanbul', countryId: 'TR', lat: 41.0082, lon: 28.9784 },
  { name: 'Sydney', countryId: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: 'Auckland', countryId: 'NZ', lat: -36.8509, lon: 174.7645 },
];

const SCORE_CORRECT = 10;
const COUNTRY_ROUND_SIZE = 20;
const CITY_ROUND_SIZE = 15;
const MAX_MISSES = 3;

const GAME_MODES = {
  COUNTRIES: 'countries',
  CITIES: 'cities',
};

const CITY_CHALLENGE_MODES = {
  NAME: 'name',
  LOCATE: 'locate',
};

const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('world-map');
const outlineSvg = document.getElementById('country-outline');
const mapStage = document.getElementById('map-stage');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const zoomResetBtn = document.getElementById('zoom-reset-btn');

const scoreEl = document.getElementById('score-value');
const missesEl = document.getElementById('lives-value');
const livesLabelEl = document.getElementById('lives-label');
const progressEl = document.getElementById('question-count');
const modeNameEl = document.getElementById('continent-name');
const countryNameEl = document.getElementById('country-name');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const guessLabel = document.getElementById('guess-label');
const guessBtn = document.getElementById('guess-btn');
const guessHelpEl = document.getElementById('guess-help');
const outlineLabelEl = document.getElementById('outline-label');
const citySubmodeButtons = document.getElementById('city-submode-buttons');
const cityNameModeBtn = document.getElementById('city-name-mode-btn');
const cityLocateModeBtn = document.getElementById('city-locate-mode-btn');
const introModal = document.getElementById('intro-modal');
const nameInput = document.getElementById('player-name');
const playCountriesBtn = document.getElementById('play-countries-btn');
const playCitiesBtn = document.getElementById('play-cities-btn');
const gameOverModal = document.getElementById('game-over-modal');
const gameoverName = document.getElementById('gameover-name');
const gameoverScore = document.getElementById('gameover-score');
const gameoverErrors = document.getElementById('gameover-errors');
const gameoverCorrect = document.getElementById('gameover-correct');
const gameoverTitle = document.getElementById('gameover-title');
const replayRoundBtn = document.getElementById('replay-round-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const backHomeBtn = document.getElementById('back-home-btn');
const feedbackEl = document.getElementById('feedback');
const mapData = window.COUNTRY_LOCATOR_MAP;

const countryById = new Map(COUNTRIES.map((country) => [country.id, country]));
const mapCountryById = new Map((mapData?.countries ?? []).map((country) => [country.id, country]));
const countryElements = new Map();

let score = 0;
let wrongCount = 0;
let correctCount = 0;
let answeredCount = 0;
let roundIds = [];
let roundIndex = 0;
let revealedCountries = new Set();
let missedCountries = new Set();
let gameActive = false;
let activeCountryId = null;
let activeCity = null;
let answerLocked = false;
let feedbackTimer = null;
let selectedGameMode = GAME_MODES.COUNTRIES;
let selectedCityChallengeMode = CITY_CHALLENGE_MODES.NAME;
let mapScale = 1;
let mapOffsetX = 0;
let mapOffsetY = 0;
let isPanningMap = false;
let panPointerId = null;
let panStartX = 0;
let panStartY = 0;
let panOriginX = 0;
let panOriginY = 0;
let pinchDistance = 0;
let pinchStartScale = 1;
const activeTouchPoints = new Map();

const MIN_MAP_SCALE = 1;
const MAX_MAP_SCALE = 3;
const MAP_SCALE_STEP = 0.35;

function log(message) {
  console.log('[KnowYourGeography]', message);
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getMapPanLimits(scale = mapScale) {
  const stageRect = mapStage.getBoundingClientRect();
  const maxOffsetX = ((scale - 1) * stageRect.width) / 2;
  const maxOffsetY = ((scale - 1) * stageRect.height) / 2;

  return {
    maxOffsetX,
    maxOffsetY,
  };
}

function clampMapOffsets(scale = mapScale) {
  const { maxOffsetX, maxOffsetY } = getMapPanLimits(scale);
  mapOffsetX = clamp(mapOffsetX, -maxOffsetX, maxOffsetX);
  mapOffsetY = clamp(mapOffsetY, -maxOffsetY, maxOffsetY);
}

function updateMapTransform() {
  clampMapOffsets();
  svg.style.transform = `translate(${mapOffsetX}px, ${mapOffsetY}px) scale(${mapScale})`;
  mapStage.classList.toggle('is-zoomed', mapScale > 1);
}

function setMapZoom(nextScale) {
  mapScale = clamp(nextScale, MIN_MAP_SCALE, MAX_MAP_SCALE);

  if (mapScale === MIN_MAP_SCALE) {
    mapOffsetX = 0;
    mapOffsetY = 0;
  }

  updateMapTransform();
}

function adjustMapZoom(delta) {
  setMapZoom(mapScale + delta);
}

function getPointerDistance(firstPointer, secondPointer) {
  return Math.hypot(secondPointer.x - firstPointer.x, secondPointer.y - firstPointer.y);
}

function beginMapPan(pointer) {
  isPanningMap = true;
  panPointerId = pointer.id;
  panStartX = pointer.x;
  panStartY = pointer.y;
  panOriginX = mapOffsetX;
  panOriginY = mapOffsetY;
  mapStage.classList.add('is-panning');
}

function stopMapPanState() {
  isPanningMap = false;
  panPointerId = null;
  mapStage.classList.remove('is-panning');
}

function resetMapZoom() {
  setMapZoom(MIN_MAP_SCALE);
}

function updateScoreboard() {
  scoreEl.textContent = score;
  missesEl.textContent = `${wrongCount}/${MAX_MISSES}`;
  progressEl.textContent = `${answeredCount}/${roundIds.length}`;
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
    throw new Error('Know Your Geography map data is missing.');
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

function toMapPoint(lat, lon) {
  return {
    x: ((lon + 180) / 360) * mapData.width,
    y: ((90 - lat) / 180) * mapData.height,
  };
}

function getMapCoordinatesFromEvent(event) {
  const rect = svg.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * mapData.width;
  const y = ((event.clientY - rect.top) / rect.height) * mapData.height;
  return { x, y };
}

function focusMapOnCountry(countryId) {
  const element = countryElements.get(countryId);
  if (!element) {
    resetMapZoom();
    return;
  }

  const bounds = element.getBBox();
  const widthFactor = mapData.width / Math.max(bounds.width, 140);
  const heightFactor = mapData.height / Math.max(bounds.height, 100);
  const nextScale = clamp(Math.min(widthFactor, heightFactor) * 0.35, 1.35, MAX_MAP_SCALE);

  mapScale = nextScale;

  const centerX = bounds.x + (bounds.width / 2);
  const centerY = bounds.y + (bounds.height / 2);
  const normX = ((centerX / mapData.width) - 0.5) * 2;
  const normY = ((centerY / mapData.height) - 0.5) * 2;
  const { maxOffsetX, maxOffsetY } = getMapPanLimits(mapScale);

  mapOffsetX = clamp(-normX * maxOffsetX * 0.92, -maxOffsetX, maxOffsetX);
  mapOffsetY = clamp(-normY * maxOffsetY * 0.92, -maxOffsetY, maxOffsetY);
  updateMapTransform();
}

function setCityChallengeMode(mode) {
  selectedCityChallengeMode = mode;
  cityNameModeBtn.classList.toggle('active', mode === CITY_CHALLENGE_MODES.NAME);
  cityLocateModeBtn.classList.toggle('active', mode === CITY_CHALLENGE_MODES.LOCATE);

  if (!gameActive || selectedGameMode !== GAME_MODES.CITIES || !activeCity) {
    return;
  }

  applyModePresentation();
  if (mode === CITY_CHALLENGE_MODES.NAME) {
    guessInput.focus();
  }
}

function isCorrectGuess(acceptedValues, guess) {
  return acceptedValues.includes(normalizeAnswer(guess));
}

function finishGame(reason = '') {
  gameActive = false;
  activeCountryId = null;
  activeCity = null;
  renderOutline(null);
  renderMapState();
  setGuessEnabled(false);

  let titlePrefix = '🏁 Round complete';
  if (reason === 'misses') {
    titlePrefix = '💀 Out of tries';
  }

  gameoverTitle.textContent = titlePrefix;
  gameoverName.textContent = `${nameInput.value.trim() || 'Player'} • ${selectedGameMode === GAME_MODES.COUNTRIES ? 'Countries' : 'Cities'}`;
  gameoverScore.textContent = score;
  gameoverErrors.textContent = wrongCount;
  gameoverCorrect.textContent = correctCount;
  gameOverModal.classList.add('visible');
}

function applyModePresentation() {
  if (selectedGameMode === GAME_MODES.COUNTRIES) {
    modeNameEl.textContent = 'Guess Countries';
    livesLabelEl.textContent = 'Tries';
    outlineLabelEl.textContent = 'Country outline';
    guessLabel.textContent = 'Your guess';
    guessInput.placeholder = 'Type the country name';
    guessBtn.textContent = 'Submit Guess';
    guessHelpEl.textContent = 'You have 3 total misses. Survive all 20 outlines to win the round.';
    citySubmodeButtons.hidden = true;
    setGuessEnabled(true);
    return;
  }

  modeNameEl.textContent = 'Guess Cities';
  livesLabelEl.textContent = 'Tries';
  outlineLabelEl.textContent = 'Country focus';
  citySubmodeButtons.hidden = false;

  if (selectedCityChallengeMode === CITY_CHALLENGE_MODES.NAME) {
    guessLabel.textContent = 'City name';
    guessInput.placeholder = 'Type the city name';
    guessBtn.textContent = 'Submit City';
    guessHelpEl.textContent = 'A country is highlighted and zoomed in. Name the city in that country.';
    setGuessEnabled(true);
    return;
  }

  guessLabel.textContent = 'Locate city';
  guessInput.placeholder = 'Tap on the map to answer';
  guessBtn.textContent = 'Tap Map to Guess';
  guessHelpEl.textContent = 'Tap where you think the shown city is located in the highlighted country.';
  setGuessEnabled(false);
}

function getCityPool() {
  return CITIES.filter((city) => countryById.has(city.countryId) && mapCountryById.has(city.countryId));
}

function nextQuestion() {
  if (!gameActive) {
    return;
  }

  if (wrongCount >= MAX_MISSES) {
    finishGame('misses');
    return;
  }

  if (roundIndex >= roundIds.length) {
    finishGame();
    return;
  }

  const nextRoundItem = roundIds[roundIndex];
  roundIndex += 1;

  if (selectedGameMode === GAME_MODES.COUNTRIES) {
    activeCountryId = nextRoundItem;
    activeCity = null;
    renderOutline(activeCountryId);
    resetMapZoom();
    countryNameEl.textContent = 'Name the country shown by the outline.';
    guessInput.value = '';
    applyModePresentation();
    renderMapState();
    updateScoreboard();
    guessInput.focus();
    return;
  }

  activeCity = nextRoundItem;
  activeCountryId = activeCity.countryId;
  renderOutline(activeCountryId);
  focusMapOnCountry(activeCountryId);
  countryNameEl.textContent = `City target: ${activeCity.name}`;
  guessInput.value = '';
  applyModePresentation();
  renderMapState();
  updateScoreboard();

  if (selectedCityChallengeMode === CITY_CHALLENGE_MODES.NAME) {
    guessInput.focus();
  }
}

function handleCountryGuess(guess) {
  const targetCountry = countryById.get(activeCountryId);
  if (!targetCountry) {
    return;
  }

  answeredCount += 1;
  const acceptedAnswers = [targetCountry.name, ...(targetCountry.aliases ?? [])].map(normalizeAnswer);

  if (isCorrectGuess(acceptedAnswers, guess)) {
    score += SCORE_CORRECT;
    correctCount += 1;
    revealedCountries.add(targetCountry.id);
    updateScoreboard();
    renderMapState();
    showFeedback(`Correct. ${targetCountry.name} is revealed on the map.`, 'correct');
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

function handleCityNameGuess(guess) {
  if (!activeCity) {
    return;
  }

  answeredCount += 1;
  const acceptedAnswers = [activeCity.name, ...(activeCity.aliases ?? [])].map(normalizeAnswer);

  if (isCorrectGuess(acceptedAnswers, guess)) {
    score += SCORE_CORRECT;
    correctCount += 1;
    revealedCountries.add(activeCity.countryId);
    updateScoreboard();
    renderMapState();
    showFeedback(`Correct. ${activeCity.name} is in ${countryById.get(activeCity.countryId)?.name ?? 'that country'}.`, 'correct');
    queueNextStep(nextQuestion, 900);
    return;
  }

  wrongCount += 1;
  missedCountries.add(activeCity.countryId);
  updateScoreboard();
  renderMapState();
  showFeedback(`Missed. The city was ${activeCity.name}.`, 'wrong');
  queueNextStep(nextQuestion, 1100);
}

function handleCityLocateGuess(event) {
  if (
    !gameActive ||
    answerLocked ||
    selectedGameMode !== GAME_MODES.CITIES ||
    selectedCityChallengeMode !== CITY_CHALLENGE_MODES.LOCATE ||
    !activeCity
  ) {
    return;
  }

  const pointer = getMapCoordinatesFromEvent(event);
  const target = toMapPoint(activeCity.lat, activeCity.lon);
  const countryElement = countryElements.get(activeCity.countryId);
  const bounds = countryElement ? countryElement.getBBox() : { width: 120, height: 120 };
  const hitRadius = clamp(Math.max(bounds.width, bounds.height) * 0.12, 18, 52);
  const distance = Math.hypot(pointer.x - target.x, pointer.y - target.y);

  answeredCount += 1;

  if (distance <= hitRadius) {
    score += SCORE_CORRECT;
    correctCount += 1;
    revealedCountries.add(activeCity.countryId);
    updateScoreboard();
    renderMapState();
    showFeedback(`Nice locate. ${activeCity.name} is correct.`, 'correct');
    queueNextStep(nextQuestion, 900);
    return;
  }

  wrongCount += 1;
  missedCountries.add(activeCity.countryId);
  updateScoreboard();
  renderMapState();
  showFeedback(`Not quite. ${activeCity.name} was elsewhere in the country.`, 'wrong');
  queueNextStep(nextQuestion, 1100);
}

function handleGuessSubmit(event) {
  event.preventDefault();

  if (!gameActive || answerLocked) {
    return;
  }

  if (selectedGameMode === GAME_MODES.CITIES && selectedCityChallengeMode === CITY_CHALLENGE_MODES.LOCATE) {
    showFeedback('Use the map tap to locate the city.', 'wrong');
    return;
  }

  const guess = guessInput.value.trim();
  if (!guess) {
    showFeedback('Type your guess first.', 'wrong');
    guessInput.focus();
    return;
  }

  if (selectedGameMode === GAME_MODES.COUNTRIES) {
    handleCountryGuess(guess);
    return;
  }

  handleCityNameGuess(guess);
}

function startGame(mode) {
  selectedGameMode = mode;
  score = 0;
  wrongCount = 0;
  correctCount = 0;
  answeredCount = 0;
  revealedCountries = new Set();
  missedCountries = new Set();
  roundIndex = 0;
  activeCountryId = null;
  activeCity = null;
  answerLocked = false;
  gameActive = true;

  if (mode === GAME_MODES.COUNTRIES) {
    const countryIds = COUNTRIES
      .map((country) => country.id)
      .filter((countryId) => mapCountryById.has(countryId));
    roundIds = shuffle(countryIds).slice(0, COUNTRY_ROUND_SIZE);
    selectedCityChallengeMode = CITY_CHALLENGE_MODES.NAME;
  } else {
    roundIds = shuffle(getCityPool()).slice(0, CITY_ROUND_SIZE);
  }

  resetMapZoom();
  updateScoreboard();
  renderMapState();
  renderOutline(null);
  introModal.classList.add('hidden');
  gameOverModal.classList.remove('visible');
  countryNameEl.textContent = 'Get ready for your first challenge.';
  applyModePresentation();

  window.setTimeout(nextQuestion, 220);
}

function openIntroModal() {
  introModal.classList.remove('hidden');
  gameOverModal.classList.remove('visible');
  gameActive = false;
  resetMapZoom();
  renderOutline(null);
  activeCountryId = null;
  activeCity = null;
  renderMapState();
  modeNameEl.textContent = 'Choose at start';
  countryNameEl.textContent = 'Choose a mode to begin.';
  progressEl.textContent = '0/0';
  scoreEl.textContent = '0';
  missesEl.textContent = `0/${MAX_MISSES}`;
}

playCountriesBtn.addEventListener('click', () => startGame(GAME_MODES.COUNTRIES));
playCitiesBtn.addEventListener('click', () => startGame(GAME_MODES.CITIES));

nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    playCountriesBtn.click();
  }
});

guessForm.addEventListener('submit', handleGuessSubmit);

cityNameModeBtn.addEventListener('click', () => {
  setCityChallengeMode(CITY_CHALLENGE_MODES.NAME);
});

cityLocateModeBtn.addEventListener('click', () => {
  setCityChallengeMode(CITY_CHALLENGE_MODES.LOCATE);
});

replayRoundBtn.addEventListener('click', () => {
  gameOverModal.classList.remove('visible');
  startGame(selectedGameMode);
});

playAgainBtn.addEventListener('click', () => {
  openIntroModal();
});

backHomeBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

zoomInBtn.addEventListener('click', () => {
  adjustMapZoom(MAP_SCALE_STEP);
});

zoomOutBtn.addEventListener('click', () => {
  adjustMapZoom(-MAP_SCALE_STEP);
});

zoomResetBtn.addEventListener('click', resetMapZoom);

mapStage.addEventListener('click', handleCityLocateGuess);

mapStage.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse') {
    return;
  }

  const pointer = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
  };

  activeTouchPoints.set(event.pointerId, pointer);
  mapStage.setPointerCapture(event.pointerId);

  if (activeTouchPoints.size === 2) {
    const [firstPointer, secondPointer] = [...activeTouchPoints.values()];
    pinchDistance = getPointerDistance(firstPointer, secondPointer);
    pinchStartScale = mapScale;
    stopMapPanState();
    return;
  }

  if (mapScale > 1) {
    beginMapPan(pointer);
  }
});

mapStage.addEventListener('pointermove', (event) => {
  if (!activeTouchPoints.has(event.pointerId)) {
    return;
  }

  activeTouchPoints.set(event.pointerId, {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
  });

  if (activeTouchPoints.size === 2) {
    const [firstPointer, secondPointer] = [...activeTouchPoints.values()];
    const nextDistance = getPointerDistance(firstPointer, secondPointer);

    if (pinchDistance > 0) {
      setMapZoom(pinchStartScale * (nextDistance / pinchDistance));
    }

    return;
  }

  if (!isPanningMap || event.pointerId !== panPointerId) {
    return;
  }

  mapOffsetX = panOriginX + (event.clientX - panStartX);
  mapOffsetY = panOriginY + (event.clientY - panStartY);
  updateMapTransform();
});

function stopMapPan(event) {
  activeTouchPoints.delete(event.pointerId);

  if (activeTouchPoints.size < 2) {
    pinchDistance = 0;
  }

  if (event.pointerId === panPointerId || activeTouchPoints.size === 0) {
    stopMapPanState();
  }

  if (activeTouchPoints.size === 1 && mapScale > 1) {
    beginMapPan([...activeTouchPoints.values()][0]);
  }
}

mapStage.addEventListener('pointerup', stopMapPan);
mapStage.addEventListener('pointercancel', stopMapPan);
mapStage.addEventListener('pointerleave', stopMapPan);
window.addEventListener('resize', updateMapTransform);

function init() {
  try {
    buildMap();
    updateMapTransform();
    updateScoreboard();
    renderMapState();
    renderOutline(null);
    setGuessEnabled(false);
    citySubmodeButtons.hidden = true;
    modeNameEl.textContent = 'Choose at start';
    countryNameEl.textContent = 'Choose a mode to begin.';
    progressEl.textContent = '0/0';
    livesLabelEl.textContent = 'Tries';
    missesEl.textContent = `0/${MAX_MISSES}`;
    log('Know Your Geography loaded with countries and cities modes.');
  } catch (error) {
    console.error(error);
    countryNameEl.textContent = 'Map data failed to load';
    showFeedback('Map data failed to load.', 'wrong');
  }
}

init();
