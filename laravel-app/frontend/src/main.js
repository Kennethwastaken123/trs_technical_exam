import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

// PrimeVue imports
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primevue/resources/themes/saga-blue/theme.css'; // theme
import 'primevue/resources/primevue.min.css';           // core css
import 'primeicons/primeicons.css';                     // icons

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: '3000',
}

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(PrimeVue);

// Register PrimeVue components globally
app.component('DataTable', DataTable);
app.component('Column', Column);

app.config.globalProperties.$toastr = toastr

app.mount('#app');
