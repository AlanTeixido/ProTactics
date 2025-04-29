<template>
  <div class="register-container">
    <div class="intro-register">
      <RouterLink to="/" class="back-home-btn">
        <img src="/src/assets/img/logo.png" alt="Logo" />
      </RouterLink>
      <h1>&copy; ProTactics</h1>
    </div>

    <div class="separator"></div>

    <div class="form-register">
      <h2 class="register-title">Registro de Club</h2>
      <p class="register-subtitle">
        Crea el perfil oficial de tu club y comienza a gestionar entrenadores, jugadores y entrenamientos.
      </p>

      <form @submit.prevent="register" class="register-form">
        <div class="input-group">
          <label class="input-label">Nombre del Club</label>
          <input v-model="nombre" type="text" placeholder="Ej. FC Prat" required class="input-field" />
        </div>
        <div class="input-group">
          <label class="input-label">Correo Electrónico</label>
          <input v-model="correo" type="email" placeholder="correo@club.com" required class="input-field" />
        </div>
        <div class="input-group">
          <label class="input-label">Contraseña</label>
          <input v-model="password" type="password" placeholder="••••••••" required class="input-field" />
        </div>
        <div class="input-group">
          <label class="input-label">Confirmar Contraseña</label>
          <input v-model="confirmPassword" type="password" placeholder="••••••••" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Crear Club</button>
      </form>

      <p class="login-link">
        ¿Ya tienes cuenta? <RouterLink to="/login" class="link">Inicia sesión aquí</RouterLink>
      </p>
    </div>

    <img src="/src/assets/img/fondoLogReg.jpg" class="fondo-register" />

    <!-- POPUP -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content" :style="{ border: popupSuccess ? '2px solid #0f0' : '2px solid #f00' }">
        <p>{{ popupMessage }}</p>
        <button class="popup-close" @click="closePopup">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const nombre = ref('');
const correo = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

// Popup reactive state
const showPopup = ref(false);
const popupMessage = ref('');
const popupSuccess = ref(true);

const closePopup = () => {
  showPopup.value = false;
};

const register = async () => {
  if (password.value !== confirmPassword.value) {
    popupMessage.value = '❌ Las contraseñas no coinciden';
    popupSuccess.value = false;
    showPopup.value = true;
    return;
  }

  try {
    await axios.post('https://protactics-api.onrender.com/auth/register/club', {
      nombre: nombre.value,
      correo: correo.value,
      password: password.value
    });

    popupMessage.value = '✅ Registro de club exitoso';
    popupSuccess.value = true;
    showPopup.value = true;

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    popupMessage.value = error.response?.data?.error || 'Error en el registro';
    popupSuccess.value = false;
    showPopup.value = true;
  }
};
</script>

<style scoped>
.fondo-register {
  position: absolute;
  filter: opacity(10%);
  z-index: -1;
  bottom: 2%;
  object-fit: cover;
}

.separator {
  width: 2px;
  height: 70%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.register-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5%;
  color: white;
  overflow: hidden;
}

.intro-register {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.intro-register h1 {
  width: 100%;
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: 6rem;
}

.intro-register img {
  width: 35%;
  margin-right: -90%;
}

.form-register {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: 15%;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
}

.input-field {
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #2a2a2a;
  color: white;
  transition: 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #0098e5;
}

.submit-btn {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194));
  transition: 0.3s;
}

.submit-btn:hover {
  transform: scale(1.1);
}

.login-link {
  margin-top: 15px;
  color: #ccc;
}

.login-link .link {
  color: #0098e5;
  text-decoration: none;
}

.login-link .link:hover {
  color: #ccc;
}

.popup {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: #1b1b1b;
  padding: 5%;
  border-radius: 15px;
  text-align: center;
  color: white;
  max-width: 400px;
}

.popup-close {
  margin-top: 8%;
  padding: 10px 20px;
  cursor: pointer;
  background: transparent;
  color: white;
  border: 2px white solid;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  transition: 0.3s;
}

.popup-close:hover {
  transform: scale(1.1);
}

.register-subtitle {
  text-align: center;
  max-width: 400px;
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 30px;
}

.input-label {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 6px;
  padding-left: 4px;
}
</style>
