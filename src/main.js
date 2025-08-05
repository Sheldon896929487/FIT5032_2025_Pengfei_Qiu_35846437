// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCefuH-LZv7XSjwiZUDBNAl0eX7PQLqvBM",
  authDomain: "fit5032-lab7-f25eb.firebaseapp.com",
  projectId: "fit5032-lab7-f25eb",
  storageBucket: "fit5032-lab7-f25eb.firebasestorage.app",
  messagingSenderId: "95748904370",
  appId: "1:95748904370:web:ac8b6c5774342cdfa780ab"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura } })

// app.component('DataTable', DataTable)
// app.component('Column', Column)

// Initialize auth state on app startup
const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')
