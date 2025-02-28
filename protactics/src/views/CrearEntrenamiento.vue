<template>
  <HeaderSection />
  <div class="container">
    <h1 class="title">Entrenamiento de {{ nombreDeporte }}</h1>

    <form @submit.prevent="enviarFormulario" class="form">
      <!-- Nombre del entrenamiento -->
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" placeholder="Nombre del entrenamiento" v-model="formulario.nombre" required />
      </div>
      <!-- Descripción -->
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" placeholder="Descripción del entrenamiento" v-model="formulario.descripcion"
          required></textarea>
      </div>
      <!-- Duración -->
      <div class="form-group">
        <label for="duracion">Duración (minutos)</label>
        <input type="number" id="duracion" v-model="formulario.duracion" required min="1" />
      </div>
      <!-- Fecha -->
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" id="fecha" v-model="formulario.fecha" required />
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
        <label for="tipo">Tipo</label>
        <input type="text" id="tipo" v-model="formulario.tipo" />
        <label for="musculos">Músculos</label>
        <textarea id="musculos" v-model="formulario.musculos"></textarea>
      </div>

      <div v-if="nombreDeporte === 'ciclismo'" class="form-group">
        <label for="velocidad">Velocidad Promedio (km/h)</label>
        <input type="number" id="velocidad" v-model="formulario.velocidad" min="0" step="0.1" />
        <label for="potencia">Potencia Media (W)</label>
        <input type="number" id="potencia" v-model="formulario.potencia" />
        <label for="cadencia">Cadencia</label>
        <input type="number" id="cadencia" v-model="formulario.cadencia" step="0.1" />
        <label for="velocidad_maxima">Velocidad Máxima (km/h)</label>
        <input type="number" id="velocidad_maxima" v-model="formulario.velocidad_maxima" step="0.1" />
      </div>

      <div v-if="nombreDeporte === 'futbol'" class="form-group">
        <label for="tipo">Tipo</label>
        <input type="text" id="tipo" v-model="formulario.tipo" />
        <label for="posicion">Posición</label>
        <input type="text" id="posicion" v-model="formulario.posicion" />
        <label for="goles">Goles</label>
        <input type="number" id="goles" v-model="formulario.goles" />
        <label for="asistencias">Asistencias</label>
        <input type="number" id="asistencias" v-model="formulario.asistencias" />
      </div>

      <div v-if="nombreDeporte === 'padel'" class="form-group">
        <label for="sets">Sets</label>
        <input type="number" id="sets" v-model="formulario.sets" />
        <label for="puntos_ganados">Puntos Ganados</label>
        <input type="number" id="puntos_ganados" v-model="formulario.puntos_ganados" />
        <label for="superficie">Superficie</label>
        <input type="text" id="superficie" v-model="formulario.superficie" />
      </div>

      <div v-if="nombreDeporte === 'piscina'" class="form-group">
        <label for="num_piscinas">Número de Piscinas</label>
        <input type="number" id="num_piscinas" v-model="formulario.num_piscinas" />
        <label for="tamano_piscina">Tamaño de la Piscina</label>
        <input type="text" id="tamano_piscina" v-model="formulario.tamano_piscina" />
        <label for="estilo">Estilo</label>
        <input type="text" id="estilo" v-model="formulario.estilo" />
      </div>

      <div v-if="nombreDeporte === 'running'" class="form-group">
        <label for="ritmo_medio">Ritmo Medio</label>
        <input type="text" id="ritmo_medio" v-model="formulario.ritmo_medio" />
        <label for="altimetria">Altimetría</label>
        <input type="text" id="altimetria" v-model="formulario.altimetria" />
        <label for="zancada_media">Zancada Media</label>
        <input type="text" id="zancada_media" v-model="formulario.zancada_media" />
      </div>

      <!-- Botón de envío -->
      <button type="submit" class="submit-btn">Guardar Entrenamiento</button>
    </form>
  </div>
  <FooterSection />
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import FooterSection from "@/components/FooterSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";

const route = useRoute();
const router = useRouter();

const nombreDeporte = computed(() => route.params.nombre); // Captura el tipo de deporte

const formulario = ref({
  nombre: "",
  descripcion: "",
  fecha: "",
  duracion: "",
  dificultad: "principiante",
  distancia: null,
  velocidad: null,
  potencia: null,
  cadencia: null,
  velocidad_maxima: null,
  tipo: "",
  posicion: "",
  goles: null,
  asistencias: null,
  sets: null,
  puntos_ganados: null,
  superficie: "",
  num_piscinas: null,
  tamano_piscina: "",
  estilo: "",
  ritmo_medio: "",
  altimetria: "",
  zancada_media: "",
});

// 🔹 Función para enviar datos al backend
const enviarFormulario = async () => {
  try {
    // Agregamos el tipo de deporte al objeto antes de enviarlo
    formulario.value.tipo_deporte = nombreDeporte.value;

    // Enviar datos con una petición POST
    await axios.post("http://localhost:4000/entrenamientos", formulario.value);

    alert("✅ Entrenamiento guardado correctamente.");
    router.push("/mis-entrenamientos"); // Redirigir a la lista de entrenamientos
  } catch (error) {
    console.error("❌ Error guardando el entrenamiento:", error);
    alert("⚠️ Hubo un problema al guardar el entrenamiento.");
  }
};
</script>
<style scoped>
/* Estilos generales */
.container {
  max-width: 800px;
  margin: 80px auto 20px;
  /* Espaciado para evitar que el header lo tape */
  padding: 20px;
  background: #1e1e1e;
  /* Fondo negro-gris oscuro */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #80e4d4;
  /* Azul celeste verdoso */
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #ccc;
  /* Gris claro */
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #555;
  /* Gris oscuro */
  border-radius: 5px;
  font-size: 16px;
  background: #2a2a2a;
  /* Fondo oscuro */
  color: #e0e0e0;
  /* Texto claro */
}

textarea {
  resize: vertical;
  min-height: 80px;
}

/* Botón */
.submit-btn {
  background: #80e4d4;
  /* Azul celeste verdoso */
  color: #1e1e1e;
  /* Texto oscuro */
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #5ec2b1;
  /* Un tono más oscuro del azul verdoso */
}

/* Ajuste para pantallas pequeñas */
@media (max-width: 600px) {
  .container {
    width: 90%;
    margin: 100px auto 20px;
  }
}
</style>