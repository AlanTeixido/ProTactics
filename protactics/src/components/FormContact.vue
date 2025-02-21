<template>
    <div class="contact-container">
      <h1>Contacta con nosotros</h1>
      <p>Rellena el siguiente formulario para ponerte en contacto con el grupo &copy; ProTactics.</p>
      <form @submit.prevent="enviarDades">
        <div class="form-group1-0">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" v-model="name" placeholder="Nombre" required />
            <p class="error" v-if="errors.name">{{ errors.name }}</p>
          </div>
  
          <div class="form-group">
            <label for="lastName">Apellido</label>
            <input type="text" id="lastName" v-model="lastName" placeholder="Apellido" required />
            <p class="error" v-if="errors.lastName">{{ errors.lastName }}</p>
          </div>
        </div>
  
        <div class="form-group2-0">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" placeholder="Tu correo" required />
            <p class="error" v-if="errors.email">{{ errors.email }}</p>
          </div>
  
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input type="text" id="phone" v-model="phone" placeholder="Tu teléfono" required />
            <p class="error" v-if="errors.phone">{{ errors.phone }}</p>
          </div>
  
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea id="message" v-model="message" placeholder="Escribe tu mensaje" required></textarea>
            <p class="error" v-if="errors.message">{{ errors.message }}</p>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import FooterSection from '@/components/FooterSection.vue';
  import HeaderSection from '@/components/HeaderSection.vue';
  import { ref } from 'vue';
  
  const name = ref('');
  const lastName = ref('');
  const email = ref('');
  const phone = ref('');
  const subject = ref('');
  const message = ref('');
  
  const errors = ref({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const validateForm = () => {
    errors.value = {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    };
  
    let isValid = true;
  
    if (name.value.length < 3) {
      errors.value.name = 'El nombre debe tener al menos 3 caracteres.';
      isValid = false;
    }
  
    if (lastName.value.length < 3) {
      errors.value.lastName = 'El apellido debe tener al menos 3 caracteres.';
      isValid = false;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.value.email = 'Introduce un correo electrónico válido.';
      isValid = false;
    }
  
    if (!/^\d{9,15}$/.test(phone.value)) {
      errors.value.phone = 'El teléfono debe tener entre 9 y 15 números.';
      isValid = false;
    }
  
    if (message.value.length < 10) {
      errors.value.message = 'El mensaje debe tener al menos 10 caracteres.';
      isValid = false;
    }
  
    return isValid;
  };
  
  const enviarDades = () => {
    if (validateForm()) {
      console.log('Formulario enviado', {
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value
      });
    }
  };
  </script>
  
  <style scoped>
  /* Estilos generales para centrar el formulario */
  .contact-container {
    width: 75%;
    margin: 0 auto;  /* Centra el formulario horizontalmente */
    padding: 15%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  /* Título principal */
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: white;
  }
  
  p{
    color: rgb(0, 204, 184);
  }
  
  /* Contenedor de los grupos de formulario (2 columnas) */
  .form-group1-0 {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  /* Contenedor de los grupos de formulario */
  .form-group2-0 {
    width: 207.5%;
    
  }
  
  
  /* Estilo para cada campo de formulario */
  .form-group {
    width: 48%; /* Hace que los campos estén alineados en 2 columnas */
    margin: 2% 0;
  }
  
  /* Formulario en general */
  form {
    width: 100%;
    margin: 2%;
  }
  
  /* Estilo de las etiquetas */
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 300;
    color: white;
  }
  
  /* Estilo para los inputs, textarea, y select */
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1.5px solid white;
    background-color: transparent;
    color: white;
    font-size: 1rem;
    box-sizing: border-box;
  }
  
  /* Estilo para el botón */
  button {
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
    text-transform: uppercase;
  }
  
  button:hover {
    background-color: rgb(93, 238, 238);
  }
  
  /* Estilo para los mensajes de error */
  .error {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  /* Estilo para el contenedor de asistencia */
  .asist-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10%;
    background-color: rgb(82, 82, 82);
  }
  
  /* Estilo para la imagen y el texto de asistencia */
  .asist {
    display: flex;
    align-items: center;
  }
  
  .asist img {
    width: 10%;
    margin-right: 10px;
  }
  </style>
  