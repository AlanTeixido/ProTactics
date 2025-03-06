<template>
    <header class="header">
      <nav class="nav-container">
        <!-- Menú principal (oculto en móviles) -->
        <div class="nav2">
          <RouterLink v-if="!isLoggedIn" to="/" class="nav-link">INICIO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/perfil" class="nav-link">PERFIL</RouterLink>
          <RouterLink v-if="!isLoggedIn" to="/contact" class="nav-link">CONTACTO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/deportes" class="nav-link">DEPORTES</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dragg" class="nav-link">PIZARRA</RouterLink>
          <RouterLink v-if="!isLoggedIn" to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink>
        </div>
      </nav>
  
      <!-- Logo central -->
      <div class="logo-container">
        <RouterLink to="/">
          <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
        </RouterLink>
      </div>
  
      <!-- Controles de usuario -->
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
  
        <!-- Menú Hamburguesa -->
        <button class="hamburger" @click="toggleMenu">
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
        </button>
      </div>
    </header>
  
    <!-- Menú lateral desplegable -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="mobile-menu">
        <RouterLink @click="toggleMenu" v-if="!isLoggedIn" to="/" class="mobile-link">INICIO</RouterLink>
        <RouterLink @click="toggleMenu" v-if="isLoggedIn" to="/dashboard" class="mobile-link">DASHBOARD</RouterLink>
        <RouterLink @click="toggleMenu" v-if="isLoggedIn" to="/perfil" class="mobile-link">PERFIL</RouterLink>
        <RouterLink @click="toggleMenu" v-if="!isLoggedIn" to="/contact" class="mobile-link">CONTACTO</RouterLink>
        <RouterLink @click="toggleMenu" v-if="isLoggedIn" to="/deportes" class="mobile-link">DEPORTES</RouterLink>
        <RouterLink @click="toggleMenu" v-if="isLoggedIn" to="/dragg" class="mobile-link">PIZARRA</RouterLink>
        <RouterLink @click="toggleMenu" v-if="!isLoggedIn" to="/about" class="mobile-link">SOBRE NOSOTROS</RouterLink>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
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
    setTimeout(() => window.location.reload(), 500);
  };
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  onMounted(() => {
    checkAuthStatus();
    if (isLoggedIn.value) fetchProfilePic();
  });
  </script>
  
  <style scoped>
  /* Estilos generales (mantenidos del header original) */
  
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1b1b1b;
    padding: 1%;
    position: fixed;
    top: 0;
    z-index: 100;
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
  }
  
  .log-regist {
    display: flex;
    align-items: center;
    margin-right: 5%;
  }
  
  /* Menú hamburguesa */
  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
  }
  
  .hamburger span {
    width: 30px;
    height: 4px;
    background: white;
    transition: 0.3s ease;
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
  
  /* Menú lateral */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
    background: #1b1b1b;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    z-index: 200;
  }
  
  .mobile-link {
    color: white;
    padding: 15px;
    text-decoration: none;
    width: 100%;
    text-align: center;
  }
  
  .mobile-link:hover {
    background: #0098e5;
  }
  
  /* Animación */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
  }
  
  .slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .nav2 {
      display: none;
    }
  
    .hamburger {
      display: flex;
    }
  }
  </style>
  