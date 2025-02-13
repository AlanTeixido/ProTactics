<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav">
        <RouterLink :to="`/`">
          <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
        </RouterLink>

        <div class="nav2">
          <RouterLink v-if="isLoggedOff" to="/" class="nav-link">INICIO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/perfil" class="nav-link">PERFIL</RouterLink>
          <RouterLink v-if="isLoggedOff" to="/contact" class="nav-link">CONTACTO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/deportes" class="nav-link">DEPORTES</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dragg" class="nav-link">DRAGG</RouterLink>
          <RouterLink v-if="isLoggedOff" to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink> 
        </div>

        <div class="log-regist">
          <!-- Si está loggeado -->
          <span class="welcome-message"></span>
          <div v-if="isLoggedIn" class="user-info">
            <RouterLink to="/perfil" class="profile-pic-link">
              <img class="profile-pic" src="../assets/img/usuario.png" alt="Foto de perfil" />
            </RouterLink>
            <button @click="logout" class="logout-btn">Cerrar Sesión</button>
          </div>

          <!-- Si NO está loggeado -->
          <div v-if="!isLoggedIn" class="login-register">
            <RouterLink to="/login" class="login-register-btn">Inicia Sesión</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Estado de autenticación
const isLoggedIn = ref(localStorage.getItem('authToken') !== null);
const isLoggedOff = ref(localStorage.getItem('authToken') == null);


const username = ref(localStorage.getItem('username') || 'Usuario');
const userPic = ref('https://via.placeholder.com/100'); // Imagen por defecto

// Obtener la foto de perfil desde la API
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

// Observar cambios en el localStorage y actualizar dinámicamente
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

// Función de logout
const logout = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  userPic.value = 'https://via.placeholder.com/100';
  router.push('/');
};

// Obtener la foto de perfil al cargar el componente
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
  justify-content: center;
  align-items: center;
  position: relative;

}
.nav {
  font-size: 100%;
  background-color: #1b1b1b;
  position: fixed; 
  top: 0;
  left: 50%;
  width: 60%;
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 5%;
  padding: 1.5rem;
  z-index: 1000;
  text-transform: none;
  transform: translateX(-50%); /* Centra el nav horizontalmente */
  margin-top: 2%;
  border-radius: 50px;
}
.nav2 a {
  padding: 10px 15px; /* Añadir padding a los enlaces */
  text-decoration: none;
  color: hsla(180, 100%, 35%, 1);
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194)); /* Degradado de azul a verde */
  background-clip: text; /* Aplica el degradado solo al texto */
  transition: 0.3s;
  font-weight: 500;
}
.nav2 a:hover {
  transform: scale(1.1);
  color: transparent;
  filter: brightness(1.2); 
  text-shadow: none;
}
.nav-icon {
  width: 50px;
  height: 50px;
  display: inline-block;
  transition: transform 0.3s;
}
.nav-icon:hover {
  transform: scale(1.1) rotateX(30deg) rotateY(15deg);
}
.nav-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.nav-wrapper {
  flex: 1;
  /* Ocupa todo el espacio disponible */
  display: flex;
  justify-content: center;
  /* Centra el menú */
}


.log-regist {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome-message {
  color: #0098e5;
  font-size: 1.1rem;
}

.profile-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 5px;
}

.logout-btn {
  border: 2px solid #e74c3c;
  color: #e74c3c;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  background-color: transparent;
}

.logout-btn:hover {
  transform: scale(1.1);
}

.login-register {
  display: flex;
  gap: 10px;
}

.login-register-btn {
  color: white;
  font-weight: 5000;
  text-decoration: none;
  background: transparent; /* Fondo transparente */
  padding: 10px 15px;
  border-radius: 10px;
  position: relative;
  transition: 0.3s;
  border: 2px solid transparent; /* Borde inicial transparente */
  background-clip: padding-box;
}

.login-register-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px; /* Grosor del borde */
  border-radius: 10px;
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194)); /* Degradado en el borde */
  -webkit-mask: 
    linear-gradient(white 0 0) content-box, 
    linear-gradient(white 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.login-register-btn:hover {
  transform: scale(1.05); /* Efecto de agrandado al pasar el mouse */
}
</style>