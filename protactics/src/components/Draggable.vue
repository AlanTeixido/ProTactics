<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import HeaderSection from './HeaderSection.vue';
import FooterSection from './FooterSection.vue';

// Capturamos el deporte desde la URL
const route = useRoute();
const deporteSeleccionado = route.params.deporte;

// Mapeo de imágenes según el deporte
import futbol from "@/assets/img/deportes/pistaFutbol.jpg";
import baloncesto from "@/assets/img/deportes/pistaBasquet.jpg";
import padel from "@/assets/img/deportes/pistaPadel.jpg";
import gimnasio from "@/assets/img/deportes/salaFitness.jpg";
import ciclismo from "@/assets/img/deportes/pistaBici.jpg";
import atletismo from "@/assets/img/deportes/pistaAtletismo.jpg";
import MenuDashboard from './MenuDashboard.vue';


const imagenesDeporte = {
  futbol: futbol,
  baloncesto: baloncesto,
  padel: padel,
  gimnasio: gimnasio,
  ciclismo: ciclismo,
  atletismo: atletismo,
};


// Computed para obtener la imagen correcta
const imagenDeFondo = computed(() => imagenesDeporte[deporteSeleccionado] || "../assets/img/default.png");

// Variable reactiva para bloquear/desbloquear el movimiento
const isCaptured = ref(false);

// Variable reactiva para la cantidad de objetos
const objetos = ref(8);

// Lista reactiva de objetos
const items = ref([]);

// Función para generar la lista de objetos
const generarObjetos = () => {
  items.value = Array.from({ length: objetos.value }, (_, index) => ({
    id: index,
    x: 50 + index * 120, // Posición inicial horizontal
    y: 600, // Altura ajustada
    isDragging: false, 
    offsetX: 0, 
    offsetY: 0  
  }));
};

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
const nuevosObjetos = () => {
  if (!isCaptured.value) {
    objetos.value += 1;
    generarObjetos(); // Regeneramos la lista de objetos con el nuevo número
  }
};

// Función para eliminar un objeto
const eliminarObjetos = () => {
  if (!isCaptured.value && objetos.value > 1) {
    objetos.value -= 1;
    generarObjetos(); // Regeneramos la lista de objetos con el nuevo número
  }
};
</script>

<template>
  <MenuDashboard/>

  <div class="container">
    <h1>Pizarra - {{ deporteSeleccionado }}</h1>

    <!-- Botón Capturar -->
    <button class="capture-btn" @click="capturarObjetos">
      {{ isCaptured ? 'Editar' : 'Capturar' }}
    </button>

    <!-- Botón Objetos Nuevos -->
    <div class="objects-btn">
      <button @click="nuevosObjetos" :disabled="isCaptured">+</button>
      <button @click="eliminarObjetos" :disabled="isCaptured">-</button>
    </div>

    <!-- Campo con imagen de fondo según el deporte seleccionado -->
    <div class="campo-deporte" :style="{ backgroundImage: `url(${imagenDeFondo})` }">
      <!-- Objetos Draggeables -->
      <div
        v-for="item in items"
        :key="item.id"
        class="draggable"
        :class="{ disabled: isCaptured }"
        :style="{ left: item.x + 'px', top: item.y + 'px' }"
        @mousedown="(event) => startDrag(event, item)"
      >
        {{ item.id }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🔥 Ajustamos el contenedor */
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  padding-bottom: 50px;
}

/* Estilo del botón */
.capture-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ff5733;
  color: white;
  border: none;
  border-radius: 5px;
}

.capture-btn:hover {
  background-color: #e04a2b;
}

/* Estilo de los botones de añadir/eliminar objetos */
.objects-btn {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  width: 200px;
}

.objects-btn button {
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
}

.objects-btn button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Estilo de la cancha de deportes */
.campo-deporte {
  width: 1000px;
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid #000;
}

/* Estilo de los objetos draggeables */
.draggable {
  width: 80px;
  height: 80px;
  background-color: royalblue;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: grab;
  user-select: none;
  border-radius: 10px;
}

.draggable:active {
  cursor: grabbing;
}

.draggable.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
