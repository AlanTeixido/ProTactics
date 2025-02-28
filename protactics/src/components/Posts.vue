<template>
  <div class="dashboard-container">
    <div v-if="loading">
      <p class="loading-text">Cargando posts...</p>
    </div>

    <div v-else-if="posts.length" class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-body">
          <div class="post-content">
            <div class="post-header">
              <span class="username">@{{ post.username }}</span>
            </div>
            <img class="post-image" :src="post.image || '/default-post.png'" alt="Imagen del post" />
            <p class="description">{{ post.description }}</p>
          </div>
          <div class="final">
            <p class="letters">&copy; ProTactics</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="no-posts">No hi ha posts per mostrar.</p>
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

// Función corregida para cargar los posts
const loadPosts = async () => {
  if (!props.userId && props.mode === "profile") return; // Evita peticiones incorrectas

  let url = "https://protactics-api.onrender.com/posts"; // Posts públicos por defecto
  if (props.mode === "profile") {
    url = `https://protactics-api.onrender.com/posts/user/${props.userId}`; // Posts del usuario autenticado
  }

  try {
    const response = await axios.get(url);
    posts.value = response.data.map(post => ({
      id: post.id,
      username: post.nombre_usuario || "Usuari desconegut",
      image: post.image_url || "/default-post.png",
      description: post.contingut
    }));
  } catch (error) {
    errorMessage.value = "Error cargando los posts.";
  } finally {
    loading.value = false;
  }
};

// Esperamos a que `userId` esté listo antes de hacer la petición
watchEffect(() => {
  if (props.mode === "profile" && props.userId) {
    loadPosts();
  }
});

// Cargamos posts al montar el componente
onMounted(loadPosts);
</script>

<style scoped>
.dashboard-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;

}

.loading-text, .no-posts {
  text-align: center;
  color: #888;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.post-card {
  width: 100%;
  max-width: 600px; /* Limita el tamaño máximo de las tarjetas */
  /* background-color: rgba(255 255 255 / .05); */
  background-color: rgba(0 0 0);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.username {
  font-size: 16px;
  color: #019999;
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 15px;
}

.description {
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.6;
  margin-top: 15px;
}

.final {
  margin-top: 20px;
  padding: 10px 0;
  text-align: center;
  color: #333;
  font-size: 12px;
}

.letters {
  font-size: 12px;
  color: #aaa;
}
</style>
