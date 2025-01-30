<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const phone = ref('');
const subject = ref('');
const message = ref('');

const errors = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const validateForm = () => {
  errors.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  let isValid = true;

  if (name.value.length < 3) {
    errors.value.name = 'El nombre debe tener al menos 3 caracteres.';
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
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value
    });
  }
};
</script>

<template>
  <Header />
  <div class="contact-container">
    <h1>Contacto</h1>
    <form @submit.prevent="enviarDades">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="name" placeholder="Tu nombre" required />
        <p class="error" v-if="errors.name">{{ errors.name }}</p>
      </div>

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
        <label for="subject">Asunto</label>
        <select id="subject" v-model="subject">
          <option value="">Selecciona un asunto</option>
          <option value="consulta">Consulta</option>
          <option value="soporte">Soporte Técnico</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" v-model="message" placeholder="Escribe tu mensaje" required></textarea>
        <p class="error" v-if="errors.message">{{ errors.message }}</p>
      </div>

      <button type="submit">Enviar</button>
    </form>
  </div>
  <Footer />
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

input, textarea, select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: hsla(180, 100%, 35%, 1);;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(93, 238, 238);;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>


#d6d6d6