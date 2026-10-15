let currentLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch('Lang/translations.json');
        if (!response.ok) throw new Error('Failed to load');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
    applyTranslations(currentLanguage);
    highlightActiveLang();
}

function applyTranslations(lang) {
    if (!translations[lang]) return;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const value = translations[lang][key];
        if (value === undefined) return;

        if (el.tagName === 'IMG') {
            el.alt = value;
        } else if (el.hasAttribute('data-translate-html')) {
            el.innerHTML = value;
        } else {
            el.textContent = value;
        }
    });
    currentLanguage = lang;
    sessionStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    highlightActiveLang();
}

function switchLanguage(lang) {
    if (translations[lang]) applyTranslations(lang);
}

function highlightActiveLang() {
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
        const isActive = btn.dataset.lang === currentLanguage;
        btn.classList.toggle('lang-switch__btn--active', isActive);
    });
}

function openWindow(link) {
    window.open(link, '_blank', 'noopener,noreferrer');
}

function highlightActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path) link.classList.add('nav__link--active');
    });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.section, .hero, .about').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    loadTranslations();
    initScrollReveal();
});