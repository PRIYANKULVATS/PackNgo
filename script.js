/* ============================================================
   PACKNGO — script.js
   Structure:
   01. Config & Constants
   02. Utility Functions
   03. Loading Screen
   04. Navigation
   05. Typing Effect
   06. Scroll Behavior
   07. Intersection Observer (Reveal & Active Nav)
   08. Modal System
   09. Toast Notifications
   10. Cost Comparison
   11. Weather Widget
   12. Currency Converter
   13. Live Stats
   14. Safety & Crowd Tracker
   15. Service Cards
   16. AR/VR Preview
   17. AI Travel Agent
   18. Smart Translator
   19. Carbon Tracker
   20. Itinerary Builder
   21. Booking Forms
   22. Reviews Carousel
   23. Travel Buddy & Groups
   24. Notifications
   25. Contact Form
   26. Chat Widget
   27. Back To Top
   28. Init
============================================================ */


/* ============================================================
   01. CONFIG & CONSTANTS
============================================================ */

const CONFIG = {
  // Replace with your backend proxy URL once you build the server
  // The backend server holds the actual API key — never put it here
  API_BASE_URL: '/api',

  // Typing speed in ms
  TYPING_SPEED: 60,

  // How long to show loading screen minimum (ms)
  LOADING_MIN_TIME: 2800,

  // Live stats update interval (ms)
  STATS_INTERVAL: 30000,

  // Safety tracker update interval (ms)
  SAFETY_INTERVAL: 10000,
};

const HERO_TEXT = 'PackNgo — Plan smarter, travel bolder.';

const WEATHER_DATA = {
  Delhi:     { temp: '28°C', desc: 'Sunny',         humidity: '45%', wind: '15 km/h' },
  Mumbai:    { temp: '30°C', desc: 'Humid',          humidity: '75%', wind: '12 km/h' },
  Bangalore: { temp: '24°C', desc: 'Pleasant',       humidity: '60%', wind: '10 km/h' },
  Goa:       { temp: '32°C', desc: 'Beach Weather',  humidity: '70%', wind: '18 km/h' },
  Manali:    { temp: '8°C',  desc: 'Cold & Snowy',   humidity: '55%', wind: '22 km/h' },
  Paris:     { temp: '18°C', desc: 'Cloudy',         humidity: '55%', wind: '8 km/h'  },
  Tokyo:     { temp: '22°C', desc: 'Clear',          humidity: '50%', wind: '11 km/h' },
  London:    { temp: '16°C', desc: 'Rainy',          humidity: '80%', wind: '14 km/h' },
};

const EXCHANGE_RATES = {
  USD: { INR: 83.5,  EUR: 0.92, GBP: 0.79, JPY: 150.2, USD: 1    },
  EUR: { INR: 90.8,  USD: 1.09, GBP: 0.86, JPY: 163.4, EUR: 1    },
  GBP: { INR: 105.6, USD: 1.27, EUR: 1.16, JPY: 190.1, GBP: 1    },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.8, INR: 1   },
  JPY: { INR: 0.556, USD: 0.0067, EUR: 0.0061, GBP: 0.0053, JPY: 1 },
};

const TRANSLATIONS = {
  'en-es': { 'Hello': 'Hola', 'Thank you': 'Gracias', 'Where is the hotel?': '¿Dónde está el hotel?', 'How much does this cost?': '¿Cuánto cuesta esto?', 'Help': 'Ayuda' },
  'en-fr': { 'Hello': 'Bonjour', 'Thank you': 'Merci', 'Where is the hotel?': 'Où est l\'hôtel?', 'How much does this cost?': 'Combien ça coûte?', 'Help': 'Aide' },
  'en-ja': { 'Hello': 'こんにちは', 'Thank you': 'ありがとう', 'Where is the hotel?': 'ホテルはどこですか？', 'How much does this cost?': 'これはいくらですか？', 'Help': '助けて' },
  'en-zh': { 'Hello': '你好', 'Thank you': '谢谢', 'Where is the hotel?': '酒店在哪里？', 'How much does this cost?': '这个多少钱？', 'Help': '帮助' },
  'en-hi': { 'Hello': 'नमस्ते', 'Thank you': 'धन्यवाद', 'Where is the hotel?': 'होटल कहाँ है?', 'How much does this cost?': 'इसकी कीमत क्या है?', 'Help': 'मदद' },
};

