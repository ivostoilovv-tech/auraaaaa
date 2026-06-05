/* ========================================
   Aura Design — Main Script
   ======================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initHeroSequence();
  initNavigation();
  initMobileMenu();
  initPortfolio();
  initCapabilities();
  initStrip();
  initProcess();
  initMetrics();
  initTestimonials();
  initAbout();
  initCTA();
  initScrollProgress();
  initBackToTop();
});

/* ========================================
   Custom Cursor
   ======================================== */

function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  const label = cursor.querySelector('.cursor-label');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    label.style.transform = `translate(${ringX - 40}px, ${ringY - 12}px)`;

    requestAnimationFrame(animate);
  }
  animate();

  const interactives = document.querySelectorAll('a, button, .work-project, .capability-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      const cursorText = el.dataset.cursorLabel;
      if (cursorText) {
        label.textContent = cursorText;
        cursor.classList.add('has-label');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering', 'has-label');
      label.textContent = '';
    });
  });

  document.querySelectorAll('.work-project').forEach(el => {
    el.dataset.cursorLabel = 'Виж';
  });
}

/* ========================================
   Hero Reveal
   ======================================== */

function initHeroSequence() {
  const section = document.querySelector('.hero-sequence');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-progress-dot');
  const artComp = document.querySelector('.hero-art-composition');
  const scrollHint = document.querySelector('.hero-scroll-hint');
  if (!section || slides.length === 0) return;

  // Reveal headline words
  const words = document.querySelectorAll('.hero-headline .word');
  words.forEach((word) => {
    const text = word.textContent;
    word.textContent = '';
    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.textContent = text;
    word.appendChild(inner);
  });

  setTimeout(() => {
    document.querySelectorAll('.word-inner').forEach((inner, i) => {
      setTimeout(() => inner.classList.add('revealed'), i * 200);
    });
  }, 300);

  setTimeout(() => {
    document.querySelector('.hero-studio')?.classList.add('visible');
    document.querySelector('.hero-logo-mark')?.classList.add('visible');
    document.querySelector('.hero-art')?.classList.add('visible');
  }, 800);

  // Scroll-driven slide transitions
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress;
      const totalSlides = slides.length;
      const activeIndex = Math.min(Math.floor(progress * totalSlides), totalSlides - 1);

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === activeIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });

      if (artComp) {
        artComp.setAttribute('data-state', activeIndex.toString());
      }

      if (scrollHint) {
        scrollHint.style.opacity = progress > 0.1 ? '0' : '1';
      }
    }
  });

  // Mouse parallax on art
  if (artComp && !window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      artComp.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

/* ========================================
   Navigation
   ======================================== */

function initNavigation() {
  const nav = document.querySelector('.nav');

  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: () => {
      if (window.scrollY > 100) {
        nav.classList.add('visible');
      } else {
        nav.classList.remove('visible');
      }
    }
  });
}

/* ========================================
   Mobile Menu
   ======================================== */

function initMobileMenu() {
  const btn = document.querySelector('.nav-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', !isOpen);
    menu.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/* ========================================
   Portfolio
   ======================================== */

function initPortfolio() {
  const items = document.querySelectorAll('.portfolio-item');
  const scrollContent = document.querySelector('.browser-scroll-content');
  const urlText = document.querySelector('.browser-url-text');
  const visitBtn = document.querySelector('.portfolio-visit-btn');
  const viewport = document.querySelector('.browser-viewport');
  const scrollHint = document.querySelector('.browser-scroll-hint');
  if (items.length === 0 || !scrollContent) return;

  function setActive(index) {
    const item = items[index];
    if (!item) return;

    items.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });

    const screenshot = item.dataset.screenshot;
    const url = item.dataset.url;

    scrollContent.style.background = screenshot;

    if (urlText) {
      const domain = url.replace(/https?:\/\//, '');
      urlText.textContent = domain;
    }

    if (visitBtn) {
      visitBtn.href = url;
    }

    if (viewport) {
      viewport.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (scrollHint) {
      scrollHint.classList.remove('hidden');
    }
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => setActive(i));
  });

  setActive(0);

  if (viewport && scrollHint) {
    viewport.addEventListener('scroll', () => {
      if (viewport.scrollTop > 40) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    });
  }

  let autoScrollInterval;
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!viewport) return;
      const maxScroll = viewport.scrollHeight - viewport.clientHeight;
      if (viewport.scrollTop >= maxScroll - 5) {
        viewport.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        viewport.scrollBy({ top: 1, behavior: 'auto' });
      }
    }, 30);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    });
  }, { threshold: 0.3 });

  const section = document.querySelector('.portfolio');
  if (section) observer.observe(section);

  if (viewport) {
    viewport.addEventListener('mouseenter', stopAutoScroll);
    viewport.addEventListener('mouseleave', startAutoScroll);
  }

  gsap.fromTo('.portfolio-inner', {
    opacity: 0,
    y: 40
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top 75%'
    }
  });
}

