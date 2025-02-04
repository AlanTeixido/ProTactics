<template>
  <div class="login-container">
    <div class="intro-login">
      <RouterLink to="/" class="back-home-btn"><img src="../assets/img/logo.png" alt=""></RouterLink> <!-- Botón de volver al inicio -->
      <h1>&copy ProTactics</h1>
    </div>

    <div class="separator"></div>

    <div class="form-login">
      <h2 class="login-title">Iniciar sesión</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Correo Electrónico" required class="input-field" />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Contraseña" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Iniciar sesión</button>
      </form>
      <p class="register-link">
        ¿No tienes cuenta? <RouterLink to="/register" class="link">Regístrate</RouterLink>
      </p>
    </div>
    <img src="../assets/img/dispositivos.png" alt="" class="fondo-login">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();  // Hacemos uso de useRouter para la navegación programática

// Función para iniciar sesión
const login = async () => {
  try {
    console.log('Iniciant sessió amb:', { email: email.value, password: password.value });

    const response = await axios.post('https://protactics-api.onrender.com/auth/login', {
      correo: email.value,
      contrasena: password.value
    });

    console.log('Resposta del servidor:', response.data);  // 📌 Mira què retorna l'API

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);

      // ✅ Ara ho agafem de `response.data`
      localStorage.setItem('username', response.data.nombre_usuario);
      localStorage.setItem('userEmail', response.data.correo);
      localStorage.setItem('userId', response.data.id);

      alert('Sessió iniciada correctament');
      router.push('/perfil');
    }
  } catch (error) {
    console.error('Error en el login:', error);
    alert('Credencials incorrectes o error en el servidor.');
  }
};


</script>

<style scoped>
.fondo-login{
  position: absolute;
  filter: opacity(10%);
  z-index: -1;
  bottom: 2%;
}
.separator {
  width: 2px; /* Grosor de la línea */
  height: 70%; /* Altura de la línea (ajústala si es necesario) */
  background-color: rgba(255, 255, 255, 0.5); /* Color de la línea (blanco con transparencia) */
  border-radius: 10px; /* Bordes redondeados */
}

/* El diseño y estilos permanecen igual que antes */
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Ocupar toda la altura de la pantalla */
  gap: 5%;
  /* Espaciado entre los elementos */
  color: white;
}

.intro-login {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.intro-login h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: 4rem;
}

.intro-login img {
  width: 20%;
  margin-right: -75%;
}

.form-login {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  
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
  margin-top: 20px; /* Espacio arriba */
  width: 100%; /* Ajusta el tamaño según sea necesario */
  text-align: center;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194)); /* Degradado de azul a verde */
  transition: 0.3s;
}


.submit-btn:hover {
  transform: scale(1.1);
}

.register-link {
  margin-top: 15px;
  color: #ccc;
}

.register-link .link {
  color: #0098e5;
  text-decoration: none;
}

.register-link .link:hover {
  color: #ccc;
}


</style>