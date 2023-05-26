import {createApp} from 'vue';
import App from "@/App.vue";
import router from "@/router";

// CSS Imports
import './assets/dist/css/tabler.min.css'
import './assets/dist/css/tabler-flags.min.css'
import './assets/dist/css/tabler-payments.min.css'
import './assets/dist/css/tabler-vendors.min.css'
import './assets/dist/css/demo.min.css'

// JS Imports
import './assets/dist/js/tabler.min.js'
import './assets/dist/js/demo-theme.min.js'
import './assets/dist/js/demo.min.js'


// Main App Mount
createApp(App).use(router).mount('#app')
