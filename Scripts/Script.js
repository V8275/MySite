function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-lang-${lang}`);
    });
}

function redirect(element) {
    const url = element.getAttribute('data-url');
            window.location.href = url;
        }