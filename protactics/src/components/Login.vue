<template>
    <div class="login-container">
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
      <RouterLink to="/" class="back-home-btn">Volver al inicio</RouterLink>  <!-- Botón de volver al inicio -->
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
      console.log('Datos de inicio de sesión:', { email: email.value, password: password.value });
      const response = await axios.post('https://protactics-api.onrender.com/auth/login', {
        correo: email.value,  // Cambié a 'correo' según el backend
        contrasena: password.value,  // Cambié a 'contrasena' según el backend
      });
  
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('username', response.data.nombre_usuario);
        localStorage.setItem('userEmail', response.data.correo);
        alert('Inicio de sesión exitoso');
        // Redirigir a la página de perfil del usuario después de iniciar sesión
        router.push('/perfil');  // O la ruta que desees redirigir, como '/dashboard' o '/usuario'
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Credenciales incorrectas');
    }
  };
  </script>
  
  <style scoped>
  /* El diseño y estilos permanecen igual que antes */
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
    color: white;
  }
  
  .login-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #0098e5;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  .input-field {
    padding: 12px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    background-color: #2a2a2a;
    color: white;
    transition: 0.3s;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #0098e5;
  }
  
  .submit-btn {
    background-color: #0098e5;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #0084c2;
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
    text-decoration: underline;
}
  /* Botón "Volver al inicio" */
  .back-home-btn {
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border-radius: 25px;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
  }
  
  .back-home-btn:hover {
    background-color: #0084c2;
    transform: translateY(-2px);
  }
  </style>
  