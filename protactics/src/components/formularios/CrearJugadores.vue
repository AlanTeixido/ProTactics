<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Lista de jugadores
const jugadores = ref([]);

// Estado del modal
const showModal = ref(false);

// Datos del nuevo jugador
const nuevoJugador = ref({
  nombre: '',
  apellido: '',
  dorsal: '',
  posicion: ''
});

// Función para obtener jugadores
const obtenerJugadores = async () => {
  try {
    const response = await axios.get('https://protactics-api.onrender.com/jugadores', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    jugadores.value = response.data;
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
  }
};

// Función para agregar un nuevo jugador
const agregarJugador = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const entrenador_id = localStorage.getItem('entrenadorId'); // ID del entrenador que crea el jugador

    if (!entrenador_id) {
      alert('Error: No se encontró el entrenador.');
      return;
    }

    // Enviar datos a la API
    const response = await axios.post(
      'https://protactics-api.onrender.com/jugadores/register',
      {
        ...nuevoJugador.value,
        entrenador_id
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Agregar el nuevo jugador a la lista local
    jugadores.value.push(response.data.jugador);

    // Cerrar modal y limpiar formulario
    nuevoJugador.value = { nombre: '', apellido: '', dorsal: '', posicion: '' };
    showModal.value = false;
    alert('Jugador creado exitosamente');
  } catch (error) {
    console.error('Error al crear jugador:', error);
    alert('Error al crear el jugador. Revisa los datos.');
  }
};

// Cargar jugadores al montar el componente
onMounted(obtenerJugadores);
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
          :key="jugador.jugador_id" 
          class="bg-gray-700 p-4 rounded-lg shadow-md text-center">
          <p class="text-lg font-semibold">{{ jugador.nombre }} {{ jugador.apellido }}</p>
          <p class="text-sm text-gray-400">Dorsal: {{ jugador.dorsal }}</p>
          <p class="text-sm text-gray-400">{{ jugador.posicion }}</p>
        </div>
      </div>

      <!-- Modal para agregar jugador -->
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
            v-model="nuevoJugador.apellido"
            type="text"
            placeholder="Apellido"
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

<style scoped>
/* Estilos generales */
.crear-entrenador-container {
  padding: 20px;
  color: white;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-create {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
  background-color: #2a2a2a;
  color: white;
}

.submit-btn {
  padding: 12px;
  background: linear-gradient(45deg, #4caf50, #0a74da);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
}

.submit-btn:hover {
  transform: scale(1.05);
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
}

.popup-close {
  margin-top: 15px;
  padding: 8px;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
