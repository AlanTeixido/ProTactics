<template>
  <header class="header">
    <nav class="nav-container">
        <div class="nav2">
          <RouterLink v-if="isLoggedOff" to="/" class="nav-link">INICIO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/perfil" class="nav-link">PERFIL</RouterLink>
          <RouterLink v-if="isLoggedOff" to="/contact" class="nav-link">CONTACTO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/deportes" class="nav-link">DEPORTES</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dragg" class="nav-link">PIZARRA</RouterLink>
          <RouterLink v-if="isLoggedOff" to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink>
        </div>
    </nav>

    <div class="logo-container">
      <RouterLink :to="`/`">
            <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
          </RouterLink>

    </div>
    
    <div class="log-regist">
      <span class="welcome-message"></span>
      <div v-if="isLoggedIn" class="user-info">
        <RouterLink to="/perfil" class="profile-pic-link">
          <img class="profile-pic" src="../assets/img/usuario.png" alt="Foto de perfil" />
        </RouterLink>
        <button @click="logout" class="logout-btn">Cerrar Sesión</button>
      </div>

      <div v-if="!isLoggedIn" class="login-register">
        <RouterLink to="/login" class="login-register-btn">Inicia Sesión</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const isLoggedIn = ref(localStorage.getItem('authToken') !== null);
const isLoggedOff = ref(localStorage.getItem('authToken') == null);

const username = ref(localStorage.getItem('username') || 'Usuario');
const userPic = ref('https://via.placeholder.com/100');

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

watchEffect(() => {
  isLoggedIn.value = localStorage.getItem('authToken') !== null;
  username.value = localStorage.getItem('username') || 'Usuario';

  const storedPic = localStorage.getItem('fotoUrl');
  if (storedPic) {
    userPic.value = storedPic;
  } else {
    fetchProfilePic();
  }
});

const logout = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  userPic.value = 'https://via.placeholder.com/100';
  router.push('/');
};

onMounted(() => {
  if (isLoggedIn.value) {
    fetchProfilePic();
  }
});
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #1b1b1b;
  padding: 0.75%;
  top: 0;
  position: fixed;
  z-index: 100;
}
.nav-icon{
  width: 60px;
  height: 60px;
  margin-left: 5%;
  transition: 0.3s;
}
.nav-icon:hover {
  transform: scale(1.1);
}
.profile-pic{
  width: 30px;
  height: 30px;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.nav2 {
  display: flex;
  align-items: center;
  margin-left: 2%;
}
.nav-link {
  margin-left: 25px;
  text-decoration: none;
  color: white;
  transition: 0.4s ease;
}
.nav-link:hover {
  transform: scale(1.1);
}
.log-regist {
  display: flex;
  justify-content: space-between; /* Alinea los elementos a la derecha */
  align-items: center;
  width: 100%;
  margin-right: 5%; /* Espaciado a la derecha */
}
.login-register-btn {
  color: white;
  border: 2px solid white;
  padding: 0.5em;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 20px;
  transition: 0.3s ease;
}

.login-register-btn:hover {
  transform: scale(1.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  background-color: transparent;
  color: #ff0000;
  border: 2px solid #ff0000;
  padding: 0.5em;
  border-radius: 5px;
  transition: 0.3s;
}

.logout-btn:hover {
  transform: scale(1.1);
}

.logo-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>