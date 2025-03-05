<template>
  <HeaderSection />
  <div class="container">
    
    <form @submit.prevent="enviarFormulario" class="form">
      <h1 class="title">Entrenamiento de {{ nombreDeporte }}</h1>

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" v-model="formulario.nombre" required />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea v-model="formulario.descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="objetivo">Objetivo</label>
        <textarea v-model="formulario.objetivo" required></textarea>
      </div>

      <div class="form-group">
        <label for="duracion">Duración</label>
        <input type="number" v-model="formulario.duracion" required min="1" placeholder="Minutos"/>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" v-model="formulario.fecha" required />
      </div>

      <div class="form-group">
        <label for="dificultad">Nivel de intensidad</label>
        <select v-model="formulario.dificultad">
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>

      <!-- Campos específicos según el deporte -->
      <div v-if="nombreDeporte === 'atletismo'" class="form-group">
        <label>Distancia (km)</label>
        <input type="number" v-model="detalles.distancia" min="0" step="0.1" />

        // Ritmo nuevo campo
        <!-- <label>Ritmo</label>
        <input type="number" v-model="detalles.ritmo" min="0" step="0.1" /> -->
      </div>

      <div v-if="nombreDeporte === 'gimnasio'" class="form-group">
        <label>Tipo</label>
        <input type="text" v-model="detalles.tipo" />
        <label>Músculos</label>
        <textarea v-model="detalles.musculos"></textarea>
      </div>

      <div v-if="nombreDeporte === 'ciclismo'" class="form-group">
        <label>Velocidad Promedio (km/h)</label>
        <input type="number" v-model="detalles.velocidad" />
        <label>Potencia Media (W)</label>
        <input type="number" v-model="detalles.potencia" />
        <label>Cadencia</label>
        <input type="number" v-model="detalles.cadencia" />
        <label>Velocidad Máxima (km/h)</label>
        <input type="number" v-model="detalles.velocidad_maxima" />
      </div>

      <div v-if="nombreDeporte === 'futbol'" class="form-group">
        <label>Tipo</label>
        <select v-model="detalles.tipo">
          <option value="amistoso">Futbol 7</option>
          <option value="entrenamiento">Futbol 11</option>
        </select>

        <label>Categoria de ejercicio</label>
        <select v-model="detalles.categoria">
          <option value="fuerza">Finalización</option>
          <option value="resistencia">Juegos de posición</option>
          <option value="velocidad">Calentamiento</option>
          <option value="flexibilidad">ABP</option>
        </select>
      </div>

      <div v-if="nombreDeporte === 'padel'" class="form-group">
        <label>Sets</label>
        <input type="number" v-model="detalles.sets" />
        <label>Puntos Ganados</label>
        <input type="number" v-model="detalles.puntos_ganados" />
        <label>Superficie</label>
        <input type="text" v-model="detalles.superficie" />
      </div>

      <div v-if="nombreDeporte === 'piscina'" class="form-group">
        <label>Número de Piscinas</label>
        <input type="number" v-model="detalles.num_piscinas" />
        <label>Tamaño de la Piscina</label>
        <input type="text" v-model="detalles.tamano_piscina" />
        <label>Estilo</label>
        <input type="text" v-model="detalles.estilo" />
      </div>

      <div v-if="nombreDeporte === 'running'" class="form-group">
        <label>Ritmo Medio</label>
        <input type="text" v-model="detalles.ritmo_medio" />
        <label>Altimetría</label>
        <input type="text" v-model="detalles.altimetria" />
        <label>Zancada Media</label>
        <input type="text" v-model="detalles.zancada_media" />
      </div>

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

const nombreDeporte = computed(() => route.params.nombre);

const formulario = ref({
  nombre: "",
  descripcion: "",
  fecha: "",
  duracion: "",
  dificultad: "principiante"
});

const detalles = ref({});

const enviarFormulario = async () => {
  try {
    const payload = {
      usuario_id: localStorage.getItem("userId"),
      titulo: formulario.value.nombre,
      descripcion: formulario.value.descripcion,
      inicio: formulario.value.fecha,
      duracion: formulario.value.duracion,  // ja el backend ho converteix a JSON
      visibilidad: 'privado',
      tipo_deporte: nombreDeporte.value,
      detalles: detalles.value
    };

    console.log("📤 Enviant entrenament:", payload);

    await axios.post("https://protactics-api.onrender.com/entrenamientos", payload);

    alert("✅ Entrenamiento guardado correctamente.");
    router.push("/mis-entrenamientos");
  } catch (error) {
    console.error("❌ Error guardando el entrenamiento:", error);
    alert("⚠️ Hubo un problema al guardar el entrenamiento.");
  }
};

</script>
<style scoped>
/* Estilos generales para la página de formulario de entrenamiento */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 100%;
}

.title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: 450;
  color: #fff;
  font-size: 1rem;
}

input, textarea, select {
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: #fff;
  font-size: 1rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1); /* Línea gris solo en la parte inferior */
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.336); /* Cambio de color al hacer foco */
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 15px;
  border-radius: 8px;
  background: #333;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #555;
}

.submit-btn {
  background: transparent;
  border: 2px white solid;
  margin-top: 20px;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  text-align: center;
}

.success-msg {
  color: green;
  font-size: 0.9rem;
  text-align: center;
}

/* Estilos específicos para campos del deporte */
.form-group input[type="number"], .form-group input[type="text"], .form-group select {
  width: 100%;
}

.form-group input[type="date"] {
  width: 100%;
}

.form-group textarea {
  width: 100%;
}

/* Campos específicos para cada deporte */
.form-group input[type="number"]:not([type="number"]:disabled) {
  max-width: 100%;
}

input[type="number"]:disabled {
  background-color: #f0f0f0;
}

/* Opcional: Si deseas aplicar algo diferente a los campos con información condicionada según deporte */
.form-group input, .form-group select {
  border: 2px solid #444;
  background-color: rgba(0, 0, 0, 0.3);
}

</style>


