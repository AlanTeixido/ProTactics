<script setup>
import { ref } from 'vue';
import axios from 'axios';

const file = ref(null);
const statusMessage = ref('');
const showDropArea = ref(false);
const fileInput = ref(null); // Referencia directa al input para activarlo desde código

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  statusMessage.value = `Archivo seleccionado: ${file.value.name}`;
};

const handleDrop = (event) => {
  event.preventDefault();
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    file.value = droppedFile;
    statusMessage.value = `Archivo arrastrado: ${file.value.name}`;
  }
};

const showUploadArea = () => {
  showDropArea.value = true;
};

const triggerFileInput = () => {
  fileInput.value.click(); // Simula clic sobre el input oculto
};

const uploadCSV = async () => {
  if (!file.value) {
    statusMessage.value = 'Por favor, selecciona o arrastra un archivo CSV.';
    return;
  }

  const formData = new FormData();
  formData.append('csv', file.value); // El nombre debe coincidir con `upload.single('csv')`

  const token = localStorage.getItem('authToken'); // ⚠️ Corrección aquí

  if (!token) {
    statusMessage.value = '❌ No estás autenticado. Inicia sesión nuevamente.';
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/jugadores/upload-csv',
      formData,
      {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // ✔️ Token corregido
        }
      }
    );

    statusMessage.value = `✅ CSV procesado. Creados: ${response.data.jugadors_creats}, Duplicados: ${response.data.duplicats}`;
  } catch (error) {
    statusMessage.value = `❌ Error al subir: ${error.response?.data?.error || error.message}`;
  }
};
</script>

<template>
  <div>
    <button class="button-subir-csv" @click="showUploadArea">
      <div class="button-content">
        <span class="upload-icon">📁</span>
        <p>Subir Jugadores CSV</p>
      </div>
    </button>

    <div v-if="showDropArea" class="drop-area" @click="triggerFileInput" @drop="handleDrop" @dragover.prevent>
      <p>Arrastra el archivo CSV aquí o haz clic para seleccionarlo</p>
      <input
        ref="fileInput"
        type="file"
        accept=".csv"
        @change="handleFileUpload"
        style="display: none;"
      />
    </div>

    <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>

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
  text-align: center;
}

.upload-icon {
  font-size: 1.5rem;
  margin-right: 5px;
}

.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
}

.status-message {
  margin-top: 20px;
  font-size: 1rem;
  color: #4caf50;
}
</style>
