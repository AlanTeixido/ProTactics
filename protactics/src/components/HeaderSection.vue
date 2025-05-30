<template>
  <header class="header">
    <nav class="nav-container">
      <div class="menu-icon" @click="toggleMenu">
        <div class="bar" :class="{ 'open': isMenuOpen }"></div>
        <div class="bar" :class="{ 'open': isMenuOpen }"></div>
        <div class="bar" :class="{ 'open': isMenuOpen }"></div>
      </div>
      
      <div class="nav2" :class="{ 'open': isMenuOpen }">
        <RouterLink v-if="!isLoggedIn" to="/" class="nav-link">INICIO</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/perfil" class="nav-link">PERFIL</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/deportes" class="nav-link">DEPORTES</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/pizarra" class="nav-link">PIZARRA</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink>
      </div>
    </nav>

    <div class="logo-container">
      <RouterLink to="/">
        <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
      </RouterLink>
    </div>

    <div class="log-regist">
      <div v-if="isLoggedIn" class="user-info">
        <div class="dropdown">
          <button @click="toggleDropdown" class="dropdown-btn" :class="{ 'rotated': isDropdownOpen }">+</button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <RouterLink to="/deportes" class="dropdown-item">🏋️ Crear Entrenamiento</RouterLink>
              <RouterLink to="/crear-post" class="dropdown-item">📝 Crear Post</RouterLink>
            </div>
          </transition>
        </div>

        <RouterLink to="/perfil" class="profile-pic-link">
          <img class="profile-pic" :src="userPic" alt="Foto de perfil" />
        </RouterLink>

        <img @click="logout" src="../assets/img/logout.png" class="logout-logo">
      </div>

      <div v-if="!isLoggedIn" class="login-register">
        <RouterLink to="/login">
          <img src="../assets/img/enter.png" class="login-register-btn">
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoggedIn = ref(false);
const isDropdownOpen = ref(false);
const isMenuOpen = ref(false);
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

watch(isLoggedIn, (newValue) => {
  if (newValue) fetchProfilePic();
});

onMounted(() => {
  checkAuthStatus();
  if (isLoggedIn.value) fetchProfilePic();
});
</script>

<style scoped>

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1b1b1b;
  padding: 1%;
  top: 0;
  position: fixed;
  z-index: 100;
}

.nav-icon {
  width: 60px;
  height: 60px;
  transition: 0.3s;
}

.nav-icon:hover {
  transform: scale(1.1);
}

.profile-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.login-register-btn {
  width: 30px;
  height: 30px;
}

.login-register-btn:hover {
  transform: scale(1.1);
}


.nav-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.nav2 {
  display: flex;
  align-items: center;
  margin-left: 8%;
}

.nav-link {
  margin-left: 30px;
  text-decoration: none;
  color: white;
  transition: 0.3s ease;
}

.nav-link:hover {
  transform: scale(1.1);
  font-weight: bolder;
  color: transparent;
  background-image: linear-gradient(to right, #0098e5, #00a86b);
  background-clip: text;
  -webkit-background-clip: text;
}

.log-regist {
  display: flex;
  align-items: center;
  margin-right: 5%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-btn {
  width: 30px;
  height: 30px;
  font-size: 22px;
  color: white;
  background: none;
  border: 1px solid white;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.dropdown-btn.rotated {
  transform: rotate(45deg);
}

.dropdown-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Menú */
.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: #222;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 180px;
  display: flex;
  flex-direction: column;
  z-index: 200;
}

.dropdown-item {
  padding: 10px;
  text-align: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  background: linear-gradient(to right, #0098e5, #00a86b);
  border-radius: 6px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 10px rgba(0, 168, 107, 0.5);
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.logout-logo {
  width: 25px;
  height: 25px;
  transition: 0.3s;
}

.logout-logo:hover {
  transform: scale(1.1);
}

.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}
.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 30px;
  height: 4px;
  background-color: white;
  margin: 5px 0;
  transition: 0.3s;
}

.bar.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.bar.open:nth-child(2) {
  opacity: 0;
}

.bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.nav2 {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .menu-icon {
    display: flex;
  }

  .nav2 {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #1b1b1b;
    flex-direction: column;
    align-items: center;
    display: none;
  }

  .nav2.open {
    display: flex;
  }

  .nav-link {
    padding: 15px;
  }
}
</style>
