<script setup>
import { ref } from "vue";

// Lista de jugadores simulada (esto vendría de una API en un caso real)
const jugadores = ref([
  { id: 1, nombre: "Player 1", dorsal: 7, posicion: "Delantero" },
  { id: 2, nombre: "Player 2", dorsal: 10, posicion: "Mediocampista" }
]);

// Estado del modal
const showModal = ref(false);

// Datos del nuevo jugador
const nuevoJugador = ref({
  nombre: "",
  dorsal: "",
  posicion: ""
});

// Función para agregar un nuevo jugador
const agregarJugador = () => {
  if (!nuevoJugador.value.nombre || !nuevoJugador.value.dorsal || !nuevoJugador.value.posicion) {
    alert("Todos los campos son obligatorios");
    return;
  }

  jugadores.value.push({
    id: jugadores.value.length + 1,
    ...nuevoJugador.value
  });

  // Limpiar el formulario y cerrar el modal
  nuevoJugador.value = { nombre: "", dorsal: "", posicion: "" };
  showModal.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
    <div class="max-w-4xl mx-auto">
      
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Gestión de Jugadores</h1>
        <button 
          @click="showModal = true"
          class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center transition">
          <span class="text-lg mr-2">+</span> Nuevo Jugador
        </button>
      </div>

      <!-- Lista de jugadores -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="jugador in jugadores" 
          :key="jugador.id" 
          class="bg-gray-700 p-4 rounded-lg shadow-md text-center">
          <p class="text-lg font-semibold">{{ jugador.nombre }}</p>
          <p class="text-sm text-gray-400">Dorsal: {{ jugador.dorsal }}</p>
          <p class="text-sm text-gray-400">{{ jugador.posicion }}</p>
        </div>
      </div>

      <!-- Modal -->
      <div 
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-xl font-bold mb-4">Agregar Jugador</h2>

          <input 
            v-model="nuevoJugador.nombre"
            type="text"
            placeholder="Nombre"
            class="w-full p-2 rounded bg-gray-800 text-white mb-2" />

          <input 
            v-model="nuevoJugador.dorsal"
            type="number"
            placeholder="Dorsal"
            class="w-full p-2 rounded bg-gray-800 text-white mb-2" />

          <input 
            v-model="nuevoJugador.posicion"
            type="text"
            placeholder="Posición"
            class="w-full p-2 rounded bg-gray-800 text-white mb-4" />

          <div class="flex justify-end space-x-2">
            <button @click="showModal = false" class="px-4 py-2 bg-gray-600 rounded">Cancelar</button>
            <button @click="agregarJugador" class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
