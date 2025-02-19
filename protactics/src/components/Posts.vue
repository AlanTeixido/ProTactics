<template>
  <div class="dashboard-container">
    <div v-if="loading">
      <p>Carregant posts...</p>
    </div>

    <div v-else-if="posts.length" class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-header">
          <span class="username">@{{ post.username }}</span>
        </div>

        <div class="post-body">
          <img :src="post.image || '/default-post.png'" alt="Imagen del post" class="post-image" />
          <p class="description">{{ post.description }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No hi ha posts per mostrar.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import axios from 'axios';

const props = defineProps({
  userId: String, // ID del usuario autenticado
  mode: String // "dashboard" para posts públicos, "profile" para los del usuario
});

const posts = ref([]);
const loading = ref(true);
const errorMessage = ref("");

// 🔹 Función corregida para cargar los posts
const loadPosts = async () => {
  if (!props.userId && props.mode === "profile") return; // Evita peticiones incorrectas

  let url = "https://protactics-api.onrender.com/posts"; // 🔹 Posts públicos por defecto
  if (props.mode === "profile") {
    url = `https://protactics-api.onrender.com/posts/user/${props.userId}`; // 🔹 Posts del usuario autenticado
  }

  console.log("🔍 Cargando posts desde:", url);

  try {
    const response = await axios.get(url);

    posts.value = response.data.map(post => ({
      id: post.id,
      username: post.nombre_usuario || "Usuari desconegut",
      image: post.image_url || "/default-post.png",
      description: post.contingut
    }));
  } catch (error) {
    console.error("⚠️ Error cargando posts:", error);
    errorMessage.value = "❌ Error cargando los posts.";
  } finally {
    loading.value = false;
  }
};

// 🔹 Esperamos a que `userId` esté listo antes de hacer la petición
watchEffect(() => {
  if (props.mode === "profile" && props.userId) {
    loadPosts();
  }
});

// 🔹 Cargamos posts al montar el componente
onMounted(loadPosts);
</script>


<style scoped>
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
