<template>
    <div class="perfil-club dashboard">
        <div class="dashboard-menu">
            <MenuDashboard />
        </div>

        <div class="dashboard-container">
            <ButtonAtras />
            <h2 class="titulo">Perfil del Club</h2>
            <div class="rol-badge">Accediendo como <strong>Club</strong></div>

            <div class="info-card" v-if="!editando">
                <div class="info-row">
                    <span class="label">Nombre:</span>
                    <span class="value">{{ club.nombre }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Correo electrónico:</span>
                    <span class="value">{{ club.correo }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Ubicación:</span>
                    <span class="value">{{ club.ubicacion || 'No especificada' }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Fecha de registro:</span>
                    <span class="value">{{ new Date(club.creado_en).toLocaleDateString() }}</span>
                </div>
                <div class="info-row" v-if="club.foto_url">
                    <span class="label">Foto de perfil:</span>
                    <img :src="club.foto_url" alt="Foto de perfil" class="perfil-img" />
                </div>

                <button class="btn-editar" @click="empezarEdicion">Editar perfil</button>
            </div>

            <div v-else class="info-card editar">
                <div class="input-group">
                    <label>Nombre:</label>
                    <input v-model="clubEdit.nombre" />
                </div>

                <div class="input-group">
                    <label>Correo electrónico:</label>
                    <input v-model="clubEdit.correo" type="email" />
                </div>

                <div class="input-group">
                    <label>Ubicación:</label>
                    <input v-model="clubEdit.ubicacion" />
                </div>

                <div class="input-group">
                    <label>Nueva contraseña (opcional):</label>
                    <input v-model="clubEdit.password" type="password" />
                </div>

                <div class="input-group">
                    <label>Foto de perfil (URL):</label>
                    <input v-model="clubEdit.foto_url" type="url" placeholder="https://..." />
                </div>

                <div class="botones">
                    <button @click="guardarCambios">Guardar cambios</button>
                    <button @click="cancelarEdicion">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const club = ref({});
const clubEdit = ref({});
const editando = ref(false);

const clubId = localStorage.getItem("userId");
const token = localStorage.getItem("authToken");

const cargarClub = async () => {
    try {
        const res = await axios.get(`http://localhost:3000/clubs/${clubId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        club.value = res.data;
    } catch (error) {
        console.error('Error al obtener perfil del club:', error);
    }
};

const empezarEdicion = () => {
    clubEdit.value = { ...club.value };
    editando.value = true;
};

const cancelarEdicion = () => {
    editando.value = false;
};

const guardarCambios = async () => {
    try {
        await axios.put(`http://localhost:3000/clubs/${clubId}`, clubEdit.value, {
            headers: { Authorization: `Bearer ${token}` }
        });
        club.value = { ...clubEdit.value };
        editando.value = false;
        alert('✅ Perfil actualizado correctamente.');
    } catch (error) {
        console.error('Error al actualizar perfil del club:', error);
        alert('❌ Hubo un problema al actualizar el perfil.');
    }
};

onMounted(cargarClub);
</script>

<style scoped>
.dashboard {
    display: flex;
    height: 100vh;
    background: linear-gradient(to right, #0f172a, #155e75);
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
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.titulo {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: uppercase;
}

.rol-badge {
    background-color: #334155;
    padding: 8px 18px;
    border-radius: 25px;
    font-size: 0.95rem;
    width: fit-content;
    color: #e2e8f0;
}

.info-card {
    background-color: #1e293b;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    position: relative;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #334155;
}

.label {
    font-weight: bold;
    color: #94a3b8;
}

.value {
    color: #e2e8f0;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
}

.input-group input {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #334155;
    color: white;
}

.perfil-img {
    width: 150px;
    height: 150px;
    border-radius: 8px;
}

.botones {
    display: flex;
    gap: 15px;
}

.btn-editar,
.botones button {
    background-color: #0ea5e9;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
}

.botones button:nth-child(2) {
    background-color: #ef4444;
}

.btn-editar:hover,
.botones button:hover {
    opacity: 0.9;
}
</style>