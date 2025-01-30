<template>
    <div class="login-container">
      <h2 class="login-title">Iniciar sesión</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <input v-model="username" type="text" placeholder="Usuario" required class="input-field" />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Contraseña" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Iniciar sesión</button>
      </form>
      <p class="register-link">
        ¿No tienes cuenta? <RouterLink to="/register" class="link">Regístrate</RouterLink>
      </p>
      <RouterLink to="/" class="back-home-btn">Volver al inicio</RouterLink>  <!-- Mover al final y centrado -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const username = ref('');
  const password = ref('');
  
  // Función para iniciar sesión
  const login = async () => {
    try {
      const response = await axios.post('https://protactics-api.onrender.com/auth/login', {
        nombre_usuario: username.value,
        password: password.value,
      });
  
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        alert('Inicio de sesión exitoso');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Credenciales incorrectas');
    }
  };
  </script>
  
  <style scoped>
  /* Estilos generales del formulario de login */
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
  