let language = sessionStorage.getItem('selectedLanguage') || 'en';

function switchFirstLang(){
    switchLanguage(language);
}

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-lang-${lang}`);
    });
    language = lang;
    sessionStorage.setItem('selectedLanguage', lang);
}

function redirect(element) {
    const url = element.getAttribute('data-url');
            window.location.href = url;
        }