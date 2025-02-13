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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  userId: String, // ID de l'usuari que es passa com a prop
  mode: String // "dashboard" per veure tots els posts, "profile" per veure només els de l'usuari
});

const posts = ref([]);
const loading = ref(true);
const errorMessage = ref("");

// 🔹 Funció per carregar els posts
const loadPosts = async () => {
  let url = "https://protactics-api.onrender.com/posts"; // Per defecte, carrega tots els posts

  if (props.mode === "profile" && props.userId) {
    url = `https://protactics-api.onrender.com/posts/user/${props.userId}`; // Carrega només els posts de l'usuari
  }

  console.log("🔍 Carregant posts de:", url);

  try {
    const response = await axios.get(url);

    if (response.data.length === 0) {
      console.warn("⚠️ No hi ha posts disponibles.");
    }

    posts.value = response.data.map(post => ({
      id: post.id,
      username: post.nombre_usuario || "Usuari desconegut",
      image: post.image_url || "/default-post.png",
      description: post.contingut
    }));
  } catch (error) {
    console.error("⚠️ Error carregant posts:", error);
    errorMessage.value = "❌ Error carregant els posts.";
  } finally {
    loading.value = false;
  }
};

// 🔹 Carregar els posts en muntar el component
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
