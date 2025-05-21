<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const entrenamientos = ref([]);
const publicaciones = ref([]);
const loading = ref(true);
const token = localStorage.getItem('authToken');
const errorMessage = ref(null);

const popupVisible = ref(false);
const popupMessage = ref('');
const isError = ref(false);

const showPopup = (message, error = false) => {
  popupMessage.value = message;
  isError.value = error;
  popupVisible.value = true;

  if (!error) {
    setTimeout(() => {
      popupVisible.value = false;
    }, 2500);
  }
};

const closePopup = () => {
  popupVisible.value = false;
};

const fetchEntrenamientos = async () => {
  if (!token) {
    errorMessage.value = "❌ No estás autenticado.";
    return;
  }

  try {
    const [resEntrenos, resPubs] = await Promise.all([
      axios.get('https://protactics-api.onrender.com/entrenamientos', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('https://protactics-api.onrender.com/publicaciones', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    entrenamientos.value = resEntrenos.data;
    publicaciones.value = resPubs.data;
  } catch (err) {
    errorMessage.value = "❌ Error cargando datos.";
    console.error("❌ Error de carga:", err);
  } finally {
    loading.value = false;
  }
};

const estaPublicado = (entrenamiento_id) => {
  return publicaciones.value.some(pub => pub.entrenamiento_id === entrenamiento_id);
};

const publicarEntrenamiento = async (entrenamiento) => {
  if (!token) {
    showPopup('❌ No estás autenticado', true);
    return;
  }

  if (estaPublicado(entrenamiento.entrenamiento_id)) {
    showPopup('⚠️ Este entrenamiento ya está publicado', true);
    return;
  }

  const publicacionData = {
    titulo: entrenamiento.titulo,
    contenido: entrenamiento.descripcion || '',
    imagen_url: entrenamiento.imagen_url?.trim() || 'default.png',
    entrenamiento_id: entrenamiento.entrenamiento_id,
    categoria: entrenamiento.categoria || '',
    campo: entrenamiento.campo || '',
    fecha_entrenamiento: entrenamiento.fecha_entrenamiento,
    duracion_repeticion: entrenamiento.duracion_repeticion,
    repeticiones: entrenamiento.repeticiones,
    total_duracion: entrenamiento.total_duracion,
    descanso: entrenamiento.descanso,
    notas_adicionales: entrenamiento.notas || ''
  };

  try {
    const res = await axios.post(
      'https://protactics-api.onrender.com/publicaciones/desde-entrenamiento',
      publicacionData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    showPopup('✅ Entrenamiento publicado correctamente');
    publicaciones.value.push(res.data);
  } catch (error) {
    errorMessage.value = "❌ Error al publicar el entrenamiento.";
    console.error('❌ Error al publicar:', error.response?.data || error);
    showPopup('❌ No se pudo publicar el entrenamiento.', true);
  }
};



onMounted(fetchEntrenamientos);
</script>

<template>
  <div class="dashboard-menu">
    <MenuDashboard />
  </div>
  <div class="dashboard">
    <div class="dashboard-container">
      <ButtonAtras class="btn-back" />

      <h1 class="titulo">Subir Publicación</h1>

      <div v-if="loading" class="loading">Cargando entrenamientos...</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div v-else>
        <h2>Selecciona un entrenamiento para publicar</h2>

        <div v-if="entrenamientos.length === 0">
          No tienes entrenamientos disponibles.
        </div>

        <ul>
          <li
            v-for="entrenamiento in entrenamientos"
            :key="entrenamiento.entrenamiento_id"
            class="entrenamiento-item"
          >
            <div>
              <strong>{{ entrenamiento.titulo }}</strong> - {{ entrenamiento.descripcion }}

              <button
                class="add-button"
                :disabled="estaPublicado(entrenamiento.entrenamiento_id)"
                @click="publicarEntrenamiento(entrenamiento)"
              >
                <span v-if="!estaPublicado(entrenamiento.entrenamiento_id)">+</span>
                {{ estaPublicado(entrenamiento.entrenamiento_id) ? 'Publicado' : 'Publicar' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div v-if="popupVisible" class="popup">
    <div :class="['popup-content', isError ? 'popup-error' : 'popup-success']">
      <div class="icono-check">
        <img src="/src/assets/img/logo.png" class="logo-check" />
      </div>
      <p class="popup-text">{{ popupMessage }}</p>
      <button v-if="isError" @click="closePopup" class="popup-close">Cerrar</button>
    </div>
  </div>
</template>
<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to left, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-container {
  flex: 1;
  margin-left: 250px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 5%;
}

.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #facc15;
}

.error-message {
  font-size: 1.2rem;
  color: red;
  margin-bottom: 20px;
}

.entrenamiento-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background: #1a202c;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 800px;
}

.add-button {
  background-color: #facc15;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #eab308;
}

.add-button:disabled {
  background-color: gray;
  color: #ccc;
  cursor: not-allowed;
}

h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 5%;
}

.titulo {
  text-transform: uppercase;
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  background: #2d3748;
  margin-bottom: 10px;
  border-radius: 8px;
}

li strong {
  font-size: 1.2rem;
  color: #facc15;
}

/* 🔔 Popup modal */
.popup {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: #1e293b;
  padding: 30px 40px;
  border-radius: 16px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.3s ease-out;
}

.popup-success {
  background-color: #1e293b;
}

.popup-error {
  background-color: #7f1d1d;
  animation: shake 0.4s ease-in-out;
}

.popup-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.logo-check {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  animation: bounce 0.5s ease;
}

.popup-close {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  transition: 0.3s;
}

.popup-close:hover {
  transform: scale(1.1);
}

/* 🎬 Animacions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0% { transform: translateX(-6px); }
  25% { transform: translateX(6px); }
  50% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}

@keyframes bounce {
  0%   { transform: scale(0.8); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 📱 Tablets (≤1024px) */
@media (max-width: 1024px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-container {
    padding: 40px 20px;
  }

  .entrenamiento-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .add-button {
    margin-top: 10px;
    width: 100%;
  }
}

/* 📱 Móviles (≤768px) */
@media (max-width: 768px) {
  .titulo {
    font-size: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 1.4rem;
    text-align: center;
  }

  .dashboard-container {
    margin-left: 10px;
    margin-right: 20px;
    padding: 30px 15px;
  }

  .entrenamiento-item {
    flex-direction: column;
    align-items: stretch;
    padding: 12px;
  }

  .add-button {
    width: 100%;
    font-size: 1rem;
    padding: 10px;
  }

  ul {
    padding: 0;
  }

  li {
    padding: 10px;
  }

  .popup-content {
    width: 90%;
    padding: 20px;
  }

  .popup-close {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
