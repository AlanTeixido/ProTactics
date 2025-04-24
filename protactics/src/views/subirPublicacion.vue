<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';

const entrenamientos = ref([]);
const loading = ref(true);
const token = localStorage.getItem('authToken');

// Obtener entrenamientos del entrenador autenticado
const fetchEntrenamientos = async () => {
  if (!token) {
    console.error("No estás autenticado.");
    return;
  }

  try {
    const response = await axios.get('https://protactics-api.onrender.com/entrenamientos', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    entrenamientos.value = response.data;
  } catch (error) {
    console.error('Error cargando entrenamientos:', error);
  } finally {
    loading.value = false;
  }
};

// Publicar entrenamiento como publicación
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
        Authorization: `Bearer ${token}`,
      }
    });

    alert('Entrenamiento publicado correctamente ✅');
  } catch (error) {
    console.error('Error al publicar el entrenamiento', error);
    alert('Error al publicar ❌');
  }
};

// Cargar entrenamientos al montar componente
onMounted(() => {
  fetchEntrenamientos();
});
</script>

<template>
  <div class="dashboard-menu">
    <MenuDashboard />
  </div>
  <div class="dashboard">
    <div class="dashboard-container">
      <h1>Subir Publicación</h1>

      <div v-if="loading" class="loading">Cargando entrenamientos...</div>

      <div v-else>
        <h2>Selecciona un entrenamiento para publicar</h2>

        <div v-if="entrenamientos.length === 0">
          No tienes entrenamientos disponibles.
        </div>

        <ul>
          <li v-for="entrenamiento in entrenamientos" :key="entrenamiento.entrenamiento_id" class="entrenamiento-item">
            <div>
              <strong>{{ entrenamiento.titulo }}</strong> - {{ entrenamiento.descripcion }}
              <button class="add-button" @click="publicarEntrenamiento(entrenamiento)">
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
  min-height: 100vh;
  background: linear-gradient(to left, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  background-color: #1f2937;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
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