const ITINERARIES = {
  goa: {
    adventure:   ['Beach hopping and water sports at Calangute', 'Scuba diving and dolphin spotting tour', 'Trekking in Bondla Wildlife Sanctuary', 'Island hopping and sunset boat cruise', 'Parasailing and jet skiing at Baga', 'Nightlife and casino experience', 'Heritage churches and farewell dinner'],
    relaxation:  ['Beach resort check-in and spa session', 'Private beach yoga and meditation', 'Ayurvedic full-body treatment', 'Sunset cruise and fine dining', 'Beachside massage and bonfire', 'Leisure pool day and wellness wrap-up', 'Relaxed departure'],
    cultural:    ['Old Goa churches and history walk', 'Mapusa market and local handicrafts', 'Portuguese architecture heritage tour', 'Spice plantation visit and lunch', 'Traditional Goan cooking class', 'Konkani folk music and dance show', 'Cultural farewell evening'],
    food:        ['Seafood feast at a beach shack', 'Goan cuisine cooking class with locals', 'Wine tasting at a Goa winery', 'Street food tour of Panaji market', 'Beachside BBQ and cocktails', 'Fine dining at a cliff-top restaurant', 'Farewell gourmet dinner'],
  },
  kerala: {
    adventure:   ['Backwater speedboat journey from Alleppey', 'Munnar hill station trekking', 'Periyar wildlife safari and rafting', 'River kayaking in Coorg', 'Spice plantation trekking tour', 'Beach surfing at Varkala', 'Cultural night and departure'],
    relaxation:  ['Ayurvedic resort arrival and consultation', 'Panchakarma treatment and yoga', 'Houseboat stay on Vembanad Lake', 'Meditation at a forest retreat', 'Nature walk in the tea gardens', 'Wellness therapy and spa', 'Peaceful lakeside departure'],
    cultural:    ['Fort Kochi heritage walk and cafes', 'Kathakali classical dance performance', 'Tea factory visit in Munnar', 'Traditional Theyyam art form viewing', 'Padmanabhaswamy Temple visit', 'Kalaripayattu martial arts workshop', 'Farewell Onam sadhya feast'],
    food:        ['Kerala seafood specialties at backwater', 'Onam sadhya on banana leaf', 'Spice garden tour and tasting', 'Traditional cooking class with local family', 'Street food tour of Kozhikode', 'Toddy shop cultural experience', 'Culinary farewell dinner'],
  },
  manali: {
    adventure:   ['Rohtang Pass snow activities', 'River rafting on Beas at grade 3', 'Solang Valley paragliding', 'Hampta Pass trek day one', 'Hampta Pass trek day two summit', 'Snow trekking to Chandratal Lake', 'Leisure recovery and departure'],
    relaxation:  ['Mall Road walk and cafe hopping', 'Hadimba Temple and nature walk', 'Hot spring soak at Vashisht', 'Lazy riverside picnic day', 'Spa and Himalayan wellness session', 'Apple orchard walk and wine tasting', 'Peaceful mountain departure'],
    cultural:    ['Old Manali village walking tour', 'Naggar Castle and art gallery', 'Tibetan monastery visit and meditation', 'Local Himachali craft market', 'Kullu Dussehra folk festival grounds', 'Mountain tribal culture evening', 'Cultural farewell dinner'],
    food:        ['Traditional Himachali dham feast', 'Tibetan momos and thukpa trail', 'Apple cider farm tour and tasting', 'Local trout fishing and cooking', 'Mountain cafe breakfast tour', 'Kullu street food market evening', 'Farewell mountain bonfire dinner'],
  },
  rajasthan: {
    adventure:   ['Camel safari in the Thar Desert', 'Dune bashing and sandboarding', 'Hot air balloon over Jaipur', 'Ranthambore tiger safari', 'Horse riding through Shekhawati villages', 'Rock climbing at Kumbhalgarh', 'Desert cultural night and departure'],
    relaxation:  ['Heritage haveli check-in and chai', 'Royal spa at Oberoi Udaivilās', 'Lake Pichola boat ride at sunset', 'Palace garden yoga and wellness', 'Private pool day at resort', 'Shopping at Jodhpur blue city lanes', 'Royal farewell dinner'],
    cultural:    ['Amber Fort and Sheesh Mahal tour', 'Hawa Mahal and City Palace walk', 'Pushkar Brahma Temple and ghats', 'Blue Pottery workshop in Jaipur', 'Puppet show and folk dance evening', 'Mehrangarh Fort and Jodhpur old city', 'Farewell Rajasthani thali dinner'],
    food:        ['Dal baati churma cooking class', 'Jaipur street food cycle tour', 'Laal maas chef\'s table dinner', 'Rajasthani royal kitchen experience', 'Kachori and chai at Johari Bazaar', 'Ghewar and mithai tasting tour', 'Farewell heritage restaurant dinner'],
  },
  ladakh: {
    adventure:   ['Acclimatization walk around Leh market', 'Khardung La pass motorbike ride', 'Pangong Lake overnight camping', 'Nubra Valley camel safari on dunes', 'Zanskar River rafting at grade 4', 'Stok Kangri base camp trek', 'Relaxation and departure from Leh'],
    relaxation:  ['Monastery meditation at Thiksey', 'Indus river picnic and birdwatching', 'Traditional Ladakhi home-stay', 'Shanti Stupa sunrise and yoga', 'Day rest with mountain views', 'Local pottery and arts walk', 'Peaceful high-altitude farewell'],
    cultural:    ['Leh Palace and old town walk', 'Hemis Monastery and museum', 'Alchi Monastery ancient murals', 'Lamayuru Monastery moonland walk', 'Losar festival grounds visit', 'Traditional Ladakhi dance evening', 'Cultural farewell with butter tea'],
    food:        ['Skyu and thukpa cooking class', 'Traditional butter tea ceremony', 'Local chang barley beer tasting', 'Ladakhi kitchen home dinner', 'Market street food and dry fruits', 'Tibetan restaurant dinner', 'Farewell momos and apricot jam feast'],
  },
};

const BUDDY_DATA = [
  { id: 1, name: 'Emma', age: 26, avatar: 'E', location: 'London', destination: 'Tokyo',   bio: 'Adventure seeker exploring Asia for 3 weeks.', interests: ['adventure', 'photography'] },
  { id: 2, name: 'Carlos', age: 28, avatar: 'C', location: 'Barcelona', destination: 'Goa', bio: 'Beach enthusiast and digital nomad.',           interests: ['beach', 'culture'] },
  { id: 3, name: 'Lisa', age: 24, avatar: 'L', location: 'New York', destination: 'Paris', bio: 'Photographer capturing travel stories.',          interests: ['photography', 'food'] },
  { id: 4, name: 'James', age: 30, avatar: 'J', location: 'Sydney', destination: 'Bali',   bio: 'Yoga and wellness enthusiast.',                   interests: ['adventure', 'culture'] },
  { id: 5, name: 'Sophia', age: 25, avatar: 'S', location: 'Rome', destination: 'Manali',  bio: 'Adventure sports junkie and nature lover.',       interests: ['adventure', 'photography'] },
  { id: 6, name: 'Rahul', age: 27, avatar: 'R', location: 'Delhi', destination: 'Ladakh', bio: 'Trekking enthusiast planning a Himalayan trip.',   interests: ['adventure', 'culture'] },
];

const GROUP_DATA = [
  { id: 1, name: 'Tokyo Solo Travelers', members: 234, icon: '🗼', desc: 'Connect with solo travelers exploring Tokyo and Japan.', event: 'Pub crawl in Shibuya — March 15' },
  { id: 2, name: 'Goa Beach Lovers',     members: 189, icon: '🏖️', desc: 'Beach enthusiasts sharing Goa travel tips and meetups.', event: 'Sunset yoga session — March 18' },
  { id: 3, name: 'Photography Travelers', members: 456, icon: '📸', desc: 'Photographers sharing tips and guided photo walks.',    event: 'Golden hour walk — March 20' },
  { id: 4, name: 'Backpackers India',    members: 312, icon: '🎒', desc: 'Budget travelers exploring India and sharing tips.',      event: 'Group trip to Rajasthan — April 1' },
  { id: 5, name: 'Foodie Explorers',     members: 278, icon: '🍜', desc: 'Food lovers on culinary adventures worldwide.',          event: 'Street food tour — March 22' },
  { id: 6, name: 'Adventure Junkies',    members: 398, icon: '⛰️', desc: 'Thrill-seekers looking for next adventure activities.',   event: 'Trekking expedition — April 5' },
];

const NOTIFICATIONS_DATA = [
  { icon: '✈️', title: 'Flight Deal Alert',       text: '20% off on flights to Goa this weekend!',                 time: '2 min ago',  urgent: true  },
  { icon: '🏨', title: 'Hotel Recommendation',    text: 'Beach Resort in Kerala — book now for best rates',        time: '15 min ago', urgent: false },
  { icon: '🌤️', title: 'Weather Update',          text: 'Clear skies expected in Delhi for your trip.',            time: '1 hour ago', urgent: false },
  { icon: '💰', title: 'Price Drop',              text: 'Your saved Mumbai flight is now ₹2,500 cheaper.',         time: '2 hours ago', urgent: true  },
  { icon: '🎯', title: 'Personalized Offer',      text: 'Exclusive 15% discount on your next booking.',           time: '1 day ago',  urgent: false },
];


