// ===================================================
// VISUAL EFFECTS — theme toggle + scroll reveal
// ===================================================

// ---------------------------------------------------
// Scroll Progress Bar
// ---------------------------------------------------
const scrollProgressEl = document.getElementById("scrollProgress");

function updateScrollProgress() {
    if (!scrollProgressEl) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressEl.style.width = percent + "%";
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

// ---------------------------------------------------
// Scrollspy — highlight the nav link for the section in view
// ---------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    updateScrollProgress();

    const navLinks = document.querySelectorAll("nav a[href^='#']");
    if (navLinks.length === 0 || !("IntersectionObserver" in window)) return;

    const sectionIds = Array.from(navLinks).map(function (link) {
        return link.getAttribute("href").slice(1);
    });

    const sections = sectionIds
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);

    function setActiveLink(id) {
        navLinks.forEach(function (link) {
            link.classList.toggle("nav-active", link.getAttribute("href") === "#" + id);
        });
    }

    const spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

    sections.forEach(function (section) { spyObserver.observe(section); });
});
const footerYearEl = document.getElementById("footerYear");
if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
}

// ---------------------------------------------------
// Dark Mode Toggle
// ---------------------------------------------------
const themeToggleBtn = document.getElementById("themeToggle");
const THEME_STORAGE_KEY = "portfolio-theme";

function applyThemeIcon() {
    if (!themeToggleBtn) return;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
}

if (themeToggleBtn) {
    applyThemeIcon(); // reflect the theme already applied by the head script

    themeToggleBtn.addEventListener("click", function () {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem(THEME_STORAGE_KEY, "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem(THEME_STORAGE_KEY, "dark");
        }
        applyThemeIcon();
    });
}

// ---------------------------------------------------
// Scroll Reveal — fade/slide elements in as they enter view
// ---------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const revealEls = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window) || revealEls.length === 0) {
        // Fallback: just show everything immediately
        revealEls.forEach(function (el) { el.classList.add("reveal-visible"); });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
});
