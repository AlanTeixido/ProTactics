<template>
  <HeaderSection />
  <div class="container">
    <h1 class="title">Entrenamiento de {{ nombreDeporte }}</h1>

    <form @submit.prevent="enviarFormulario" class="form">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" v-model="formulario.nombre" required />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea v-model="formulario.descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="duracion">Duración (minutos)</label>
        <input type="number" v-model="formulario.duracion" required min="1" />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" v-model="formulario.fecha" required />
      </div>

      <div class="form-group">
        <label for="dificultad">Nivel de dificultad</label>
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
        <input type="text" v-model="detalles.tipo" />
        <label>Posición</label>
        <input type="text" v-model="detalles.posicion" />
        <label>Goles</label>
        <input type="number" v-model="detalles.goles" />
        <label>Asistencias</label>
        <input type="number" v-model="detalles.asistencias" />
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