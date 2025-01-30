<template>
    <div class="register-container">
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
      <RouterLink to="/" class="back-home-btn">Volver al inicio</RouterLink>
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
  const router = useRouter();  // Usar para redirigir después de registrar
  
  // Función para registrar al usuario
  const register = async () => {
  // Verifica si las contraseñas coinciden
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {
    // Envía la solicitud de registro
    const response = await axios.post('https://protactics-api.onrender.com/usuarios', {
      nombre_usuario: username.value,
      correo: email.value,
      contrasena_hash: password.value,  // Enviar la contraseña sin encriptar, ya que lo hará el backend
      rol: 'usuario',  // Por defecto, el rol es 'usuario'
    });

    // Si el registro es exitoso
    alert('Registro exitoso');

    // Guardar datos de usuario en localStorage
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('username', response.data.nombre_usuario);
    localStorage.setItem('userEmail', response.data.correo);

    // Redirigir al perfil
    router.push('/perfil');
  } catch (error) {
    console.error('Error en el registro', error);
    alert('Error al registrarse');
  }
};

  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
    color: white;
  }
  
  .register-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #0098e5;
  }
  
  .register-form {
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
  
  .login-link {
    margin-top: 15px;
    color: #ccc;
  }
  
  .login-link .link {
    color: #0098e5;
    text-decoration: none;
  }
  
  .login-link .link:hover {
    text-decoration: underline;
  }
  
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
  