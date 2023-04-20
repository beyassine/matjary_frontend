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
axios.defaults.baseURL = 'http://127.0.0.1:8000'

// Vuex Store
import store from './store';
// Check if user is logged in
store.dispatch('authenticateUser')
//Cookies Cart
store.dispatch('checkCart')

//bus events using mitt
import mitt from 'mitt';
const emitter = mitt();

// Create App
const app=createApp(App).use(router).use(store).use(vuetify).use(VueTelInput, globalOptions)
app.config.globalProperties.emitter = emitter;
app.mount('#app');