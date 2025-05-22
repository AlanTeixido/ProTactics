<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoggedIn = ref(false);
const isDropdownOpen = ref(false);

const userPic = ref('https://via.placeholder.com/100');

const checkAuthStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('authToken');
};

const fetchProfilePic = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  try {
    const response = await axios.get(`https://protactics-api.onrender.com/usuarios/${userId}`);
    if (response.data.foto_url) {
      userPic.value = `https://protactics-api.onrender.com${response.data.foto_url}`;
      localStorage.setItem('fotoUrl', userPic.value);
    }
  } catch (error) {
    console.error("Error al obtener la foto de perfil:", error);
  }
};

const logout = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  userPic.value = 'https://via.placeholder.com/100';
  router.push('/');
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

watch(isLoggedIn, (newValue) => {
  if (newValue) fetchProfilePic();
});

onMounted(() => {
  checkAuthStatus();
  if (isLoggedIn.value) fetchProfilePic();
});
</script>

<template>
  <div class="menu">
    <nav class="nav-container">
      <div class="nav-item">
        <RouterLink v-if="!isLoggedIn" to="/" class="nav-link">INICIO</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/entrenos" class="nav-link">ENTRENAMIENTOS</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/perfil-entrenador" class="nav-link">PERFIL</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/contact" class="nav-link">CONTACTO</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink>
      </div>
      <div v-if="isLoggedIn" class="avatar" @click="toggleDropdown">
        <img src="../assets/img/usuario.png" alt="Foto perfil" class="avatar-img" />
        <div v-if="isDropdownOpen" class="dropdown">
          <button class="dropdown-item" @click="logout">Cerrar sesión</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.menu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 10px;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
 
}

.nav-item {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: scale(1.1);
  font-weight: bolder;
  color: transparent;
  background-image: linear-gradient(to right, #0098e5, #00a86b);
  background-clip: text;
  -webkit-background-clip: text;
}

.avatar {
  position: relative;
  cursor: pointer;
}

.avatar-img {
  width: 25px;
  height: 25px;
  border-radius: 50px;
  object-fit: cover;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
}

.dropdown-item {
  padding: 10px 20px;
  background-color: white;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
  transition: 0.3s;
}

.dropdown-item:hover {
  background-color: #9b0101;
}
</style>
