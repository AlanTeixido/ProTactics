<template>
    <div class="container">
      <h1 class="title">Publicaciones</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div v-for="publicacion in publicaciones" :key="publicacion.id" class="post-card">
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
  </template>
  
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
  
  <style scoped>
  .container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 16px;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
  }
  
  .loading {
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  
  .post-card {
    border: 1px solid #e5e5e5;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    margin-bottom: 16px;
  }
  
  .post-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .author {
    font-size: 1rem;
    color: #555;
    font-weight: 600;
  }
  
  .post-image {
    width: 100%;
    height: 192px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 8px;
  }
  
  .post-title {
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 8px;
  }
  
  .link {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .link:hover {
    color: #2980b9;
    text-decoration: underline;
  }
  </style>
  