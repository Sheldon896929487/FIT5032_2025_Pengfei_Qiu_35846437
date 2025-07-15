// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';


const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

createApp(App).mount('#app')
