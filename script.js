document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide icons
  lucide.createIcons();

  // ============================
  // NAVBAR
  // ============================
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Nav scroll effect
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // Back to top click
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile menu open
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Mobile menu close
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  menuClose.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // ============================
  // SCROLL ANIMATIONS
  // ============================
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el, index) => {
    // Add stagger delay for grid items
    if (el.closest('#courses-grid') || el.closest('#gallery-grid')) {
      el.dataset.delay = (index % 6) * 100;
    }
    observer.observe(el);
  });

  // ============================
  // COUNTER ANIMATION
  // ============================
  const counters = document.querySelectorAll('.counter-value');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);

            if (target >= 100) {
              counter.textContent = current + '+';
            } else {
              counter.textContent = current + '+';
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ============================
  // COURSE FILTER
  // ============================
  const courseFilterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  courseFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      courseFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter courses
      courseCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden-card');
          card.classList.add('show-card');
        } else {
          card.classList.remove('show-card');
          card.classList.add('hidden-card');
        }
      });
    });
  });

  // Initialize all as visible
  courseCards.forEach(card => card.classList.add('show-card'));

  // ============================
  // GALLERY FILTER
  // ============================
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter gallery
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden-item');
          item.classList.add('show-item');
        } else {
          item.classList.remove('show-item');
          item.classList.add('hidden-item');
        }
      });
    });
  });

  // Initialize all as visible
  galleryItems.forEach(item => item.classList.add('show-item'));

  // ============================
  // LIGHTBOX
  // ============================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxContent = document.getElementById('lightbox-content');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.dataset.title;
      const desc = item.dataset.description;

      // Use a higher res version
      const src = img.src.replace('/320x240/', '/1024x576/');
      lightboxImg.src = src;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.classList.remove('hidden');
      requestAnimationFrame(() => {
        lightbox.classList.add('lightbox-open');
        lightboxContent.classList.add('lightbox-scale');
      });
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('lightbox-open');
    lightboxContent.classList.remove('lightbox-scale');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 300);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('lightbox-open')) closeLightbox();
      if (mobileMenu.classList.contains('open')) closeMobileMenu();
    }
  });

  // ============================
  // TESTIMONIALS CAROUSEL
  // ============================
  const testSlider = document.getElementById('testimonials-slider');
  const testPrev = document.getElementById('test-prev');
  const testNext = document.getElementById('test-next');
  const testDots = document.querySelectorAll('.test-dot');
  let currentTestSlide = 0;

  function getTestSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getTotalTestSlides() {
    return 4 - getTestSlidesPerView() + 1;
  }

  function updateTestCarousel() {
    const slidesPerView = getTestSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    testSlider.style.transform = `translateX(-${currentTestSlide * slideWidth}%)`;

    // Update dots
    const totalDots = Math.max(1, getTotalTestSlides());
    testDots.forEach((dot, i) => {
      dot.classList.toggle('bg-chocolate-400', i === currentTestSlide);
      dot.classList.toggle('bg-chocolate-200', i !== currentTestSlide);
      dot.style.display = i < totalDots ? 'block' : 'none';
    });
  }

  testNext.addEventListener('click', () => {
    const maxSlide = Math.max(0, getTotalTestSlides() - 1);
    currentTestSlide = (currentTestSlide + 1) > maxSlide ? 0 : currentTestSlide + 1;
    updateTestCarousel();
  });

  testPrev.addEventListener('click', () => {
    const maxSlide = Math.max(0, getTotalTestSlides() - 1);
    currentTestSlide = (currentTestSlide - 1) < 0 ? maxSlide : currentTestSlide - 1;
    updateTestCarousel();
  });

  testDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentTestSlide = i;
      updateTestCarousel();
    });
  });

  // Auto-play carousel
  let autoPlayInterval = setInterval(() => {
    const maxSlide = Math.max(0, getTotalTestSlides() - 1);
    currentTestSlide = (currentTestSlide + 1) > maxSlide ? 0 : currentTestSlide + 1;
    updateTestCarousel();
  }, 5000);

  // Pause on hover
  const testTrack = document.getElementById('testimonials-track');
  testTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  testTrack.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
      const maxSlide = Math.max(0, getTotalTestSlides() - 1);
      currentTestSlide = (currentTestSlide + 1) > maxSlide ? 0 : currentTestSlide + 1;
      updateTestCarousel();
    }, 5000);
  });

  // Handle resize
  window.addEventListener('resize', () => {
    const maxSlide = Math.max(0, getTotalTestSlides() - 1);
    if (currentTestSlide > maxSlide) currentTestSlide = maxSlide;
    updateTestCarousel();
  });

  updateTestCarousel();

  // Touch/swipe for testimonials
  let testTouchStartX = 0;
  let testTouchEndX = 0;

  testTrack.addEventListener('touchstart', (e) => {
    testTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  testTrack.addEventListener('touchend', (e) => {
    testTouchEndX = e.changedTouches[0].screenX;
    const diff = testTouchStartX - testTouchEndX;
    const maxSlide = Math.max(0, getTotalTestSlides() - 1);

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentTestSlide = Math.min(currentTestSlide + 1, maxSlide);
      } else {
        currentTestSlide = Math.max(currentTestSlide - 1, 0);
      }
      updateTestCarousel();
    }
  }, { passive: true });

  // ============================
  // WISHLIST (HEART) TOGGLE
  // ============================
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('fill-current');
      const isWished = btn.classList.contains('fill-current');
      showToast(isWished ? 'Added to your wishlist! 💕' : 'Removed from wishlist');
    });
  });

  // ============================
  // ENROLL BUTTONS
  // ============================
  document.querySelectorAll('.enroll-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.course-card');
      const courseName = card.querySelector('h3').textContent;
      showToast(`🎉 Enquiry sent for "${courseName}"! We'll contact you soon.`);

      // Scroll to contact form and pre-fill
      const courseSelect = document.getElementById('cf-course');
      for (let option of courseSelect.options) {
        if (option.value === courseName) {
          courseSelect.value = courseName;
          break;
        }
      }
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    });
  });

  // ============================
  // CONTACT FORM
  // ============================
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    contactForm.querySelectorAll('.error-msg').forEach(msg => {
      msg.classList.add('hidden');
      msg.textContent = '';
    });
    contactForm.querySelectorAll('.input-error').forEach(input => {
      input.classList.remove('input-error');
    });

    let isValid = true;

    // Validate name
    const nameInput = document.getElementById('cf-name');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'Please enter your full name');
      isValid = false;
    }

    // Validate phone
    const phoneInput = document.getElementById('cf-phone');
    const phoneRegex = /^[\+]?[\d\s]{10,15}$/;
    if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
      showFieldError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    }

    // Validate email
    const emailInput = document.getElementById('cf-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg class="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10"></circle></svg> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('✅ Message sent successfully! We\'ll get back to you shortly.');
      }, 1500);
    }
  });

  function showFieldError(input, message) {
    input.classList.add('input-error');
    const errorEl = input.parentElement.querySelector('.error-msg');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }

  // Remove error on input focus
  contactForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.remove('input-error');
      const errorEl = input.parentElement.querySelector('.error-msg');
      if (errorEl) {
        errorEl.classList.add('hidden');
      }
    });
  });

  // ============================
  // TOAST NOTIFICATION
  // ============================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    toastMessage.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Make showToast globally available
  window.showToast = showToast;

  // ============================
  // SMOOTH SCROLL for all anchor links
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================
  // RE-INIT LUCIDE after DOM manipulations
  // ============================
  // Any dynamic content changes need icon refresh
  function refreshIcons() {
    lucide.createIcons();
  }

  // Periodically refresh (handles edge cases)
  setTimeout(refreshIcons, 500);

});