/* ============================================================
   02. UTILITY FUNCTIONS
============================================================ */

/**
 * Safely get a DOM element by ID
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function el(id) {
  return document.getElementById(id);
}

/**
 * Safely set text content — prevents XSS
 * @param {string} id
 * @param {string} text
 */
function setText(id, text) {
  const element = el(id);
  if (element) element.textContent = text;
}

/**
 * Create a DOM element with optional properties
 * @param {string} tag
 * @param {Object} props
 * @param {string[]} classes
 * @returns {HTMLElement}
 */
function createElement(tag, props = {}, classes = []) {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, val]) => {
    element[key] = val;
  });
  if (classes.length) element.classList.add(...classes);
  return element;
}

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle using requestAnimationFrame
 * @param {Function} fn
 * @returns {Function}
 */
function rafThrottle(fn) {
  let rafId = null;
  return (...args) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };
}

/**
 * Sanitize user text to prevent XSS — returns safe text node
 * @param {string} str
 * @returns {string}
 */
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Format currency value
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
function formatCurrency(value, decimals = 2) {
  return Number(value).toFixed(decimals);
}

/**
 * Validate email address format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Show a form field error
 * @param {string} inputId
 * @param {string} errorId
 * @param {string} message
 */
function showFieldError(inputId, errorId, message) {
  const input = el(inputId);
  const errorEl = el(errorId);
  if (input) input.classList.add('error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }
}

/**
 * Clear a form field error
 * @param {string} inputId
 * @param {string} errorId
 */
function clearFieldError(inputId, errorId) {
  const input = el(inputId);
  const errorEl = el(errorId);
  if (input) input.classList.remove('error');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.hidden = true;
  }
}


/* ============================================================
   03. LOADING SCREEN
============================================================ */

function initLoadingScreen() {
  const loadingScreen = el('loading-screen');
  if (!loadingScreen) return;

  const minTimer = new Promise(resolve => setTimeout(resolve, CONFIG.LOADING_MIN_TIME));
  const loadEvent = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });

  Promise.all([minTimer, loadEvent]).then(() => {
    loadingScreen.classList.add('hide');
    // Remove from DOM after transition to free memory
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.remove();
    }, { once: true });
  });
}


/* ============================================================
   04. NAVIGATION
============================================================ */

function initNavigation() {
  const navToggle = el('nav-toggle');
  const mainNav = el('main-nav');
  const navList = mainNav ? mainNav.querySelector('.nav-list') : null;

  // Mobile hamburger toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close nav when a link is clicked
    if (navList) {
      navList.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // Header scroll class
  const header = el('site-header');
  if (header) {
    const onScroll = rafThrottle(() => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Login button
  const btnLogin = el('btn-open-login');
  if (btnLogin) {
    btnLogin.addEventListener('click', () => openModal('modal-login'));
  }

  // Notifications button
  const btnNotif = el('btn-notifications');
  if (btnNotif) {
    btnNotif.addEventListener('click', () => {
      openModal('modal-notifications');
      renderNotifications();
      const badge = el('notification-badge');
      if (badge) badge.hidden = true;
    });
  }
}


/* ============================================================
   05. TYPING EFFECT
============================================================ */

function initTypingEffect() {
  const titleEl = el('hero-typed-title');
  if (!titleEl) return;

  let i = 0;
  titleEl.textContent = '';
  titleEl.classList.remove('typing-done');

  function type() {
    if (i < HERO_TEXT.length) {
      titleEl.textContent += HERO_TEXT.charAt(i);
      i++;
      setTimeout(type, CONFIG.TYPING_SPEED);
    } else {
      titleEl.classList.add('typing-done');
    }
  }

  // Delay start until loading screen is gone
  setTimeout(type, CONFIG.LOADING_MIN_TIME + 200);
}


/* ============================================================
   06. SCROLL BEHAVIOR
============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


/* ============================================================
   07. INTERSECTION OBSERVER
============================================================ */

function initIntersectionObserver() {
  // Reveal sections on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.section, .card, .feed-item, .service-card').forEach(el => {
    el.classList.add('section-reveal');
    revealObserver.observe(el);
  });

  // Active nav link based on visible section
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => navObserver.observe(section));
}


/* ============================================================
   08. MODAL SYSTEM
============================================================ */

const activeModals = new Set();

function openModal(modalId) {
  const modal = el(modalId);
  if (!modal) return;
  modal.hidden = false;
  activeModals.add(modalId);
  document.body.style.overflow = 'hidden';
  // Focus first input inside modal
  setTimeout(() => {
    const firstInput = modal.querySelector('input, textarea, select, button:not(.modal-close)');
    if (firstInput) firstInput.focus();
  }, 100);
}

function closeModal(modalId) {
  const modal = el(modalId);
  if (!modal) return;
  modal.hidden = true;
  activeModals.delete(modalId);
  if (activeModals.size === 0) {
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  activeModals.forEach(id => closeModal(id));
}

function initModalSystem() {
  // Close via backdrop or close button (data attribute approach)
  document.addEventListener('click', (e) => {
    const closeTarget = e.target.closest('[data-close-modal]');
    if (closeTarget) {
      closeModal(closeTarget.dataset.closeModal);
    }
  });

  // Escape key closes topmost modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModals.size > 0) {
      const lastModal = [...activeModals].pop();
      closeModal(lastModal);
    }
  });

  // Login modal switches
  el('btn-switch-to-signup')?.addEventListener('click', () => {
    closeModal('modal-login');
    openModal('modal-signup');
  });

  el('btn-switch-to-forgot')?.addEventListener('click', () => {
    closeModal('modal-login');
    openModal('modal-forgot');
  });

  el('btn-switch-to-login')?.addEventListener('click', () => {
    closeModal('modal-signup');
    openModal('modal-login');
  });

  el('btn-back-to-login')?.addEventListener('click', () => {
    closeModal('modal-forgot');
    openModal('modal-login');
  });

  // Login submit
  el('btn-login-submit')?.addEventListener('click', handleLogin);

  // Signup submit
  el('btn-signup-submit')?.addEventListener('click', handleSignup);

  // Forgot submit
  el('btn-forgot-submit')?.addEventListener('click', handleForgot);

  // Open agent modal buttons
  el('btn-open-agent')?.addEventListener('click', () => openModal('modal-agent'));
  el('btn-open-agent-modal')?.addEventListener('click', () => openModal('modal-agent'));

  // Open itinerary modal buttons
  el('btn-open-itinerary')?.addEventListener('click', () => openModal('modal-itinerary'));
  el('btn-open-itinerary-modal')?.addEventListener('click', () => openModal('modal-itinerary'));

  // Find buddies
  el('btn-find-buddies')?.addEventListener('click', () => {
    openModal('modal-buddies');
    renderBuddies(BUDDY_DATA);
  });

  // Join groups
  el('btn-join-groups')?.addEventListener('click', () => {
    openModal('modal-groups');
    renderGroups(GROUP_DATA);
  });
}

