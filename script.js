const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const toggleLabel = document.querySelector(".toggle-label");
const year = document.querySelector("#year");
const storageKey = "monozain-theme";

const getPreferredTheme = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#08090a" : "#f8f5ef");

  if (!toggle || !toggleLabel) {
    return;
  }

  const isLight = theme === "light";
  toggle.setAttribute("aria-pressed", String(isLight));
  toggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
  toggleLabel.textContent = isLight ? "Light" : "Dark";
};

applyTheme(getPreferredTheme());

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(storageKey, nextTheme);
  applyTheme(nextTheme);
});

if (year) {
  year.textContent = new Date().getFullYear();
}
