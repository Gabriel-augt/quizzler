import './assets/style.css';

import { createApp } from 'vue';
import App from './App.vue';

import { createI18n } from 'vue-i18n';

import {pt_BR} from './locales/pt_BR';
import {en} from './locales/en';
import {es} from './locales/es';

const languages = {
    pt_BR,
    en,
    es
};

const i18n = createI18n({
    locale: 'pt_BR',
    fallbackLocale: 'pt_BR',
    messages: languages,
    globalInjection: true,
    legacy: false
});

createApp(App).use(i18n).mount('#app');