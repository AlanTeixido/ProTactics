
<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuDashboard from "@/components/MenuDashboard.vue";

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

<template>
  <div class="create-training-container">
    <div>
      <MenuDashboard />
    </div>

    <div class="container">
      <form @submit.prevent="enviarFormulario" class="form">
        <h1 class="title">Entrenamiento de {{ nombreDeporte }}</h1>

        <div class="form-group">
          <input type="text" v-model="formulario.nombre" required placeholder="Nombre"/>
        </div>

        <div class="form-group">
          <textarea v-model="formulario.descripcion" required placeholder="Descripción"></textarea>
        </div>

        <div class="form-group">
          <label>Temps</label>
          <input type="number" v-model="formulario.duracion" required min="1" placeholder="Tiempo (min)"/>
        </div>

        <div class="form-group">
          <label>Fecha y hora de inicio</label>
          <input type="datetime-local" v-model="formulario.inicio" required />
        </div>

        <div class="form-group">
          <label>Visibilidad</label>
          <!-- Toggle Visibilidad -->
          <div class="toggle-container">
            <label class="switch">
              <input type="checkbox" v-model="formulario.visibilidad" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- Campos específicos por deporte -->

        <!-- Baloncesto -->
        <div v-if="nombreDeporte === 'baloncesto'" class="block-group">
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
        <div v-if="nombreDeporte === 'ciclismo'" class="block-group">
          <label>Potencia Media (W)</label>
          <input type="number" v-model="detalles.potencia_media" />
          <label>Cadencia (rpm)</label>
          <input type="number" v-model="detalles.cadencia" />
          <label>Velocidad Máxima (km/h)</label>
          <input type="number" v-model="detalles.velocidad_maxima" />
        </div>

        <!-- Piscina -->
        <div v-if="nombreDeporte === 'piscina'" class="block-group">
          <label>Número de Piscinas</label>
          <input type="number" v-model="detalles.num_piscinas" />
          <label>Tamaño de Piscina</label>
          <input type="text" v-model="detalles.tamano_piscina" />
          <label>Estilo</label>
          <input type="text" v-model="detalles.estilo" />
        </div>

        <!-- Futbol -->
        <div v-if="nombreDeporte === 'futbol'" class="block-group">
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
        <div v-if="nombreDeporte === 'atletismo'" class="block-group">
          <label>Distancia (km)</label>
          <input type="number" v-model="detalles.distancia" step="0.1" />
        </div>

        <!-- Padel -->
        <div v-if="nombreDeporte === 'padel'" class="block-group">
          <label>Sets</label>
          <input type="number" v-model="detalles.sets" />
          <label>Puntos Ganados</label>
          <input type="number" v-model="detalles.puntos_ganados" />
          <label>Superficie</label>
          <input type="text" v-model="detalles.superficie" />
        </div>

        <!-- Gimnasio -->
        <div v-if="nombreDeporte === 'gimnasio'" class="block-group">
          <label>Tipo de Ejercicio</label>
          <input type="text" v-model="detalles.tipo" />
          <label>Músculos Trabajados</label>
          <textarea v-model="detalles.musculos"></textarea>
        </div>

        <button type="submit" class="submit-btn">Guardar Entrenamiento</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.create-training-container {
  display: flex;
  background-color: #f3f3f3;
}
/* Contenedor general */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.title {
  font-size: 150%;
  color: #fff;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;
}

/* Formulario */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 35%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Grupos de formulario */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 5%;
}

/* Labels */
label {
  font-weight: 500;
  color: #fff;
  font-size: 1rem;
}

/* Inputs, selects y textarea */
input,
textarea{
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s;
  width: 100%;
}

select{
  width: 99%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #fff;
}

textarea {
  max-height: 95px;
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


/* Para deportes con bloques verticales */
.block-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.block-group input{
  width: 95%;
}


/* Modo oscuro */
input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Añadir espacio al final */
.form {
  margin-bottom: 20px;
}

/* Toggle */
/* Estilos del toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-container {
  display: flex;
  align-items: center;
}
</style>
