// Global interactions: reveal on scroll, mobile menu, language switching, smooth scrolling, back-to-top

document.addEventListener('DOMContentLoaded', function () {
  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top button
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.style.display = (window.scrollY > 420) ? 'flex' : 'none';
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile hamburger toggle (simple)
  const hamburger = document.getElementById('hamburger') || document.getElementById('hamburgerEn');
  const navLinks = document.getElementById('navLinks') || document.getElementById('navLinksEn');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      if (getComputedStyle(navLinks).display === 'none' || navLinks.style.display === '') {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = (document.querySelector('.nav').offsetHeight + 8) + 'px';
        navLinks.style.right = '16px';
        navLinks.style.background = 'rgba(255,255,255,0.9)';
        navLinks.style.padding = '0.8rem';
        navLinks.style.borderRadius = '12px';
        navLinks.style.boxShadow = '0 12px 30px rgba(16,24,40,0.08)';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }

  // Language selector: redirect between index.html and index_en.html
  const langSelect = document.getElementById('langSelect') || document.getElementById('langSelectEn');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      // If on english page and choose fr -> index.html
      // If on french page and choose en -> index_en.html
      const current = location.pathname.split('/').pop();
      if (val === 'en' && !current.includes('_en')) {
        location.href = 'index_en.html';
      } else if (val === 'fr' && current.includes('_en')) {
        location.href = 'index.html';
      }
    });
  }

  // Accessibility: close mobile menu on resize to large screens
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
      const nl1 = document.getElementById('navLinks');
      const nl2 = document.getElementById('navLinksEn');
      if (nl1) nl1.style.display = 'flex';
      if (nl2) nl2.style.display = 'flex';
    } else {
      const nl1 = document.getElementById('navLinks');
      const nl2 = document.getElementById('navLinksEn');
      if (nl1) nl1.style.display = '';
      if (nl2) nl2.style.display = '';
    }
  });
});
