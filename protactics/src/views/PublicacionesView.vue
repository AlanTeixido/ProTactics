<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const publicaciones = ref([]);
const loading = ref(true);

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

onMounted(fetchPublicaciones);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu"></div>
    <div class="dashboard-container">
      <h1 class="titulo">Publicacions</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else class="grid">
        <div v-for="publicacion in publicaciones" :key="publicacion.id" class="card">
          <p class="author">{{ publicacion.entrenador }}</p>
          <img :src="publicacion.imagen_url || '/default.png'" alt="Imagen" class="post-image">
          <h2 class="post-title">
            <RouterLink :to="`/publicaciones/${publicacion.id}`" class="link">
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
  gap: 40px;
  margin-top: 5%;
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
