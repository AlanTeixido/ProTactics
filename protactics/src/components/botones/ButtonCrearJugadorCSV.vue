<script setup>
import { ref } from 'vue';
import axios from 'axios';

const file = ref(null); // Para almacenar el archivo CSV
const statusMessage = ref(''); // Para mostrar el estado de la carga del CSV
const showDropArea = ref(false); // Para controlar la visibilidad del área de arrastrar y soltar

// Método para manejar el archivo cuando se selecciona
const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

// Método para manejar el arrastre y la caída del archivo
const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
        file.value = droppedFile;
    }
};

// Método para mostrar el área de arrastrar y soltar después de hacer clic
const showUploadArea = () => {
    showDropArea.value = true;
};

// Método para enviar el archivo CSV al backend
const uploadCSV = async () => {
    if (!file.value) {
        statusMessage.value = 'Por favor, selecciona o arrastra un archivo CSV.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);

    try {
        const response = await axios.post(
            'http://localhost:3000/api/jugadores/cargar-csv', // Ajusta esta URL según tu API
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        statusMessage.value = `CSV procesado correctamente. Jugadores creados: ${response.data.jugadors_creats}, Jugadores duplicados: ${response.data.duplicats}`;
    } catch (error) {
        statusMessage.value = `Error al subir el archivo: ${error.response ? error.response.data.error : error.message}`;
    }
};
</script>

<template>
    <div>
        <!-- Botón para subir CSV -->
        <button class="button-subir-csv" @click="showUploadArea">
            <div class="button-content">
                <span class="upload-icon"></span>
                <p>Subir Jugadores CSV</p>
            </div>
        </button>

        <!-- Área para seleccionar o arrastrar el archivo CSV, sólo visible cuando showDropArea es true -->
        <div v-if="showDropArea" class="drop-area" @drop="handleDrop" @dragover.prevent>
            <p>Arrastra el archivo CSV aquí o haz clic para seleccionar.</p>
            <input type="file" accept=".csv" @change="handleFileUpload" class="file-input" required />
        </div>

        <!-- Mensaje de estado -->
        <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>

        <!-- Botón para enviar el archivo -->
        <button v-if="showDropArea" class="button-subir-csv" @click="uploadCSV">
            Subir archivo CSV
        </button>
    </div>
</template>

<style scoped>
.button-subir-csv {
    padding: 10px 20px;
    background: linear-gradient(45deg, #4caf50, #0a74da);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 20px;
}

.button-subir-csv:hover {
    transform: scale(1.05);
}

.button-content {
    display: block;
    text-align: center;
}

.upload-icon {
    font-size: 2rem;
    margin-right: 10px;
}

.button-subir-csv p {
    font-size: 1rem;
}

.drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
}

.drop-area p {
    font-size: 1.2rem;
    color: #777;
}

.file-input {
    display: none;
    /* Ocultar el input de tipo file, ya que no lo necesitamos */
}

.status-message {
    margin-top: 20px;
    font-size: 1rem;
    color: #4caf50;
}

.drop-area:hover {
    background-color: #f0f0f0;
    border-color: #0a74da;
}
</style>
