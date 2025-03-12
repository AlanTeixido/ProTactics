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

          <!-- Sección de Likes -->
          <div class="likes-section">
            <button @click="toggleLike(post)">
              {{ post.likedByUser ? '❤️' : '🤍' }}
            </button>
            <span>{{ post.likes }} likes</span>
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

const usuarioId = localStorage.getItem('userId');  // Obtenim directament l'ID de l'usuari loguejat

// Carregar posts
const loadPosts = async () => {
  if (!props.userId && props.mode === "profile") return;

  let url = "https://protactics-api.onrender.com/posts";
  if (props.mode === "profile") {
    url = `https://protactics-api.onrender.com/posts/user/${props.userId}`;
  }

  try {
    const response = await axios.get(url, { params: { usuario_id: usuarioId } });

    posts.value = response.data.map(post => ({
      id: post.id,
      username: post.nombre_usuario || "Usuari desconegut",
      image: post.image_url || "/default-post.png",
      description: post.contingut,
      likes: post.likes_count || 0,
      likedByUser: post.liked_by_user || false
    }));
  } catch (error) {
    console.error("Error carregant posts:", error);
    errorMessage.value = "Error carregant els posts.";
  } finally {
    loading.value = false;
  }
};

// Like/Unlike sense authMiddleware
const toggleLike = async (post) => {
  const url = `https://protactics-api.onrender.com/posts/${post.id}/like`;

  try {
    if (post.likedByUser) {
      await axios.delete(url, {
        data: { usuario_id: usuarioId } // Passar usuario_id pel body al DELETE
      });
      post.likes -= 1;
      post.likedByUser = false;
    } else {
      await axios.post(url, { usuario_id: usuarioId });  // Passar usuario_id pel body al POST
      post.likes += 1;
      post.likedByUser = true;
    }
  } catch (error) {
    console.error("Error actualitzant el like:", error);
  }
};

// Carregar posts quan es carrega el component
watchEffect(() => {
  if (props.mode === "profile" && props.userId) {
    loadPosts();
  }
});

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
  max-width: 600px;
  background-color: rgba(212, 212, 212, 0.295);
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
  color: #3b3b3b;
  line-height: 1.6;
  margin-top: 15px;
}

.likes-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  
}

.likes-section button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.likes-section span {
  font-size: 14px;
  color: #3b3b3b;
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
