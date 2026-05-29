// Initialize Lucide Icons
lucide.createIcons();

// ==========================================
// Navbar Behavior
// ==========================================
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const navbarLinks = document.getElementById('navbarLinks');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Scroll: add .scrolled class + show scroll-to-top
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// Active nav link via IntersectionObserver
const navSections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.navbar__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -65% 0px' });

navSections.forEach(section => sectionObserver.observe(section));

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
  const isOpen = navbarLinks.classList.toggle('open');
  if (isOpen) {
    menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  } else {
    menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  }
});

// Close mobile menu on link click
navbarLinks.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navbarLinks.classList.remove('open');
    menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  });
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
  lenis.scrollTo(0, { duration: 1.5 });
});

// ==========================================
// Lenis Smooth Scroll Setup
// ==========================================
/* global Lenis */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==========================================
// GSAP Animations
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Remove default CSS animations
document.querySelectorAll('.fade-up, .header__container, .section__header, .projects__cards, .skill-card, .contact__panel, .aboutMe__content_container').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '1'; 
    el.style.transform = 'none';
});

// --- Utility: Text Splitter ---
const splitText = (selector) => {
  document.querySelectorAll(selector).forEach(element => {
    const text = element.innerText;
    element.innerHTML = '';
    const words = text.split(' ');
    words.forEach(word => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.marginRight = '0.3em';
      
      const innerSpan = document.createElement('span');
      innerSpan.style.display = 'inline-block';
      innerSpan.innerText = word;
      
      wordSpan.appendChild(innerSpan);
      element.appendChild(wordSpan);
    });
  });
};

splitText('.header__title:not(.header__title--small)');
splitText('.section__title');

// 1. Initial Page Load (Hero Section)
const heroTimeline = gsap.timeline();

heroTimeline
  .fromTo(".header__img", 
    { scale: 0, opacity: 0, rotation: -45, borderRadius: "50%" },
    { scale: 1, opacity: 1, rotation: 0, borderRadius: "100px", duration: 1.5, ease: "elastic.out(1, 0.5)" }
  )
  .fromTo(".section-label", 
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    "-=1"
  )
  .fromTo(".header__title:not(.header__title--small) > span > span", 
    { y: "100%", opacity: 0, rotateZ: 10 },
    { y: "0%", opacity: 1, rotateZ: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" },
    "-=0.6"
  )
  .fromTo(".header__badge_container .badge", 
    { scale: 0.8, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
    "-=0.4"
  )
  .fromTo(".header__description", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    "-=0.5"
  )
  .fromTo(".header__actions > *", 
    { y: 20, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    "-=0.6"
  )
  .fromTo(".contact-card", 
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
    "-=1.2"
  );


// 2. Scroll Triggers

// Section Titles Parallax Reveal
gsap.utils.toArray('.section__title').forEach(title => {
  gsap.fromTo(title.querySelectorAll('span > span'), 
    { y: "110%", opacity: 0, rotateZ: 5 },
    {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
      }
    }
  );
});

// Section Headers Subtitles/Desc
gsap.utils.toArray('.section__subtitle, .section__description').forEach(elem => {
  gsap.fromTo(elem,
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%"
      }
    }
  );
});

// About Image Parallax
gsap.to(".aboutMe__icon img", {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".aboutMe__wrapper",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});

// About Wrapper Reveal
gsap.fromTo(".aboutMe__wrapper",
  { y: 80, opacity: 0, scale: 0.95 },
  {
    y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
    scrollTrigger: {
      trigger: ".aboutMe__section",
      start: "top 75%",
    }
  }
);

// Skills Section Advanced Animations
gsap.fromTo(".soft-skills-wrapper",
  { x: -80, opacity: 0, rotationY: -10 },
  {
    x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out",
    scrollTrigger: {
      trigger: ".soft-skills-wrapper",
      start: "top 80%",
    }
  }
);

gsap.fromTo(".technical-skills-wrapper",
  { x: 80, opacity: 0, rotationY: 10 },
  {
    x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out",
    scrollTrigger: {
      trigger: ".technical-skills-wrapper",
      start: "top 80%",
    }
  }
);

// Skills Icons Float
gsap.utils.toArray(".soft-skill-item").forEach((item, i) => {
  gsap.fromTo(item, 
    { y: 30, opacity: 0 },
    { 
      y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "back.out(1.2)",
      scrollTrigger: { trigger: ".soft-skills-grid", start: "top 85%" }
    }
  );
});

// Tools Section
gsap.fromTo(".tools__wrapper",
  { x: 80, opacity: 0, rotationY: 10 },
  {
    x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out",
    scrollTrigger: { trigger: ".tools__wrapper", start: "top 80%" }
  }
);

// Project Cards Parallax Stagger
gsap.fromTo(".projects__cards",
  { y: 100, opacity: 0, scale: 0.9 },
  {
    y: 0, 
    opacity: 1, 
    scale: 1,
    duration: 1, 
    stagger: 0.15, 
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".projects__cards_container",
      start: "top 75%",
    }
  }
);

// Projects Images Subtle Zoom on Scroll
gsap.utils.toArray(".projects__cards_img").forEach(img => {
  gsap.to(img, {
    scale: 1.15,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Contact Panels Stagger & Rotation
gsap.fromTo(".contact__panel",
  { y: 60, opacity: 0, rotateX: -15 },
  {
    y: 0, 
    opacity: 1, 
    rotateX: 0,
    duration: 0.8, 
    stagger: 0.1, 
    ease: "back.out(1.4)",
    scrollTrigger: {
      trigger: ".contact__grid",
      start: "top 80%",
    }
  }
);

// 3. Magnetic Hover Effects
const magnets = document.querySelectorAll('.primaryButton, .outlineButton, .contact__panel, .soft-skill-item, .tech-icon-badge');

magnets.forEach(magnet => {
  magnet.addEventListener('mousemove', (e) => {
    const rect = magnet.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(magnet, {
      x: x * 0.15,
      y: y * 0.15,
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  magnet.addEventListener('mouseleave', () => {
    gsap.to(magnet, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  });
});
