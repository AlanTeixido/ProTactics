import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import axios from 'axios';

// Configurar la URL base de la API
axios.defaults.baseURL = 'http://localhost:3000';

// Prueba de conexión a la API
axios.get('/usuarios')
  .then(response => console.log("✅ API Conectada:", response.data))
  .catch(error => console.error("❌ Error al conectar la API:", error));

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router); // 👉 Agregar Vue Router a la aplicación
app.mount('#app');
