

window.addEventListener('DOMContentLoaded', event => {

    var es, en, cn, jp;

    async function loadLanguage(jsonFilePath) {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data; // Return the parsed JSON data
        } catch (error) {
            console.error('Error:', error);
            throw error; // Re-throw the error to handle it later if needed
        }
    }

    // Example usage:
    (async () => {
        try {
            const es_path = '/languages/spanish.json';
            const en_path = '/languages/english.json';
            const cn_path = '/languages/chinese.json';
            const jp_path = '/languages/japanese.json';

            es = await loadLanguage(es_path);
            en = await loadLanguage(en_path);
            cn = await loadLanguage(cn_path);
            jp = await loadLanguage(jp_path);

            // Now you can work with the parsed data
            console.log(es, en, cn, jp);

            // Other code that depends on the parsed data can go here
        } catch (error) {
            // Handle any errors that occurred during data loading or parsing
            console.error('Error:', error);
        }
    })();
    // Language data
    function getLan(language) {
        switch (language) {
            case 'es':
                return es;
            case 'en':
                return en;
            case 'cn':
                return cn;
            case 'jp':
                return jp;
        }
    }

    // Function to update text based on selected language
    function updateText(language) {
        const elements = document.querySelectorAll('[translate-key]');
        elements.forEach((element) => {
            const key = element.getAttribute('translate-key');
            console.log(key)
            element.textContent = getLan(language)[key] || '';
        });
    }

    document.getElementById('en-button').addEventListener('click', () => {
        updateText('en');
    });

    document.getElementById('es-button').addEventListener('click', () => {
        updateText('es');
    });

    document.getElementById('cn-button').addEventListener('click', () => {
        updateText('cn');
    });

    document.getElementById('jp-button').addEventListener('click', () => {
        updateText('jp');
    });
});