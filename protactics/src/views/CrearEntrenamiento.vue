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
      
      <!-- Baloncesto -->
      <div v-if="nombreDeporte === 'baloncesto'" class="futbol-grid">
        <label>Tipo</label>
        <select v-model="detalles.tipo">
            <option value="partido">Partido</option>
            <option value="entrenamiento">Entrenamiento</option>
        </select>
    
        <label>Posición</label>
        <input type="text" v-model="detalles.posicion" placeholder="Base, Escolta, etc." />
    
        <label>Puntos</label>
        <input type="number" v-model="detalles.puntos" />
    
        <label>Asistencias</label>
        <input type="number" v-model="detalles.asistencias" />
    
        <label>Rebotes</label>
        <input type="number" v-model="detalles.rebotes" />
    </div>
    

      <!-- Ciclismo -->
      <div v-if="nombreDeporte === 'ciclismo'">
        <label>Potencia Media (W)</label>
        <input type="number" v-model="detalles.potencia_media" />
        <label>Cadencia (rpm)</label>
        <input type="number" v-model="detalles.cadencia" />
        <label>Velocidad Máxima (km/h)</label>
        <input type="number" v-model="detalles.velocidad_maxima" />
      </div>

      <!-- Piscina -->
      <div v-if="nombreDeporte === 'piscina'">
        <label>Número de Piscinas</label>
        <input type="number" v-model="detalles.num_piscinas" />
        <label>Tamaño de Piscina</label>
        <input type="text" v-model="detalles.tamano_piscina" />
        <label>Estilo</label>
        <input type="text" v-model="detalles.estilo" />
      </div>

      <!-- Futbol -->
      <div v-if="nombreDeporte === 'futbol'">
        <label>Tipo</label>
        <select v-model="detalles.tipo">
          <option value="amistoso">Amistoso</option>
          <option value="entrenamiento">Entrenamiento</option>
        </select>

        <label>Posición</label>
        <input type="text" v-model="detalles.posicion" />

        <label>Goles</label>
        <input type="number" v-model="detalles.goles" />

        <label>Asistencias</label>
        <input type="number" v-model="detalles.asistencias" />
      </div>

      <!-- Atletismo -->
      <div v-if="nombreDeporte === 'atletismo'">
        <label>Distancia (km)</label>
        <input type="number" v-model="detalles.distancia" step="0.1" />
      </div>

      <!-- Padel -->
      <div v-if="nombreDeporte === 'padel'">
        <label>Sets</label>
        <input type="number" v-model="detalles.sets" />
        <label>Puntos Ganados</label>
        <input type="number" v-model="detalles.puntos_ganados" />
        <label>Superficie</label>
        <input type="text" v-model="detalles.superficie" />
      </div>

      <!-- Gimnasio -->
      <div v-if="nombreDeporte === 'gimnasio'">
        <label>Tipo de Ejercicio</label>
        <input type="text" v-model="detalles.tipo" />
        <label>Músculos Trabajados</label>
        <textarea v-model="detalles.musculos"></textarea>
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
import PizarraView from "./PizarraView.vue";
import Draggable from "@/components/Draggable.vue";

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
        posicion: d.posicion,
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
    case "gimnasio":
      return {
        tipo: d.tipo,
        musculos: d.musculos
      };
    default:
      return {};
  }
};
</script>



<style scoped>
/* Contenedor general */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 100%;
}

.title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;
}

/* Formulario */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-width: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Grupos de formulario */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Labels */
label {
  font-weight: 500;
  color: #fff;
  font-size: 1rem;
}

/* Inputs, selects y textarea */
input, textarea, select {
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s;
  width: 100%;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #fff;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

/* Botón submit */
button {
  padding: 15px;
  border-radius: 8px;
  background: #444;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #666;
}

.submit-btn {
  background: transparent;
  border: 2px solid white;
  margin-top: 20px;
  width: 100%;
  text-transform: uppercase;
}

/* Mensajes de error o éxito */
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

/* Inputs en línea para deportes */
.inline-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  align-items: center;
}

/* Ajuste de inputs específicos */
.form-group input[type="number"], 
.form-group input[type="text"], 
.form-group select {
  width: 100%;
  max-width: none;
}

.form-group input[type="datetime-local"] {
  width: 100%;
}

/* Estilo específico para el grid de futbol y otros deportes */
.futbol-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-items: center;
}

.futbol-grid label {
  grid-column: span 4;
  font-weight: bold;
  margin-top: 10px;
  color: #fff;
}

.futbol-grid input {
  text-align: center;
}

/* Para deportes con bloques verticales */
.block-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Modo oscuro */
input::placeholder, textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Añadir espacio al final */
.form {
  margin-bottom: 20px;
}
</style>



