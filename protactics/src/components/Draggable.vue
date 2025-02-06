<script setup lang="ts">
import { useDraggable } from '@vueuse/core' // Importamos Dragganle para hacer elementos arrastrables
import { ref } from 'vue' 
import HeaderSection from './HeaderSection.vue' 
import FooterSection from './FooterSection.vue' 

// Creamos una referencia reactiva para el elemento que se podrá arrastrar
const objeto = ref(null)

// EVariable habilitar o deshabilitar draggable
const disabled = ref(false)

// Variable useDraggable , elemento movible
const { x, y, style } = useDraggable(objeto, {
  initialValue: { x: 600, y: 400 }, // Posición inicial del objeto
  preventDefault: true, // Evita comportamientos predeterminados del navegador (como el scroll)
  disabled, // Deshabilita el arrastre si disabled es true
})
</script>

<template>
  <HeaderSection />

  <!-- Contenedor principal que centra el contenido -->
  <div class="container">
    
    <!-- Contenedor del checkbox para activar/desactivar el arrastre -->
    <div class="checkbox-container">
      <label class="checkbox">
        <!-- Checkbox draggble está habilitado o no -->
        <input v-model="disabled" type="checkbox" class="checkbox-input">
        <span>Desactivar drag and drop</span>
      </label>
    </div>

    <!-- Texto de descripción con opacidad reducida -->
    <p class="description">Presiona para capturar elementos</p>

    <!-- Objeto arrastrable -->
    <div ref="objeto" class="draggable" :style="style">
      👋 Drag me!
      <!-- Muestra la posición actual del elemento en la pantalla -->
      <div class="position-text">I am at {{ Math.round(x) }}, {{ Math.round(y) }}</div>
    </div>
  </div>
  <FooterSection />
</template>


<style scoped>
/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Checkbox */
.checkbox-container {
  margin-bottom: 1rem;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox-input {
  margin-right: 0.5rem;
}

/* Descripción */
.description {
  font-style: italic;
  opacity: 0.5;
  text-align: center;
  margin-bottom: 1rem;
}

/* Elemento draggable */
.draggable {
  position: absolute;
  background-color: #3b82f6;
  /* Azul */
  color: white;
  user-select: none;
  cursor: move;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  touch-action: none;
}

/* Segundo draggable con handle */
.draggable-alt {
  position: absolute;
  background-color: #ef4444;
  /* Rojo */
  color: white;
  user-select: none;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 1rem;
}

/* Texto dentro de los draggables */
.position-text {
  font-size: 0.875rem;
  opacity: 0.75;
}

.handle-text {
  font-size: 0.75rem;
  opacity: 0.5;
}

/* Efecto hover */
.draggable:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

.draggable-alt:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
