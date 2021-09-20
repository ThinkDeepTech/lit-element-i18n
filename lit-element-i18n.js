import i18next, { t as translate } from 'i18next';

export const i18nMixin = baseClass => class extends baseClass {

    /**
     * Define the resources for use in translation.
     * @param {String} language - Language code (i.e, 'en')
     * @param {String} namespace - Language namespace to which resources will be added
     * @param {Object} resources - The resources to add.
     */
    addResources(language, namespace, resources) {
        i18next.addResources(language, namespace, resources);
    }

    /**
     * Translate the specified inputs.
     *
     */
    translate(key) {
        return translate(key);
    }

    i18nInit() {
        if (!i18next.isInitialized) {
            i18next.init({
                lng: 'en',
                debug: true,
                defaultNS: 'translations',
                ns: ['translations'],
                fallbackLng: 'en',
                // backend: {
                //     loadPath: this.languageResources || '/assets/locales/{{lng}}/{{ns}}.json'
                // }
            })
        }

        i18next.on('initialized', options => {
            this.requestUpdate()
        })
        i18next.on('languageChanged', options => {
            this.requestUpdate()
        })
    }

    changeLanguage(lang) {
        i18next.changeLanguage(lang)
    }
}

export {
    translate
}