function handleLogin() {
  const email    = el('login-email')?.value.trim() || '';
  const password = el('login-password')?.value.trim() || '';
  let valid = true;

  if (!email || !isValidEmail(email)) {
    showFieldError('login-email', null, '');
    showToast('Please enter a valid email address.');
    valid = false;
  }
  if (!password) {
    showToast('Please enter your password.');
    valid = false;
  }
  if (!valid) return;

  // In production: POST to /api/auth/login with email + password
  // Server validates credentials and returns a JWT token
  // Store the JWT in memory or httpOnly cookie — never in localStorage
  showToast('Login successful! Welcome back. (Demo mode)');
  closeModal('modal-login');
  if (el('login-email')) el('login-email').value = '';
  if (el('login-password')) el('login-password').value = '';
}

function handleSignup() {
  const name     = el('signup-name')?.value.trim() || '';
  const email    = el('signup-email')?.value.trim() || '';
  const password = el('signup-password')?.value.trim() || '';
  let valid = true;

  if (!name) { showToast('Please enter your full name.'); valid = false; }
  if (!isValidEmail(email)) { showToast('Please enter a valid email address.'); valid = false; }
  if (password.length < 6) { showToast('Password must be at least 6 characters.'); valid = false; }
  if (!valid) return;

  // In production: POST to /api/auth/register
  showToast('Account created! Welcome to PackNgo. (Demo mode)');
  closeModal('modal-signup');
  if (el('signup-name')) el('signup-name').value = '';
  if (el('signup-email')) el('signup-email').value = '';
  if (el('signup-password')) el('signup-password').value = '';
}

function handleForgot() {
  const email = el('forgot-email')?.value.trim() || '';
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address.');
    return;
  }
  // In production: POST to /api/auth/forgot-password
  showToast(`Password reset link sent to ${email}. (Demo mode)`);
  closeModal('modal-forgot');
  if (el('forgot-email')) el('forgot-email').value = '';
}


/* ============================================================
   09. TOAST NOTIFICATIONS
============================================================ */

let toastTimer = null;

function showToast(message, duration = 3200) {
  const toast = el('toast');
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}


/* ============================================================
   10. COST COMPARISON
============================================================ */

function initCostComparison() {
  el('btn-compare-cost')?.addEventListener('click', compareCost);
  el('cmp-from')?.addEventListener('keydown', e => { if (e.key === 'Enter') compareCost(); });
  el('cmp-to')?.addEventListener('keydown',   e => { if (e.key === 'Enter') compareCost(); });

  // Run default comparison on load
  compareCost();
}

function compareCost() {
  const from = el('cmp-from')?.value.trim() || 'Delhi';
  const to   = el('cmp-to')?.value.trim()   || 'Goa';

  if (from.toLowerCase() === to.toLowerCase()) {
    showToast('Please enter different cities to compare.');
    return;
  }

  // Simulated cost range (replace with real API call in production)
  const base = 2800 + Math.floor(Math.random() * 5500);
  const formatted = '₹' + base.toLocaleString('en-IN');

  setText('cost-route-display', `${from} → ${to}`);
  setText('cost-estimate-display', formatted);
  showToast(`Best price found: ${formatted} for ${from} → ${to}`);
}


/* ============================================================
   11. WEATHER WIDGET
============================================================ */

function initWeatherWidget() {
  el('btn-open-weather')?.addEventListener('click', () => {
    openModal('modal-weather');
    updateWeatherDisplay('Delhi');
  });

  el('weather-select')?.addEventListener('change', (e) => {
    updateWeatherDisplay(e.target.value);
  });
}

function updateWeatherDisplay(city) {
  const data = WEATHER_DATA[city] || WEATHER_DATA['Delhi'];

  setText('weather-city-display',  city);
  setText('weather-temp-display',  data.temp);
  setText('weather-modal-temp',    data.temp);
  setText('weather-modal-desc',    data.desc);
  setText('weather-humidity',      data.humidity);
  setText('weather-wind',          data.wind);
}


/* ============================================================
   12. CURRENCY CONVERTER
============================================================ */

function initCurrencyWidget() {
  el('btn-open-currency')?.addEventListener('click', () => {
    openModal('modal-currency');
  });

  el('btn-convert-currency')?.addEventListener('click', convertCurrency);
}

function convertCurrency() {
  const amount = parseFloat(el('currency-amount')?.value) || 0;
  const from   = el('currency-from')?.value || 'USD';
  const to     = el('currency-to')?.value   || 'INR';

  if (amount <= 0) {
    showToast('Please enter a valid amount to convert.');
    return;
  }

  const rates = EXCHANGE_RATES[from];
  if (!rates || rates[to] === undefined) {
    showToast('Currency pair not supported in demo mode.');
    return;
  }

  const result  = amount * rates[to];
  const display = formatCurrency(result, to === 'JPY' ? 0 : 2);

  setText('currency-converted', `${display} ${to}`);
  setText('currency-rate-display', `1 ${from} = ${rates[to]} ${to}`);
}


/* ============================================================
   13. LIVE STATS
============================================================ */

let statsIntervalId = null;

function initLiveStats() {
  updateStats();
  statsIntervalId = setInterval(updateStats, CONFIG.STATS_INTERVAL);

  // Pause when tab is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(statsIntervalId);
    } else {
      updateStats();
      statsIntervalId = setInterval(updateStats, CONFIG.STATS_INTERVAL);
    }
  });
}

function updateStats() {
  const usersEl    = el('stat-users');
  const bookingsEl = el('stat-bookings');
  const flightsEl  = el('stat-flights');

  if (!usersEl || !bookingsEl || !flightsEl) return;

  // Parse current values (strip commas)
  let users    = parseInt(usersEl.textContent.replace(/,/g, ''))    || 1247;
  let bookings = parseInt(bookingsEl.textContent.replace(/,/g, '')) || 89;
  let flights  = parseInt(flightsEl.textContent.replace(/,/g, '')) || 156;

  // Simulate realistic micro-changes
  users    = Math.max(1000, Math.min(2000, users    + Math.floor(Math.random() * 5) - 2));
  bookings = Math.max(50,   Math.min(200,  bookings + (Math.random() > 0.6 ? 1 : 0)));
  flights  = Math.max(100,  Math.min(350,  flights  + (Math.random() > 0.7 ? 1 : 0)));

  usersEl.textContent    = users.toLocaleString('en-IN');
  bookingsEl.textContent = bookings.toString();
  flightsEl.textContent  = flights.toString();
}


