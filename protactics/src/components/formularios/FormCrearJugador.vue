<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const nombre = ref('');
const apellido = ref('');
const posicion = ref('');
const dorsal = ref('');
const equipoSeleccionado = ref('');
const equipos = ref([]);

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
        dorsal: parseInt(dorsal.value),
        equipo_id: equipoSeleccionado.value
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
    if (error.response?.data?.error?.includes('dorsal')) {
      showPopup('⚠️ Ja existeix un jugador amb aquest dorsal.');
    } else {
      showPopup(error.response?.data?.error || 'Error en la creació del jugador.');
    }
  }
};

const obtenerEquipos = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const rol = localStorage.getItem('userRol');

    const endpoint =
      rol === 'entrenador'
        ? 'https://protactics-api.onrender.com/equipos/entrenador'
        : 'https://protactics-api.onrender.com/equipos';

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    equipos.value = response.data;
  } catch (error) {
    console.error('❌ Error obtenint equips:', error);
    showPopup('Error carregant els equips.');
  }
};

onMounted(obtenerEquipos);
</script>


<template>
  <div class="dashboard-container">
    <div class="form-card">
      <h3 class="subtitulo">Información del jugador</h3>

      <form @submit.prevent="crearJugador" class="crearJugador-form">
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="nombre" type="text" placeholder="Nom" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Apellido</label>
          <input v-model="apellido" type="text" placeholder="Cognom" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Posición</label>
          <select v-model="posicion" required class="input-field">
            <option value="" disabled>Selecciona una posició</option>
            <option value="Portero">Portero</option>
            <option value="Defensa">Defensa</option>
            <option value="Mediocentro">Mediocentro</option>
            <option value="Delantero">Delantero</option>
          </select>
        </div>
        <div class="input-group">
          <label>Dorsal</label>
          <input v-model="dorsal" min="1" type="number" placeholder="Dorsal" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Equipo</label>
          <select v-model.number="equipoSeleccionado" required class="input-field">
            <option value="" disabled>Selecciona un equipo</option>
            <option v-for="equipo in equipos" :key="equipo.equipo_id" :value="equipo.equipo_id">
              {{ equipo.nombre }} ({{ equipo.categoria }})
            </option>
          </select>          
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
</template>

<style scoped>

.dashboard-container {
  display: flex;
  justify-content: center; /* Centrado horizontal */
  align-items: center;     /* Centrado vertical */
  height: 85vh;           /* Ocupa el 100% de la altura de la ventana */
}

.form-card {
  background-color: #1e293b;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  width: 400px;
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
  width: 100%;
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
  background: linear-gradient(45deg, #4caf50, #0a74da);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-transform: uppercase;
  font-size: 1rem;
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
