<template>
  <div class="dashboard">
    <!-- Menú fijo a la izquierda -->
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <!-- Contenido principal -->
    <div class="dashboard-content">
      <div class="profile-container">
        <div class="profile-card1">
          <!-- Foto, Nombre, Email y Botón -->
          <div class="profile-header">
            <img src="../assets/img/usuario.png" class="img-profile" />
            <h2 class="username">{{ user.username }}</h2>
            <p class="email">{{ user.email }}</p>
            <button class="profile-btn" @click="$router.push('/editar')">
              Editar Perfil
            </button>
          </div>
        </div>

        <!-- Sección de estadísticas -->
        <div class="profile-card2">
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

      <!-- Slider de navegación -->
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

      <!-- Contenido dinámico -->
      <div class="slider-content">
        <div v-if="isProfileSelected">
          <Posts v-if="user.id" :userId="user.id" mode="profile" />
        </div>
        <div v-else class="trainings-content">
          <Entrenamientos />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MenuDashboard from "@/components/MenuDashboard.vue";

const user = ref({
  id: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "Usuario",
  email: localStorage.getItem("userEmail") || "",
  publications: 0,
  shared: 0,
  followers: 0,
  trainings: 0,
  likes: 0  // Reinserim likes
});

// Estado para controlar el contenido seleccionado
const isProfileSelected = ref(true);

// Cargar datos del usuario desde la API (resumen complet)
const loadUserData = async () => {
  if (!user.value.id) return;

  try {
    const response = await axios.get(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}/resumen`
    );
    user.value.trainings = response.data.trainings || 0;
    user.value.shared = response.data.shared || 0;
    user.value.likes = response.data.likes || 0; // Asegurem q carregui els likes
    user.value.followers = response.data.followers || 0;
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
};

onMounted(loadUserData);
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Contenedor principal */
.dashboard {
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
}

/* Menú a la izquierda fijo */
.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

/* Contenedor derecho (resto del contenido) */
.dashboard-content {
  flex: 1;
  margin-left: 250px; /* Para no solaparse con el menú */
  padding: 20px;
  overflow-y: auto;
}

/* Contenedor del perfil */
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 3%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 5%;
}

/* Tarjeta de perfil */
.profile-card1 {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: rgb(73, 73, 73);
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
  color: rgb(73, 73, 73);
  text-transform: uppercase;
  margin: 10px 0;
}

.email {
  font-size: 14px;
  color: rgb(73, 73, 73);
  margin-bottom: 15px;
}

.profile-btn {
  width: 150px;
  padding: 10px 20px;
  background-color: transparent;
  color: rgb(73, 73, 73);
  border: 2px solid rgba(73, 73, 73, 0.7);
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.profile-btn:hover {
  transform: scale(1.1);
}

/* Tarjeta de estadísticas */
.profile-card2 {
  width: 55%;
  display: flex;
  justify-content: center;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(73, 73, 73);
}

.stat-box span {
  font-size: 20px;
  font-weight: bold;
}

.stat-box strong {
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
}

/* Slider */
.profile-slider {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.profile-slider-option {
  text-align: center;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s;
  color: rgb(73, 73, 73);
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
  color: rgb(73, 73, 73);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-content {
    margin-left: 0;
  }

  .profile-container {
    flex-direction: column;
    align-items: center;
  }

  .profile-card1,
  .profile-card2 {
    width: 100%;
  }

  .profile-stats {
    width: 100%;
    justify-content: space-around;
  }
}
</style>