/* ============================================================
   14. SAFETY & CROWD TRACKER
============================================================ */

let safetyIntervalId  = null;
let safetyAlertsOn    = false;

function initSafetyTracker() {
  updateSafetyDisplay();
  safetyIntervalId = setInterval(updateSafetyDisplay, CONFIG.SAFETY_INTERVAL);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(safetyIntervalId);
    } else {
      updateSafetyDisplay();
      if (safetyAlertsOn) {
        safetyIntervalId = setInterval(updateSafetyDisplay, CONFIG.SAFETY_INTERVAL);
      }
    }
  });

  el('btn-safety-alerts')?.addEventListener('click', toggleSafetyAlerts);
  el('btn-scam-check')?.addEventListener('click', runScamCheck);
}

function updateSafetyDisplay() {
  const safetyRatingEl = el('safety-rating-value');
  const safetyBarEl    = el('safety-bar');
  const crowdLevelEl   = el('crowd-level-value');
  const crowdBarEl     = el('crowd-bar');

  if (!safetyRatingEl) return;

  // Simulate realistic fluctuation
  const currentSafety = parseInt(safetyRatingEl.textContent) || 98;
  const currentCrowdBar = parseFloat(crowdBarEl?.style.width) || 25;

  const newSafety = Math.max(82, Math.min(100, currentSafety + Math.floor((Math.random() - 0.4) * 4)));
  const newCrowd  = Math.max(10, Math.min(90,  currentCrowdBar + (Math.random() - 0.5) * 12));

  let crowdLabel = 'Low';
  if (newCrowd >= 60) crowdLabel = 'High';
  else if (newCrowd >= 35) crowdLabel = 'Medium';

  safetyRatingEl.textContent = `${Math.round(newSafety)}%`;
  crowdLevelEl.textContent   = crowdLabel;

  if (safetyBarEl) safetyBarEl.style.width = `${newSafety}%`;
  if (crowdBarEl)  crowdBarEl.style.width  = `${Math.round(newCrowd)}%`;

  // Change crowd bar color based on level
  if (crowdBarEl) {
    crowdBarEl.style.background =
      crowdLabel === 'High'   ? '#e24b4a' :
      crowdLabel === 'Medium' ? '#e09a2b' : '';
  }
}

function toggleSafetyAlerts() {
  const btn = el('btn-safety-alerts');
  if (!btn) return;

  safetyAlertsOn = !safetyAlertsOn;
  btn.textContent = safetyAlertsOn ? 'Alerts On' : 'Enable Alerts';
  btn.classList.toggle('btn-primary', !safetyAlertsOn);

  if (safetyAlertsOn) {
    showToast('Safety alerts enabled! You will receive live crowd and safety updates.');
    clearInterval(safetyIntervalId);
    safetyIntervalId = setInterval(updateSafetyDisplay, 4000);
  } else {
    showToast('Safety alerts disabled.');
    clearInterval(safetyIntervalId);
    safetyIntervalId = setInterval(updateSafetyDisplay, CONFIG.SAFETY_INTERVAL);
  }
}

function runScamCheck() {
  const scams = [
    'Warning: Fake taxi drivers reported at Delhi Airport Terminal 2.',
    'Alert: Overpriced tour guides operating near Taj Mahal gates.',
    'Notice: Tourist trap shops on Marine Drive, Mumbai — check prices.',
    'Warning: Unsolicited hotel booking agents at Goa airport. Use only verified counters.',
    'Alert: Counterfeit souvenir sellers reported near Jaipur City Palace.',
  ];
  const random = scams[Math.floor(Math.random() * scams.length)];
  showToast(random, 5000);
}


/* ============================================================
   15. SERVICE CARDS
============================================================ */

function initServiceCards() {
  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', () => toggleServiceCard(card));
  });
}

function toggleServiceCard(card) {
  const serviceId   = card.dataset.service;
  const detailEl    = el(`details-${serviceId}`);
  const isExpanded  = !detailEl.hidden;

  // Collapse all
  document.querySelectorAll('.service-card').forEach(c => {
    c.classList.remove('expanded');
    const detId = `details-${c.dataset.service}`;
    const det   = el(detId);
    if (det) det.hidden = true;
  });

  // Expand clicked if it was collapsed
  if (!isExpanded) {
    card.classList.add('expanded');
    if (detailEl) detailEl.hidden = false;
  }

  // Wire up service action buttons inside the expanded detail
  if (detailEl && !isExpanded) {
    detailEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.onclick = () => handleServiceAction(btn.dataset.action);
    });
  }
}

function handleServiceAction(action) {
  const messages = {
    'demo-flight':   'Opening demo booking for flights and hotels...',
    'price-alert':   'Price alert set! We will notify you when the price drops.',
    'filter-tours':  'Filtering tour packages by safety rating and price...',
    'connect-guide': 'Finding verified local guides near your destination...',
    'compare-now':   'Comparing 1,000+ options across all carriers and hotels...',
    'best-deals':    'Scanning for hidden deals and limited-time offers...',
    'open-vlogs':    'Loading travel vlogs from verified creators...',
    'ar-preview':    'AR preview loaded. Point your camera at the destination.',
  };
  showToast(messages[action] || 'Loading...');
}


/* ============================================================
   16. AR/VR PREVIEW
============================================================ */

function initARVR() {
  el('btn-vr-tour')?.addEventListener('click', () => {
    showToast('VR Tour started! Use your mouse to explore the 360° panorama. (Demo mode)');
    const previewBox = el('arvr-preview-box');
    if (previewBox) previewBox.style.animationDuration = '4s';
  });

  el('btn-ar-mode')?.addEventListener('click', () => {
    showToast('AR Mode activated. In production, this would open your device camera. (Demo mode)');
  });
}


/* ============================================================
   17. AI TRAVEL AGENT
============================================================ */

function initAIAgent() {
  el('btn-agent-send')?.addEventListener('click', sendAgentMessage);
  el('agent-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAgentMessage();
    }
  });
}

