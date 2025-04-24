// PizarraLibre.vue
<template>
  <div class="contenedor">
    <div class="menu-bottom">
      <button @click="() => addObject('pelota')">⚽ Pelota</button>
      <button @click="() => addObject('cono')">🔺 Cono</button>
      <button @click="guardarPizarra">💾 Guardar</button>
      <button @click="() => (items = [])">🧹 Reset</button>
      <button class="capture-btn" @click="capturarObjetos">
        {{ isCaptured ? 'Editar' : 'Capturar' }}
      </button>
    </div>

    <div class="container">
      <div class="campo-libre" :style="{ backgroundImage: `url(${futbol})` }">
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
import futbol from "@/assets/img/deportes/pistaFutbol.png";

const isCaptured = ref(false);
const items = ref([]);
let nextId = 1000;

const addObject = (tipo) => {
  const nuevo = {
    id: nextId++,
    tipo,
    nombre: tipo.charAt(0).toUpperCase() + tipo.slice(1),
    x: 100,
    y: 100,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  };
  items.value.push(nuevo);
};

const eliminarObjeto = (id) => {
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

onMounted(() => {
  cargarPizarra();
});

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
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.capture-btn {
  background-color: #ff6b6b;
  color: white;
}

.capture-btn:hover {
  background-color: #e63946;
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
  margin-bottom: 5%;
}

.campo-libre {
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  position: relative;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}

.fichas-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
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
