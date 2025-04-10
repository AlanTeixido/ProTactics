<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'; // Importamos useRoute para acceder a los parámetros de la ruta

const entrenamientos = ref([]);
const loading = ref(true);
const token = localStorage.getItem('authToken'); // Obtener token de autenticación

// Usamos useRoute para acceder a los parámetros de la ruta
const route = useRoute();
const entrenadorId = route.params.entrenador_id; // Cambiar 'id' por 'entrenador_id'

console.log("ID del entrenador desde la URL:", entrenadorId); // Depura para ver el ID del entrenador

// Función para obtener los entrenamientos del entrenador logueado
const fetchEntrenamientos = async () => {
  if (!entrenadorId) {
    console.error("No se encontró el ID del entrenador");
    return;
  }

  try {
    // Suponemos que el backend proporciona un endpoint para obtener los entrenamientos según el ID del entrenador
    const response = await axios.get(`https://protactics-api.onrender.com/entrenamientos?entrenador_id=${entrenadorId}`);
    entrenamientos.value = response.data;
  } catch (error) {
    console.error('Error cargando entrenamientos', error);
  } finally {
    loading.value = false;
  }
};

// Función para publicar un entrenamiento
const publicarEntrenamiento = async (entrenamiento) => {
  if (!token) {
    alert('No estás autenticado');
    return;
  }

  const publicacionData = {
    titulo: entrenamiento.titulo,
    contenido: entrenamiento.descripcion,
    imagen_url: entrenamiento.imagen_url,
    entrenamiento_id: entrenamiento.entrenamiento_id,
  };

  try {
    await axios.post('https://protactics-api.onrender.com/publicaciones', publicacionData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pasar token en el encabezado de la solicitud
      }
    });

    alert('Entrenamiento publicado correctamente');
  } catch (error) {
    console.error('Error al publicar el entrenamiento', error);
    alert('Error al publicar');
  }
};

// Cargar entrenamientos cuando el componente se monta
onMounted(() => {
  fetchEntrenamientos();
});
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <h1>Subir Publicación</h1>
      
      <div v-if="loading" class="loading">Cargando...</div>
      
      <div v-else>
        <h2>Selecciona un entrenamiento para publicar</h2>
        
        <div v-if="entrenamientos.length === 0">No tienes entrenamientos disponibles.</div>
        
        <ul>
          <li v-for="entrenamiento in entrenamientos" :key="entrenamiento.entrenamiento_id" class="entrenamiento-item">
            <div>
              <strong>{{ entrenamiento.titulo }}</strong> - {{ entrenamiento.descripcion }}
              <button 
                class="add-button" 
                @click="publicarEntrenamiento(entrenamiento)">
                <span>+</span> Publicar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to left, #0f172a, #155e75);
  color: white;
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

.entrenamiento-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background: #1a202c;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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

h2 {
  font-size: 2rem;
  color: white;
}

h1 {
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
</style>
