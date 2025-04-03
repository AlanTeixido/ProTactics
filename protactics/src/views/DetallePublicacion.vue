<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';

const route = useRoute();
const router = useRouter();
const publicacion = ref(null);
const loading = ref(true);
const liked = ref(false);

const fetchPublicacion = async () => {
  try {
    const response = await axios.get(`https://protactics-api.onrender.com/publicaciones?entrenador_id=${route.params.id}`);
    
    if (response.data.length > 0) {
      publicacion.value = response.data[0];
      liked.value = publicacion.value.liked;
    } else {
      console.error("No se encontraron publicaciones para este entrenador.");
    }
  } catch (error) {
    console.error('Error obteniendo la publicación', error);
  } finally {
    loading.value = false;
  }
};

const toggleLike = async () => {
  try {
    if (liked.value) {
      await axios.delete(`https://protactics-api.onrender.com/publicaciones/${route.params.id}/like`);
    } else {
      await axios.post(`https://protactics-api.onrender.com/publicaciones/${route.params.id}/like`);
    }
    liked.value = !liked.value;
  } catch (error) {
    console.error('Error al dar/quitar like', error);
  }
};

const goBack = () => {
  router.push('/publicaciones');
};

onMounted(fetchPublicacion);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>
    <div class="dashboard-container">
      <button @click="goBack" class="back-button">&#8592;</button>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else class="card">
        <h1 class="titulo">{{ publicacion.titulo }}</h1>
        <p class="author">{{ publicacion.entrenador }}</p>
        <img :src="publicacion.imagen_url || '/default.png'" alt="Imagen" class="post-image">
        <p class="content">{{ publicacion.contenido }}</p>
        <button @click="toggleLike" class="like-button">
          {{ liked ? 'Quitar Like' : 'Dar Like' }}
        </button>
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
  position: relative;
}

.back-button {
  position: absolute;
  margin-right: 50px;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #facc15;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: white;
  text-transform: uppercase;
}

.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #facc15;
}

.card {
  padding: 30px;
  border-radius: 15px;
  background: linear-gradient(to right, #0bd1df, #155e75);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.author {
  font-size: 1rem;
  font-weight: bold;
  color: #facc15;
}

.post-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin: 15px 0;
}

.content {
  font-size: 1rem;
  color: white;
  margin: 15px 0;
}

.like-button {
  padding: 12px 25px;
  background-color: #facc15;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.like-button:hover {
  background-color: #eab308;
}
</style>
