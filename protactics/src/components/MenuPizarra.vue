<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoggedIn = ref(false); // Estado reactivo
const isDropdownOpen = ref(false);

const userPic = ref('https://via.placeholder.com/100');

// 🔹 Función para actualizar el estado del usuario
const checkAuthStatus = () => {
    isLoggedIn.value = !!localStorage.getItem('authToken');
};

// 🔹 Cargar imagen de perfil si está logueado
const fetchProfilePic = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        const response = await axios.get(`https://protactics-api.onrender.com/usuarios/${userId}`);
        if (response.data.foto_url) {
            userPic.value = `https://protactics-api.onrender.com${response.data.foto_url}`;
            localStorage.setItem('fotoUrl', userPic.value);
        }
    } catch (error) {
        console.error("Error al obtener la foto de perfil:", error);
    }
};

// 🔹 Función para cerrar sesión
const logout = () => {
    localStorage.clear();
    isLoggedIn.value = false;
    userPic.value = 'https://via.placeholder.com/100';
    router.push('/');

    // Forzar una recarga de la página para limpiar cualquier estado persistente
    setTimeout(() => {
        window.location.reload();
    }, 500);
};

// 🔹 Manejo del dropdown
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// 🔹 Detectar cambios en localStorage y actualizar estado
watch(isLoggedIn, (newValue) => {
    if (newValue) fetchProfilePic();
});

// 🔹 Comprobar estado de autenticación al montar el componente
onMounted(() => {
    checkAuthStatus();
    if (isLoggedIn.value) fetchProfilePic();
});
</script>

<template>
    <div class="menu">
        <nav class="nav-container">
            <div class="nav-item">
                <RouterLink v-if="!isLoggedIn" to="/" class="nav-link">INICIO</RouterLink>
                <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
                <RouterLink v-if="isLoggedIn" to="/mis-entrenamientos" class="nav-link">ENTRENAMIENTOS</RouterLink>
                <RouterLink v-if="isLoggedIn" to="/perfil" class="nav-link">PERFIL</RouterLink>
                <RouterLink v-if="!isLoggedIn" to="/contact" class="nav-link">CONTACTO</RouterLink>
                
                <RouterLink v-if="!isLoggedIn" to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink>
            </div>
        </nav>
    </div>
</template>
<style scoped>
.menu {
    margin-top: 2%;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 50px;
}
.nav-container {
    display: flex;
    justify-content: space-between;
    justify-content: center;
    width: 100%;
    margin: 1%;
}

.nav-item {
    display: flex;
    gap: 20px;
}
.nav-link {
    text-decoration: none;
    color: #343a40;
    font-weight: 500;
    font-size: 1.2rem;
}
.nav-link:hover {
    color: #007bff;
    transition: color 0.3s ease;
}

</style>