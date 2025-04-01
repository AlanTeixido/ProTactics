<template>
    <div class="max-w-3xl mx-auto p-4">
      <div v-if="loading" class="text-center">Cargando...</div>
      <div v-else>
        <div class="border p-6 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold">{{ publicacion.titulo }}</h1>
          <p class="text-gray-600">Por {{ publicacion.entrenador }}</p>
          <img :src="publicacion.imagen_url || '/default.png'" alt="Imagen" class="w-full h-64 object-cover my-4 rounded-lg">
          <p class="text-gray-700">{{ publicacion.contenido }}</p>
          <button @click="toggleLike" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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