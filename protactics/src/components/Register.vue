<template>
  <div class="register-container">
    <div class="intro-register">
      <RouterLink to="/" class="back-home-btn">
        <img src="../assets/img/logo.png" alt="Logo">
      </RouterLink>
      <h1>&copy; ProTactics</h1>
    </div>

    <div class="separator"></div>

    <div class="form-register">
      <h2 class="register-title">Regístrate</h2>
      <form @submit.prevent="register" class="register-form">
        <div class="input-group">
          <input v-model="username" type="text" placeholder="Nombre de usuario" required class="input-field" />
        </div>
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Correo Electrónico" required class="input-field" />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Contraseña" required class="input-field" />
        </div>
        <div class="input-group">
          <input v-model="confirmPassword" type="password" placeholder="Confirmar Contraseña" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Registrarse</button>
      </form>
      <p class="login-link">
        ¿Ya tienes cuenta? <RouterLink to="/login" class="link">Inicia sesión</RouterLink>
      </p>
    </div>
    <img src="../assets/img/dispositivos.png" alt="" class="fondo-register">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

// Función para registrar al usuario
const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {
    // ✅ Llamada a la API para registrar al usuario
    await axios.post('https://protactics-api.onrender.com/auth/register', {
      nombre_usuario: username.value,
      correo: email.value,
      contrasena: password.value  // 🟢 Asegurando que coincida con el backend
    });

    alert('Registro exitoso');

    // Redirigir al login después del registro
    router.push('/login');

  } catch (error) {
    console.error('Error en el registro', error);
    alert(error.response?.data?.error || 'Error al registrarse');
  }
};
</script>


<style scoped>
.fondo-register {
  position: absolute;
  filter: opacity(10%);
  z-index: -1;
  bottom: 2%;
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

/* Estilos para el popup (si es necesario) */
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
}

.popup-content {
  background-color: #1b1b1b;
  padding: 5%;
  border-radius: 15px;
  text-align: center;
  color: white;
}

.popup-close {
  margin-top: 8%;
  padding: 10px;
  cursor: pointer;
  background: transparent;
  color: white;
  border: 2px white solid;
  border-radius: 5px;
  box-shadow: 15px rgba(0, 0, 0, 0.8);
  transition: 0.3s;
}

.popup-close:hover {
  transform: scale(1.1);
}
</style>