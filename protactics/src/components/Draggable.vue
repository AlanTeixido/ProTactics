<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';


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
// const imagenDeFondo = computed(() => imagenesDeporte[deporteSeleccionado] || "../assets/img/deportes/pistaFutbol.jpg");
const imagenDeFondo = computed(() => {
  const imagen = imagenesDeporte[deporteSeleccionado] || "../assets/img/deportes/pistaFutbol.jpg";
  console.log(imagen); // Verifica la ruta de la imagen
  return imagen;
});


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
  <div class="contenedor">

    <div class="menu">
      <MenuDashboard />
    </div>

    <div class="content">
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
  </div>
</template>

<style scoped>
/* Contenedor principal */
.contenedor {
  display: flex;
  background-color: #f3f3f3;
}

/* Menú a la izquierda fijo */
.menu {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 270px;
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
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 1px solid #000;
  margin-bottom: 10%;
  margin-top: 5%;
}

/* Estilo de los objetos draggeables */
.fichas {
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
