// PizarraLibre.vue
<template>
  <RouterLink to="/dashboard" class="volver">🔙 Volver</RouterLink>

  <div class="contenedor">
    <div class="menu-bottom">
      <button @click="() => addObject('pelota')">⚽ Pelota</button>
      <button @click="() => addObject('cono')">🔺 Cono</button>
      <button @click="guardarPizarra">💾 Guardar</button>
      <button @click="() => (items = [])">🧹 Reset</button>
      <button @click="deshacer">↩️ Deshacer</button>
      <button @click="toggleDibujo">🖌️ Dibujo</button>
      <button @click="clearCanvas">🧽 Borrar dibujo</button>
      <button class="capture-btn" @click="capturarObjetos">
        {{ isCaptured ? 'Editar' : 'Capturar' }}
      </button>
    </div>

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
          </div>
          <div class="nombre-jugador">{{ item.nombre }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import futbol from "@/assets/img/deportes/pistaFutbol.png";

const isCaptured = ref(false);
const items = ref([]);
const historial = ref([]);
const canvasRef = ref(null);
let nextId = 1000;

const isDrawing = ref(false);
let ctx = null;

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
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
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
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-weight: bold;
  z-index: 999;
}

.contenedor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.menu-bottom {
  position: fixed;
  top: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #007bff;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: #ffffff;
  color: #007bff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

button:hover {
  background-color: #007bff;
  color: white;
}

.capture-btn {
  background-color: #ff6b6b;
  color: white;
  border: 2px solid #ff6b6b;
}

.capture-btn:hover {
  background-color: #e63946;
  border-color: #e63946;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 800px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin-top: 90px;
  margin-bottom: 5%;
  position: relative;
}

.campo-libre {
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  position: relative;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
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
  width: 30px;
  height: 30px;
  background-color: #2d98da;
  color: white;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  align-items: center;
  justify-content: center;
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

.nombre-jugador {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.6);
}
</style>
