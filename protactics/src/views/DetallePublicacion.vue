<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const route = useRoute();
const router = useRouter();

const publicacionData = ref(null); // <- cambiado a publicacionData para evitar conflictos
const loading = ref(true);
const liked = ref(false);

const fetchPublicacion = async () => {
  try {
    const response = await axios.get(`https://protactics-api.onrender.com/publicaciones/${route.params.id}`);
    if (response.data) {
      publicacionData.value = response.data;
      liked.value = response.data.liked || false;
    } else {
      console.error("❌ Publicación no encontrada.");
    }
  } catch (error) {
    console.error('❌ Error obteniendo la publicación:', error);
  } finally {
    loading.value = false;
  }
};

const toggleLike = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    if (liked.value) {
      await axios.delete(`https://protactics-api.onrender.com/publicaciones/${route.params.id}/like`, config);
    } else {
      await axios.post(`https://protactics-api.onrender.com/publicaciones/${route.params.id}/like`, {}, config);
    }
    liked.value = !liked.value;
  } catch (error) {
    console.error('❌ Error al dar/quitar like:', error);
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
      <ButtonAtras />
      <button @click="goBack" class="back-button">&#8592;</button>

      <div v-if="loading" class="loading">Cargando publicación...</div>

      <div v-else-if="publicacionData" class="card">
        <h1 class="titulo">{{ publicacionData.titulo }}</h1>
        <p class="author">Entrenador: {{ publicacionData.entrenador || 'Desconocido' }}</p>
        <img
          :src="publicacionData.imagen_url || '/default.png'"
          alt="Imagen"
          class="post-image"
          @error="$event.target.src = '/default.png'"
        />
        <p class="content">{{ publicacionData.contenido }}</p>
        <p><strong>Categoría:</strong> {{ publicacionData.categoria }}</p>
        <p><strong>Campo:</strong> {{ publicacionData.campo }}</p>
        <p><strong>Fecha de Entrenamiento:</strong> {{ publicacionData.fecha_entrenamiento }}</p>
        <p><strong>Duración:</strong> {{ publicacionData.duracion_repeticion }}</p>
        <p><strong>Repeticiones:</strong> {{ publicacionData.repeticiones }}</p>

        <button @click="toggleLike" class="like-button">
          {{ liked ? 'Quitar Like' : 'Dar Like' }}
        </button>
      </div>

      <div v-else class="loading">❌ Publicación no encontrada.</div>
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