/* ========================================
   Capabilities
   ======================================== */

function initCapabilities() {
  const items = document.querySelectorAll('.capability-item');
  const anims = document.querySelectorAll('.capability-anim');
  if (items.length === 0) return;

  function setActive(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    anims.forEach((anim, i) => {
      anim.classList.toggle('active', i === index);
    });
  }

  setActive(0);

  items.forEach((item, i) => {
    item.addEventListener('mouseenter', () => setActive(i));
  });

  ScrollTrigger.create({
    trigger: '.capabilities',
    start: 'top 40%',
    end: 'bottom 60%',
    onUpdate: (self) => {
      if (window.innerWidth > 768) return;
      const progress = self.progress;
      const index = Math.min(Math.floor(progress * items.length), items.length - 1);
      setActive(index);
    }
  });

  gsap.fromTo('.capabilities-inner', {
    opacity: 0,
    y: 40
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.capabilities',
      start: 'top 75%'
    }
  });
}

/* ========================================
   Horizontal Strip
   ======================================== */

function initStrip() {
  const track = document.querySelector('.strip-track');
  const strip = document.querySelector('.strip');
  if (!track || !strip) return;

  const words = document.querySelectorAll('.strip-word');

  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 100),
    ease: 'none',
    scrollTrigger: {
      trigger: strip,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    }
  });

  words.forEach((word) => {
    ScrollTrigger.create({
      trigger: word,
      start: 'left 60%',
      end: 'right 40%',
      containerAnimation: null,
      onEnter: () => word.classList.add('filled'),
      onLeave: () => word.classList.remove('filled'),
      onEnterBack: () => word.classList.add('filled'),
      onLeaveBack: () => word.classList.remove('filled')
    });
  });

  ScrollTrigger.create({
    trigger: strip,
    start: 'top 60%',
    end: 'bottom 40%',
    onUpdate: (self) => {
      const viewCenter = window.innerWidth / 2;
      words.forEach(word => {
        const rect = word.getBoundingClientRect();
        const wordCenter = rect.left + rect.width / 2;
        const distance = Math.abs(viewCenter - wordCenter);
        const isFilled = distance < rect.width / 2 + 100;
        word.classList.toggle('filled', isFilled);
      });
    }
  });
}

/* ========================================
   Process
   ======================================== */

function initProcess() {
  document.querySelectorAll('.process-step').forEach((step, i) => {
    gsap.fromTo(step, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        onEnter: () => step.classList.add('revealed')
      },
      delay: i * 0.15
    });
  });
}

/* ========================================
   Metrics Counter
   ======================================== */

function initMetrics() {
  document.querySelectorAll('.metric').forEach((metric) => {
    const numEl = metric.querySelector('.metric-num');
    const target = parseInt(metric.dataset.target);

    gsap.fromTo(metric, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: metric,
        start: 'top 85%',
        onEnter: () => animateCounter(numEl, target)
      }
    });
  });
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ========================================
   Testimonials
   ======================================== */

function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (testimonials.length === 0) return;

  let current = 0;
  let autoPlayTimer;

  function show(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    current = index;
  }

  function next() {
    show((current + 1) % testimonials.length);
  }

  function prev() {
    show((current - 1 + testimonials.length) % testimonials.length);
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); next(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prev(); startAutoPlay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAutoPlay(); show(i); startAutoPlay(); });
  });

  startAutoPlay();
}

/* ========================================
   About
   ======================================== */

function initAbout() {
  const image = document.querySelector('.about-image');
  const text = document.querySelector('.about-text');

  if (image) {
    gsap.fromTo(image, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.about', start: 'top 70%' }
    });
  }

  if (text) {
    gsap.fromTo(text, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: '.about', start: 'top 70%' }
    });
  }
}

/* ========================================
   CTA
   ======================================== */

function initCTA() {
  gsap.fromTo('.cta-content', {
    opacity: 0,
    y: 40
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 70%'
    }
  });
}

/* ========================================
   Scroll Progress
   ======================================== */

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.height = progress + '%';
  });
}

/* ========================================
   Back to Top
   ======================================== */

function initBackToTop() {
  const link = document.querySelector('.back-to-top');
  if (!link) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
