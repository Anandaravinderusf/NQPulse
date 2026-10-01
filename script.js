// Keep the displayed clock local to the visitor's device; no market feed is used.
const localClock = document.querySelector("#local-clock");

function updateLocalClock() {
  const now = new Date();
  localClock.dateTime = now.toISOString();
  localClock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

updateLocalClock();
window.setInterval(updateLocalClock, 1000);

// Toggle only the educational setup label and presentation state.
const setupToggle = document.querySelector("#setup-toggle");
const setupBanner = document.querySelector("#setup-banner");
const toggleLabel = document.querySelector("#toggle-label");
const setupMode = document.querySelector("#setup-mode");
const setupModeCaption = document.querySelector("#setup-mode-caption");
const setupPosition = document.querySelector("#setup-position");

setupToggle.addEventListener("click", () => {
  const isNeutral = setupToggle.getAttribute("aria-pressed") !== "true";
  setupToggle.setAttribute("aria-pressed", String(isNeutral));
  setupBanner.classList.toggle("neutral", isNeutral);
  setupMode.textContent = isNeutral ? "Neutral Setup" : "Bullish Setup";
  setupModeCaption.textContent = isNeutral
    ? "FICTIONAL EDUCATIONAL EXAMPLE"
    : "FICTIONAL EDUCATIONAL EXAMPLE";
  setupPosition.textContent = isNeutral ? "NEUTRAL" : "LONG";
  toggleLabel.textContent = isNeutral ? "Switch to Bullish" : "Switch to Neutral";
});

// Keep the active section reflected in the navigation while scrolling.
const navLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

  if (!visibleSection) return;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${visibleSection.target.id}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.15, 0.4] });

observedSections.forEach((section) => sectionObserver.observe(section));