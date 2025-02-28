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
        <select v-model="entrenamiento.tipo_deporte" @change="cargarDetalles">
          <option value="running">Running</option>
          <option value="ciclismo">Ciclismo</option>
          <option value="piscina">Natación</option>
          <option value="futbol">Fútbol</option>
          <option value="padel">Pádel</option>
          <option value="gimnasio">Gimnasio</option>
        </select>
  
        <label>Duración (minutos):</label>
        <input v-model="entrenamiento.duracion.minutes" type="number" required />
  
        <label>Distancia (km):</label>
        <input v-model="entrenamiento.distancia" type="number" />
  
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
  
        <!-- 🔹 Detalles específicos por deporte -->
        <template v-if="entrenamiento.tipo_deporte === 'piscina'">
          <label>Número de Piscinas:</label>
          <input v-model="detalles.num_piscinas" type="number" />
  
          <label>Tamaño Piscina:</label>
          <input v-model="detalles.tamano_piscina" type="text" />
  
          <label>Estilo:</label>
          <input v-model="detalles.estilo" type="text" />
        </template>
  
        <template v-if="entrenamiento.tipo_deporte === 'futbol'">
          <label>Posición:</label>
          <input v-model="detalles.posicion" type="text" />
  
          <label>Goles:</label>
          <input v-model="detalles.goles" type="number" />
  
          <label>Asistencias:</label>
          <input v-model="detalles.asistencias" type="number" />
        </template>
  
        <template v-if="entrenamiento.tipo_deporte === 'ciclismo'">
          <label>Potencia Media (W):</label>
          <input v-model="detalles.potencia_media" type="number" />
  
          <label>Cadencia (rpm):</label>
          <input v-model="detalles.cadencia" type="number" />
  
          <label>Velocidad Máxima (km/h):</label>
          <input v-model="detalles.velocidad_maxima" type="number" />
        </template>
  
        <button type="submit">💾 Guardar Cambios</button>
        <button type="button" @click="router.push('/editar')" class="back-btn">🔙 Volver</button>
              </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const entrenamiento = ref({});
  const detalles = ref({});
  const loading = ref(true);
  const entrenamientoId = route.params.id;
  
  // Carga los detalles específicos del deporte
  const cargarEntrenamiento = async () => {
  try {
    // Obtiene TODOS los entrenamientos del usuario
    const response = await axios.get(`https://protactics-api.onrender.com/entrenamientos/user/${localStorage.getItem('userId')}`);

    // Busca el entrenamiento por ID dentro de la lista
    entrenamiento.value = response.data.find(e => e.id == entrenamientoId) || {};

    // Asegura que los detalles existen
    entrenamiento.value.detalles = entrenamiento.value.detalles || {};
  } catch (error) {
    console.error("❌ Error obteniendo entrenamiento:", error);
    alert("⚠️ No se pudo cargar el entrenamiento.");
    router.push("/mis-entrenamientos"); // Redirigir si no existe
  } finally {
    loading.value = false;
  }
};

  // 🔹 Guardar cambios en el entrenamiento
  const guardarCambios = async () => {
    try {
      const data = {
        ...entrenamiento.value,
        detalles: detalles.value,
      };
      await axios.put(`https://protactics-api.onrender.com/entrenamientos/${entrenamientoId}`, data);
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

  .back-btn {
    background-color: #555;
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    margin-top: 10px;
  }
  
  .back-btn:hover {
    background-color: #444;
    transform: scale(1.05);
  }

  
  
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
  