<template>
    <div class="container">
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div class="post-card">
          <h1 class="title">{{ publicacion.titulo }}</h1>
          <p class="author">Por {{ publicacion.entrenador }}</p>
          <img :src="publicacion.imagen_url || '/default.png'" alt="Imagen" class="post-image">
          <p class="content">{{ publicacion.contenido }}</p>
          <button @click="toggleLike" class="like-button">
            {{ liked ? 'Quitar Like' : 'Dar Like' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const publicacion = ref(null);
  const loading = ref(true);
  const liked = ref(false);
  
  const fetchPublicacion = async () => {
    try {
      const response = await axios.get(`https://protactics-api.onrender.com/publicaciones/${route.params.id}`);
      publicacion.value = response.data;
      liked.value = publicacion.value.liked;
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
  
  onMounted(fetchPublicacion);
  </script>
  
  <style scoped>
  .container {
    max-width: 768px;
    margin: 0 auto;
    padding: 16px;
  }
  
  .loading {
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  
  .post-card {
    border: 1px solid #e5e5e5;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .author {
    font-size: 1rem;
    color: #555;
    margin-top: 8px;
  }
  
  .post-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-top: 16px;
    border-radius: 8px;
  }
  
  .content {
    font-size: 1rem;
    color: #333;
    margin-top: 16px;
  }
  
  .like-button {
    margin-top: 16px;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .like-button:hover {
    background-color: #2980b9;
  }
  </style>
  