async function sendAgentMessage() {
  const inputEl = el('agent-input');
  const question = inputEl?.value.trim();
  if (!question) return;

  const chatWindow = el('agent-chat-window');
  if (!chatWindow) return;

  // Clear hint text on first message
  const hint = chatWindow.querySelector('.chat-hint');
  if (hint) hint.remove();

  // Show user message
  appendChatMessage(chatWindow, question, 'user');
  inputEl.value = '';

  // Show typing indicator
  const typingEl = appendChatMessage(chatWindow, 'Thinking...', 'ai');

  try {
    // In production: POST to your backend proxy /api/chat
    // The backend holds the Anthropic API key securely
    // const response = await fetch(`${CONFIG.API_BASE_URL}/chat`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: question })
    // });
    // const data = await response.json();
    // const reply = data.reply;

    // Demo fallback — remove this block once backend is connected
    const reply = generateDemoResponse(question);
    await new Promise(r => setTimeout(r, 800)); // Simulate API delay

    typingEl.textContent = reply;
  } catch (err) {
    typingEl.textContent = 'Sorry, I could not connect right now. Please try again shortly.';
  }

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function appendChatMessage(container, text, role) {
  const msg = createElement('div', {}, ['chat-message', `chat-message--${role}`]);
  msg.textContent = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  return msg;
}

function generateDemoResponse(question) {
  const q = question.toLowerCase();

  if (q.includes('cheap') || q.includes('save') || q.includes('budget') || q.includes('price')) {
    return 'Try booking ±3 days from your target date — midweek flights are often 20-35% cheaper. I can also compare multi-carrier bundles to find the best deal.';
  }
  if (q.includes('safe') || q.includes('safety') || q.includes('danger')) {
    return 'The current destination SafeScore is 8.6/10. I recommend avoiding crowded markets after 10pm and always sharing your location with a trusted contact via our Travel Buddy system.';
  }
  if (q.includes('hotel') || q.includes('stay') || q.includes('accommodation')) {
    return 'Based on your preference, I suggest mid-range hotels near the city centre with SafeScore above 8.0. Shall I filter by budget and star rating?';
  }
  if (q.includes('itinerary') || q.includes('plan') || q.includes('trip')) {
    return 'I can build a custom itinerary for you. Use the Build Itinerary button to set your destination, duration, and travel style — I will generate a day-by-day plan instantly.';
  }
  if (q.includes('visa') || q.includes('document') || q.includes('passport')) {
    return 'For most Indian passport holders, Goa, Manali, and Kerala require no visa. For international destinations, I can check the latest visa requirements and processing times based on your nationality.';
  }
  if (q.includes('weather') || q.includes('rain') || q.includes('snow') || q.includes('monsoon')) {
    return 'I can check real-time weather and forecast data for your destination. If severe weather is detected, I will automatically suggest alternative dates or destinations.';
  }
  if (q.includes('buddy') || q.includes('partner') || q.includes('solo') || q.includes('companion')) {
    return 'The Travel Buddy system has 50,000+ verified solo travellers. I can match you by destination, travel dates, interests, and age group. All profiles are ID-verified for safety.';
  }
  return 'Great question! In the full version, I am powered by Claude AI and can answer any travel question in real time — flights, hotels, safety, itineraries, visa requirements, local customs, and more. Connect the backend to unlock the full AI experience.';
}


/* ============================================================
   18. SMART TRANSLATOR
============================================================ */

function initTranslator() {
  el('btn-translate')?.addEventListener('click', translateText);
  el('btn-speak')?.addEventListener('click', speakTranslation);
  el('btn-save-phrase')?.addEventListener('click', savePhrase);
}

function translateText() {
  const input      = el('translate-input')?.value.trim() || '';
  const sourceLang = el('source-lang')?.value || 'en';
  const targetLang = el('target-lang')?.value || 'es';
  const outputEl   = el('translate-output');

  if (!input) {
    showToast('Please enter text to translate.');
    return;
  }

  const key         = `${sourceLang}-${targetLang}`;
  const dictionary  = TRANSLATIONS[key] || {};
  const translation = dictionary[input] || `[${targetLang.toUpperCase()}] ${input}`;

  if (outputEl) {
    outputEl.textContent = translation;
    outputEl.style.color = 'var(--color-accent)';
    outputEl.style.fontStyle = 'normal';
  }
}

function speakTranslation() {
  const text = el('translate-output')?.textContent || '';
  if (!text || text === 'Translation will appear here...') {
    showToast('Please translate some text first.');
    return;
  }
  // Web Speech API
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    showToast('Speaking translation...');
  } else {
    showToast('Speech synthesis is not supported in this browser.');
  }
}

let savedPhrases = [];

function savePhrase() {
  const input  = el('translate-input')?.value.trim() || '';
  const output = el('translate-output')?.textContent || '';

  if (!input || output === 'Translation will appear here...') {
    showToast('Please translate a phrase before saving.');
    return;
  }
  savedPhrases.push({ original: input, translation: output });
  showToast(`Phrase saved! You now have ${savedPhrases.length} saved phrase${savedPhrases.length > 1 ? 's' : ''}.`);
}


/* ============================================================
   19. CARBON TRACKER
============================================================ */

function initCarbonTracker() {
  el('btn-calculate-carbon')?.addEventListener('click', calculateCarbon);
  el('btn-green-options')?.addEventListener('click', showGreenOptions);
}

function calculateCarbon() {
  // Simulated carbon calculation
  const flightKg = Math.floor(180 + Math.random() * 200);
  const trainKg  = Math.floor(12 + Math.random() * 20);

  setText('carbon-flight', `${flightKg} kg`);
  setText('carbon-train', `${trainKg} kg`);

  const savings = flightKg - trainKg;
  showToast(`Taking the train saves ${savings} kg of CO₂ on this trip — equivalent to planting ${Math.floor(savings / 21)} trees.`);
}

function showGreenOptions() {
  showToast('Green options: Train travel, eco-certified hotels, carbon offset programs available for this route.');
}


/* ============================================================
   20. ITINERARY BUILDER
============================================================ */

function initItineraryBuilder() {
  el('btn-generate-itinerary')?.addEventListener('click', generateItinerary);
  el('btn-export-itinerary')?.addEventListener('click', exportItinerary);
}

function generateItinerary() {
  const duration    = parseInt(el('itin-duration')?.value) || 7;
  const destination = el('itin-destination')?.value || 'goa';
  const style       = el('itin-style')?.value || 'adventure';
  const outputEl    = el('itinerary-output');
  const exportWrap  = el('itinerary-export-wrap');

  if (!outputEl) return;

  const destData   = ITINERARIES[destination] || ITINERARIES['goa'];
  const activities = (destData[style] || destData['adventure']).slice(0, duration);

  // Clear previous output
  outputEl.innerHTML = '';

  activities.forEach((activity, index) => {
    const dayEl   = createElement('div', {}, ['itinerary-day']);
    const label   = createElement('p', { textContent: `Day ${index + 1}` }, ['itinerary-day-label']);
    const text    = createElement('p', { textContent: activity }, ['itinerary-day-text']);
    dayEl.appendChild(label);
    dayEl.appendChild(text);
    outputEl.appendChild(dayEl);
  });

  if (exportWrap) exportWrap.hidden = false;
  showToast(`${duration}-day ${destination} itinerary generated!`);
}

