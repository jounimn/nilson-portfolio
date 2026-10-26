import { copy } from "./copy.js";

const languageSwitch = document.querySelector(".language-switch");
const supportedLanguages = new Set(["pt", "en"]);
const initialLanguage = new URLSearchParams(window.location.search).get("lang");
let activeLanguage = supportedLanguages.has(initialLanguage) ? initialLanguage : "pt";

function applyLanguage(language, updateAddress = false) {
  activeLanguage = language;
  const strings = copy[language];
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.title = strings.documentTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", strings.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", strings.ogTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", strings.ogDescription);

  document.querySelectorAll("[data-copy]").forEach((element) => {
    const value = strings[element.dataset.copy];
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-copy-alt]").forEach((element) => {
    const value = strings[element.dataset.copyAlt];
    if (typeof value === "string") element.setAttribute("alt", value);
  });
  document.querySelectorAll("[data-copy-aria]").forEach((element) => {
    const value = strings[element.dataset.copyAria];
    if (typeof value === "string") element.setAttribute("aria-label", value);
  });

  if (languageSwitch) {
    languageSwitch.textContent = language === "pt" ? "EN" : "PT";
    languageSwitch.setAttribute("aria-pressed", String(language === "en"));
  }
  window.__PORTFOLIO_LANG__ = language;

  if (updateAddress) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

languageSwitch?.addEventListener("click", () => {
  applyLanguage(activeLanguage === "pt" ? "en" : "pt", true);
});

applyLanguage(activeLanguage);
