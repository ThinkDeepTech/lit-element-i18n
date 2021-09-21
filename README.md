# LitElement Internationalisation
LitElement Internationalisation

```

## Usage
```js
import { LitElement, html } from 'lit-element'
import { i18nMixin } from 'lit-element-i18n'

class DemoElement extends i18nMixin(LitElement) {

    firstUpdate() {
        super.firstUpdate();

        // i18next namespace
        const namespaceToUseInTranslations = 'app';
        const defaultNamespaceToAssumeInTranslationsIfNotFound = 'app';
        this.i18nInit(namespaceToUseInTranslations, {
            'en': {
                'app': {
                    'hi': 'Hello US'
                }
            }, 'en-CA': {
                'app': {
                    'hi': 'Hello CA'
                }
            }
        }, defaultNamespaceToAssumeInTranslationsIfNotFound);
    }

    render() {
        return html`
            <h1>${this.translate('app:hi')}</h1>

            <select @change='${this.changeLanguages}'>
                <option value='en-US'>English (US)</option>
                <option value='en-CA'>English (CA)</option>
            </select>
        `
    }

    changeLanguages(event) {
        this.changeLanguage(event.target.value)
    }
}

customElements.define('demo-element', DemoElement)
```