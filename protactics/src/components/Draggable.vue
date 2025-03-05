<script setup>
import { ref } from 'vue'
import HeaderSection from './HeaderSection.vue'
import FooterSection from './FooterSection.vue'

// Variable reactiva para bloquear/desbloquear el movimiento
const isCaptured = ref(false)

// Lista de 10 objetos con posición inicial y estado de arrastre
const items = ref(
  Array.from({ length: 10 }, (_, index) => ({
    id: index,
    x: 50 + index * 120, // Posición inicial (separados horizontalmente)
    y: 600, // 🔥 Altura ajustada para que los objetos sean visibles
    isDragging: false, 
    offsetX: 0, 
    offsetY: 0  
  }))
)

// Función para iniciar el arrastre
const startDrag = (event, item) => {
  if (isCaptured.value) return // Si está capturado, no se puede mover

  item.isDragging = true
  item.offsetX = event.clientX - item.x
  item.offsetY = event.clientY - item.y

  // Se añaden eventos para mover y soltar el objeto
  window.addEventListener('mousemove', (e) => onDrag(e, item))
  window.addEventListener('mouseup', () => stopDrag(item))
}

// Función que actualiza la posición del objeto mientras se arrastra
const onDrag = (event, item) => {
  if (!item.isDragging) return
  item.x = event.clientX - item.offsetX
  item.y = event.clientY - item.offsetY
}

// Función para soltar el objeto y remover los eventos
const stopDrag = (item) => {
  item.isDragging = false
  window.removeEventListener('mousemove', (e) => onDrag(e, item))
  window.removeEventListener('mouseup', () => stopDrag(item))
}

// Alternar entre capturar/liberar los objetos
const toggleCapture = () => {
  isCaptured.value = !isCaptured.value
}
</script>

<template>
  <HeaderSection />

  <div class="container">
    <!-- Botón Capturar -->
    <button class="capture-btn" @click="toggleCapture">
      {{ isCaptured ? 'Liberar' : 'Capturar' }}
    </button>

    <!-- Objetos Draggeables -->
    <div
      v-for="item in items"
      :key="item.id"
      class="draggable"
      :class="{ disabled: isCaptured }"
      :style="{ left: item.x + 'px', top: item.y + 'px' }"
      @mousedown="(event) => startDrag(event, item)"
    >
      {{ item.id }} [{{ item.x }} - {{ item.y }}]
    </div>
  </div>
  
  <FooterSection />
</template>

<style scoped>
/* 🔥 Ajustamos el contenedor */
.container {
  width: 100vw;
  height: 100vh; /* 🔥 Asegura que todo el espacio esté disponible */
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px; /* 🔥 Empuja el contenedor hacia abajo */
  padding-bottom: 50px; /* 🔥 Para que los objetos no queden pegados al footer */
}

/* Estilo del botón */
.capture-btn {
  position: absolute; /* 🔥 Posición absoluta dentro de .container */
  left: 1150px; /* 🔥 Mueve el botón más cerca */
  top: 750px; /* 🔥 Ajusta la altura para que sea visible */
  
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

/* Estilo de los elementos draggeables */
.draggable {
  width: 80px;
  height: 80px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
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

/* Si está capturado, deshabilitamos el cursor */
.draggable.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
