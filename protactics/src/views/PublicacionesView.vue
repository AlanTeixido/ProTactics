<template>
    <div class="max-w-4xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Publicaciones</h1>
      <div v-if="loading" class="text-center">Cargando...</div>
      <div v-else>
        <div v-for="publicacion in publicaciones" :key="publicacion.id" class="border p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer mb-4">
          <p class="text-gray-700 font-semibold">{{ publicacion.entrenador }}</p>
          <img :src="publicacion.imagen_url || '/default.png'" alt="Imagen" class="w-full h-48 object-cover rounded-md mt-2">
          <h2 class="text-lg font-bold mt-2">
            <RouterLink :to="`/publicaciones/${publicacion.id}`" class="text-blue-500 hover:underline">
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
  