<template>
  <div class="dashboard perfil-club">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
      <h2 class="titulo">Perfil del Club</h2>
      <div class="rol-badge">Accediendo como <strong>Club</strong></div>

      <div class="info-card" v-if="!editando">
        <img
          class="profile-img"
          :src="club.foto_url || '/img/default-profile.png'"
          alt="Foto del club"
        />

        <div class="info-row">
          <span class="label">Nombre</span>
          <span class="value">{{ club.nombre || 'No especificado' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Correo</span>
          <span class="value">{{ club.correo || 'No especificado' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Ubicación</span>
          <span class="value">{{ club.ubicacion || 'No especificada' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Fecha de registro</span>
          <span class="value">
            {{
              club.creado_en
                ? new Date(club.creado_en).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })
                : 'No especificada'
            }}
          </span>
        </div>

        <button class="btn-editar" @click="empezarEdicion">Editar perfil</button>
      </div>

      <div v-else class="info-card editar">
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="clubEdit.nombre" />
        </div>

        <div class="input-group">
          <label>Correo electrónico</label>
          <input v-model="clubEdit.correo" type="email" />
        </div>

        <div class="input-group">
          <label>Ubicación</label>
          <input v-model="clubEdit.ubicacion" type="text" />
        </div>

        <div class="input-group">
          <label>Foto de perfil (URL)</label>
          <input v-model="clubEdit.foto_url" type="url" />
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
import { useRouter } from 'vue-router';

const club = ref({});
const clubEdit = ref({});
const editando = ref(false);
const router = useRouter();

const clubId = localStorage.getItem("clubId");
const token = localStorage.getItem("authToken");
const rol = localStorage.getItem("userRol");

// Redirigeix si no és club o no hi ha clubId
if (rol !== 'club' || !clubId) {
  router.push('/login');
}

const cargarClub = async () => {
  try {
    const res = await axios.get(`https://protactics-api.onrender.com/clubes/${clubId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    club.value = res.data;
  } catch (error) {
    console.error('❌ Error al obtener perfil del club:', error);
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
  if (!clubEdit.value.nombre.trim() || !clubEdit.value.correo.trim()) {
    alert('❌ Nombre y correo son obligatorios.');
    return;
  }

  try {
    await axios.put(`https://protactics-api.onrender.com/clubes/${clubId}`, {
      nombre: clubEdit.value.nombre,
      correo: clubEdit.value.correo,
      ubicacion: clubEdit.value.ubicacion,
      foto_url: clubEdit.value.foto_url,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    club.value = { ...clubEdit.value };
    editando.value = false;
    alert('✅ Perfil actualizado correctamente.');
  } catch (error) {
    console.error('❌ Error al actualizar perfil del club:', error);
    alert('❌ Hubo un problema al actualizar el perfil.');
  }
};

onMounted(cargarClub);
</script>



<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
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
  padding: 30px;
  border-radius: 15px;
  position: relative;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid white;
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
  margin-top: 20px;
}

.botones button:nth-child(2) {
  background-color: #ef4444;
}

.btn-editar:hover,
.botones button:hover {
  opacity: 0.9;
}

.profile-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto 20px;
}

@media (max-width: 1024px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-container {
    padding: 40px 25px;
  }

  .info-card {
    padding: 25px;
  }

  .titulo {
    font-size: 2rem;
    text-align: center;
  }

  .botones {
    flex-direction: column;
  }

  .btn-editar,
  .botones button {
    width: 100%;
  }

  .profile-img {
    width: 90px;
    height: 90px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 30px 20px;
    gap: 25px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 40px;
  }

  .titulo {
    font-size: 1.8rem;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .input-group input {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 20px 15px;
  }

  .titulo {
    font-size: 1.5rem;
  }

  .info-card {
    padding: 20px;
  }

  .label {
    font-size: 0.95rem;
  }

  .value {
    font-size: 0.95rem;
  }

  .profile-img {
    width: 80px;
    height: 80px;
  }
}

</style>
