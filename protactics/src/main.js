import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://protactics-api.onrender.com';


// Prueba de conexión a la API
axios.get('/usuarios')
  .then(response => console.log("✅ API Conectada:", response.data))
  .catch(error => console.error("❌ Error al conectar la API:", error));

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
