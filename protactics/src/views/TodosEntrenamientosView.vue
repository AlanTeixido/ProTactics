<template>
    <div class="dashboard">
        <!-- Menu lateral -->
        <div class="dashboard-menu">
            <MenuDashboard />
        </div>

        <!-- Contenedor principal -->
        <div class="dashboard-container">
            <!-- Botón de volver atrás -->
            <ButtonAtras />

            <!-- Título de la página -->
            <div class="dashboard-header">
                <h2 class="titulo">Ver todos los entrenamientos</h2>
            </div>

            <!-- Filtros de búsqueda -->
            <div class="search-filter-container">
                <input v-model="searchQuery" placeholder="Buscar por título..." class="search-input" />
                <select v-model="selectedFilter" class="filter-select">
                    <option value="">Sin filtro</option>
                    <option value="asc">Fecha Ascendente</option>
                    <option value="desc">Fecha Descendente</option>
                    <option value="categoria">Por Categoría</option>
                </select>
            </div>

            <!-- Lista de entrenamientos -->
            <ul class="entrenos-lista">
                <li v-for="entreno in filteredEntrenos" :key="entreno.entrenamiento_id" class="entreno-card"
                    @click="mostrarDetalle(entreno)">
                    <div class="entreno-info">
                        <h3 class="entreno-titulo">{{ entreno.titulo }}</h3>
                        <p>{{ entreno.descripcion }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- Popup de detalles del entrenamiento -->
    <div v-if="entrenoSeleccionado" class="popup-overlay" @click="cerrarPopup">
        <div class="popup-content" @click.stop>
            <h3>{{ entrenoSeleccionado.titulo }}</h3>
            <p>{{ entrenoSeleccionado.descripcion }}</p>
            <div class="entreno-datos">
                <div>
                    <span><strong>Categoría:</strong> {{ entrenoSeleccionado.categoria || 'No definida' }}</span>
                    <span><strong>Campo:</strong> {{ entrenoSeleccionado.campo }}</span>
                </div>
                <div>
                    <span><strong>Fecha:</strong> {{ new
                        Date(entrenoSeleccionado.fecha_entrenamiento).toLocaleDateString() }}</span>
                    <span><strong>Duración:</strong> {{ entrenoSeleccionado.duracion_repeticion }} min</span>
                </div>
                <div>
                    <span><strong>Repeticiones:</strong> {{ entrenoSeleccionado.repeticiones }}</span>
                    <span><strong>Descanso:</strong> {{ entrenoSeleccionado.descanso }} min</span>
                </div>
            </div>
            <button @click="cerrarPopup" class="btn-cerrar-popup"><img src="../assets/img/cruzar.png"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import { RouterLink } from 'vue-router';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const entrenos = ref([]);
const searchQuery = ref("");
const selectedFilter = ref("");
const entrenoSeleccionado = ref(null);

// Función para mostrar el detalle del entrenamiento
const mostrarDetalle = (entreno) => {
    entrenoSeleccionado.value = entreno;
};

// Función para cerrar el popup
const cerrarPopup = () => {
    entrenoSeleccionado.value = null;
};

const cargarEntrenamientos = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://protactics-api.onrender.com/entrenamientos', {
            headers: { Authorization: `Bearer ${token}` },
        });
        entrenos.value = response.data || [];
    } catch (error) {
        console.error('Error cargando entrenamientos:', error);
    }
};

const filteredEntrenos = computed(() => {
    let result = [...entrenos.value];

    // Filtro por búsqueda
    if (searchQuery.value) {
        result = result.filter(entreno => entreno.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }

    // Filtro por fecha
    if (selectedFilter.value === "asc") {
        result.sort((a, b) => new Date(a.creado_en) - new Date(b.creado_en));
    } else if (selectedFilter.value === "desc") {
        result.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en));
    } else if (selectedFilter.value === "categoria") {
        result.sort((a, b) => a.categoria.localeCompare(b.categoria));
    }

    // Mostrar todos los entrenamientos
    return result;
});

onMounted(cargarEntrenamientos);
</script>

<style scoped>
.dashboard {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(to left, #0f172a, #155e75);
    color: white;
}

.dashboard-menu {
    width: 250px;
    background-color: #1f2937;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
}

.dashboard-container {
    flex: 1;
    margin-left: 250px;
    padding: 40px;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2%;
}

.titulo {
    font-size: 2.4rem;
    color: rgb(255, 255, 255);
    font-weight: bold;
}

.search-filter-container {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 20px 0;
    padding: 10px;
    border-radius: 10px;
}

.search-input {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: #334155;
    color: white;
}

.search-input::placeholder {
    color: #94a3b8;
}

.filter-select {
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #334155;
    color: white;
    cursor: pointer;
}

.filter-select:hover {
    background-color: #475569;
}

.entrenos-lista {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding: 5%;
}

.entreno-card {
    width: 100%;
    height: 200px;
    background-color: #1e293b;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: 0.3s;
    cursor: pointer;
}

.entreno-card:hover {
    transform: scale(1.03);
}

.entreno-info {
    padding: 20px;
}

.entreno-titulo {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 8px;
    color: rgb(255, 255, 255);
}

.entreno-datos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2%;
    gap: 15px;
    /* Añade espacio entre grupos */
    margin-top: 5%;
}

.entreno-datos div {
    display: flex;
    justify-content: space-around;
    padding: 5px 0;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.popup-content {
    background-color: #1e293b;
    padding: 20px;
    border-radius: 10px;
    width: 60%;
    color: white;
    text-align: left;
}

.btn-cerrar-popup {
    background-color: transparent;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

.btn-cerrar-popup img {
    width: 25px;
    height: 25px;
}
</style>