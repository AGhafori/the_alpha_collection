const TRANSLATIONS = {
  en: {
    title: 'Alphabet Quest',
    backToBoard: '← Back to Board',
    score: 'Score',
    incorrect: 'Incorrect',
    lettersLeft: 'Letters Left',
    progress: 'Progress',
    modalTitle: '🔤 Alphabet Quest',
    description: 'Think you know your ABCs? The 26 letters of the alphabet will be scrambled on the board. Your mission: click them <strong>in order from A to Z</strong> as fast as you can. Every correct letter earns <strong>10 points</strong>. Mis-clicks are counted — so stay sharp!',
    yourName: 'Your name',
    enterName: 'Enter your name…',
    play: '▶ Play',
    youDidIt: '🎉 You did it!',
    playAgain: '🔄 Play Again',
    backHome: '🏠 Back to Board',
    language: 'Language',
    alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    speechLang: 'en-US'
  },
  sv: {
    title: 'Alfabet Quest',
    backToBoard: '← Tillbaka till Brädet',
    score: 'Poäng',
    incorrect: 'Fel',
    lettersLeft: 'Bokstäver Kvar',
    progress: 'Framsteg',
    modalTitle: '🔤 Alfabet Quest',
    description: 'Kan du alfabetet? De 29 bokstäverna kommer att blandas på brädet. Din uppgift: klicka på dem <strong>i alfabetisk ordning från A till Ö</strong> så snabbt du kan. Varje rätt bokstav ger <strong>10 poäng</strong>. Felklick räknas — så var skärpt!',
    yourName: 'Ditt namn',
    enterName: 'Skriv ditt namn…',
    play: '▶ Spela',
    youDidIt: '🎉 Du klarade det!',
    playAgain: '🔄 Spela Igen',
    backHome: '🏠 Tillbaka till Brädet',
    language: 'Språk',
    alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö'],
    speechLang: 'sv-SE'
  },
  es: {
    title: 'Búsqueda del Alfabeto',
    backToBoard: '← Volver al Tablero',
    score: 'Puntos',
    incorrect: 'Incorrectos',
    lettersLeft: 'Letras Restantes',
    progress: 'Progreso',
    modalTitle: '🔤 Búsqueda del Alfabeto',
    description: '¿Crees que conoces el abecedario? Las 27 letras del español estarán mezcladas en el tablero. Tu misión: haz clic en ellas <strong>en orden de la A a la Z</strong> tan rápido como puedas. Cada letra correcta vale <strong>10 puntos</strong>. Los clics incorrectos se cuentan, ¡así que mantente alerta!',
    yourName: 'Tu nombre',
    enterName: 'Escribe tu nombre…',
    play: '▶ Jugar',
    youDidIt: '🎉 ¡Lo lograste!',
    playAgain: '🔄 Jugar de Nuevo',
    backHome: '🏠 Volver al Tablero',
    language: 'Idioma',
    alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    speechLang: 'es-ES'
  },
  fa: {
    title: 'کوئیز الفبا',
    backToBoard: '→ بازگشت به صفحه اصلی',
    score: 'امتیاز',
    incorrect: 'اشتباه',
    lettersLeft: 'حروف باقیمانده',
    progress: 'پیشرفت',
    modalTitle: '🔤 کوئیز الفبا',
    description: 'فکر می‌کنی حروف الفبا را بلدی؟ ۳۲ حرف الفبا در صفحه به هم ریخته می‌شوند. وظیفه تو: روی آن‌ها به <strong>ترتیب الفبا از آ تا ی</strong> هرچه سریع‌تر کلیک کن. هر حرف درست <strong>۱۰ امتیاز</strong> دارد. اشتباه‌ها شمرده می‌شوند — پس تمرکز کن!',
    yourName: 'نام تو',
    enterName: 'نام خود را بنویس…',
    play: '▶ شروع',
    youDidIt: '🎉 آفرین!',
    playAgain: '🔄 دوباره بازی کن',
    backHome: '🏠 صفحه اصلی',
    language: 'زبان',
    alphabet: ['آ','ا','ب','پ','ت','ث','ج','چ','ح','خ','د','ذ','ر','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و','ه','ی'],
    speechLang: 'fa-IR'
  }
};

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' }
];

let currentLang = 'en';

function t(key) {
  return TRANSLATIONS[currentLang][key];
}

function getAlphabet() {
  return TRANSLATIONS[currentLang].alphabet;
}

function isRTL() {
  return currentLang === 'fa';
}

let loadedVoices = [];
let voicesAttempted = false;

function speakLetter(letter) {
  if (!('speechSynthesis' in window)) return;
  
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(letter);
  const targetLang = t('speechLang');
  utterance.lang = targetLang;
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  const langCode = targetLang.split('-')[0];
  
  if (loadedVoices.length > 0) {
    let voice = loadedVoices.find(v => 
      (v.lang.startsWith(langCode) || v.lang === targetLang) && 
      v.name.includes('Google')
    );
    
    if (!voice) {
      voice = loadedVoices.find(v => 
        v.lang.startsWith(langCode) || v.lang === targetLang
      );
    }
    
    if (!voice && langCode === 'fa') {
      voice = loadedVoices.find(v => v.lang.startsWith('ar'));
    }
    
    if (voice) {
      utterance.voice = voice;
    }
  }

  speechSynthesis.speak(utterance);
}

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0 && loadedVoices.length === 0) {
    loadedVoices = voices;
  }
}

function initSpeech() {
  if (!('speechSynthesis' in window)) return;
  
  loadVoices();
  
  if (!voicesAttempted) {
    voicesAttempted = true;
    setTimeout(loadVoices, 100);
    setTimeout(loadVoices, 500);
    setTimeout(loadVoices, 1000);
    setTimeout(loadVoices, 2000);
  }
}

initSpeech();