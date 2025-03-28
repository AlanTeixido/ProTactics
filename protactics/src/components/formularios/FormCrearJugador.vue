<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Estados
const nombre = ref('');
const apellido = ref('');
const posicion = ref('');
const dorsal = ref('');
const popupVisible = ref(false);
const popupMessage = ref('');

// Router para redirigir después de la creación
const router = useRouter();

const showPopup = (message) => {
  popupMessage.value = message;
  popupVisible.value = true;
  setTimeout(() => {
    popupVisible.value = false;
  }, 3000); // Cierra el popup después de 3 segundos
};

const closePopup = () => {
  popupVisible.value = false;
};

// Función para crear jugador
const crearJugador = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Token que se guarda en localStorage

    if (!token) {
      showPopup("❌ No tienes permiso para crear jugadores.");
      return;
    }

    // Hacer la solicitud para crear jugador
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
          Authorization: `Bearer ${token}`, // Token en la cabecera
        },
      }
    );

    showPopup(response.data.message);
    router.push('/dashboard'); // Redirigir al dashboard después de crear el jugador
  } catch (error) {
    console.error('Error al crear jugador:', error);
    showPopup(error.response?.data?.error || 'Error en la creación del jugador.');
  }
};
</script>

<template>
  <div class="form-crearJugador">
    <h2 class="crearJugador-title">Información del jugador</h2>
    <form @submit.prevent="crearJugador" class="crearJugador-form">
      <div class="input-group">
        <label>Nombre</label>
        <input v-model="nombre" type="text" placeholder="Nombre" required class="input-field" />
      </div>
      <div class="input-group">
        <label>Apellido</label>
        <input v-model="apellido" type="text" placeholder="Apellido" required class="input-field" />
      </div>
      <div class="input-group">
        <label>Posición</label>
        <input v-model="posicion" type="text" placeholder="Posición" required class="input-field" />
      </div>
      <div class="input-group">
        <label>Dorsal</label>
        <input v-model="dorsal" type="number" placeholder="Dorsal" required class="input-field" />
      </div>
      <button type="submit" class="submit-btn">Crear Jugador</button>
    </form>

    <div v-if="popupVisible" class="popup">
      <div class="popup-content">
        <p>{{ popupMessage }}</p>
        <button @click="closePopup" class="popup-close">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-crearJugador {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}

.crearJugador-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.crearJugador-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  max-width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #2a2a2a;
}

.input-field {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
  background-color: #2a2a2a18;
  color: white;
}

.submit-btn {
  padding: 12px;
  background: linear-gradient(45deg, #4caf50, #0a74da);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
}

.submit-btn:hover {
  transform: scale(1.05);
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
