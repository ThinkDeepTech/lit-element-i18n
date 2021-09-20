import i18next, { t as translate } from 'i18next';

export const i18nMixin = baseClass => class extends baseClass {

    /**
     * Initialize i18nMixin.
     *
     * Call this function in the firstUpdated() { .. } callback to initialize the mixin.
     * After that, the translation functionality will be applicable.
     *
     * @param {Object} resources - I18next resources object. See https://www.i18next.com/overview/configuration-options.
     */
    i18nInit(resources) {

        if (!i18next.isInitialized) {

            console.log('Initializing i18n');
            i18next.
                init({
                lng: navigator.language,
                resources,
                defaultNS: 'translations',
                ns: ['translations'],
                fallbackLng: 'en-CA'
            })
        }

        i18next.on('initialized', options => {
            this.requestUpdate()
        })
        i18next.on('languageChanged', lng => {
            this.changeLanguage(lng);
            this.requestUpdate();
        })
    }

    /**
     * Change the language of i18next.
     * @param {String} lang - Language code to which to switch.
     */
    changeLanguage(lang) {
        return i18next.changeLanguage(lang);
    }

    /**
     * Apply the translation of key.
     * @param {String} key - i18next translation key
     * @returns {String} - Translated result.
     */
    translate(key) {
        return translate(key)
    }
}

export {
    translate
}