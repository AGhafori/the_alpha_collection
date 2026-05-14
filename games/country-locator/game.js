const COUNTRIES = [
  { id: 'US', name: 'United States', flag: '🇺🇸', points: [
    [-124,48],[-122,48],[-117,33],[-114,32],[-103,31],[-97,26],[-89,30],[-83,30],
    [-80,25],[-76,35],[-74,40],[-72,41],[-68,45],[-88,43],[-97,48]
  ]},
  { id: 'CA', name: 'Canada', flag: '🇨🇦', points: [
    [-141,60],[-130,55],[-125,49],[-122,49],[-97,48],[-88,43],[-72,45],[-68,45],
    [-64,47],[-60,47],[-55,50],[-60,55],[-65,60],[-80,65],[-95,70],[-110,70],[-130,65],[-141,60]
  ]},
  { id: 'MX', name: 'Mexico', flag: '🇲🇽', points: [
    [-117,33],[-114,32],[-103,31],[-97,26],[-95,25],[-92,22],[-90,20],[-88,18],
    [-87,19],[-86,22],[-89,24],[-90,27],[-95,29],[-97,30],[-97,26],[-103,31],[-117,33]
  ]},
  { id: 'CU', name: 'Cuba', flag: '🇨🇺', points: [
    [-85,22],[-84,22],[-82,23],[-78,23],[-75,22],[-77,20],[-80,20],[-83,20],[-85,22]
  ]},
  { id: 'BR', name: 'Brazil', flag: '🇧🇷', points: [
    [-52,5],[-47,2],[-35,-6],[-35,-10],[-37,-12],[-39,-20],[-43,-23],[-48,-28],
    [-50,-30],[-53,-33],[-55,-34],[-57,-32],[-60,-30],[-65,-28],[-70,-20],[-73,-10],
    [-70,-5],[-65,0],[-60,2],[-52,5]
  ]},
  { id: 'AR', name: 'Argentina', flag: '🇦🇷', points: [
    [-65,-22],[-62,-22],[-58,-25],[-56,-27],[-54,-28],[-53,-33],[-55,-34],[-58,-36],
    [-62,-38],[-65,-40],[-68,-42],[-70,-47],[-72,-50],[-70,-52],[-66,-55],[-64,-54],
    [-60,-52],[-58,-50],[-62,-48],[-64,-44],[-65,-40],[-65,-30],[-65,-22]
  ]},
  { id: 'CO', name: 'Colombia', flag: '🇨🇴', points: [
    [-79,2],[-77,2],[-75,5],[-72,5],[-70,5],[-68,7],[-67,10],[-68,12],[-72,12],
    [-75,12],[-77,10],[-78,8],[-79,5],[-79,2]
  ]},
  { id: 'CL', name: 'Chile', flag: '🇨🇱', points: [
    [-70,-18],[-68,-18],[-66,-20],[-67,-24],[-68,-28],[-70,-30],[-71,-36],[-71,-40],
    [-72,-44],[-73,-48],[-75,-52],[-72,-54],[-68,-56],[-66,-54],[-68,-50],[-70,-46],
    [-70,-40],[-70,-33],[-70,-23],[-70,-18]
  ]},
  { id: 'PE', name: 'Peru', flag: '🇵🇪', points: [
    [-81,-4],[-79,-4],[-77,-5],[-75,-5],[-73,-8],[-71,-10],[-70,-14],[-70,-18],
    [-72,-18],[-74,-16],[-76,-14],[-78,-12],[-80,-8],[-81,-5],[-81,-4]
  ]},
  { id: 'VE', name: 'Venezuela', flag: '🇻🇪', points: [
    [-73,12],[-71,12],[-68,10],[-65,10],[-62,10],[-60,10],[-60,8],[-62,6],
    [-65,5],[-67,5],[-70,5],[-72,8],[-73,10],[-73,12]
  ]},
  { id: 'GB', name: 'United Kingdom', flag: '🇬🇧', points: [
    [-6,50],[-5,50],[-4,51],[-3,51],[-2,52],[0,52],[2,53],[2,55],[0,56],
    [-3,57],[-4,57],[-5,55],[-5,52],[-6,51],[-6,50]
  ]},
  { id: 'FR', name: 'France', flag: '🇫🇷', points: [
    [-5,48],[-4,48],[-2,49],[0,49],[2,48],[4,47],[5,46],[7,44],[7,43],
    [5,43],[3,43],[0,44],[-2,44],[-4,45],[-5,47],[-5,48]
  ]},
  { id: 'DE', name: 'Germany', flag: '🇩🇪', points: [
    [6,48],[7,48],[9,48],[10,48],[11,49],[12,50],[12,52],[13,54],[14,54],
    [14,55],[12,55],[11,54],[10,54],[9,53],[8,54],[7,53],[6,52],[5,51],[6,48]
  ]},
  { id: 'IT', name: 'Italy', flag: '🇮🇹', points: [
    [8,44],[9,44],[10,44],[11,44],[12,45],[13,46],[14,46],[15,46],[16,46],
    [16,45],[14,42],[13,40],[12,40],[11,41],[10,42],[9,42],[8,43],[8,44]
  ]},
  { id: 'ES', name: 'Spain', flag: '🇪🇸', points: [
    [-9,44],[-8,44],[-5,44],[-3,44],[0,43],[2,43],[3,42],[4,42],[4,41],
    [3,40],[2,39],[0,38],[-2,38],[-4,38],[-6,38],[-8,38],[-9,40],[-9,42],[-9,44]
  ]},
  { id: 'PT', name: 'Portugal', flag: '🇵🇹', points: [
    [-10,42],[-9,42],[-9,40],[-8,38],[-9,37],[-10,37],[-10,38],[-10,42]
  ]},
  { id: 'SE', name: 'Sweden', flag: '🇸🇪', points: [
    [12,56],[13,56],[15,56],[16,57],[17,58],[18,59],[20,60],[22,62],[23,64],
    [24,66],[23,68],[22,68],[20,68],[18,67],[16,65],[15,63],[14,61],[13,59],
    [13,57],[12,56]
  ]},
  { id: 'NO', name: 'Norway', flag: '🇳🇴', points: [
    [5,58],[6,58],[8,59],[10,60],[11,62],[12,64],[14,66],[16,68],[18,70],
    [20,70],[22,70],[24,70],[26,70],[28,70],[30,70],[32,70],[28,68],[24,66],
    [22,64],[20,62],[18,60],[15,58],[12,58],[10,58],[8,58],[5,58]
  ]},
  { id: 'GR', name: 'Greece', flag: '🇬🇷', points: [
    [20,36],[21,36],[22,37],[23,37],[24,38],[26,38],[27,38],[28,37],[29,37],
    [28,36],[27,35],[26,35],[25,35],[24,36],[23,37],[22,37],[21,38],[20,38],
    [20,37],[20,36]
  ]},
  { id: 'PL', name: 'Poland', flag: '🇵🇱', points: [
    [15,49],[16,49],[17,50],[18,51],[19,52],[20,53],[22,54],[24,54],[24,53],
    [23,52],[22,50],[21,49],[20,48],[19,48],[18,48],[17,48],[16,49],[15,49]
  ]},
  { id: 'NL', name: 'Netherlands', flag: '🇳🇱', points: [
    [4,51],[5,51],[6,52],[7,52],[7,53],[6,53],[5,53],[4,52],[4,51]
  ]},
  { id: 'CH', name: 'Switzerland', flag: '🇨🇭', points: [
    [6,46],[7,46],[8,46],[9,46],[10,47],[10,48],[9,48],[8,47],[7,47],[6,47],[6,46]
  ]},
  { id: 'IE', name: 'Ireland', flag: '🇮🇪', points: [
    [-10,52],[-9,52],[-8,52],[-7,53],[-6,54],[-6,55],[-8,55],[-9,54],[-10,53],[-10,52]
  ]},
  { id: 'DK', name: 'Denmark', flag: '🇩🇰', points: [
    [8,55],[9,55],[10,55],[11,55],[12,56],[12,57],[11,57],[10,57],[9,57],[8,56],[8,55]
  ]},
  { id: 'EG', name: 'Egypt', flag: '🇪🇬', points: [
    [25,22],[27,22],[29,22],[31,22],[33,22],[35,22],[36,24],[36,28],[36,30],
    [35,31],[34,32],[32,32],[30,31],[29,31],[28,30],[27,28],[26,26],[25,24],[25,22]
  ]},
  { id: 'ZA', name: 'South Africa', flag: '🇿🇦', points: [
    [17,-28],[19,-28],[22,-27],[25,-27],[28,-27],[30,-27],[32,-27],[33,-28],
    [34,-30],[34,-32],[33,-34],[32,-34],[30,-34],[28,-34],[27,-33],[25,-33],
    [22,-33],[20,-33],[18,-32],[17,-30],[17,-28]
  ]},
  { id: 'NG', name: 'Nigeria', flag: '🇳🇬', points: [
    [3,5],[4,5],[6,5],[8,5],[10,5],[12,5],[13,6],[14,8],[14,10],[14,12],
    [13,13],[12,13],[11,13],[10,13],[8,13],[6,12],[5,11],[4,9],[3,7],[3,5]
  ]},
  { id: 'KE', name: 'Kenya', flag: '🇰🇪', points: [
    [34,-2],[35,-2],[37,-2],[39,-2],[40,-2],[40,1],[40,3],[40,4],[39,5],
    [38,5],[37,5],[36,5],[35,4],[34,3],[34,1],[34,-1],[34,-2]
  ]},
  { id: 'MA', name: 'Morocco', flag: '🇲🇦', points: [
    [-5,36],[-3,36],[-1,36],[0,36],[1,36],[2,36],[3,36],[3,35],[2,34],
    [1,33],[0,32],[-2,32],[-4,33],[-5,34],[-6,35],[-5,36]
  ]},
  { id: 'DZ', name: 'Algeria', flag: '🇩🇿', points: [
    [-2,37],[0,37],[2,37],[4,37],[6,37],[8,37],[10,37],[12,37],[12,36],
    [12,34],[11,32],[10,30],[8,28],[6,28],[4,28],[2,28],[0,28],[-2,28],
    [-4,28],[-5,30],[-5,32],[-4,34],[-2,36],[-2,37]
  ]},
  { id: 'GH', name: 'Ghana', flag: '🇬🇭', points: [
    [-3,5],[-2,5],[-1,5],[0,5],[1,5],[2,5],[2,6],[2,8],[1,9],[0,10],
    [-1,10],[-2,9],[-3,8],[-3,6],[-3,5]
  ]},
  { id: 'ET', name: 'Ethiopia', flag: '🇪🇹', points: [
    [33,5],[35,5],[37,5],[39,5],[41,5],[42,6],[43,8],[43,10],[43,12],
    [42,14],[41,14],[40,14],[38,14],[37,14],[36,12],[35,10],[34,8],[33,6],[33,5]
  ]},
  { id: 'CN', name: 'China', flag: '🇨🇳', points: [
    [75,39],[78,39],[80,40],[82,42],[85,44],[88,45],[90,46],[95,48],[100,48],
    [105,48],[108,48],[112,48],[115,48],[118,48],[120,48],[122,46],[124,44],
    [125,42],[125,40],[123,38],[122,35],[122,33],[120,30],[118,28],[116,26],
    [114,23],[112,22],[110,22],[108,22],[106,22],[104,22],[102,22],[100,22],
    [98,22],[96,24],[94,26],[92,27],[90,28],[88,28],[86,28],[84,28],[82,28],
    [80,29],[78,30],[76,31],[74,35],[75,37],[75,39]
  ]},
  { id: 'IN', name: 'India', flag: '🇮🇳', points: [
    [68,24],[70,24],[72,24],[74,24],[76,24],[78,24],[80,24],[82,24],[84,24],
    [86,24],[88,24],[90,24],[92,26],[94,27],[96,28],[98,28],[100,28],[100,26],
    [98,24],[96,22],[94,20],[92,18],[90,16],[88,14],[86,12],[84,10],[82,10],
    [80,10],[78,8],[76,8],[74,8],[72,10],[70,12],[68,14],[68,16],[68,18],
    [68,20],[68,22],[68,24]
  ]},
  { id: 'JP', name: 'Japan', flag: '🇯🇵', points: [
    [130,31],[132,31],[134,32],[136,33],[138,34],[140,36],[141,38],[141,40],
    [140,42],[140,44],[138,45],[136,45],[135,43],[134,41],[133,39],[132,37],
    [131,35],[130,33],[130,31]
  ]},
  { id: 'KR', name: 'South Korea', flag: '🇰🇷', points: [
    [126,34],[127,34],[128,34],[129,35],[129,36],[129,37],[129,38],[129,39],
    [128,40],[128,41],[127,42],[126,42],[126,40],[126,38],[126,36],[126,34]
  ]},
  { id: 'RU', name: 'Russia', flag: '🇷🇺', points: [
    [30,60],[32,60],[35,60],[38,60],[40,60],[42,60],[45,60],[48,60],[50,60],
    [52,60],[55,60],[57,60],[60,60],[62,60],[65,60],[68,60],[70,60],[72,60],
    [75,62],[78,64],[80,65],[82,66],[85,67],[88,68],[90,68],[92,68],[95,68],
    [98,68],[100,68],[102,68],[105,68],[108,68],[110,68],[112,68],[115,68],
    [118,68],[120,68],[122,68],[125,68],[128,68],[130,68],[132,68],[135,68],
    [138,68],[140,68],[142,68],[145,68],[148,68],[150,68],[152,68],[155,66],
    [158,64],[160,62],[162,60],[165,58],[168,56],[170,54],[172,52],[175,50],
    [180,50],[180,55],[180,60],[180,65],[180,70],[178,72],[175,74],[172,76],
    [170,78],[168,80],[165,80],[162,78],[160,76],[158,74],[155,72],[152,70],
    [150,68],[148,66],[145,64],[142,62],[140,60],[138,58],[135,56],[132,55],
    [130,54],[128,54],[125,54],[122,54],[120,54],[118,54],[115,54],[112,54],
    [110,55],[108,55],[105,55],[102,55],[100,55],[98,55],[95,55],[92,55],
    [90,55],[88,55],[85,55],[82,55],[80,55],[78,55],[75,55],[72,55],
    [70,55],[68,55],[65,55],[62,55],[60,55],[58,55],[55,55],[52,55],
    [50,55],[48,55],[45,55],[42,55],[40,55],[38,55],[35,55],[32,55],
    [30,55],[28,56],[26,57],[24,58],[24,60],[26,60],[28,60],[30,60]
  ]},
  { id: 'ID', name: 'Indonesia', flag: '🇮🇩', points: [
    [96,5],[98,5],[100,3],[102,0],[104,-1],[106,-3],[108,-4],[110,-5],
    [112,-4],[114,-4],[116,-4],[118,-4],[120,-4],[122,-4],[124,-4],[126,-4],
    [128,-4],[130,-4],[132,-4],[134,-4],[136,-4],[138,-4],[140,-4],[140,-2],
    [138,-1],[136,0],[134,1],[132,2],[130,3],[128,4],[126,4],[124,5],
    [122,6],[120,6],[118,6],[116,6],[114,6],[112,6],[110,6],[108,6],
    [106,6],[104,6],[102,6],[100,6],[98,6],[96,5]
  ]},
  { id: 'TH', name: 'Thailand', flag: '🇹🇭', points: [
    [98,6],[100,6],[102,6],[104,6],[106,6],[106,8],[106,10],[106,12],
    [106,14],[104,16],[102,18],[100,18],[98,18],[98,16],[98,14],[98,12],
    [98,10],[98,8],[98,6]
  ]},
  { id: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', points: [
    [35,18],[37,18],[39,18],[41,18],[43,18],[45,18],[47,18],[49,18],
    [51,18],[53,18],[55,18],[57,18],[57,20],[57,22],[55,24],[53,26],
    [51,28],[49,28],[47,28],[45,28],[43,28],[41,28],[39,28],[37,28],
    [35,28],[35,26],[35,24],[35,22],[35,20],[35,18]
  ]},
  { id: 'TR', name: 'Turkey', flag: '🇹🇷', points: [
    [26,36],[28,36],[30,36],[32,36],[34,36],[36,36],[38,36],[40,36],
    [42,36],[44,36],[44,38],[44,40],[44,41],[42,41],[40,41],[38,41],
    [36,41],[34,41],[32,41],[30,41],[28,41],[26,41],[26,40],[26,38],[26,36]
  ]},
  { id: 'IR', name: 'Iran', flag: '🇮🇷', points: [
    [44,36],[46,36],[48,36],[50,36],[52,36],[54,36],[56,36],[58,36],
    [60,36],[62,36],[64,36],[66,36],[68,36],[70,36],[72,36],[72,38],
    [72,40],[70,42],[68,42],[66,42],[64,42],[62,42],[60,42],[58,42],
    [56,42],[54,42],[52,42],[50,42],[48,42],[46,42],[44,42],[44,40],
    [44,38],[44,36]
  ]},
  { id: 'AU', name: 'Australia', flag: '🇦🇺', points: [
    [115,-14],[118,-14],[120,-14],[122,-14],[124,-14],[126,-14],[128,-14],
    [130,-14],[132,-14],[134,-14],[136,-14],[138,-14],[140,-14],[142,-14],
    [144,-14],[146,-14],[148,-14],[150,-20],[152,-24],[154,-28],[154,-30],
    [152,-34],[150,-36],[148,-38],[146,-38],[144,-36],[142,-34],[140,-32],
    [138,-34],[136,-34],[134,-34],[132,-34],[130,-34],[128,-34],[126,-34],
    [124,-34],[122,-34],[120,-34],[118,-34],[116,-34],[114,-34],[114,-32],
    [114,-30],[114,-28],[114,-26],[114,-24],[114,-22],[114,-20],[114,-18],
    [114,-16],[115,-14]
  ]},
  { id: 'NZ', name: 'New Zealand', flag: '🇳🇿', points: [
    [166,-36],[168,-36],[170,-36],[172,-36],[174,-38],[176,-40],[176,-42],
    [176,-44],[174,-46],[172,-46],[170,-46],[168,-44],[166,-42],[166,-40],
    [166,-38],[166,-36]
  ]},
];

