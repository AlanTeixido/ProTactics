<script setup>
import { defineProps, ref, computed } from 'vue';
import { useRoute } from 'vue-router';


// Capturamos el deporte desde la URL
const route = useRoute();
const deporteSeleccionado = route.params.deporte;
console.log("Deporte seleccionado:", deporteSeleccionado);


// Mapeo de imágenes según el deporte
import futbol from "../assets/img/deportes/pistaFutbol.png";
import baloncesto from "../assets/img/deportes/pistaBaloncesto.jpg";
import padel from "../assets/img/deportes/pistaPadel.png";

const props = defineProps(['deporte']);

const imagenesDeporte = {
  futbol,
  baloncesto,
  padel,
};


// Computed para obtener la imagen correcta
// Obtener la imagen correspondiente
const imagenDeFondo = computed(() => imagenesDeporte[props.deporte] || futbol);



// Variable reactiva para bloquear/desbloquear el movimiento
const isCaptured = ref(false);

// Variable reactiva para la cantidad de objetos
const objetos = ref(8);

// Lista reactiva de objetos
const items = ref([]);

const generarObjetosDesdeJugadores = () => {
  const jugadores = JSON.parse(localStorage.getItem('jugadoresPizarra')) || [];

  items.value = jugadores.map((jugadorId, index) => ({
    id: jugadorId,
    x: 50 + index * 80,
    y: 600,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  }));
};

onMounted(() => {
  generarObjetosDesdeJugadores();
});



// Inicializamos la lista de objetos al cargar
generarObjetos();

// Función para iniciar el arrastre
const startDrag = (event, item) => {
  if (isCaptured.value) return; // Si está capturado, no se puede mover

  item.isDragging = true;
  item.offsetX = event.clientX - item.x;
  item.offsetY = event.clientY - item.y;

  // Se añaden eventos para mover y soltar el objeto
  window.addEventListener('mousemove', (e) => onDrag(e, item));
  window.addEventListener('mouseup', () => stopDrag(item));
};

// Función que actualiza la posición del objeto mientras se arrastra
const onDrag = (event, item) => {
  if (!item.isDragging) return;
  item.x = event.clientX - item.offsetX;
  item.y = event.clientY - item.offsetY;
};

// Función para soltar el objeto y remover los eventos
const stopDrag = (item) => {
  item.isDragging = false;
  window.removeEventListener('mousemove', (e) => onDrag(e, item));
  window.removeEventListener('mouseup', () => stopDrag(item));
};

// Alternar entre capturar/liberar los objetos
const capturarObjetos = () => {
  isCaptured.value = !isCaptured.value;
};

// Función para añadir un nuevo objeto
const añadirFichas = () => {
  if (!isCaptured.value) {
    objetos.value += 1;
    generarObjetos(); // Regeneramos la lista de objetos con el nuevo número
  }
};

// Función para eliminar un objeto
const eleiminarFichas = () => {
  if (!isCaptured.value && objetos.value > 1) {
    objetos.value -= 1;
    generarObjetos(); // Regeneramos la lista de objetos con el nuevo número
  }
};
</script>

<template>
  <div class="contenedor">
    <div>
      <!-- Botón Capturar -->
      <button class="capture-btn" @click="capturarObjetos">
        {{ isCaptured ? 'Editar' : 'Capturar' }}
      </button>
      <!-- Botón Objetos Nuevos -->
      <div class="objects-btn">
        <button @click="añadirFichas" :disabled="isCaptured">+</button>
        <button @click="eleiminarFichas" :disabled="isCaptured">-</button>
      </div>
    </div>

    <div class="container">
      <!-- Campo con imagen de fondo según el deporte seleccionado -->
      <div class="campo-deporte" :style="{ backgroundImage: `url(${imagenDeFondo})` }">
        <!-- Objetos Draggeables -->
        <div v-for="item in items" :key="item.id" class="fichas" :class="{ disabled: isCaptured }"
          :style="{ left: item.x + 'px', top: item.y + 'px' }" @mousedown="(event) => startDrag(event, item)">
          {{ item.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.contenedor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* Botones */
button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:  0.3s ease-in-out;
}

/* Botón Capturar */
.capture-btn {
  background-color: #ff6b6b;
  color: white;
}

.capture-btn:hover {
  background-color: #e63946;
}

/* Botones de añadir/eliminar objetos */
.objects-btn {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.objects-btn button {
  background-color: #4c6ef5;
  color: white;
}

.objects-btn button:hover {
  background-color: #364fc7;
}

.objects-btn button:disabled {
  background-color: #b0b3b8;
  cursor: not-allowed;
}

/* Contenedor del campo */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 800px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin-bottom: 5%;

}

/* Imagen de fondo */
.campo-deporte {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 12px;
  
}

/* Fichas Draggeables */
.fichas {
  width: 30px;
  height: 30px;
  background-color: #2d98da;
  color: white;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
  cursor: grab;
  user-select: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.fichas:active {
  cursor: grabbing;
}

.fichas.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>