function exportItinerary() {
  const outputEl = el('itinerary-output');
  if (!outputEl) return;

  const days = outputEl.querySelectorAll('.itinerary-day');
  const lines = Array.from(days).map(day => {
    const label = day.querySelector('.itinerary-day-label')?.textContent || '';
    const text  = day.querySelector('.itinerary-day-text')?.textContent  || '';
    return `${label}: ${text}`;
  });

  const fullText = `PackNgo Itinerary\n${'='.repeat(30)}\n${lines.join('\n')}`;

  navigator.clipboard.writeText(fullText).then(() => {
    showToast('Itinerary copied to clipboard!');
  }).catch(() => {
    showToast('Could not copy. Please select and copy the text manually.');
  });
}


/* ============================================================
   21. BOOKING FORMS
============================================================ */

function initBookingForms() {
  el('btn-start-booking')?.addEventListener('click', () => {
    const bookingSection = el('booking');
    if (bookingSection) {
      const top = bookingSection.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    showToast('Select your dates and destination to get started.');
  });

  el('btn-open-rental')?.addEventListener('click', () => {
    const bookingSection = el('booking');
    if (bookingSection) {
      const top = bookingSection.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });

  el('btn-reserve-rental')?.addEventListener('click', reserveRental);
  el('btn-estimate-rental')?.addEventListener('click', estimateRental);
  el('btn-estimate-group')?.addEventListener('click', estimateGroup);
}

function reserveRental() {
  const city = el('rent-city')?.value.trim() || '';
  const from = el('rent-from')?.value || '';
  const to   = el('rent-to')?.value   || '';

  if (!city) { showToast('Please enter a pickup city.'); return; }
  if (!from || !to) { showToast('Please select pickup and return dates.'); return; }
  if (new Date(to) <= new Date(from)) { showToast('Return date must be after pickup date.'); return; }

  showToast(`Rental reserved in ${city} from ${from} to ${to}. Confirmation will be sent to your email. (Demo mode)`);
  setText('rental-result', `Reservation confirmed — ${city} | ${from} to ${to}`);
}

function estimateRental() {
  const from = el('rent-from')?.value || '';
  const to   = el('rent-to')?.value   || '';

  if (!from || !to) { showToast('Please select dates to estimate cost.'); return; }

  const days    = Math.ceil((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24));
  if (days <= 0) { showToast('Return date must be after pickup date.'); return; }

  const daily   = 800 + Math.floor(Math.random() * 1200);
  const total   = daily * days;
  const result  = `Estimated: ₹${daily.toLocaleString('en-IN')}/day × ${days} days = ₹${total.toLocaleString('en-IN')}`;

  setText('rental-result', result);
  showToast(result);
}

function estimateGroup() {
  const size = parseInt(el('group-size')?.value) || 0;
  const dest = el('group-dest')?.value.trim() || 'your destination';

  if (size < 2) { showToast('Please enter a group size of at least 2.'); return; }

  const basePackage  = 12000 + Math.floor(Math.random() * 18000);
  const total        = basePackage * size;
  const perPerson    = Math.round(total / size);
  const resultText   = `${size} people to ${dest}: ₹${total.toLocaleString('en-IN')} total — ₹${perPerson.toLocaleString('en-IN')} per person`;

  setText('group-result', resultText);
  showToast(`Package estimated: ₹${perPerson.toLocaleString('en-IN')} per person`);
}


/* ============================================================
   22. REVIEWS CAROUSEL
============================================================ */

let currentReview = 0;

function initReviewsCarousel() {
  const cards = document.querySelectorAll('.review-card');
  if (!cards.length) return;

  // Show first card
  cards[0].classList.add('active');
  updateReviewCounter();

  el('btn-review-next')?.addEventListener('click', () => {
    cards[currentReview].classList.remove('active');
    currentReview = (currentReview + 1) % cards.length;
    cards[currentReview].classList.add('active');
    updateReviewCounter();
  });

  el('btn-review-prev')?.addEventListener('click', () => {
    cards[currentReview].classList.remove('active');
    currentReview = (currentReview - 1 + cards.length) % cards.length;
    cards[currentReview].classList.add('active');
    updateReviewCounter();
  });
}

function updateReviewCounter() {
  const total = document.querySelectorAll('.review-card').length;
  setText('review-counter', `${currentReview + 1} / ${total}`);
}


/* ============================================================
   23. TRAVEL BUDDY & GROUPS
============================================================ */

function initTravelBuddy() {
  el('btn-search-buddies')?.addEventListener('click', searchBuddies);
  el('group-search-input')?.addEventListener('input',
    debounce((e) => filterGroups(e.target.value), 300)
  );
}

function searchBuddies() {
  const destination = el('buddy-destination')?.value.trim().toLowerCase() || '';
  const interests   = el('buddy-interests')?.value || '';

  const filtered = BUDDY_DATA.filter(buddy => {
    const matchDest     = !destination || buddy.destination.toLowerCase().includes(destination);
    const matchInterest = !interests || buddy.interests.includes(interests);
    return matchDest && matchInterest;
  });

  renderBuddies(filtered);

  if (filtered.length === 0) {
    showToast('No buddies found matching your criteria. Try different filters.');
  } else {
    showToast(`Found ${filtered.length} potential travel buddy${filtered.length > 1 ? 'ies' : ''}!`);
  }
}

function renderBuddies(buddies) {
  const grid = el('buddies-grid');
  if (!grid) return;

  // Clear existing content safely
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  if (buddies.length === 0) {
    const empty = createElement('p', { textContent: 'No buddies found. Try different filters.' }, ['card-body']);
    grid.appendChild(empty);
    return;
  }

  buddies.forEach(buddy => {
    const card = createElement('div', {}, ['buddy-card']);

    const avatar = createElement('div', { textContent: buddy.avatar }, ['buddy-avatar-lg']);

    const name = createElement('p', { textContent: `${buddy.name}, ${buddy.age}` }, ['buddy-card-name']);
    const loc  = createElement('p', { textContent: `${buddy.location} → ${buddy.destination}` }, ['buddy-card-loc']);
    const bio  = createElement('p', { textContent: buddy.bio }, ['buddy-card-bio']);

    const tagsWrap = createElement('div', {}, ['buddy-tags']);
    buddy.interests.forEach(interest => {
      const tag = createElement('span', { textContent: `#${interest}` }, ['buddy-tag']);
      tagsWrap.appendChild(tag);
    });

    const connectBtn = createElement('button', { textContent: 'Connect' }, ['btn', 'btn-sm', 'btn-primary']);
    connectBtn.addEventListener('click', () => {
      showToast(`Connection request sent to ${buddy.name}! They will receive a notification.`);
    });

    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(loc);
    card.appendChild(bio);
    card.appendChild(tagsWrap);
    card.appendChild(connectBtn);
    grid.appendChild(card);
  });
}

function filterGroups(searchTerm) {
  const term = searchTerm.toLowerCase();
  const filtered = GROUP_DATA.filter(group =>
    group.name.toLowerCase().includes(term) ||
    group.desc.toLowerCase().includes(term)
  );
  renderGroups(filtered);
}

function renderGroups(groups) {
  const grid = el('groups-grid');
  if (!grid) return;

  while (grid.firstChild) grid.removeChild(grid.firstChild);

  if (groups.length === 0) {
    const empty = createElement('p', { textContent: 'No communities found.' }, ['card-body']);
    grid.appendChild(empty);
    return;
  }

  groups.forEach(group => {
    const card = createElement('div', {}, ['group-card']);

    const header  = createElement('div', {}, ['group-card-header']);
    const iconEl  = createElement('span', { textContent: group.icon }, ['group-icon']);
    const infoWrap = createElement('div');
    const nameEl  = createElement('p', { textContent: group.name }, ['group-name']);
    const membEl  = createElement('p', { textContent: `${group.members} members` }, ['group-members']);
    infoWrap.appendChild(nameEl);
    infoWrap.appendChild(membEl);
    header.appendChild(iconEl);
    header.appendChild(infoWrap);

    const descEl  = createElement('p', { textContent: group.desc }, ['group-desc']);

    const eventBox = createElement('div', {}, ['group-event']);
    const evLabel  = createElement('p', { textContent: 'Next event' }, ['group-event-label']);
    const evText   = createElement('p', { textContent: group.event }, ['group-event-text']);
    eventBox.appendChild(evLabel);
    eventBox.appendChild(evText);

    const joinBtn = createElement('button', { textContent: 'Join Group' }, ['btn', 'btn-sm', 'btn-primary']);
    joinBtn.addEventListener('click', () => {
      showToast(`Joined "${group.name}"! Check your notifications for group details.`);
    });

    card.appendChild(header);
    card.appendChild(descEl);
    card.appendChild(eventBox);
    card.appendChild(joinBtn);
    grid.appendChild(card);
  });
}


/* ============================================================
   24. NOTIFICATIONS
============================================================ */

function renderNotifications() {
  const list = el('notifications-list');
  if (!list) return;

  while (list.firstChild) list.removeChild(list.firstChild);

  NOTIFICATIONS_DATA.forEach(notif => {
    const item    = createElement('li', {}, ['notification-item']);
    const iconEl  = createElement('span', { textContent: notif.icon }, ['notification-icon']);
    const content = createElement('div', {}, ['notification-content']);
    const title   = createElement('p', { textContent: notif.title }, ['notification-title']);
    const text    = createElement('p', { textContent: notif.text  }, ['notification-text']);
    const time    = createElement('p', { textContent: notif.time  }, ['notification-time']);

    content.appendChild(title);
    content.appendChild(text);
    content.appendChild(time);
    item.appendChild(iconEl);
    item.appendChild(content);

    if (notif.urgent) {
      const dot = createElement('span', {}, ['notification-dot']);
      item.appendChild(dot);
    }

    // Mark as read on click
    item.addEventListener('click', () => {
      item.classList.toggle('read');
    });

    list.appendChild(item);
  });
}


/* ============================================================
   25. CONTACT FORM
============================================================ */

function initContactForm() {
  el('btn-send-contact')?.addEventListener('click', sendContactMessage);
  el('btn-live-chat')?.addEventListener('click', () => {
    showToast('Opening live chat support...');
    const chatBtn = el('chat-toggle-btn');
    if (chatBtn) chatBtn.click();
  });
}

function sendContactMessage() {
  const name    = el('contact-name')?.value.trim()    || '';
  const email   = el('contact-email')?.value.trim()   || '';
  const message = el('contact-message')?.value.trim() || '';
  let valid = true;

  clearFieldError('contact-name',    'err-contact-name');
  clearFieldError('contact-email',   'err-contact-email');
  clearFieldError('contact-message', 'err-contact-message');

  if (!name) {
    showFieldError('contact-name', 'err-contact-name', 'Please enter your name.');
    valid = false;
  }
  if (!isValidEmail(email)) {
    showFieldError('contact-email', 'err-contact-email', 'Please enter a valid email address.');
    valid = false;
  }
  if (message.length < 10) {
    showFieldError('contact-message', 'err-contact-message', 'Message must be at least 10 characters.');
    valid = false;
  }
  if (!valid) return;

  // In production: POST to /api/contact
  showToast(`Message sent! We will get back to ${name} within 24 hours.`);

  if (el('contact-name'))    el('contact-name').value    = '';
  if (el('contact-email'))   el('contact-email').value   = '';
  if (el('contact-message')) el('contact-message').value = '';
}


/* ============================================================
   26. CHAT WIDGET
============================================================ */

function initChatWidget() {
  const toggleBtn  = el('chat-toggle-btn');
  const closeBtn   = el('chat-close-btn');
  const chatWindow = el('chat-window');
  const sendBtn    = el('btn-chat-send');
  const input      = el('chat-input');

  if (!toggleBtn || !chatWindow) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = !chatWindow.hidden;
    chatWindow.hidden = isOpen;
    toggleBtn.setAttribute('aria-expanded', (!isOpen).toString());
    if (!isOpen && input) input.focus();
  });

  closeBtn?.addEventListener('click', () => {
    chatWindow.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
  });

  sendBtn?.addEventListener('click', sendChatWidgetMessage);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatWidgetMessage();
    }
  });
}

