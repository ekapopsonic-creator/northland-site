/* =========================================================
   NORTHLAND — Shared Interactivity
   ========================================================= */

(function () {
  'use strict';

  // ----- Mobile nav toggle -----
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const open = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    navMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  // ----- Language toggle (mock) -----
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const cur = langToggle.textContent.trim();
      langToggle.textContent = cur === 'TH' ? 'EN' : 'TH';
      // TODO: hook into i18n in Next.js version
    });
  }

  // ----- Project filter -----
  const filterForm = document.querySelector('[data-filter-form]');
  if (filterForm) {
    const cards = document.querySelectorAll('[data-project-card]');
    const resultCount = document.querySelector('[data-result-count]');

    const apply = () => {
      const fd = new FormData(filterForm);
      const type = (fd.get('type') || '').toString();
      const location = (fd.get('location') || '').toString();
      const status = (fd.get('status') || '').toString();
      const price = (fd.get('price') || '').toString();

      let shown = 0;
      cards.forEach((card) => {
        const match =
          (!type || card.dataset.type === type) &&
          (!location || card.dataset.location === location) &&
          (!status || card.dataset.status === status) &&
          (!price || card.dataset.price === price);
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (resultCount) resultCount.textContent = shown;
    };

    filterForm.addEventListener('change', apply);
    filterForm.addEventListener('reset', () => setTimeout(apply, 0));
  }

  // ----- Lead form submission (mock) -----
  const leadForm = document.querySelector('[data-lead-form]');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = leadForm.querySelector('.form-status');
      // Basic validation
      const name = leadForm.querySelector('[name="name"]').value.trim();
      const phone = leadForm.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) {
        status.className = 'form-status error';
        status.textContent = '⚠ กรุณากรอกชื่อและเบอร์โทรศัพท์';
        return;
      }
      // Mock: simulate success
      status.className = 'form-status success';
      status.textContent = '✓ ขอบคุณครับ ทีมงาน Northland จะติดต่อกลับภายใน 24 ชั่วโมง';
      leadForm.reset();
      // TODO: replace with real POST → /api/lead → Email + LINE Notify
    });
  }

  // ----- Sticky header shadow on scroll -----
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ----- Set active nav link based on current page -----
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