const SCORE_CORRECT = 10;
const SCORE_WRONG = -5;
const MAX_LIVES = 4;

const canvas = document.getElementById('world-map');
const ctx = canvas.getContext('2d');
const W = 1000, H = 600;

const scoreEl = document.getElementById('score-value');
const livesEl = document.getElementById('lives-value');
const questionCountEl = document.getElementById('question-count');
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
const playAgainBtn = document.getElementById('play-again-btn');
const backHomeBtn = document.getElementById('back-home-btn');
const feedbackEl = document.getElementById('feedback');

let score = 0;
let lives = MAX_LIVES;
let questionIndex = 0;
let totalQuestions = 0;
let wrongCount = 0;
let correctCount = 0;
let questionOrder = [];
let foundCountries = new Set();
let gameActive = false;
let animating = false;

const countryShapes = {};

COUNTRIES.forEach(c => {
  const pts = c.points.map(([lon, lat]) => [
    (lon + 180) / 360 * W,
    (90 - lat) / 180 * H
  ]);
  countryShapes[c.id] = pts;
});

function log(msg) { console.log('[CountryLocator]', msg); }

function lonLatToCanvas(lon, lat) {
  return [(lon + 180) / 360 * W, (90 - lat) / 180 * H];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawMap() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#a8d4e6';
  ctx.fillRect(0, 0, W, H);

  COUNTRIES.forEach(c => {
    const pts = countryShapes[c.id];
    const isFound = foundCountries.has(c.id);

    ctx.beginPath();
    pts.forEach(([x, y], i) => {
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();

    if (isFound) {
      ctx.fillStyle = '#81c784';
      ctx.fill();
    }
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

function getCountryAtPixel(px, py) {
  const dpr = canvas.width / canvas.offsetWidth;
  const x = px * dpr;
  const y = py * dpr;

  for (let i = COUNTRIES.length - 1; i >= 0; i--) {
    const c = COUNTRIES[i];
    const pts = countryShapes[c.id];
    ctx.beginPath();
    pts.forEach(([cx, cy], j) => {
      j === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    });
    ctx.closePath();
    if (ctx.isPointInPath(x, y)) {
      return c.id;
    }
  }
  return null;
}

function showFeedback(msg, type) {
  feedbackEl.textContent = msg;
  feedbackEl.className = 'feedback ' + type + ' visible';
  feedbackEl.classList.remove('hidden');
  setTimeout(() => {
    feedbackEl.classList.add('hidden');
  }, 1500);
}

function nextQuestion() {
  if (!gameActive) return;

  const available = COUNTRIES.filter(c => !foundCountries.has(c.id));
  if (available.length === 0) {
    gameActive = false;
    setTimeout(() => {
      gameoverName.textContent = (nameInput.value.trim() || 'Player');
      gameoverScore.textContent = score;
      gameoverErrors.textContent = wrongCount;
      gameoverCorrect.textContent = correctCount;
      document.querySelector('.gameover-card h2').textContent = '🏆 You found them all!';
      gameOverModal.classList.add('visible');
    }, 600);
    return;
  }

  if (questionIndex >= questionOrder.length) {
    questionOrder = shuffle(available.map(c => c.id));
    questionIndex = 0;
  }

  let qCountry = questionOrder[questionIndex];
  questionIndex++;
  totalQuestions++;

  const country = COUNTRIES.find(c => c.id === qCountry);
  if (!country) { nextQuestion(); return; }

  flagDisplay.textContent = country.flag;
  countryNameEl.textContent = country.name;
  questionCountEl.textContent = `${totalQuestions} / ${COUNTRIES.length}+`;

  log(`Question ${totalQuestions}: Find ${country.name}`);
}

function handleCanvasClick(e) {
  if (!gameActive || animating) return;

  const rect = canvas.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;

  const clickedCountry = getCountryAtPixel(px, py);
  if (!clickedCountry) {
    showFeedback('Click on a country!', 'wrong');
    return;
  }

  const targetName = countryNameEl.textContent;
  const target = COUNTRIES.find(c => c.name === targetName);
  if (!target) return;

  if (clickedCountry === target.id) {
    if (foundCountries.has(target.id)) { nextQuestion(); return; }
    score += SCORE_CORRECT;
    correctCount++;
    foundCountries.add(target.id);
    scoreEl.textContent = score;
    drawMap();
    showFeedback(`✓ Correct! +${SCORE_CORRECT}`, 'correct');
    setTimeout(nextQuestion, 1200);
  } else {
    score += SCORE_WRONG;
    lives--;
    wrongCount++;
    scoreEl.textContent = score;
    livesEl.textContent = lives;

    const clicked = COUNTRIES.find(c => c.id === clickedCountry);
    showFeedback(`✗ Wrong! That's ${clicked ? clicked.name : 'not the right country'}. -${Math.abs(SCORE_WRONG)}`, 'wrong');

    if (lives <= 0) {
      gameActive = false;
      setTimeout(gameOver, 600);
    } else {
      setTimeout(nextQuestion, 1500);
    }
  }
}

function gameOver() {
  document.querySelector('.gameover-card h2').textContent = '💀 Game Over';
  gameoverName.textContent = (nameInput.value.trim() || 'Player');
  gameoverScore.textContent = score;
  gameoverErrors.textContent = wrongCount;
  gameoverCorrect.textContent = correctCount;
  gameOverModal.classList.add('visible');
}

function startGame() {
  const name = nameInput.value.trim() || 'Player';
  score = 0;
  lives = MAX_LIVES;
  wrongCount = 0;
  correctCount = 0;
  questionIndex = 0;
  totalQuestions = 0;
  foundCountries = new Set();
  gameActive = true;
  animating = false;

  scoreEl.textContent = 0;
  livesEl.textContent = MAX_LIVES;
  questionCountEl.textContent = '0 / ' + COUNTRIES.length + '+';
  flagDisplay.textContent = '';
  countryNameEl.textContent = 'Find the country...';
  gameOverModal.classList.remove('visible');
  introModal.classList.add('hidden');

  questionOrder = shuffle(COUNTRIES.map(c => c.id));
  drawMap();
  setTimeout(nextQuestion, 500);
}

playBtn.addEventListener('click', startGame);
nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') playBtn.click();
});
playAgainBtn.addEventListener('click', () => {
  gameOverModal.classList.remove('visible');
  startGame();
});
backHomeBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

canvas.addEventListener('click', handleCanvasClick);

function init() {
  drawMap();
  flagDisplay.textContent = '🌍';
  countryNameEl.textContent = 'Click Start to play!';
  log('Country Locator loaded. Ready to play!');
}

init();
