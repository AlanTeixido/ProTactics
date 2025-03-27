import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// 🔗 Estableix base URL de l'API
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://protactics-api.onrender.com';

// ✅ Prova de connexió (ara amb ruta correcta: /clubes)
axios.get('/clubes')
  .then(response => console.log("✅ API Conectada (clubes):", response.data))
  .catch(error => console.error("❌ Error al conectar la API:", error));

// 🧠 Integrar Axios globalment
const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
