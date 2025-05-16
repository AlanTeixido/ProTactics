<template>
  <div class="crear-entrenador-container">
    <form @submit.prevent="crearEntrenador" class="form-create">
      <h2>Información del entrenador</h2>
      <div class="input-group">
        <label for="nombre">Nombre del entrenador</label>
        <input v-model="nombre" type="text" id="nombre" placeholder="Nombre" required />
      </div>

      <div class="input-group">
        <label for="correo">Correo electrónico</label>
        <input v-model="correo" type="email" id="correo" placeholder="correo@entrenador.com" required />
      </div>

      <div class="input-group">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" placeholder="••••••••" required />
      </div>

      <div class="input-group">
        <label for="equipo">Equipo del entrenador</label>
        <input v-model="equipo" type="text" id="equipo" placeholder="Ej: Primer equipo" required />
      </div>

      <button type="submit" class="submit-btn">Crear Entrenador</button>
    </form>

    <div v-if="popupVisible" class="popup">
      <div class="popup-content">
        <p>{{ popupMessage }}</p>
        <button @click="closePopup" class="popup-close">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Estados
const nombre = ref('');
const correo = ref('');
const password = ref('');
const equipo = ref('');
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

const crearEntrenador = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const userRol = localStorage.getItem('userRol');
    if (userRol !== 'club') {
      showPopup("❌ No tens permís per crear entrenadors.");
      return;
    }

    const response = await axios.post(
      'https://protactics-api.onrender.com/entrenadores/register',
      {
        nombre: nombre.value,
        correo: correo.value,
        password: password.value,
        equipo: equipo.value,
        club_id: localStorage.getItem('userId') // Este es el id del club del cual se está creando el entrenador
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    showPopup(response.data.message);
    router.push('/dashboard'); // Redirigir al dashboard después de crear el entrenador
  } catch (error) {
    console.error('Error al crear entrenador:', error);
    showPopup(error.response?.data?.error || 'Error en la creació de l\'entrenador.');
  }
};
</script>

<style scoped>
.crear-entrenador-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  padding: 20px;
}

.form-create {
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
}

.form-create h2 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 15px;
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

input {
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #334155;
  color: white;
}

input::placeholder {
  color: #94a3b8;
}

.submit-btn {
  padding: 12px;
  background: linear-gradient(45deg, #4caf50, #0a74da);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.submit-btn:hover {
  transform: scale(1.03);
}

/* Popup styles */
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
  z-index: 999;
}

.popup-content {
  background-color: #1e293b;
  padding: 25px 30px;
  border-radius: 12px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.popup-close {
  margin-top: 15px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
}

</style>

