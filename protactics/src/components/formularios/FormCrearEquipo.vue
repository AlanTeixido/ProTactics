<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const nombre = ref('');
const categoria = ref('');

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

const crearEquipo = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const userRol = localStorage.getItem('userRol');
    if (!token || userRol !== 'club') {
      showPopup("❌ No tens permís per crear equips.");
      return;
    }

    const response = await axios.post(
      'https://protactics-api.onrender.com/equipos',
      {
        nombre: nombre.value,
        categoria: categoria.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showPopup(response.data.message);
    router.push('/equipos');
  } catch (error) {
    console.error('❌ Error al crear equip:', error);
    showPopup(error.response?.data?.error || 'Error en la creació de l\'equip.');
  }
};
</script>

<template>
  <div class="dashboard-container page-container">
    <div class="form-card">
      <h3 class="subtitulo">Crear un nou equip</h3>

      <form @submit.prevent="crearEquipo" class="crearJugador-form">
        <div class="input-group">
          <label>Nom de l'equip</label>
          <input v-model="nombre" type="text" placeholder="Nom" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Categoria</label>
          <select v-model="categoria" required class="input-field">
            <option value="" disabled>Selecciona una categoria</option>
            <option value="Competició">Competició</option>
            <option value="Tecnificació">Tecnificació</option>
            <option value="A">Nivell A</option>
            <option value="B">Nivell B</option>
            <option value="C">Nivell C</option>
          </select>
        </div>
        <button type="submit" class="submit-btn">Crear Equip</button>
      </form>
    </div>

    <div v-if="popupVisible" class="popup">
      <div class="popup-content">
        <p>{{ popupMessage }}</p>
        <button @click="closePopup" class="popup-close">Tancar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
}

.form-card {
  background-color: #1e293b;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 500px;
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
