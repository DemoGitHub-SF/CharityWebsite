document.documentElement.classList.remove("no-js");

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const menuIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  toggle.innerHTML = open ? closeIcon : menuIcon;
}
if (toggle && nav) {
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
}

// Header shadow on scroll
const header = document.querySelector(".site-header");
const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Donation widget
const donateBtn = document.getElementById("donate-btn");
if (donateBtn) {
  let frequency = "monthly";
  let amount = 1500;
  const note = document.querySelector("#donate-note span");
  const notes = {
    monthly: "Monthly gifts help us plan a child's support for the whole school year.",
    once: "A one-time gift goes straight to school fees, books or tutoring where it's needed most.",
  };
  const fmt = (n) => "₹" + n.toLocaleString("en-IN");
  const render = () => {
    donateBtn.textContent = `Donate ${fmt(amount)}${frequency === "monthly" ? " monthly" : ""}`;
    note.textContent = notes[frequency];
  };
  document.querySelectorAll("[data-frequency]").forEach((b) => b.addEventListener("click", () => {
    frequency = b.dataset.frequency;
    document.querySelectorAll("[data-frequency]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render();
  }));
  document.querySelectorAll("[data-amount]").forEach((b) => b.addEventListener("click", () => {
    amount = Number(b.dataset.amount);
    document.querySelectorAll("[data-amount]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render();
  }));
  donateBtn.addEventListener("click", () => {
    note.textContent = "Online payments are being set up. Please contact us at hello@edukind.org to give today.";
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
