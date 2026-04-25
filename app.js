// ── State ──────────────────────────────────────────────────
let currentTopic = 0;
let completed = new Set();

try {
  const saved = localStorage.getItem('ts-guide-progress');
  if (saved) completed = new Set(JSON.parse(saved));
  const savedTopic = localStorage.getItem('ts-guide-topic');
  if (savedTopic) currentTopic = parseInt(savedTopic);
} catch(e) {}

// ── DOM refs ───────────────────────────────────────────────
const contentWrap  = document.getElementById('contentWrap');
const sidebarNav   = document.getElementById('sidebarNav');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const sidebar      = document.getElementById('sidebar');
const hamburger    = document.getElementById('hamburger');
const overlay      = document.createElement('div');
overlay.className  = 'overlay';
document.body.appendChild(overlay);

// ── Build sidebar ──────────────────────────────────────────
function buildNav() {
  sidebarNav.innerHTML = '';

  const homeItem = document.createElement('div');
  homeItem.className = 'nav-item' + (currentTopic === 0 ? ' active' : '');
  homeItem.innerHTML = `<span class="nav-dot"></span><span>Overview</span>`;
  homeItem.onclick = () => goToTopic(0);
  sidebarNav.appendChild(homeItem);

  const label = document.createElement('div');
  label.className = 'nav-section-label';
  label.textContent = 'Topics';
  sidebarNav.appendChild(label);

  TOPICS.slice(1).forEach((topic, i) => {
    const idx = i + 1;
    const item = document.createElement('div');
    const isDone = completed.has(idx);
    const isActive = currentTopic === idx;
    item.className = 'nav-item' + (isActive ? ' active' : '') + (isDone ? ' done' : '');
    item.innerHTML = `
      <span class="nav-num">${String(idx).padStart(2,'0')}</span>
      <span style="flex:1">${topic.label}</span>
      <span class="nav-dot"></span>
    `;
    item.onclick = () => goToTopic(idx);
    sidebarNav.appendChild(item);
  });
}

// ── Render topic ───────────────────────────────────────────
function renderTopic(idx) {
  const topic = TOPICS[idx];
  if (!topic) return;

  let html = topic.render();

  if (!topic.isHome) {
    // Bottom navigation
    const prevBtn = idx > 1
      ? `<button class="nav-btn nav-btn-prev" onclick="goToTopic(${idx - 1})">← ${TOPICS[idx-1].label}</button>`
      : `<button class="nav-btn nav-btn-prev" onclick="goToTopic(0)">← Overview</button>`;

    const nextBtn = idx < TOPICS.length - 1
      ? `<button class="nav-btn nav-btn-next" onclick="goToTopic(${idx + 1})">${TOPICS[idx+1].label} →</button>`
      : `<button class="nav-btn nav-btn-finish" onclick="showCompletion()">You're ready for Next.js ✓</button>`;

    html += `<div class="topic-nav">${prevBtn}${nextBtn}</div>`;
  }

  contentWrap.innerHTML = html;
  contentWrap.scrollTop = 0;
  window.scrollTo(0, 0);
}

// ── Navigation ─────────────────────────────────────────────
window.goToTopic = function(idx) {
  // Mark previous as done (if not home)
  if (currentTopic > 0) {
    completed.add(currentTopic);
    try {
      localStorage.setItem('ts-guide-progress', JSON.stringify([...completed]));
    } catch(e) {}
  }

  currentTopic = idx;
  try {
    localStorage.setItem('ts-guide-topic', idx);
  } catch(e) {}

  renderTopic(idx);
  buildNav();
  updateProgress();
  closeSidebar();
};

function updateProgress() {
  const total = TOPICS.length - 1; // exclude home
  const done  = completed.size;
  const pct   = Math.round((done / total) * 100);
  progressFill.style.width = pct + '%';
  progressText.textContent = `${done} / ${total} topics`;
}

// ── Quiz logic ─────────────────────────────────────────────
window.checkAnswer = function(id, chosen, correct) {
  const opts = document.querySelectorAll(`[onclick*="'${id}'"]`);
  opts.forEach(btn => btn.disabled = true);

  const chosenBtn = opts[chosen];
  const correctBtn = opts[correct];

  if (chosen === correct) {
    chosenBtn.classList.add('correct');
  } else {
    chosenBtn.classList.add('wrong');
    correctBtn.classList.add('correct');
  }

  const fb = document.getElementById(`${id}-fb`);
  if (fb) fb.style.display = 'block';
};

// ── Completion screen ──────────────────────────────────────
window.showCompletion = function() {
  // Mark all as done
  TOPICS.forEach((_, i) => { if (i > 0) completed.add(i); });
  try {
    localStorage.setItem('ts-guide-progress', JSON.stringify([...completed]));
  } catch(e) {}
  updateProgress();
  buildNav();

  contentWrap.innerHTML = `
    <div class="completion">
      <span class="completion-icon">🎯</span>
      <h2>You're ready for Next.js</h2>
      <p>
        You've covered everything TypeScript throws at you in a real Next.js app —
        interfaces, generics, unions, async patterns, React hooks, and advanced patterns.
        Start building.
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="start-btn" onclick="goToTopic(0)" style="background:var(--bg3);border:1px solid var(--border2);color:var(--text)">
          Review topics
        </button>
        <button class="start-btn" onclick="goToTopic(1)">
          Back to start →
        </button>
      </div>
    </div>`;
};

// ── Mobile sidebar ─────────────────────────────────────────
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
}

hamburger.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlay.addEventListener('click', closeSidebar);

// ── Theme Toggle ───────────────────────────────────────────
let isDark = false;

try {
  const savedTheme = localStorage.getItem('ts-guide-theme');
  if (savedTheme === 'light') isDark = false;
} catch(e) {}

function applyTheme() {
  if (isDark) {
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
  }

  const icon  = isDark ? '☀' : '☾';
  const label = isDark ? 'Light' : 'Dark';

  const themeIcon   = document.getElementById('themeIcon');
  const themeLabel  = document.getElementById('themeLabel');
  const themeIconMobile = document.getElementById('themeIconMobile');

  if (themeIcon)       themeIcon.textContent  = icon;
  if (themeLabel)      themeLabel.textContent = label;
  if (themeIconMobile) themeIconMobile.textContent = icon;
}

function toggleTheme() {
  isDark = !isDark;
  try { localStorage.setItem('ts-guide-theme', isDark ? 'dark' : 'light'); } catch(e) {}
  applyTheme();
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

// ── Init ───────────────────────────────────────────────────
applyTheme();
buildNav();
renderTopic(currentTopic);
updateProgress();
