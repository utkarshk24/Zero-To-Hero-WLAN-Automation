// ============================================================
//  app.js — Sidebar builder, content loader, copy buttons
// ============================================================

// ---- Course start date (Day 1 launch) ----------------------
const COURSE_START_DATE = '2026-05-25'; // YYYY-MM-DD, local time

function getAvailableDayCount() {
  const start   = new Date(COURSE_START_DATE + 'T00:00:00');
  const elapsed = Math.floor((Date.now() - start.getTime()) / 86400000);
  return Math.min(40, Math.max(1, elapsed + 1));
}

function isDayAvailable(d) {
  return d.day <= getAvailableDayCount();
}

// ---- Helpers -----------------------------------------------
function zeroPad(n) { return String(n).padStart(2, '0'); }

function getQueryDay() {
  const p = new URLSearchParams(window.location.search);
  return parseInt(p.get('day') || '1', 10);
}

function setQueryDay(n) {
  const url = new URL(window.location.href);
  url.searchParams.set('day', n);
  window.history.pushState({}, '', url);
}

// ---- Build sidebar -----------------------------------------
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  CURRICULUM.forEach(phase => {
    const group = document.createElement('div');
    group.className = 'phase-group';
    group.dataset.phase = phase.phase;

    group.innerHTML = `
      <div class="phase-header" data-phase="${phase.phase}">
        <span class="phase-dot" style="background:${phase.color}"></span>
        <span class="phase-title">Phase ${phase.phase}: ${phase.title}</span>
        <span class="phase-count">${phase.subtitle}</span>
        <span class="phase-chevron">▾</span>
      </div>
      <div class="phase-days" id="phase-days-${phase.phase}"></div>
    `;
    nav.appendChild(group);

    const daysContainer = group.querySelector('.phase-days');
    phase.days.forEach(d => {
      const item = document.createElement('div');
      item.className = 'day-item' + (!isDayAvailable(d) ? ' locked' : '');
      item.dataset.day = d.day;
      item.style.setProperty('--phase-color', phase.color);

      item.innerHTML = `
        <span class="day-num">${zeroPad(d.day)}</span>
        <span class="day-label">${d.title}</span>
        ${d.capstone
          ? `<span class="capstone-tag">Cap</span>`
          : (!isDayAvailable(d) ? `<span class="day-badge">Soon</span>` : '')
        }
      `;

      if (isDayAvailable(d)) {
        item.addEventListener('click', () => loadDay(d.day));
      }
      daysContainer.appendChild(item);
    });

    // Phase collapse toggle
    group.querySelector('.phase-header').addEventListener('click', () => {
      group.classList.toggle('collapsed');
    });
  });
}

// ---- Set active day in sidebar -----------------------------
function setActiveDay(dayNum) {
  document.querySelectorAll('.day-item').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.day-item[data-day="${dayNum}"]`);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ---- GA4 tracking ------------------------------------------
function trackDayView(dayNum, meta) {
  if (typeof gtag !== 'function') return; // silently skip on localhost

  const pageTitle = `Day ${dayNum} — ${meta.title}`;
  const pagePath  = `/?day=${dayNum}`;

  // 1. Virtual page view — appears in GA4 Pages & screens report
  gtag('event', 'page_view', {
    page_title:    pageTitle,
    page_path:     pagePath,
    page_location: window.location.origin + pagePath
  });

  // 2. Custom event — filter by day/phase in GA4 Explore
  gtag('event', 'day_viewed', {
    day_number : dayNum,
    day_title  : meta.title,
    phase      : meta.phaseData.phase,
    phase_title: meta.phaseData.title,
    status     : isDayAvailable(meta) ? 'available' : 'coming-soon'
  });
}

// ---- Find day meta from curriculum -------------------------
function findDay(dayNum) {
  for (const phase of CURRICULUM) {
    for (const d of phase.days) {
      if (d.day === dayNum) return { ...d, phaseData: phase };
    }
  }
  return null;
}

// ---- Load day content --------------------------------------
async function loadDay(dayNum) {
  const content = document.getElementById('content-area');
  const topTitle = document.getElementById('top-bar-title');

  const meta = findDay(dayNum);
  if (!meta) return showError('Day not found.', content);

  // Update URL + sidebar active state
  setQueryDay(dayNum);
  setActiveDay(dayNum);

  if (!isDayAvailable(meta)) {
    showComingSoon(meta, content);
    if (topTitle) topTitle.textContent = `Day ${dayNum} — Coming Soon`;
    trackDayView(dayNum, meta);
    closeMobileSidebar();
    return;
  }

  // Show loader
  content.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading Day ${dayNum}…</p>
    </div>`;

  try {
    const res = await fetch(meta.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    content.innerHTML = html;

    // Re-run Prism highlighting on injected code
    if (window.Prism) Prism.highlightAll();

    // Wire up copy buttons
    wireCopyButtons();

    // Update top bar title
    if (topTitle) topTitle.textContent = `Day ${dayNum} — ${meta.title}`;

    // Track in GA4
    trackDayView(dayNum, meta);

    // Scroll to top
    content.scrollTop = 0;

  } catch (e) {
    showError(`Could not load Day ${dayNum} content. (${e.message})`, content);
  }

  closeMobileSidebar();
}

// ---- Coming soon placeholder --------------------------------
function showComingSoon(meta, container) {
  container.innerHTML = `
    <div class="day-content">
      <div class="day-hero" style="text-align:center; padding: 60px 40px;">
        <div style="font-size:56px; margin-bottom:16px;">🔒</div>
        <h1 style="color:#e6edf3; margin-bottom:8px;">Day ${meta.day} Coming Soon</h1>
        <p style="color:#8b949e; max-width:480px; margin: 0 auto 24px;">
          <strong style="color:${meta.phaseData.color}">${meta.title}</strong> is part of
          <em>Phase ${meta.phaseData.phase}: ${meta.phaseData.title}</em>.
          New content drops daily — follow the GitHub repo and LinkedIn page so you never miss a lesson.
        </p>
      </div>
    </div>`;
  container.scrollTop = 0;
}

// ---- Error state -------------------------------------------
function showError(msg, container) {
  container.innerHTML = `
    <div class="error-state">
      <h2>Something went wrong</h2>
      <p>${msg}</p>
      <p style="margin-top:8px; font-size:13px; color:#8b949e;">
        If running locally, start a server: <code>python -m http.server 8080</code>
      </p>
    </div>`;
}

// ---- Copy buttons on code blocks ---------------------------
function wireCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block-wrapper')?.querySelector('pre code');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // LinkedIn copy-post button
  document.querySelectorAll('.copy-post-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.linkedin-card-body');
      if (!card) return;
      const text = card.querySelector('.li-post-text')?.innerText || '';
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✓ Copied to clipboard!';
        setTimeout(() => { btn.textContent = '📋 Copy Post Text'; }, 2500);
      });
    });
  });
}

// ---- Mobile sidebar ----------------------------------------
function closeMobileSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('visible');
}

function initMobileSidebar() {
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');

  hamburger?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });
  overlay?.addEventListener('click', closeMobileSidebar);
}

// ---- Progress bar ------------------------------------------
function updateProgress(dayNum) {
  const total = 40;
  const available = getAvailableDayCount();
  const pct = Math.max(2.5, (available / total) * 100);
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${available} / ${total} days`;
}

// ---- Boot --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initMobileSidebar();
  updateProgress();

  const day = getQueryDay();
  loadDay(day);

  // Browser back/forward
  window.addEventListener('popstate', () => loadDay(getQueryDay()));
});
