import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { API_URL, DEMO_MODE } from './config';

// 🔗 Estableix base URL de l'API (VITE_API_URL, veure src/config.js)
axios.defaults.baseURL = API_URL;

const start = async () => {
  if (DEMO_MODE) {
    // Sense VITE_API_URL: API simulada al navegador (src/demo/), instal·lada
    // abans de muntar l'app perquè cap petició surti a la xarxa.
    try {
      const { installDemoApi } = await import('./demo');
      installDemoApi(axios);
    } catch (error) {
      console.error('❌ No s\'ha pogut carregar el mode demo:', error);
    }
  } else {
    // ✅ Prova de connexió (ara amb ruta correcta: /clubes)
    axios.get('/clubes')
      .then(response => console.log("✅ API Conectada (clubes):", response.data))
      .catch(error => console.error("❌ Error al conectar la API:", error));
  }

  // 🧠 Integrar Axios globalment
  const app = createApp(App);
  app.config.globalProperties.$axios = axios;

  app.use(router);
  app.mount('#app');
};

start();
