<template>
    <div class="dashboard-container">
      <div v-if="loading">
        <p class="loading-text">Cargando posts...</p>
      </div>
  
      <div v-else-if="posts.length" class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <!-- Cabecera con imagen de perfil y usuario -->
          <div class="post-header">
            <img src="../assets/img/usuario.png" class="profile-image" />
            <span class="username">@{{ post.username }}</span>
          </div>
  
          <!-- Botón de seguir SIEMPRE visible, alineado a la derecha -->
          <button
            @click="toggleFollow(post)"
            :class="['follow-btn', post.isFollowing ? 'dejar-seguir' : '']"
            class="follow-btn-container"
          >
            {{ post.isFollowing ? "Dejar de seguir" : "Seguir" }}
          </button>
  
          <div class="post-body">
            <div class="post-content">
              <img src="../assets/img/padel.jpg" class="post-image" />
              <!-- Sección de Likes -->
              <div class="likes-section">
                <button @click="toggleLike(post)">
                  {{ post.likedByUser ? "❤️" : "🤍" }}
                </button>
                <span>{{ post.likes }}</span>
              </div>
              <p class="description">{{ post.description }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else>
        <p class="no-posts">No hay posts para mostrar.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios"; 
  
  const posts = ref([]);
  const loading = ref(true);
  
  // Recuperar el userId de localStorage
  const usuarioId = parseInt(localStorage.getItem("userId"), 10) || null; // Asegurarse de que se obtiene el ID correctamente
  
  // Cargar posts
  const loadPosts = async () => {
    let url = "https://protactics-api.onrender.com/posts";
    
    try {
      const response = await axios.get(url);
      console.log("📌 Posts cargados:", response.data);
  
      // Obtener la lista de seguidos por el usuario actual
      const seguidosRes = await axios.get(
        `https://protactics-api.onrender.com/seguimientos/${usuarioId}/seguidos`
      );
      const seguidosIds = seguidosRes.data.map((user) => user.id);
      console.log("Seguidos por el usuario:", seguidosIds);
  
      // Asignar la variable `isFollowing` correctamente a los posts
      posts.value = response.data.map((post) => ({
        id: post.id,
        userId: post.usuario_id ?? null,
        username: post.nombre_usuario || "Usuario desconocido",
        image: post.image_url || "/default-post.png",
        description: post.contingut,
        likes: post.likes_count || 0,
        likedByUser: post.liked_by_user || false,
        isFollowing: seguidosIds.includes(post.usuario_id),
      }));
    } catch (error) {
      console.error("Error cargando posts:", error);
    } finally {
      loading.value = false;
    }
  };
  
  // Función para manejar el "like"
  const toggleLike = async (post) => {
    const url = `https://protactics-api.onrender.com/posts/${post.id}/like`;
  
    try {
      if (post.likedByUser) {
        await axios.delete(url, {
          data: { usuario_id: usuarioId }, // Pasamos el usuario_id en el body
        });
        post.likes -= 1;
        post.likedByUser = false;
      } else {
        await axios.post(url, { usuario_id: usuarioId });
        post.likes += 1;
        post.likedByUser = true;
      }
    } catch (error) {
      console.error("Error actualizando el like:", error);
    }
  };
  
  // Función para manejar "seguir" y "dejar de seguir"
  const toggleFollow = async (post) => {
    try {
      if (!usuarioId || !post.userId) return; // Verifica que el usuario está autenticado
  
      if (post.isFollowing) {
        await axios.delete(
          `https://protactics-api.onrender.com/seguimientos/${post.userId}/dejar-seguir`,
          { data: { seguidor_id: usuarioId } }
        );
      } else {
        await axios.post(
          `https://protactics-api.onrender.com/seguimientos/${post.userId}/seguir`,
          { seguidor_id: usuarioId }
        );
      }
  
      post.isFollowing = !post.isFollowing; // Actualizamos la UI inmediatamente
    } catch (error) {
      console.error("Error al seguir/dejar de seguir:", error);
    }
  };
  
  onMounted(loadPosts); // Cargamos los posts al montar el componente
  </script>
  
  <style scoped>
  /* Estilo de botón de Seguir */
  .follow-btn-container {
    align-self: flex-end;
    background-color: #00c3ff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: 0.3s ease-in-out;
    margin-top: 10px;
  }
  
  .follow-btn-container.dejar-seguir {
    background-color: #ff4c4c;
  }
  
  .follow-btn-container:hover {
    transform: scale(1.1);
  }
  
  /* Resto de estilos */
  .dashboard-container {
    width: 100%;
    margin: 0 auto;
  }
  
  .loading-text,
  .no-posts {
    text-align: center;
    color: #888;
  }
  
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;
    margin-right: 44%;
    margin-top: 4%;
  }
  
  .post-card {
    width: 95%;
    height: 420px;
    background-color: rgba(212, 212, 212, 0.295);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.233);
    border-radius: 15px;
    margin-bottom: 15%;
  }
  
  .post-header {
    display: flex;
    align-items: center;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    margin-top: -35px;
    margin-left: -30px;
  }
  
  .profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    margin-right: 5px;
  }
  
  .post-content p {
    padding: 20px;
  }
  
  .post-content img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: -15px;
  }
  
  .username {
    font-size: 16px;
    color: #019999;
  }
  
  .post-image {
    width: 100%;
    height: auto;
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
    padding: 10px;
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
  </style>
  