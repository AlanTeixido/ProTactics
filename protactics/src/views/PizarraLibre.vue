<template>
  <RouterLink to="/dashboard" class="volver"><img src="../assets/img/izquierda.png" alt=""></RouterLink>

  <div class="contenedor">
    <!-- MENÚ LATERAL DERECHO -->
    <div class="menu-lateral">
      <div class="info-menu">
        <RouterLink :to="`/dashboard`"><img src="../assets/img/logo.png" class="logo"></RouterLink>
      </div>

      <button @click="() => addObject('pelota')"><img src="../assets/img/pelota.png" class="item-menu"></button>
      <button @click="() => addObject('cono')"><img src="../assets/img/cono.png" class="item-menu"></button>
    
      <!-- NUEVO: Jugador personalizado -->
      <input type="color" v-model="colorJugador" class="color-picker" title="Color jugador personalizado" />
      <button @click="addJugadorColorPersonalizado">
        <img src="../assets/img/jugador-de-futbol.png" class="item-menu" alt="Jugador personalizado">
      </button>

      <button @click="guardarPizarra"><img src="../assets/img/boton-guardar.png" class="item-menu"></button>
      <button @click="() => (items = [])"><img src="../assets/img/basura.png" class="item-menu"></button>
      <button @click="deshacer"><img src="../assets/img/deshacer.png" class="item-menu"></button>
      <button @click="toggleDibujo"><img src="../assets/img/lapiz.png" class="item-menu"></button>
      <button @click="clearCanvas"><img src="../assets/img/goma.png" class="item-menu"></button>
      <input type="color" v-model="colorDibujo" class="color-picker" />
      <input type="range" min="1" max="10" v-model="grosorDibujo" class="slider" />
      <button @click="guardarComoImagen"><img src="../assets/img/descargar.png" class="item-menu"></button>
      <button class="capture-btn" @click="capturarObjetos">
        <img src="../assets/img/pausa.png" class="item-menu">
        {{ isCaptured ? 'Editar' : 'Capturar' }}
      </button>
    </div>

    <!-- PIZARRA IZQUIERDA -->
    <div class="container">
      <div class="campo-libre" :style="{ backgroundImage: `url(${futbol})` }">
        <canvas ref="canvasRef" class="canvas-dibujo" />
        <div
          v-for="item in items"
          :key="item.id"
          class="fichas-wrapper"
          :style="{ left: item.x + 'px', top: item.y + 'px' }"
        >
          <div
            class="fichas"
            :class="[item.tipo, { disabled: isCaptured }]"
            @mousedown="(event) => startDrag(event, item)"
            @contextmenu.prevent="eliminarObjeto(item.id)"
            @dblclick="() => editarNombre(item)"
            :title="item.nombre"
          >
            <template v-if="item.tipo === 'pelota'">⚽</template>
            <template v-else-if="item.tipo === 'cono'">🔺</template>
            <template v-else-if="item.tipo === 'jugador'">
              <div
                :style="{
                  backgroundColor: item.color || '#ff8000',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                }"
              ></div>
            </template>
          </div>
          <div class="nombre-jugador"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import html2canvas from 'html2canvas';
import futbol from "@/assets/img/deportes/pistaFutbol.png";

const isCaptured = ref(false);
const items = ref([]);
const historial = ref([]);
const canvasRef = ref(null);
let nextId = 1000;

const isDrawing = ref(false);
let ctx = null;

const colorDibujo = ref('#000000');
const grosorDibujo = ref(3);
const colorJugador = ref('#ff8000'); // Jugador personalizado

const addObject = (tipo) => {
  historial.value.push(JSON.stringify(items.value));
  const nuevo = {
    id: nextId++,
    tipo,
    nombre: tipo.charAt(0).toUpperCase() + tipo.slice(1),
    x: window.innerWidth / 2 - 15,
    y: window.innerHeight / 2 - 15,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  };
  if (tipo === 'jugador') nuevo.color = '#ff8000'; // Default naranja
  items.value.push(nuevo);
};

