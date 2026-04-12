/* ============================================================
   main.js — Water Purification Research Website
   v3 — Enhanced with performance optimizations
   ============================================================ */

/* ─── NAVBAR SCROLL ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─── HAMBURGER MENU ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ─── BACKGROUND PARTICLES ──────────────────────────────── */
// Respect reduced motion preference
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const container = document.getElementById('bgParticles');
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 14 + 4;
    p.style.cssText = `
      width:${s}px; height:${s}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*18 + 12}s;
      animation-delay:${Math.random()*-20}s;
      opacity:.12;
    `;
    container.appendChild(p);
  }
}

/* ─── BUBBLES ────────────────────────────────────────────── */
if (!prefersReduced) {
  const bubbleContainer = document.getElementById('bubbles');
  const BUBBLE_COUNT = 10;
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = Math.random() * 30 + 10;
    b.style.cssText = `
      width:${s}px; height:${s}px;
      left:${Math.random()*90+5}%;
      animation-duration:${Math.random()*12 + 8}s;
      animation-delay:${Math.random()*-15}s;
    `;
    bubbleContainer.appendChild(b);
  }
}

/* ─── COUNTER ANIMATION ─────────────────────────────────── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = target % 1 !== 0;
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(1) : target;
  }
  requestAnimationFrame(update);
}

/* ─── BAR CHART FILL ─────────────────────────────────────── */
function triggerBars(container) {
  container.querySelectorAll('.vb-fill').forEach(bar => {
    const w = bar.dataset.w;
    bar.style.setProperty('--w', w);
    bar.classList.add('go');
  });
}

/* ─── INTERSECTION OBSERVER ─────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Counter observer — triggers on hero stats
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// Bar chart observer
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    triggerBars(entry.target);
    barObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.vs-bar-mini').forEach(el => barObserver.observe(el));
