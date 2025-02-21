<template>
  <HeaderSection/>
  <div class="container">
    <h1 class="title">Entrenamiento de {{ nombreDeporte }}</h1>

    <form @submit.prevent="enviarFormulario" class="form">
      <!-- Nombre del entrenamiento -->
      <div class="form-group">
        <label for="nombre">Nombre del entrenamiento</label>
        <input type="text" id="nombre" v-model="formulario.nombre" required />
      </div>

      <!-- Fecha -->
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" id="fecha" v-model="formulario.fecha" required />
      </div>

      <!-- Duración -->
      <div class="form-group">
        <label for="duracion">Duración (minutos)</label>
        <input type="number" id="duracion" v-model="formulario.duracion" required min="1" />
      </div>

      <!-- Nivel de dificultad -->
      <div class="form-group">
        <label for="dificultad">Nivel de dificultad</label>
        <select id="dificultad" v-model="formulario.dificultad">
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>

      <!-- Campos específicos según el deporte -->
      <div v-if="nombreDeporte === 'atletismo'" class="form-group">
        <label for="distancia">Distancia (km)</label>
        <input type="number" id="distancia" v-model="formulario.distancia" min="0" step="0.1" />
      </div>

      <div v-if="nombreDeporte === 'gimnasio'" class="form-group">
        <label for="repeticiones">Repeticiones</label>
        <input type="number" id="repeticiones" v-model="formulario.repeticiones" min="1" />
      </div>

      <div v-if="nombreDeporte === 'ciclismo'" class="form-group">
        <label for="velocidad">Velocidad Promedio (km/h)</label>
        <input type="number" id="velocidad" v-model="formulario.velocidad" min="0" step="0.1" />
      </div>

      <!-- Botón de envío -->
      <button type="submit" class="submit-btn">Guardar Entrenamiento</button>
    </form>
  </div>
  <FooterSection/>
</template>

<script setup>
import FooterSection from '@/components/FooterSection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const nombreDeporte = route.params.nombre;

// Definir formulario con valores iniciales
const formulario = ref({
  nombre: '',
  fecha: '',
  duracion: '',
  dificultad: 'principiante',
  distancia: null,  // Para atletismo
  repeticiones: null, // Para gimnasio
  velocidad: null,  // Para ciclismo
});

// Simular envío (esto luego lo cambiarás por una llamada a la API)
const enviarFormulario = () => {
  console.log('Datos del entrenamiento:', formulario.value);
  alert(`Entrenamiento de ${nombreDeporte} guardado correctamente.`);
};
</script>

<style scoped>

/* Contenedor principal */
.container {
  width: 45%;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

/* Título */
.title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Formulario */
.form {
  display: flex;
  flex-direction: column;
}

/* Grupo de cada input */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Botón de envío */
.submit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
