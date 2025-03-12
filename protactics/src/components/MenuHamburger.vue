<template>
  <header class="dashboard-header">
    <!-- Menú Hamburguesa -->
    <div class="hamburger-wrapper">
      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </div>

    <!-- Overlay -->
    <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

    <!-- Menú lateral -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="mobile-menu">
        <RouterLink @click="closeMenu" to="/dashboard" class="mobile-link">🏠 DASHBOARD</RouterLink>
        <RouterLink @click="closeMenu" to="/perfil" class="mobile-link">👤 PERFIL</RouterLink>

        <!-- Submenú Deportes con apertura por hover -->
        <div class="submenu-wrapper" @mouseenter="isSubmenuOpen = true" @mouseleave="isSubmenuOpen = false">
          <div class="submenu-title">🏅 DEPORTES ▸</div>
          <transition name="fade">
            <div v-if="isSubmenuOpen" class="submenu">
              <RouterLink @click="closeMenu" to="/deportes/futbol" class="submenu-link">⚽ Fútbol</RouterLink>
              <RouterLink @click="closeMenu" to="/deportes/baloncesto" class="submenu-link">🏀 Baloncesto</RouterLink>
              <RouterLink @click="closeMenu" to="/deportes/running" class="submenu-link">🏃 Running</RouterLink>
            </div>
          </transition>
        </div>

        <RouterLink @click="closeMenu" to="/dragg" class="mobile-link">📝 PIZARRA</RouterLink>
        <a @click="logout" class="mobile-link logout-link">🚪 SALIR</a>
      </div>
    </transition>

    <!-- Perfil y controles -->
    <div class="user-controls">
      <div class="dropdown">
        <button @click="toggleDropdown" class="dropdown-btn" :class="{ rotated: isDropdownOpen }">+</button>
        <transition name="fade">
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <RouterLink to="/deportes" class="dropdown-item">🏋️ Crear Entrenamiento</RouterLink>
            <RouterLink to="/crear-post" class="dropdown-item">📝 Crear Post</RouterLink>
          </div>
        </transition>
      </div>

      <RouterLink to="/perfil">
        <img class="profile-pic" :src="userPic" alt="Foto de perfil" />
      </RouterLink>

      <img @click="logout" src="../assets/img/logout.png" class="logout-logo">
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const isMenuOpen = ref(false);
const isSubmenuOpen = ref(false);
const isDropdownOpen = ref(false);
const userPic = ref('https://via.placeholder.com/100');
const router = useRouter();

const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
const closeMenu = () => {
  isMenuOpen.value = false;
  isSubmenuOpen.value = false;
};
const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;

const logout = () => {
  localStorage.clear();
  router.push('/');
  setTimeout(() => window.location.reload(), 500);
};

const fetchProfilePic = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  try {
    const response = await axios.get(`https://protactics-api.onrender.com/usuarios/${userId}`);
    if (response.data.foto_url) {
      userPic.value = `https://protactics-api.onrender.com${response.data.foto_url}`;
    }
  } catch (error) {
    console.error('Error al obtener la foto de perfil:', error);
  }
};

onMounted(fetchProfilePic);
</script>

<style scoped>
/*.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1b1b;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}

.hamburger-wrapper {
  display: flex;
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  background: white;
  width: 30px;
  height: 3px;
  transition: 0.3s;
}

.hamburger .open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger .open:nth-child(2) {
  opacity: 0;
}

.hamburger .open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #121212;
  padding-top: 60px;
  z-index: 9999;
}

.mobile-link, .submenu-title {
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s;
}

.mobile-link:hover, .submenu-title:hover {
  background: #0098e5;
}

.logout-link {
  background: #d9534f;
}

.logout-link:hover {
  background: #c9302c;
}


.submenu-wrapper {
  position: relative;
}

.submenu {
  background: #292929;
  position: absolute;
  top: 0;
  left: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.submenu-link {
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  background: #1f1f1f;
}

.submenu-link:hover {
  background: #00a86b;
}


.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


.user-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-pic {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.logout-logo {
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-logo:hover {
  transform: scale(1.1);
}*/
</style>
