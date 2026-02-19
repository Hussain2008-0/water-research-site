// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.sidebar nav ul li a');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Close sidebar on nav link click (mobile) =====
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  });
});

// ===== Scroll-triggered section animations =====
const observerOptions = {
  threshold: 0.07,
  rootMargin: '0px 0px -40px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.style.opacity = '1';
      sectionObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.animationPlayState = 'paused';
  sectionObserver.observe(section);
});

// Title page is always visible
const titlePage = document.querySelector('.title-page');
if (titlePage) titlePage.style.opacity = '1';
