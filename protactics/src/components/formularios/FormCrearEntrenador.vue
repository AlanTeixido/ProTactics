<template>
  <div class="crear-entrenador-container">
    <form @submit.prevent="crearEntrenador" class="form-create">
      <div class="input-group">
        <label for="nombre">Nom del entrenador</label>
        <input v-model="nombre" type="text" id="nombre" placeholder="Nom complet" required />
      </div>

      <div class="input-group">
        <label for="correo">Correu electrònic</label>
        <input v-model="correo" type="email" id="correo" placeholder="correu@entrenador.com" required />
      </div>

      <div class="input-group">
        <label for="password">Contrasenya</label>
        <input v-model="password" type="password" id="password" placeholder="••••••••" required />
      </div>

      <div class="input-group">
        <label for="equipo">Equip del entrenador</label>
        <input v-model="equipo" type="text" id="equipo" placeholder="Ex: Primer equip" required />
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
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}

.form-create {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px; /* Ancho fijo para el formulario */
  max-width: 100%; /* Asegura que no se desborde en pantallas pequeñas */
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #2a2a2a;
}

input {
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
