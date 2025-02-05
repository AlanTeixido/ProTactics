<script setup>
import FooterSection from '@/components/FooterSection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { ref } from 'vue';

const name = ref('');
const lastName = ref('');  // Añadido para el apellido
const email = ref('');
const phone = ref('');
const subject = ref('');
const message = ref('');

const errors = ref({
  name: '',
  lastName: '',  // Añadido para los errores del apellido
  email: '',
  phone: '',
  message: ''
});

const validateForm = () => {
  errors.value = {
    name: '',
    lastName: '',  // Añadido para el apellido
    email: '',
    phone: '',
    message: ''
  };

  let isValid = true;

  if (name.value.length < 3) {
    errors.value.name = 'El nombre debe tener al menos 3 caracteres.';
    isValid = false;
  }

  if (lastName.value.length < 3) {  // Validación para el apellido
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
      lastName: lastName.value,  // Añadido para el apellido
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value
    });
  }
};
</script>

<template>
  <HeaderSection />
  <div class="contact-container">
    <h1>Contacta con nosotros</h1>
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
      </div>

    </form>
  </div>
  <div class="asist">
    <h3>¿Tienes alguna duda o sugerencia? ¡Contáctanos!</h3>
    <div>
      <p>Habla con nuestro asistente</p>
      <p>Habla con nuestro asistenteñajsgajsdfgba jfhgañjkfhgñj gafhgñahgfañghjfg sjfgañjfgh</p>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped>
.contact-container {
  width: 35%;
  margin: 100px auto;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10%;
  margin-bottom: 10%;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group1-0 {
  display: flex;
  justify-content: space-between;
}

.form-group2-0 {
  width: 100%;
}

.form-group{
  margin: 5%;
}

form{
  margin: 15%;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: transparent;
  color: white;
}

button {
  padding: 10px 20px;
  background-color: hsla(180, 100%, 35%, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(93, 238, 238);
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}

.asist {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
  background-color: rgb(0, 0, 29);
}
</style>
