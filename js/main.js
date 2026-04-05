/* ============================================================
   main.js — Water Purification Research Site
   ============================================================ */

// ── Particles ──────────────────────────────────────────────
(function spawnParticles() {
  const wrap = document.getElementById('bgParticles');
  if (!wrap) return;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = 4 + Math.random() * 14;
    p.style.cssText = `
      width:${s}px; height:${s}px;
      left:${Math.random()*100}%;
      animation-duration:${10+Math.random()*22}s;
      animation-delay:${-Math.random()*20}s;
    `;
    wrap.appendChild(p);
  }
})();

// ── Bubbles ────────────────────────────────────────────────
(function spawnBubbles() {
  const wrap = document.getElementById('bubbles');
  if (!wrap) return;
  for (let i = 0; i < 18; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = 8 + Math.random() * 30;
    b.style.cssText = `
      width:${s}px; height:${s}px;
      left:${Math.random()*100}%;
      animation-duration:${5+Math.random()*12}s;
      animation-delay:${-Math.random()*10}s;
    `;
    wrap.appendChild(b);
  }
})();

// ── Navbar scroll ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('.nlink').forEach(a => {
    a.addEventListener('click', () => navMenu.classList.remove('open'));
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

// ── Counter animation ──────────────────────────────────────
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = isFloat
      ? (ease * target).toFixed(1)
      : Math.round(ease * target);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Scroll reveal + bar charts + counters ──────────────────
const ioReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    // Reveal
    el.classList.add('in');

    // Counters inside hero-stats
    el.querySelectorAll('.stat-n[data-count]').forEach(animateCount);

    // Bar fills
    el.querySelectorAll('.vb-fill[data-w]').forEach(bar => {
      bar.style.setProperty('--w', bar.dataset.w);
      setTimeout(() => bar.classList.add('go'), 200);
    });

    ioReveal.unobserve(el);
  });
}, { threshold: 0.12 });

// Observe everything with data-reveal
document.querySelectorAll('[data-reveal]').forEach(el => ioReveal.observe(el));

// Observe hero-stats separately for counters (they have no data-reveal)
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const ioStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.stat-n[data-count]').forEach(animateCount);
      ioStats.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  ioStats.observe(heroStats);
}

// Also trigger bars if the wide card appears
const wideCard = document.querySelector('.vs-card-wide');
if (wideCard) {
  const ioBars = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.vb-fill[data-w]').forEach(bar => {
        bar.style.setProperty('--w', bar.dataset.w);
        setTimeout(() => bar.classList.add('go'), 200);
      });
      ioBars.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  ioBars.observe(wideCard);
}
