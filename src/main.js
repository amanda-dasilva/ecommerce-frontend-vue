import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


window.axios = require('axios')
import swal from 'sweetalert';
window.Swal = swal;

createApp(App).use(router).mount('#app')