function sendChatWidgetMessage() {
  const input    = el('chat-input');
  const messages = el('chat-messages');
  const text     = input?.value.trim() || '';
  if (!text || !messages) return;

  // Remove hint text on first message
  const hint = messages.querySelector('.chat-hint');
  if (hint) hint.remove();

  appendChatMessage(messages, text, 'user');
  input.value = '';

  // Simulated response (replace with backend call)
  setTimeout(() => {
    const reply = generateDemoResponse(text);
    appendChatMessage(messages, reply, 'ai');
  }, 700);
}


/* ============================================================
   27. BACK TO TOP
============================================================ */

function initBackToTop() {
  const btn = el('back-to-top');
  if (!btn) return;

  const onScroll = rafThrottle(() => {
    btn.hidden = window.scrollY < 400;
  });

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   28. INIT — Run everything when DOM is ready
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavigation();
  initTypingEffect();
  initSmoothScroll();
  initIntersectionObserver();
  initModalSystem();
  initCostComparison();
  initWeatherWidget();
  initCurrencyWidget();
  initLiveStats();
  initSafetyTracker();
  initServiceCards();
  initARVR();
  initAIAgent();
  initTranslator();
  initCarbonTracker();
  initItineraryBuilder();
  initBookingForms();
  initReviewsCarousel();
  initTravelBuddy();
  initContactForm();
  initChatWidget();
  initBackToTop();
});
