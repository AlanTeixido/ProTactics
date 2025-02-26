<template>
  <HeaderSection />
  <div class="profile-container">
    <div class="profile-card1">
      <!-- Sección de Foto, Nombre, Email y Botón -->
      <div class="profile-header">
        <img src="../assets/img/usuario.png" class="img-profile" />
        <h2 class="username">{{ user.username }}</h2>
        <p class="email">{{ user.email }}</p>
        <button class="profile-btn" @click="$router.push('/editar')">
          Editar Perfil
        </button>
      </div>
    </div>

    <div class="profile-card2">
      <!-- Sección de estadísticas (Seguidores, Entrenamientos, Likes, Compartidos) -->
      <div class="profile-stats">
        <div class="stat-box">
          <span>{{ user.shared }}</span>
          <strong>Publicaciones</strong>
        </div>
        <div class="stat-box">
          <span>{{ user.followers }}</span>
          <strong>Seguidores</strong>
        </div>
        <div class="stat-box">
          <span>{{ user.trainings }}</span>
          <strong>Entrenamientos</strong>
        </div>
      </div>
    </div>
  </div>

  <!-- Sección de slider -->
  <div class="profile-slider">
    <div class="profile-slider-option" :class="{ active: isProfileSelected, faded: !isProfileSelected }"
      @click="isProfileSelected = true">
      <span class="slider-text">Mi perfil</span>
    </div>
    <div class="profile-slider-option" :class="{ active: !isProfileSelected, faded: isProfileSelected }"
      @click="isProfileSelected = false">
      <span class="slider-text">Mis entrenamientos</span>
    </div>
  </div>

  <!-- Mostrar contenido según el slider -->
  <div class="slider-content">
    <div v-if="isProfileSelected">
      <!-- Mostrar posts solo si el usuario está autenticado -->
      <Posts v-if="user.id" :userId="user.id" mode="profile" />
    </div>
    <div v-else class="trainings-content">
      <Entrenamientos />
    </div>
  </div>
  <FooterSection />
</template>

<script setup>
import FooterSection from "@/components/FooterSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import Posts from "@/components/Posts.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import Entrenamientos from "@/components/Entrenamientos.vue";

const user = ref({
  id: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "Usuario",
  email: localStorage.getItem("userEmail") || "",
  publications: 0,
  shared: 0,
  followers: 0,
});

// Estado para controlar el contenido seleccionado
const isProfileSelected = ref(true); // "true" para mostrar el perfil por defecto

// Cargar datos del usuario desde la API
const loadUserData = async () => {
  if (!user.value.id) return;

  try {
    const response = await axios.get(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}`
    );
    user.value.trainings = response.data.trainings || 0;
    user.value.shared = response.data.shared || 0;
    user.value.likes = response.data.likes || 0;
    user.value.followers = response.data.followers || 0;
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
};

// Cargar datos al montar el componente
onMounted(loadUserData);
</script>

<style scoped>
/* Contenedor principal */
.profile-container {
  display: flex;
  justify-content: center;
  margin-top: 10%;
  padding-bottom: 3%;
  margin-left: 10%;
  margin-right: 10%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Tarjeta de perfil */
.profile-card1 {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.img-profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.username {
  font-size: 24px;
  color: white;
  text-transform: uppercase;
  margin: 10px 0;
}

.email {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 15px;
}

.profile-btn {
  padding: 10px 20px;
  background-color: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.747);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.profile-btn:hover {
  transform: scale(1.1);
}

/* Estilo para las estadísticas */
.profile-card2 {
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: top;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  width: 65%;
  margin-top: 20px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.stat-box span {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.stat-box strong {
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
}

/* Sección del slider */
.profile-slider {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.profile-slider-option {
  flex: 1;
  text-align: center;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
}

.profile-slider-option.active {
  font-weight: bolder;
}

.profile-slider-option .slider-text {
  transition: opacity 0.3s;
}

.profile-slider-option.faded .slider-text {
  opacity: 0.3;
}

/* Contenido del slider */
.slider-content {
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  color: white;
}

</style>
