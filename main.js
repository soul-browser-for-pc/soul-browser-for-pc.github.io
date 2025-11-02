// Main JS: mobile nav, smooth scroll, header scroll effect, parallax, contact form handling and download tracking

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const nav = document.getElementById('main-nav');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      // toggle aria for accessibility
      const expanded = nav.classList.contains('mobile-open');
      mobileBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Smooth scroll for internal anchors (guard for #)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav after click (mobile)
          if (nav && nav.classList.contains('mobile-open')) {
            nav.classList.remove('mobile-open');
            mobileBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  const scroller = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', scroller, { passive: true });
  scroller();

  // Parallax hero background (light effect)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = Math.max(0, window.scrollY);
      hero.style.backgroundPosition = `center ${y * 0.25}px`;
    }, { passive: true });
  }

  // Download tracking (links to napkforpc.com)
  document.querySelectorAll('a[href*="napkforpc.com"]').forEach(link => {
    link.addEventListener('click', () => {
      try {
        if (window.gtag) {
          gtag('event', 'click_download', { event_category: 'Download', event_label: link.href });
        } else if (window.dataLayer) {
          window.dataLayer.push({ event: 'click_download', event_label: link.href });
        }
      } catch (err) {
        // silent
      }
      console.log('Download clicked:', link.href);
    });
  });

  // Contact form handler (client side simulation)
  const form = document.getElementById('contact-form');
  if (form) {
    window.handleContactForm = function (e) {
      e.preventDefault();
      const status = document.getElementById('contact-status');
      if (!status) return false;
      status.textContent = 'Sending…';
      // simulate form submit (since this static site doesn't provide server-side)
      setTimeout(() => {
        status.textContent = 'Message sent. We will forward non-legal requests to developer support when appropriate.';
        form.reset();
      }, 900);
      return false;
    };
  }

});
