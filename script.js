// ================================
// Heet Narechania Portfolio - Main JavaScript
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initCursor();
  initNavigation();
  initThemeToggle();
  initTypewriter();
  initScrollAnimations();
  initMobileMenu();
  initSmoothScroll();
});

// ================================
// Custom Cursor
// ================================
function initCursor() {
  const cursor = document.querySelector(".cursor-follower");
  if (!cursor) return;

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add("visible");
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("visible");
  });

  // Smooth cursor following
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.15;
    cursorY += dy * 0.15;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .bento-item, .timeline-content, .skill-category, .stat-card, .contact-link"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

// ================================
// Navigation
// ================================
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Scroll effect
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;

    // Active section highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        currentScroll >= sectionTop &&
        currentScroll < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ================================
// Theme Toggle
// ================================
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const html = document.documentElement;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Add a fun animation
    themeToggle.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeToggle.style.transform = "";
    }, 300);
  });
}

// ================================
// Typewriter Effect
// ================================
function initTypewriter() {
  const typewriterElement = document.querySelector(".typewriter");
  if (!typewriterElement) return;

  const words = [
    "Business Analyst",
    "Automation Architect",
    "Process Optimizer",
    "Tech Consultant",
    "Workflow Wizard",
    "Integration Specialist",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after a delay
  setTimeout(type, 1000);
}

// ================================
// Scroll Animations
// ================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".section-header, .story-chapter, .value-card, .quote-box, " +
      ".stat-card, .project-card, .timeline-item, .skill-category, " +
      ".education-card, .cert-card, .hobby-card, .contact-link, .contact-card"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal", "active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  // Stagger animation for timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  // Stagger animation for skill categories
  const skillCategories = document.querySelectorAll(".skill-category");
  skillCategories.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
}

// ================================
// Mobile Menu
// ================================
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ================================
// Parallax Effect (Optional Enhancement)
// ================================
function initParallax() {
  const parallaxElements = document.querySelectorAll(".floating-card");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    parallaxElements.forEach((el, index) => {
      const speed = 0.05 * (index + 1);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// ================================
// Counter Animation
// ================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = counter.textContent;
    const numericValue = parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/[\d,]/g, "");

    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const updateCounter = () => {
      current += increment;
      if (current < numericValue) {
        counter.textContent = Math.ceil(current).toLocaleString() + suffix;
        setTimeout(updateCounter, stepTime);
      } else {
        counter.textContent = numericValue.toLocaleString() + suffix;
      }
    };

    // Start animation when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });

    observer.observe(counter);
  });
}

// Initialize counter animation
document.addEventListener("DOMContentLoaded", animateCounters);

// ================================
// Magnetic Button Effect (Optional)
// ================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn-primary, .nav-cta");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

// Initialize magnetic buttons
document.addEventListener("DOMContentLoaded", initMagneticButtons);

// ================================
// Easter Egg: Konami Code
// ================================
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Easter egg activated!
      document.body.style.animation = "rainbow 2s linear infinite";
      setTimeout(() => {
        document.body.style.animation = "";
      }, 5000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// Add rainbow animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ================================
// Console Easter Egg
// ================================
console.log(
  `
%c👋 Hey there, curious developer!

%cI'm Heet Narechania - a Business Analyst & Tech Consultant
who bridges the gap between business and technology.

%c🎯 What I bring to the table:
   • Requirements Gathering & Analysis
   • Process Optimization & Automation
   • Data-Driven Decision Making
   • Stakeholder Communication

%c🔗 Let's connect:
   LinkedIn: linkedin.com/in/heetnarechania
   GitHub: github.com/heetnarechania
   Email: heetcanada@gmail.com

%c✨ Looking for BA & Tech Consulting opportunities!
`,
  "font-size: 20px; font-weight: bold; color: #6366f1;",
  "font-size: 14px; color: #a1a1aa;",
  "font-size: 12px; color: #8b5cf6;",
  "font-size: 12px; color: #8b5cf6;",
  "font-size: 14px; color: #22c55e;"
);
