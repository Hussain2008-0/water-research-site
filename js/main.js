/* ============================================================
   main.js — Water Purification Research v3
   ============================================================ */

// ── Particles ─────────────────────────────────────────────
(function () {
  const wrap = document.getElementById('bgParticles');
  if (!wrap) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = 4 + Math.random() * 14;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${10+Math.random()*22}s;animation-delay:${-Math.random()*20}s;`;
    wrap.appendChild(p);
  }
})();

// ── Bubbles ───────────────────────────────────────────────
(function () {
  const wrap = document.getElementById('bubbles');
  if (!wrap) return;
  for (let i = 0; i < 16; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = 8 + Math.random() * 28;
    b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${5+Math.random()*12}s;animation-delay:${-Math.random()*10}s;`;
    wrap.appendChild(b);
  }
})();

// ── Navbar scroll ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger ─────────────────────────────────────────────
const ham = document.getElementById('hamburger');
const menu = document.getElementById('navMenu');
if (ham && menu) {
  ham.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('.nlink').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
  });
}

// ── Counter animation ─────────────────────────────────────
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isFloat = target % 1 !== 0;
  const dur = 1800;
  const t0 = performance.now();
  (function tick(now) {
    const t = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = isFloat ? (ease * target).toFixed(1) : Math.round(ease * target);
    if (t < 1) requestAnimationFrame(tick);
  })(t0);
}

// ── Scroll reveal + bars + counters ───────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('in');

    // counters inside hero-stats (stat-n)
    el.querySelectorAll('.stat-n[data-count]').forEach(animateCount);

    // bar fills
    el.querySelectorAll('.vb-fill[data-w]').forEach(bar => {
      bar.style.setProperty('--w', bar.dataset.w);
      setTimeout(() => bar.classList.add('go'), 150);
    });

    io.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Hero stats counters (no data-reveal on them)
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const ios = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.stat-n[data-count]').forEach(animateCount);
      ios.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  ios.observe(heroStats);
}
