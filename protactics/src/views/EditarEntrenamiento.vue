<template>
  <div class="editar-container">
    <h2>Editar Entrenamiento</h2>

    <div v-if="loading" class="loading-text">
      <Loader/>
    </div>

    <form v-else @submit.prevent="guardarCambios">
      <div class="input-row">
        <label>Título:</label>
        <input v-model="entrenamiento.titulo" required />
      </div>

      <div class="input-row">
        <label>Deporte:</label>
        <select v-model="entrenamiento.tipo_deporte" @change="cargarDetalles">
          <option value="running">Running</option>
          <option value="ciclismo">Ciclismo</option>
          <option value="piscina">Natación</option>
          <option value="futbol">Fútbol</option>
          <option value="padel">Pádel</option>
          <option value="gimnasio">Gimnasio</option>
        </select>
      </div>

      <div class="input-row">
        <label>Duración (minutos):</label>
        <input v-model="entrenamiento.duracion.minutes" type="number" required />
      </div>

      <div class="input-row">
        <label>Distancia (km):</label>
        <input v-model="entrenamiento.distancia" type="number" />
      </div>

      <div class="input-row">
        <label>Calorías Quemadas:</label>
        <input v-model="entrenamiento.calorias_quemadas" type="number" />
      </div>

      <div class="input-row">
        <label>Inicio:</label>
        <input v-model="entrenamiento.inicio" type="datetime-local" required />
      </div>

      <div class="input-row">
        <label>Fin:</label>
        <input v-model="entrenamiento.fin" type="datetime-local" />
      </div>

      <div class="input-row">
        <label>Visibilidad:</label>
        <select v-model="entrenamiento.visibilidad">
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>
      </div>

      <!-- 🔹 Detalles específicos por deporte -->

      <template v-if="entrenamiento.tipo_deporte === 'piscina'">
        <div class="input-row">
          <label>Número de Piscinas:</label>
          <input v-model="detalles.num_piscinas" type="number" />
        </div>
        <div class="input-row">
          <label>Tamaño Piscina:</label>
          <input v-model="detalles.tamano_piscina" type="text" />
        </div>

        <div class="input-row">
          <label>Estilo:</label>
          <input v-model="detalles.estilo" type="text" />
        </div>
      </template>

      <template v-if="entrenamiento.tipo_deporte === 'futbol'">
        <div class="input-row">
          <label>Posición:</label>
          <input v-model="detalles.posicion" type="text" />
        </div>

        <div class="input-row">
          <label>Goles:</label>
          <input v-model="detalles.goles" type="number" />
        </div>
        <div class="input-row">
          <label>Asistencias:</label>
          <input v-model="detalles.asistencias" type="number" />
        </div>
      </template>

      <template v-if="entrenamiento.tipo_deporte === 'ciclismo'">
        <div class="input-row">
          <label>Potencia Media (W):</label>
          <input v-model="detalles.potencia_media" type="number" />
        </div>

        <div class="input-row">
          <label>Cadencia (rpm):</label>
          <input v-model="detalles.cadencia" type="number" />
        </div>

        <div class="input-row">
          <label>Velocidad Máxima (km/h):</label>
          <input v-model="detalles.velocidad_maxima" type="number" />
        </div>
      </template>

      <button type="submit" @click="guardarCambios">Guardar Cambios</button>
      <button type="button" @click="router.push('/mis-entrenamientos')" class="back-btn">Volver</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from '@/config';
import { useRoute, useRouter } from "vue-router";
import Loader from "../components/Loader.vue";

const route = useRoute();
const router = useRouter();
const entrenamiento = ref({});
const detalles = ref({});
const loading = ref(true);
const entrenamientoId = route.params.id;

// Carga los detalles específicos del deporte
const cargarEntrenamiento = async () => {
  try {
    const authToken = localStorage.getItem("authToken"); // 🔥 Obtén el token

    if (!authToken) {
      alert("⚠️ No hay token de autenticación. Por favor, inicia sesión nuevamente.");
      router.push("/login");
      return;
    }

    // 🛠️ PETICIÓ GET AMB TOKEN
    const response = await axios.get(
      `${API_URL}/entrenamientos/user/${localStorage.getItem("userId")}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // 🔥 Afegeix el token aquí
        },
      }
    );

    // 🔍 Busca l'entrenament per ID dins la llista
    entrenamiento.value = response.data.find((e) => e.id == entrenamientoId) || {};

    // Asegura que los detalles existen
    entrenamiento.value.detalles = entrenamiento.value.detalles || {};
  } catch (error) {
    console.error("❌ Error obteniendo entrenamiento:", error);
    alert("⚠️ No se pudo cargar el entrenamiento.");
    router.push("/mis-entrenamientos"); // Redirigir si no existe
  } finally {
    loading.value = false;
  }
};

// 🔹 Guardar cambios en el entrenamiento
const guardarCambios = async () => {
  try {
    const data = {
      ...entrenamiento.value,
      detalles: detalles.value,
    };
    await axios.put(`${API_URL}/entrenamientos/${entrenamientoId}`, data);
    alert("✅ Entrenamiento actualizado correctamente!");
    router.push("/mis-entrenamientos");
  } catch (error) {
    console.error("❌ Error guardando cambios:", error);
    alert("❌ Error guardando cambios.");
  }
};

onMounted(cargarEntrenamiento);
</script>

<style scoped>
/* Estilos para la edición de entrenamiento */
.editar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  padding-top: 5%;
  padding-bottom: 5%;
}

h2 {
  color: rgb(73, 73, 73);
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
}

form {
  margin-top: 5%;
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: 450;
  color: rgb(73, 73, 73);
  width: 40%;
}

input,
select {
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgba(73, 73, 73, 0.267);
  background-color: transparent;
  color: #8b8b8b;
  font-size: 1rem;
  width: 55%;
}

input:focus,
select:focus {
  outline: none;
  border-bottom: 2px solid rgb(73, 73, 73);
}

button {
  padding: 10px;
  border-radius: 8px;
  background-color: transparent;
  color: rgb(73, 73, 73);
  border: 2px solid rgb(73, 73, 73);
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
}

.back-btn {
  background: transparent;
  border: 2px red solid;
  margin-top: 20px;
  color: red;
}

.back-btn:hover {
  background: rgba(255, 0, 0, 0.288);
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

/* Específicos por deporte */
input[type="number"],
input[type="datetime-local"],
select {
  width: 100%;
}

input[type="text"] {
  width: 100%;
}

input[type="number"]:focus,
input[type="text"]:focus {
  outline: none;
  border-bottom: 2px solid rgb(73, 73, 73);
}
</style>
