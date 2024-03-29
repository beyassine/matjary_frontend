import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    components,
    directives,
})

// vue tel input
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
const globalOptions = {
    mode: 'auto',
  };

// mdi icons
import '@mdi/font/css/materialdesignicons.css'

//router
import router from './router'

// axios
import axios from 'axios'
//https://matjaryapi.online
//http://127.0.0.1:8000
axios.defaults.baseURL = 'https://matjaryapi.online'

// Vuex Store
import store from './store';
// Check if user is logged in
store.dispatch('authenticateUser')

//bus events using mitt
import mitt from 'mitt';
const emitter = mitt();

// Amplitude
import * as amplitude from '@amplitude/analytics-browser';
amplitude.init('b8a33fa17cc052395709464bb699457d');

import i18n from './i18n'

// Create App
const app=createApp(App).use(i18n).use(router).use(store).use(vuetify).use(VueTelInput, globalOptions)
app.config.globalProperties.emitter = emitter;
app.mount('#app');