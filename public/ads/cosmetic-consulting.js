/* ==========================================================================
   PREMIUM COSMETIC CONSULTING AD LANDING PAGE - JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================================
     1. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
     ====================================================================== */
  const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    let delay = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations for elements entering at the same time
          const stagger = index * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, stagger);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  };

  /* ======================================================================
     2. COUNTER ANIMATIONS
     ====================================================================== */
  const initCounterAnimations = () => {
    const counters = document.querySelectorAll('.stat-number, .counter-value, .float-card-value');

    const animateCounter = (el) => {
      if (el.dataset.counted) return;
      el.dataset.counted = 'true';

      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  };

  /* ======================================================================
     3. NAVBAR SCROLL EFFECT
     ====================================================================== */
  const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;

      // Navbar background
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Scroll to top button
      if (scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });

    // Scroll to top click
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  /* ======================================================================
     4. MOBILE MENU
     ====================================================================== */
  const initMobileMenu = () => {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      menu.classList.toggle('open');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('active');
        menu.classList.remove('open');
      });
    });
  };

  /* ======================================================================
     5. TIMELINE COMPONENT
     ====================================================================== */
  const initTimeline = () => {
    const items = document.querySelectorAll('.timeline-item');
    const lineFill = document.querySelector('.timeline-line-fill');
    let activeIdx = 0;
    let interval = null;

    const setActive = (idx) => {
      items.forEach((item, i) => {
        if (i === idx) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update fill line
      if (lineFill) {
        const pct = (idx / (items.length - 1)) * 90 + 5;
        lineFill.style.width = pct + '%';
      }

      activeIdx = idx;
    };

    // Click handlers
    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        clearInterval(interval);
        setActive(i);
        startAutoPlay(7000);
      });
    });

    const startAutoPlay = (delay = 4000) => {
      clearInterval(interval);
      interval = setInterval(() => {
        const next = (activeIdx + 1) % items.length;
        setActive(next);
      }, delay);
    };

    setActive(0);
    startAutoPlay();
  };

  /* ======================================================================
     6. FAQ ACCORDION
     ====================================================================== */
  const initFAQ = () => {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
      const btn = item.querySelector('.faq-btn');
      const answer = item.querySelector('.faq-answer');
      const inner = item.querySelector('.faq-answer-inner');

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        items.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            other.querySelector('.faq-answer').style.height = '0px';
          }
        });

        // Toggle
        if (isOpen) {
          item.classList.remove('open');
          answer.style.height = '0px';
        } else {
          item.classList.add('open');
          answer.style.height = inner.scrollHeight + 'px';
        }
      });
    });
  };

  /* ======================================================================
     7. FORM VALIDATION & SUBMISSION
     ====================================================================== */
  const initForm = () => {
    const formCards = document.querySelectorAll('.consultation-form-card');
    
    formCards.forEach(card => {
      const form = card.querySelector('form');
      if (!form) return;

      const fieldsContainer = card.querySelector('.form-fields-container, #form-fields-container');
      const successState = card.querySelector('.form-success, #form-success');
      const submitBtn = card.querySelector('.btn-submit, #submitBtn');
      const btnLabel = submitBtn.querySelector('.btn-label');
      const spinner = submitBtn.querySelector('.spinner');

      const validate = (input) => {
        const errorEl = input.parentElement.querySelector('.error-msg');
        let valid = true;
        let msg = '';

        if (input.required && !input.value.trim()) {
          valid = false;
          msg = 'This field is required';
        } else if (input.type === 'email' && input.value.trim()) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            valid = false;
            msg = 'Please enter a valid email address';
          }
        } else if (input.name === 'phone' && input.value.trim()) {
          if (!/^[0-9+\s-]{8,15}$/.test(input.value.replace(/\s/g, ''))) {
            valid = false;
            msg = 'Please enter a valid phone number';
          }
        }

        if (!valid) {
          input.classList.add('input-error');
          if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; }
        } else {
          input.classList.remove('input-error');
          if (errorEl) { errorEl.style.display = 'none'; }
        }

        return valid;
      };

      // Live validation
      form.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('blur', () => validate(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('input-error')) validate(input);
        });
      });

      // Submit
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;
        form.querySelectorAll('input, select').forEach(input => {
          if (!validate(input)) valid = false;
        });

        if (!valid) {
          const first = form.querySelector('.input-error');
          if (first) first.focus();
          return;
        }

        // Loading state
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        btnLabel.textContent = 'Submitting...';

        const formData = {
          name: form.querySelector('[name="name"], #name').value,
          phone: form.querySelector('[name="phone"], #phone').value,
          email: form.querySelector('[name="email"], #email').value,
          lookingFor: form.querySelector('[name="looking-for"], #looking-for').value,
          details: form.querySelector('[name="details"], #details').value
        };

        // Production submission
        fetch('https://ekoraglobalconsulting.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            interest: formData.lookingFor,
            message: formData.details,
            formSource: 'contact'
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            if (fieldsContainer) fieldsContainer.style.display = 'none';
            if (successState) successState.style.display = 'flex';

            const title = successState ? successState.querySelector('h3') : null;
            if (title) title.textContent = `Thank you, ${formData.name}!`;
          } else {
            alert(data.message || 'Something went wrong. Please try again.');
          }
        })
        .catch(err => {
          console.error('Error submitting form:', err);
          alert('Failed to send request. Please check your internet connection.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          spinner.style.display = 'none';
          btnLabel.textContent = 'Schedule Free Consultation';
        });
      });
    });
  };

  /* ======================================================================
     8. SMOOTH SCROLL FOR ANCHOR LINKS
     ====================================================================== */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  /* ======================================================================
     INITIALIZE
     ====================================================================== */
  initScrollAnimations();
  initCounterAnimations();
  initNavbar();
  initMobileMenu();
  initTimeline();
  initFAQ();
  initForm();
  initSmoothScroll();

});
