/* ── Init icons ──────────────────────────────────── */
lucide.createIcons();

/* ── Theme ───────────────────────────────────────── */
const html = document.documentElement;

const themeToggles = [
  {
    btnId: "themeToggle",
    sunId: "iconSun",
    moonId: "iconMoon",
    labelId: "themeLabel",
  },
  {
    btnId: "themeToggle2",
    sunId: "iconSun2",
    moonId: "iconMoon2",
    labelId: "themeLabel2",
  },
];

function applyTheme(t) {
  html.setAttribute("data-theme", t);
  themeToggles.forEach(({ sunId, moonId, labelId }) => {
    const sunEl = document.getElementById(sunId);
    const moonEl = document.getElementById(moonId);
    const labelEl = document.getElementById(labelId);
    if (sunEl) sunEl.style.display = t === "dark" ? "block" : "none";
    if (moonEl) moonEl.style.display = t === "dark" ? "none" : "block";
    if (labelEl) labelEl.textContent = t === "dark" ? "Dark" : "Light";
  });
}

const savedTheme = localStorage.getItem("mz-theme") || "light";
applyTheme(savedTheme);

themeToggles.forEach(({ btnId }) => {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("mz-theme", next);
  });
});

/* ── Wordmark char stagger ───────────────────────── */
const wm = document.getElementById("wordmark");
if (wm) {
  "MONOZAIN".split("").forEach((ch, i) => {
    const s = document.createElement("span");
    s.className = "char";
    s.textContent = ch;
    s.style.animationDelay = 0.3 + i * 0.07 + "s";
    wm.appendChild(s);
  });
}

/* ── Mobile menu ─────────────────────────────────── */
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle("open", menuOpen);
    mobileBtn.setAttribute("aria-expanded", String(menuOpen));
  });

  document.addEventListener("click", function () {
    if (menuOpen) {
      menuOpen = false;
      mobileMenu.classList.remove("open");
      mobileBtn.setAttribute("aria-expanded", "false");
    }
  });

  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menuOpen = false;
      mobileMenu.classList.remove("open");
      mobileBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ── Scroll reveal ───────────────────────────────── */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });
} else {
  revealEls.forEach(function (el) {
    el.classList.add("visible");
  });
}

/* ── Notify form ─────────────────────────────────── */
var notifyBtn = document.getElementById("notifyBtn");
var notifyEmail = document.getElementById("notifyEmail");
if (notifyBtn && notifyEmail) {
  notifyBtn.addEventListener("click", function () {
    var val = notifyEmail.value.trim();
    if (val && val.includes("@") && val.includes(".")) {
      notifyBtn.textContent = "You're in ✓";
      notifyBtn.style.background = "#6B9B7A";
      notifyBtn.style.color = "#fff";
      notifyEmail.value = "";
      notifyEmail.disabled = true;
      notifyBtn.disabled = true;
    } else {
      notifyEmail.style.outline = "1px solid rgba(200,184,154,0.8)";
      notifyEmail.focus();
      setTimeout(function () {
        notifyEmail.style.outline = "";
      }, 1400);
    }
  });
  notifyEmail.addEventListener("keydown", function (e) {
    if (e.key === "Enter") notifyBtn.click();
  });
}
