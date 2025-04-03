<template>
    <div class="dashboard-container page-container">
      <div class="form-card">  
        <form @submit.prevent="crearEquipo" class="crearEquipo-form">
          <div class="input-group">
            <label>Nombre del equipo</label>
            <input v-model="nombre" type="text" placeholder="Nombre" required class="input-field" />
          </div>
          <div class="input-group">
            <label>Categoría</label>
            <select v-model="categoria" required class="input-field">
              <option value="" disabled>Selecciona una categoría</option>
              <option value="Prebenjamín">Prebenjamín</option>
              <option value="Benjamín">Benjamín</option>
              <option value="Alevín">Alevín</option>
              <option value="Infantil">Infantil</option>
              <option value="Cadete">Cadete</option>
              <option value="Juvenil">Juvenil</option>
              <option value="Amateur">Amateur</option>
              <option value="Senior">Senior</option>
              <option value="Femenino">Femenino</option>
              <option value="Veteranos">Veteranos</option>
              <option value="Fútbol Sala">Fútbol Sala</option>
              <option value="Tecnificación">Tecnificación</option>
              <option value="Competición">Competición</option>
            </select>
          </div>
          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Creando...' : 'Crear Equipo' }}
          </button>
        </form>
      </div>
  
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
  
  const nombre = ref('');
  const categoria = ref('');
  const popupVisible = ref(false);
  const popupMessage = ref('');
  const isLoading = ref(false);
  
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
    if (isLoading.value) return;
  
    if (!nombre.value.trim() || !categoria.value.trim()) {
      showPopup("⚠️ Todos los campos son obligatorios.");
      return;
    }
  
    isLoading.value = true;
  
    try {
      const token = localStorage.getItem('authToken');
      const userRol = localStorage.getItem('userRol');
      if (!token || userRol !== 'club') {
        showPopup("❌ No tienes permiso para crear equipos.");
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
      console.error('❌ Error al crear equipo:', error);
      showPopup(
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Error en la creación del equipo.'
      );
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
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
  
  .crearEquipo-form {
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
  
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
  