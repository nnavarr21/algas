window.addEventListener('DOMContentLoaded', () => {
    const languages = {
        es: {},
        en: {},
        cn: {},
        jp: {},
    };

    async function loadLanguage(languageCode, jsonFilePath) {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${jsonFilePath}`);
            }
            languages[languageCode] = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    function getLanguage(languageCode) {
        return languages[languageCode] || {};
    }

    function updateText(languageCode) {
        const selectedLanguage = getLanguage(languageCode);
        const fallbackLanguage = getLanguage('es');
        const elements = document.querySelectorAll('[translate-key]');

        elements.forEach((element) => {
            const key = element.getAttribute('translate-key');
            const value = selectedLanguage[key] || fallbackLanguage[key];
            if (value) {
                element.textContent = value;
            }
        });
    }

    function bindLanguageButton(buttonId, languageCode) {
        const button = document.getElementById(buttonId);
        if (!button) {
            return;
        }

        button.addEventListener('click', (event) => {
            event.preventDefault();
            updateText(languageCode);
        });
    }

    Promise.all([
        loadLanguage('es', 'languages/spanish.json'),
        loadLanguage('en', 'languages/english.json'),
        loadLanguage('cn', 'languages/chinese.json'),
        loadLanguage('jp', 'languages/japanese.json'),
    ]).then(() => {
        updateText('es');
    });

    bindLanguageButton('es-button', 'es');
    bindLanguageButton('en-button', 'en');
    bindLanguageButton('cn-button', 'cn');
    bindLanguageButton('jp-button', 'jp');
});
