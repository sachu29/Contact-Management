import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Font Awesome

import '../node_modules/@fortawesome/fontawesome-free/css/all.css'


// Bootstrap CSS & JS
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

// Global Styles
import '../src/style.css' /* It is pleaced here, To override Bootstrap styles*/


createApp(App).use(store).use(router).mount('#app')
