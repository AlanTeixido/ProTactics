<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const publicaciones = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedFilter = ref('');

const fetchPublicaciones = async () => {
  try {
    const response = await axios.get('https://protactics-api.onrender.com/publicaciones');
    publicaciones.value = response.data;
  } catch (error) {
    console.error('Error cargando publicaciones', error);
  } finally {
    loading.value = false;
  }
};

const filteredPublicaciones = computed(() => {
  let filtered = publicaciones.value.filter(pub =>
    pub.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (selectedFilter.value === 'titulo') {
    filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (selectedFilter.value === 'entrenador') {
    filtered.sort((a, b) => a.entrenador_id.localeCompare(b.entrenador_id)); // Usamos el ID del entrenador
  } else if (selectedFilter.value === 'fecha') {
    filtered.sort((a, b) => new Date(b.fecha_entrenamiento) - new Date(a.fecha_entrenamiento)); // Fechas de entrenamiento
  }

  return filtered;
});

onMounted(fetchPublicaciones);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>
    <div class="dashboard-container">
      <ButtonAtras />
      <h1 class="titulo">Publicaciones</h1>
      
      <div class="search-filter-container">
        <input v-model="searchQuery" placeholder="Buscar por título..." class="search-input" />
        <select v-model="selectedFilter" class="filter-select">
          <option value="">Sin filtro</option>
          <option value="titulo">Ordenar por Título</option>
          <option value="entrenador">Ordenar por Entrenador</option>
          <option value="fecha">Más Reciente</option>
        </select>
      </div>

      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else class="grid">
        <div v-for="publicacion in filteredPublicaciones" :key="publicacion.publicacion_id" class="card">
          <p class="author">Entrenador: {{ publicacion.entrenador_id }}</p> <!-- Mostramos el ID del entrenador, puedes obtener el nombre si tienes la relación -->
          <img :src="publicacion.imagen_url || '/default.png'" alt="Imagen" class="post-image">
          <h2 class="post-title">
            <RouterLink :to="`/publicaciones/${publicacion.publicacion_id}`" class="link">
              {{ publicacion.titulo }}
            </RouterLink>
          </h2>
        </div>
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

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
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

.search-filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 250px;
}

.filter-select {
  padding: 10px;
  border-radius: 5px;
  border: none;
}

.titulo {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
}

.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #facc15;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
}

.card {
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(to right, #0bd1df, #155e75);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.author {
  font-size: 1rem;
  font-weight: bold;
  color: #facc15;
}

.post-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin: 10px 0;
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.link {
  text-decoration: none;
  color: white;
}
</style>