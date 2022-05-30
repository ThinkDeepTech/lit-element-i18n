import i18next from 'i18next';

const translate = (key) => {
    return i18next.t(key);
}

export const i18nMixin = baseClass => class extends baseClass {

    /**
     * Initialize i18nMixin.
     *
     * Call this function in the firstUpdated() { .. } callback to initialize the mixin.
     * After that, the translation functionality will be applicable.
     *
     * @param {String} namespace - Namespace in which to include resources. translation is done with the format <namespace>:<translation key>.
     * @param {Object} resources - I18next resources object. See https://www.i18next.com/overview/configuration-options.
     * @param {String} defaultNamespace - Default namespace to assume when performing translations.
     */
    i18nInit(namespace, resources, defaultNamespace) {

        if (!i18next.isInitialized) {

            console.log('Initializing i18n');
            i18next.
                init({
                lng: navigator.language,
                resources,
                defaultNS: 'translations', // TODO: Make configurable
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
        return translate(key);
    }
}

export {
    translate
}