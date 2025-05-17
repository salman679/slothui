// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");

  // Animate hamburger to X
  const spans = mobileMenuToggle.querySelectorAll("span");
  spans.forEach((span) => span.classList.toggle("active"));

  if (mobileMenu.classList.contains("show")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");

    // Reset hamburger
    const spans = mobileMenuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    // Close all other items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-answer").classList.remove("show");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
    answer.classList.toggle("show");
  });
});

// Back to top button
const backToTopBtn = document.getElementById("back-to-top-btn");

backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/hide back to top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.style.opacity = "1";
  } else {
    backToTopBtn.style.opacity = "0";
  }
});

// Smooth scrolling for navigation links
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     if (this.getAttribute("href") !== "#") {
//       e.preventDefault();

//       const targetId = this.getAttribute("href");
//       const targetElement = document.querySelector(targetId);

//       if (targetElement) {
//         window.scrollTo({
//           top: targetElement.offsetTop - 80,
//           behavior: "smooth",
//         });
//       }
//     }
//   });
// });

// // Add animation on scroll
// const animateOnScroll = () => {
//   const elements = document.querySelectorAll(
//     ".feature-card, .procrastinator-item, .testimonial-card, .statistic-item, .office-card"
//   );

//   elements.forEach((element) => {
//     const elementPosition = element.getBoundingClientRect().top;
//     const screenPosition = window.innerHeight / 1.2;

//     if (elementPosition < screenPosition) {
//       element.style.opacity = "1";
//       element.style.transform = "translateY(0)";
//     }
//   });
// };

// // Initialize animations
// window.addEventListener("scroll", () => {
//   // Set initial state for animated elements
//   const elements = document.querySelectorAll(
//     ".feature-card, .procrastinator-item, .testimonial-card, .statistic-item, .office-card"
//   );
//   elements.forEach((element) => {
//     element.style.opacity = "0";
//     element.style.transform = "translateY(20px)";
//     element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
//   });

//   // Trigger initial animation
//   setTimeout(animateOnScroll, 300);
// });

// window.addEventListener("scroll", animateOnScroll);

// //load more button
document.addEventListener("scroll", function () {
  const testimonials = document.querySelectorAll(
    "#testimonials .testimonial-card"
  );
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const initiallyVisible = 4;

  function handleMobileView() {
    if (window.innerWidth < 768) {
      // Mobile: Show only first 4 testimonials
      testimonials.forEach((testimonial, index) => {
        if (index < initiallyVisible) {
          testimonial.classList.add("show");
        } else {
          testimonial.classList.remove("show");
        }
      });
    } else {
      // Desktop: Show all
      testimonials.forEach((testimonial) => {
        testimonial.classList.add("show");
      });
    }
  }

  handleMobileView(); // Run on load

  // If user resizes browser, run it again
  window.addEventListener("resize", handleMobileView);

  loadMoreBtn.addEventListener("click", function () {
    testimonials.forEach((testimonial) => {
      testimonial.classList.add("show");
    });
    loadMoreBtn.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("statisticsSection");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters(); // Trigger when entering view
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(section);

  function animateCounters() {
    const counters = document.querySelectorAll(
      "#statisticsSection .statistic-item h3"
    );

    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target"));
      const format = counter.getAttribute("data-format");
      let current = 0;
      const speed = 100;

      // Reset content to 0 before each animation
      counter.textContent = format === "M" ? "0.00M" : "0";

      const updateCount = () => {
        const increment = target / speed;

        if (current < target) {
          current += increment;
          counter.textContent = formatNumber(current, format);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = formatNumber(target, format);
        }
      };

      updateCount();
    });
  }

  function formatNumber(number, format) {
    if (format === "M") {
      return number.toFixed(2) + "M";
    } else if (format === "%") {
      return Math.ceil(number) + "%";
    } else if (format === "+") {
      return Math.ceil(number) + "+";
    } else {
      return Math.ceil(number);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const animateOnView = (sectionId, selectors) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elements = section.querySelectorAll(selectors);
          if (entry.isIntersecting) {
            elements.forEach((el) => el.classList.add("animated"));
          } else {
            elements.forEach((el) => el.classList.remove("animated"));
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  };

  // Observe each section with related elements
  animateOnView(
    "testimonials",
    ".testimonial-card, .badge, section h2, .section-description"
  );
  animateOnView(
    "features",
    ".feature-card, .badge, section h2, .section-description"
  );
  animateOnView(
    "contact",
    ".office-card, .badge, section h2, .section-description"
  );
  animateOnView(
    "statisticsSection",
    ".statistic-item, .badge, section h2, .section-description"
  );
  animateOnView("achievements", " .badge, section h2, .section-description");
  animateOnView(
    "hero",
    ".hero h1, .hero-description, .app-buttons, .hero-image, .badge"
  );
});
