// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Procrastinator section interactive behavior
function setupProcrastinatorInteraction() {
  const procrastinatorItems = document.querySelectorAll(".procrastinator-item");
  const procrastinatorImage = document.querySelector(
    ".procrastinators-image img"
  );

  // Image sources for each item
  const images = [
    "assets/image/Procrastinators.png",
    "assets/image/Procrastinators-2.png",
    "assets/image/Procrastinators-3.png",
  ];

  // Set the first item as active by default
  procrastinatorItems[0].classList.add("active");

  procrastinatorItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      procrastinatorItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      item.classList.add("active");

      // Change the image with fade effect
      procrastinatorImage.style.opacity = "0";

      setTimeout(() => {
        procrastinatorImage.src = images[index];
        procrastinatorImage.style.opacity = "1";
      }, 300);
    });
  });
}

// Animate elements when they come into view
function animateOnScroll() {
  // Elements to animate on scroll
  const elements = document.querySelectorAll(
    ".feature-card, .procrastinator-item, .office-card, .testimonial-card"
  );
  elements.forEach((element) => {
    if (isInViewport(element) && !element.classList.contains("animated")) {
      element.classList.add("animated");
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

const logosRow1 = [
  "delta.svg",
  "boeing.png",
  "spacex.svg",
  "ibm.svg",
  "walmart.svg",
];

const logosRow2 = [
  "uber.svg",
  "google.svg",
  "samsung.svg",
  "pepsi.svg",
  "adidas.svg",
];

function createMarquee(rowId, logos, direction = "left") {
  const row = document.getElementById(rowId);
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.gap = "4rem";

  wrapper.style.position = "absolute";
  wrapper.style.left = direction === "left" ? "100%" : "-100%";
  wrapper.style.animation = `${
    direction === "left" ? "scrollLeft" : "scrollRight"
  } 30s linear infinite`;

  logos.forEach((logo) => {
    const img = document.createElement("img");
    img.src = `assets/image/logos/${logo}`;
    img.alt = logo.split(".")[0];
    wrapper.appendChild(img);
  });

  row.appendChild(wrapper);
}

createMarquee("row1", logosRow1, "left");
createMarquee("row2", logosRow2, "right");

// Initialize all animations
document.addEventListener("DOMContentLoaded", function () {
  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".feature-card, .office-card, .testimonial-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Setup procrastinator section interaction
  setupProcrastinatorInteraction();

  // Initial animation check
  animateOnScroll();

  // Listen for scroll events with throttling for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        animateOnScroll();
        scrollTimeout = null;
      }, 0);
    }
  });
});
