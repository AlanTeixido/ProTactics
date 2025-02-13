<template>
    <div class="dashboard-container">
    <div v-if="posts.length" class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-header">
          <span class="username">{{ post.username }}</span>
        </div>

        <div class="post-body">
          <img :src="post.image" alt="Imagen del post" class="post-image" />
          <p class="description">{{ post.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay posts para mostrar.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Datos de ejemplo para los posts
const posts = ref([
  {
    id: 1,
    username: '@juanperez',
    image: 'https://via.placeholder.com/150',
    description: '¡Nuevo artículo sobre Vue.js! Aprende cómo trabajar con reactividad en Vue.'
  },
  {
    id: 2,
    username: '@maria_gomez',
    image: 'https://via.placeholder.com/150',
    description: '¿Sabías que Vue 3 ahora tiene Composition API? Mira los detalles en el blog.'
  },
  {
    id: 3,
    username: '@gallardo4',
    image: 'https://via.placeholder.com/150',
    description: 'Revisando las últimas tendencias en desarrollo web para 2025.'
  },
  {
    id: 4,
    username: '@alanteixi_05',
    image: 'https://via.placeholder.com/150',
    description: 'Revisando las últimas tendencias en desarrollo web para 2025.'
  },
  {
    id: 5,
    username: '@adrirodriguez1',
    image: 'https://via.placeholder.com/150',
    description: 'Revisando las últimas tendencias en desarrollo web para 2025.'
  }
]);
</script>

<style scoped>
.intro{
  margin-top: 10%;
  text-align: center;
}
.intro h1{
  font-size: 200%;
  font-weight: 400;
}
.dashboard-container {
  width: 40%;
  margin: 0 auto;
  padding: 20px; 
  border-radius: 8px;
  margin-top: 4%;
  margin-bottom: 10%;
}
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.post-card {
  background-color: #52525254;
  padding: 30px;
  border-radius: 8px;

}

.post-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
}

.username {
  font-size: 16px;
  color: #007bff;
}

.post-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
}

.description {
  font-size: 14px;
  color: #ffffff;
}
</style>