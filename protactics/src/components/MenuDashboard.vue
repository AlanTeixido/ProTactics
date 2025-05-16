<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoggedIn = ref(false);
const userRole = ref(null);
const userPic = ref('https://via.placeholder.com/100');
const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
};

const checkAuthStatus = () => {
    isLoggedIn.value = !!localStorage.getItem('authToken');
    userRole.value = localStorage.getItem('userRol');
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
    userRole.value = null;
    userPic.value = 'https://via.placeholder.com/100';
    router.push('/');
    setTimeout(() => window.location.reload(), 500);
};

onMounted(() => {
    checkAuthStatus();
    if (isLoggedIn.value) fetchProfilePic();
});

const menuItems = computed(() => {
    if (!isLoggedIn.value) {
        return [
            { path: '/', label: 'INICIO' },
            { path: '/contact', label: 'CONTACTO' },
            { path: '/about', label: 'SOBRE NOSOTROS' }
        ];
    } else if (userRole.value === 'club') {
        return [
            { path: '/dashboard', label: 'DASHBOARD' },
            { path: '/entrenadores', label: 'ENTRENADORES' },
            { path: '/equipos', label: 'EQUIPOS' },
            { path: '/publicaciones', label: 'PUBLICACIONES' },
            { path: '/perfil-club', label: 'CLUB' }
        ];
    } else if (userRole.value === 'entrenador') {
        return [
            { path: '/dashboard', label: 'DASHBOARD' },
            { path: '/entrenos', label: 'ENTRENAMIENTOS' },
            { path: '/perfil-entrenador', label: 'PERFIL' },
            { path: '/publicaciones', label: 'PUBLICACIONES' },
            { path: '/chatbot', label: 'AYUDA' }
        ];
    }
    return [];
});
</script>


<template>
  <div>
    <!-- Botón hamburguesa solo en móvil -->
    <div class="hamburger" @click="toggleMobileMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- Menú lateral (desktop y móvil si abierto) -->
    <div class="menu" :class="{ open: showMobileMenu }">
      <div class="info-menu">
        <img src="../assets/img/logo.png" class="logo" />
      </div>

      <nav class="nav-container">
        <div class="nav-item">
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            @click="showMobileMenu = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>

      <div class="log-regist">
        <div v-if="isLoggedIn" class="user-info">
          <RouterLink
            :to="userRole === 'club' ? '/perfil-club' : '/perfil-entrenador'"
            class="profile-pic-link"
            @click="showMobileMenu = false"
          >
            <img :src="userPic" class="logo-perfil" />
          </RouterLink>
          <img @click="logout" src="../assets/img/logout.png" class="logout-logo" />
        </div>

        <div v-else class="login-register">
          <RouterLink to="/login" @click="showMobileMenu = false">
            <img src="../assets/img/enter.png" class="login-register-btn" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.menu {
  width: 250px;
  height: 100vh;
  background-color: #0b0f1a;
  filter: brightness(0.9);
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
}

.hamburger div {
  width: 25px;
  height: 1px;
  background-color: white;
  margin: 4px 0;
  transition: 0.4s;
}

@media (max-width: 768px) {
  .menu {
    transform: translateX(-100%);
  }

  .menu.open {
    transform: translateX(0);
  }

  .hamburger {
    display: flex;
  }
}

.nav-container {
  margin-top: 50%;
}

.info-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px rgba(255, 255, 255, 0.178) solid;
  margin-left: 5%;
  margin-right: 5%;
  padding: 30px;
}

.info-menu img {
  width: 35px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  margin: 15%;
}

.nav-link {
  color: white;
  margin-bottom: 15%;
  text-decoration: none;
  font-size: 15px;
  transition: 0.4s;
}

.nav-link:hover {
  transform: scale(1.1);
  font-weight: bolder;
  color: transparent;
  background-image: linear-gradient(to right, #0098e5, #00a86b);
  background-clip: text;
  -webkit-background-clip: text;
}

.user-info {
  margin-top: 100%;
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px rgba(255, 255, 255, 0.178) solid;
  padding: 5%;
  margin-left: 17%;
}

.logout-logo {
  width: 25px;
  transition: 0.5s ease;
  margin: 15px;
}

.logout-logo:hover {
  transform: scale(1.1);
}

.logo-perfil {
  width: 35px;
  height: 35px;
  border-radius: 50px;
}

</style>
