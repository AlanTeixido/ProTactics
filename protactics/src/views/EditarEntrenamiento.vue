<template>
    <div class="editar-container">
      <h2>✏️ Editar Entrenamiento</h2>
  
      <div v-if="loading">
        <p>🔄 Cargando datos del entrenamiento...</p>
      </div>
  
      <form v-else @submit.prevent="guardarCambios">
        <label>Título:</label>
        <input v-model="entrenamiento.titulo" required />
  
        <label>Deporte:</label>
        <select v-model="entrenamiento.tipo_deporte">
          <option>Running</option>
          <option>Ciclismo</option>
          <option>Natación</option>
        </select>
  
        <label>Duración (hh:mm:ss):</label>
        <input v-model="entrenamiento.duracion" type="text" required />
  
        <label>Distancia (km):</label>
        <input v-model="entrenamiento.distancia" type="number" />
  
        <label>Desnivel Acumulado (m):</label>
        <input v-model="entrenamiento.desnivel_acumulado" type="number" />
  
        <label>Calorías Quemadas:</label>
        <input v-model="entrenamiento.calorias_quemadas" type="number" />
  
        <label>Inicio:</label>
        <input v-model="entrenamiento.inicio" type="datetime-local" required />
  
        <label>Fin:</label>
        <input v-model="entrenamiento.fin" type="datetime-local" />
  
        <label>Visibilidad:</label>
        <select v-model="entrenamiento.visibilidad">
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>
  
        <button type="submit">💾 Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const entrenamiento = ref({});
  const loading = ref(true);
  const entrenamientoId = route.params.id;
  
  // 🔹 Cargar datos del entrenamiento
  const cargarEntrenamiento = async () => {
    try {
      const response = await axios.get(`https://protactics-api.onrender.com/entrenamientos/user/${localStorage.getItem('userId')}`);
      entrenamiento.value = response.data.find(e => e.id == entrenamientoId) || {};
    } catch (error) {
      console.error("❌ Error obteniendo entrenamiento:", error);
    } finally {
      loading.value = false;
    }
  };
  
  // 🔹 Guardar cambios en el entrenamiento
  const guardarCambios = async () => {
    try {
      await axios.put(`https://protactics-api.onrender.com/entrenamientos/${entrenamientoId}`, entrenamiento.value);
      alert("✅ Entrenamiento actualizado correctamente!");
      router.push("/mis-entrenamientos");
    } catch (error) {
      console.error("❌ Error guardando cambios:", error);
      alert("❌ Error guardando cambios.");
    }
  };
  
  onMounted(cargarEntrenamiento);
  </script>
  
  <style scoped>
  .editar-container {
    width: 50%;
    margin: 40px auto;
    padding: 20px;
    background: #121212;
    border-radius: 15px;
    box-shadow: 0px 5px 20px rgba(0, 255, 255, 0.15);
    text-align: center;
  }
  
  h2 {
    color: #00c3ff;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    color: #ddd;
    margin-top: 10px;
    font-size: 16px;
    text-align: left;
  }
  
  input, select {
    padding: 8px;
    border-radius: 8px;
    border: none;
    margin-bottom: 10px;
    background: #333;
    color: white;
  }
  
  button {
    background-color: #00c3ff;
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #0099cc;
    transform: scale(1.05);
  }
  </style>
  