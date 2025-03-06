<template>
  <HeaderSection />
  <div class="container">
    <form @submit.prevent="enviarFormulario" class="form">
      <h1 class="title">Entrenamiento de {{ nombreDeporte }}</h1>

      <div class="form-group">
        <label>Nombre</label>
        <input type="text" v-model="formulario.nombre" required />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="formulario.descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label>Duración (minutos)</label>
        <input type="number" v-model="formulario.duracion" required min="1" />
      </div>

      <div class="form-group">
        <label>Fecha y Hora de Inicio</label>
        <input type="datetime-local" v-model="formulario.inicio" required />
      </div>

      <div class="form-group">
        <label>Visibilidad</label>
        <select v-model="formulario.visibilidad">
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>
      </div>

      <!-- Campos específicos por deporte -->
      <div v-if="nombreDeporte === 'ciclismo'">
        <label>Potencia Media (W)</label>
        <input type="number" v-model="detalles.potencia_media" />
        <label>Cadencia (rpm)</label>
        <input type="number" v-model="detalles.cadencia" />
        <label>Velocidad Máxima (km/h)</label>
        <input type="number" v-model="detalles.velocidad_maxima" />
      </div>

      <div v-if="nombreDeporte === 'piscina'">
        <label>Número de Piscinas</label>
        <input type="number" v-model="detalles.num_piscinas" />
        <label>Tamaño de Piscina</label>
        <input type="text" v-model="detalles.tamano_piscina" />
        <label>Estilo</label>
        <input type="text" v-model="detalles.estilo" />
      </div>

      <!-- Añade el resto de deportes igual... -->

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
  duracion: 60,
  inicio: "",
  visibilidad: "privado",
});

const detalles = ref({});

const enviarFormulario = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!authToken) {
      alert("⚠️ No hay token de autenticación. Por favor, inicia sesión nuevamente.");
      return;
    }

    const payload = {
      usuario_id: userId,
      titulo: formulario.value.nombre,
      descripcion: formulario.value.descripcion,
      tipo_deporte: nombreDeporte.value,
      duracion: { minutes: formulario.value.duracion },
      inicio: new Date(formulario.value.inicio).toISOString(),
      visibilidad: formulario.value.visibilidad,
      detalles: getDetallesEspecificos(),
    };

    console.log("📤 Enviando:", payload);

    await axios.post("https://protactics-api.onrender.com/entrenamientos", payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    alert("✅ Entrenamiento guardado correctamente.");
    router.push("/mis-entrenamientos");
  } catch (error) {
    console.error("❌ Error guardando el entrenamiento:", error.response?.data || error.message);
    alert("⚠️ Hubo un problema al guardar el entrenamiento.");
  }
};

const getDetallesEspecificos = () => {
  const tipo = nombreDeporte.value;
  const d = detalles.value;

  switch (tipo) {
    case "ciclismo":
      return {
        potencia_media: d.potencia_media,
        cadencia: d.cadencia,
        velocidad_maxima: d.velocidad_maxima
      };
    case "piscina":
      return {
        num_piscinas: d.num_piscinas,
        tamano_piscina: d.tamano_piscina,
        estilo: d.estilo
      };
    case "futbol":
      return {
        tipo: d.tipo,
        categoria: d.categoria,
        goles: d.goles || 0,
        asistencias: d.asistencias || 0
      };
    case "padel":
      return {
        sets: d.sets,
        puntos_ganados: d.puntos_ganados,
        superficie: d.superficie
      };
    case "atletismo":
      return {
        distancia: d.distancia
      };
    default:
      return {};  // En caso de deporte no contemplado (por seguridad)
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