const addJugadorColorPersonalizado = () => {
  historial.value.push(JSON.stringify(items.value));
  const nuevo = {
    id: nextId++,
    tipo: 'jugador',
    nombre: 'Jugador',
    x: window.innerWidth / 2 - 15,
    y: window.innerHeight / 2 - 15,
    color: colorJugador.value,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  };
  items.value.push(nuevo);
};

const eliminarObjeto = (id) => {
  historial.value.push(JSON.stringify(items.value));
  items.value = items.value.filter(item => item.id !== id);
};

const editarNombre = (item) => {
  const nuevo = prompt("Editar nombre del objeto:", item.nombre);
  if (nuevo !== null) item.nombre = nuevo;
};

const guardarPizarra = () => {
  localStorage.setItem('pizarraLibre', JSON.stringify(items.value));
};

const cargarPizarra = () => {
  const data = localStorage.getItem('pizarraLibre');
  if (data) {
    items.value = JSON.parse(data);
    nextId = Math.max(...items.value.map(i => i.id), nextId) + 1;
  }
};

const deshacer = () => {
  const anterior = historial.value.pop();
  if (anterior) {
    items.value = JSON.parse(anterior);
  }
};

const guardarComoImagen = () => {
  const container = document.querySelector('.campo-libre');
  html2canvas(container).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'pizarra.png';
    link.href = canvas.toDataURL();
    link.click();
  });
};

onMounted(() => {
  cargarPizarra();
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
});

const toggleDibujo = () => {
  canvasRef.value.style.pointerEvents =
    canvasRef.value.style.pointerEvents === 'none' ? 'auto' : 'none';
};

const startDraw = (e) => {
  if (canvasRef.value.style.pointerEvents === 'none') return;
  isDrawing.value = true;
  ctx.strokeStyle = colorDibujo.value;
  ctx.lineWidth = grosorDibujo.value;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};

const draw = (e) => {
  if (!isDrawing.value) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const endDraw = () => {
  if (isDrawing.value) {
    ctx.closePath();
    isDrawing.value = false;
  }
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
};

const startDrag = (event, item) => {
  if (isCaptured.value) return;

  item.isDragging = true;
  item.offsetX = event.clientX - item.x;
  item.offsetY = event.clientY - item.y;

  window.addEventListener('mousemove', (e) => onDrag(e, item));
  window.addEventListener('mouseup', () => stopDrag(item));
};

const onDrag = (event, item) => {
  if (!item.isDragging) return;
  item.x = event.clientX - item.offsetX;
  item.y = event.clientY - item.offsetY;
};

const stopDrag = (item) => {
  item.isDragging = false;
  window.removeEventListener('mousemove', (e) => onDrag(e, item));
  window.removeEventListener('mouseup', () => stopDrag(item));
};

const capturarObjetos = () => {
  isCaptured.value = !isCaptured.value;
};
</script>

<style scoped>
.volver {
  position: fixed;
  top: 20px;
  left: 20px;
  background: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-weight: bold;
  z-index: 999;
}
.volver img {
  width: 40px;
  height: 40px;
}

.contenedor {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.menu-lateral {
  width: 110px;
  background-color: rgb(0, 0, 0);
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 1001;
}

.menu-lateral button,
.menu-lateral input {
  width: 100%;
}

button {
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: transparent;
  transition: 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.05);
  color: white;
}

.container {
  flex: 1;
  height: 100%;
  position: relative;
}

.campo-libre {
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  position: relative;
  background-size: cover;
  background-position: center;
}

.canvas-dibujo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}

.fichas-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.fichas {
  width: 40px;
  height: 40px;
  font-size: 30px;
  font-weight: 550;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: grab;
  user-select: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: transparent;
}

.fichas:active {
  cursor: grabbing;
}

.fichas.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.nombre-jugador {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 800;
  color: #333;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.6);
}

.item-menu {
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
}

.slider {
  width: 100%;
  margin-top: 10px;
}

.info-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px rgba(255, 255, 255, 0.178) solid;
  margin-left: 5%;
  margin-right: 5%;
  padding: 30px;
}

.info-menu img {
  width: 35px;
}
</style>
