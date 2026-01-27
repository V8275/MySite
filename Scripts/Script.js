let currentLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch('Lang/translations.json');
        translations = await response.json();
        applyTranslations(currentLanguage);
    } catch (error) {
        console.error('Error loading translations:', error);
        translations = getFallbackTranslations();
        applyTranslations(currentLanguage);
    }
}

function getFallbackTranslations() {
    return {
    };
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'IMG' && element.hasAttribute('data-translate-alt')) {
                element.alt = translations[lang][key];
            } else if (element.hasAttribute('data-translate-html')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    currentLanguage = lang;
    sessionStorage.setItem('selectedLanguage', lang);
}

function switchLanguage(lang) {
    if (translations[lang]) {
        applyTranslations(lang);
    }
}

function openWindow(link){
    window.open(link, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
});