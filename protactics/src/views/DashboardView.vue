<script setup>
import FooterSection from '@/components/FooterSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import Introduction from '@/components/Introduction.vue';
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

<template>
    <HeaderSection/>
    <Introduction/>
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
  <FooterSection/>
</template>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px; 
  background-color: #f4f4f9;
  border-radius: 8px;
  margin-top: 5%;
  margin-bottom: 5%;
}


h1 {
  text-align: center;
  margin-bottom: 30px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
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
  color: #555;
}
</style>
