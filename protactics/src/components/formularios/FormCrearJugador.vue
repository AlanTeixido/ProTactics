<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import MenuDashboard from '@/components/MenuDashboard.vue';

const nombre = ref('');
const apellido = ref('');
const posicion = ref('');
const dorsal = ref('');
const popupVisible = ref(false);
const popupMessage = ref('');

const router = useRouter();

const showPopup = (message) => {
  popupMessage.value = message;
  popupVisible.value = true;
  setTimeout(() => {
    popupVisible.value = false;
  }, 3000);
};

const closePopup = () => {
  popupVisible.value = false;
};

const crearJugador = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      showPopup("❌ No tens permís per crear jugadors.");
      return;
    }

    const response = await axios.post(
      'https://protactics-api.onrender.com/jugadores/register',
      {
        nombre: nombre.value,
        apellido: apellido.value,
        posicion: posicion.value,
        dorsal: dorsal.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showPopup(response.data.message);
    router.push('/jugadores');
  } catch (error) {
    console.error('❌ Error al crear jugador:', error);
    showPopup(error.response?.data?.error || 'Error en la creació del jugador.');
  }
};
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container page-container">
      <div class="form-card">
        <h2 class="crearJugador-title">Crear jugador</h2>
        <h3 class="subtitulo">Informació del jugador</h3>

        <form @submit.prevent="crearJugador" class="crearJugador-form">
          <div class="input-group">
            <label>Nom</label>
            <input v-model="nombre" type="text" placeholder="Nom" required class="input-field" />
          </div>
          <div class="input-group">
            <label>Cognom</label>
            <input v-model="apellido" type="text" placeholder="Cognom" required class="input-field" />
          </div>
          <div class="input-group">
            <label>Posició</label>
            <input v-model="posicion" type="text" placeholder="Posició" required class="input-field" />
          </div>
          <div class="input-group">
            <label>Dorsal</label>
            <input v-model="dorsal" type="number" placeholder="Dorsal" required class="input-field" />
          </div>
          <button type="submit" class="submit-btn">Crear Jugador</button>
        </form>
      </div>

      <div v-if="popupVisible" class="popup">
        <div class="popup-content">
          <p>{{ popupMessage }}</p>
          <button @click="closePopup" class="popup-close">Tancar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-container {
  flex: 1;
  margin-left: 250px;
  padding: 40px;
}

.page-container {
  background: linear-gradient(to right, #0f172a, #155e75);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

.form-card {
  background-color: #1e293b;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 500px;
}

.crearJugador-title {
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitulo {
  font-size: 1.2rem;
  margin-bottom: 25px;
  font-weight: 500;
  color: #e2e8f0;
  text-align: center;
}

.crearJugador-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-bottom: 5px;
}

.input-field {
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #334155;
  color: white;
}

.input-field::placeholder {
  color: #94a3b8;
}

.submit-btn {
  padding: 12px;
  background: linear-gradient(to right, #22c55e, #3b82f6);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.submit-btn:hover {
  transform: scale(1.03);
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
}

.popup-close {
  margin-top: 15px;
  padding: 8px;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
