<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-content">
      <div class="profile-container">
        <!-- Tarjeta de usuario -->
        <div class="profile-card1">
          <div class="profile-header">
            <img src="../assets/img/usuario.png" class="img-profile" />
            <h2 class="username">{{ user.username }}</h2>
            <p class="rol">{{ user.rol }}</p>
            <p class="email">{{ user.email || 'Sense correu' }}</p>
            <button class="profile-btn" @click="$router.push('/editar')">
              Editar Perfil
            </button>
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="profile-card2">
          <div class="profile-stats">
            <div v-if="user.rol === 'club'" class="stat-box">
              <span>{{ user.entrenadors }}</span>
              <strong>Entrenadors</strong>
            </div>
            <div class="stat-box">
              <span>{{ user.shared }}</span>
              <strong>Publicacions</strong>
            </div>
            <div v-if="user.rol === 'entrenador'" class="stat-box">
              <span>{{ user.trainings }}</span>
              <strong>Entrenaments</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegació per rols -->
      <div class="profile-slider" v-if="user.rol === 'entrenador'">
        <div class="profile-slider-option" :class="{ active: isProfileSelected, faded: !isProfileSelected }"
          @click="isProfileSelected = true">
          <span class="slider-text">Mi perfil</span>
        </div>
        <div class="profile-slider-option" :class="{ active: !isProfileSelected, faded: isProfileSelected }"
          @click="isProfileSelected = false">
          <span class="slider-text">Mis entrenamientos</span>
        </div>
      </div>

      <div class="slider-content">
        <div v-if="user.rol === 'entrenador'">
          <div v-if="isProfileSelected">
            <Posts v-if="user.id" :userId="user.id" mode="profile" />
          </div>
          <div v-else class="trainings-content">
            <Entrenamientos />
          </div>
        </div>
        <div v-else>
          <p style="text-align: center; margin-top: 40px; font-weight: 500;">
            Ets un club. Pots gestionar entrenadors i crear contingut.
          </p>
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
  email: localStorage.getItem("email") || "",
  rol: localStorage.getItem("userRol") || "desconegut",
  shared: 0,
  trainings: 0,
  entrenadors: 0,
});

const isProfileSelected = ref(true);

const loadUserData = async () => {
  if (!user.value.id) return;
  try {
    const response = await axios.get(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}/resumen?rol=${user.value.rol}`
    );
    user.value.trainings = response.data.trainings || 0;
    user.value.shared = response.data.shared || 0;
    user.value.entrenadors = response.data.entrenadores || 0;
  } catch (error) {
    console.error("Error cargant dades:", error);
  }
};

onMounted(loadUserData);
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
  padding: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
}

.profile-card1 {
  background-color: #1e293b;
  padding: 30px 20px;
  border-radius: 15px;
  width: 300px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.img-profile {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
}

.username {
  font-size: 1.5rem;
  margin-bottom: 6px;
}

.rol {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-bottom: 4px;
  font-style: italic;
}

.email {
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-bottom: 16px;
}

.profile-btn {
  background-color: transparent;
  border: 2px solid #cbd5e1;
  padding: 10px 20px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.profile-btn:hover {
  transform: scale(1.05);
}

.profile-card2 {
  flex: 1;
  background-color: #1e293b;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
}

.profile-stats {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-box {
  text-align: center;
}

.stat-box span {
  font-size: 1.8rem;
  font-weight: bold;
  color: #22d3ee;
}

.stat-box strong {
  display: block;
  font-size: 0.9rem;
  margin-top: 6px;
  color: #e2e8f0;
}

.profile-slider {
  display: flex;
  justify-content: center;
  gap: 50px;
  border-top: 1px solid #ffffff22;
  padding-top: 25px;
}

.profile-slider-option {
  cursor: pointer;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #e2e8f0;
  transition: opacity 0.3s ease;
}

.profile-slider-option.faded {
  opacity: 0.3;
}

.slider-content {
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid #ffffff22;
}

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
    padding: 20px;
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
    flex-direction: column;
    gap: 20px;
  }
}
</style>
