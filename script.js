/* ─────────────────────────────────────────
   Uma Mahesh Sanaboina – Portfolio JavaScript
───────────────────────────────────────── */

// ── NAVBAR: Scroll Effect + Active Link ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighting
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ── MOBILE HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ── AOS (Animate On Scroll) ──
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

initAOS();

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── CONTACT FORM HANDLER ──
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate a send delay (replace with actual API call when ready)
  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    e.target.reset();
  }, 1500);
}

// ── SKILL TAG HOVER GLOW EFFECT ──
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-2px) scale(1.04)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});

// ── TYPING ANIMATION for Hero Title ──
(function() {
  const titles = [
    'Frontend Web Developer',
    'Aspiring Full Stack Dev',
    'UI/UX Enthusiast',
    'ML Explorer'
  ];
  const el = document.querySelector('.hero-title-label');
  if (!el) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = titles[titleIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }

  // Start after hero animations settle
  setTimeout(type, 1500);
})();

// ── PARALLAX for hero orbs ──
window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (clientX - cx) / cx;
  const dy = (clientY - cy) / cy;

  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  if (orb1) orb1.style.transform = `translate(${dx * 20}px, ${dy * 20}px)`;
  if (orb2) orb2.style.transform = `translate(${-dx * 15}px, ${-dy * 15}px)`;
  if (orb3) orb3.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
}, { passive: true });

// ── COUNT-UP ANIMATION for Stats ──
function animateCount(el, from, to, duration) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const val = Math.floor(progress * (to - from) + from);
    el.textContent = val + '%';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = to + '%';
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      const targets = [30, 45, 5];
      statNums.forEach((el, i) => {
        if (i < 2) animateCount(el, 0, targets[i], 1800);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

// ── ACTIVE SECTION INDICATOR in URL (no page reload) ──
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      history.replaceState(null, '', `#${id}`);
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
