import i18next, { t as translate } from 'i18next';

export const i18nMixin = baseClass => class extends baseClass {

    /**
     * Add translation resources
     * @param {String} language - The language code.
     * @param {String} namespace - I18next namespace.
     * @param {Object} resources - i18next resources.
     */
    addResources(language, namespace, resources) {
        i18next.addResources(language, namespace, resources);
    }

    /**
     * Read in configuration files.
     * @param {Array} filenames - Configuration file names
     * @return {Object} Configuration objects associated with the files.
     */
    async readFiles(filenames) {
        let configs = [];
        for (const filename of filenames) {

            console.log('Reading config file ' + filename);
            const config = await import(filename);
            configs.push(config);
        }
        return configs;
    }

    /**
     * Detect browser language settings.
     * @return {String} Language code used by browser.
     */
    detectBrowserLanguage() {

        const language = navigator.language;
        console.log('Detected browser language ' + language);
        return language;
    }

    /**
     * Initialize i18nMixin.
     *
     * Call this function in the firstUpdated() { .. } callback to initialize the mixin.
     * After that, the translation functionality will be applicable.
     *
     * @param {Object} resources - Options to configure mixin.
     */
    async i18nInit(resources) {

        const language = this.detectBrowserLanguage();

        if (!i18next.isInitialized) {
            i18next.
                init({
                lng: language,
                resources,
                defaultNS: 'translations',
                ns: ['translations'],
                fallbackLng: 'en-US'
            })
        }

        i18next.on('initialized', options => {
            this.requestUpdate()
        })
        i18next.on('languageChanged', lng => {
            const language = this.detectBrowserLanguage();
            this.changeLanguage(language);
            this.requestUpdate();
        })
    }

    changeLanguage(lang) {
        i18next.changeLanguage(lang)
    }

    translate(key) {
        return translate(key)
    }
}

export {
    translate
}