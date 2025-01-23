<script setup>
import Footer from '@/components/Footer.vue';
import Header1 from '@/components/Header1.vue';
import { ref } from 'vue';

// Definir variables reactivas si es necesario
const name = ref('');
const email = ref('');
const message = ref('');
const enviarDades = () => {
  console.log('Formulario enviado', { name: name.value, email: email.value, message: message.value });
};
</script>

<template>
    <Header1/>
  <div class="contact-container">
    <h1>Contacto</h1>
    <form @submit.prevent="enviarDades">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="name" placeholder="Tu nombre" required />
      </div>
      
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" placeholder="Tu correo" required />
      </div>
      
      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" v-model="message" placeholder="Escribe tu mensaje" required></textarea>
      </div>
      
      <button type="submit">Enviar</button>
    </form>
  </div>
  <Footer/>
</template>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
