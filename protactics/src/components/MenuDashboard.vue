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
        <div class="info-menu">
            <h2>ProTactics</h2>
            <img src="../assets/img/logo.png" class="logo">
        </div>

        <nav class="nav-container">
            <div class="nav-item">
                <RouterLink to="/" class="nav-link">INICIO</RouterLink>
                <RouterLink to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
                <RouterLink to="/perfil" class="nav-link">PERFIL</RouterLink>
                <RouterLink to="/contact" class="nav-link">CONTACTO</RouterLink>
                <RouterLink to="/deportes" class="nav-link">DEPORTES</RouterLink>
                <RouterLink to="/dragg" class="nav-link">PIZARRA</RouterLink>
                <RouterLink to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink>
            </div>
        </nav>

        <div class="log-regist">
            <div v-if="isLoggedIn" class="user-info">
                <RouterLink to="/perfil" class="profile-pic-link">
                    <!--<img class="profile-pic" :src="userPic" alt="Foto de perfil" />-->
                    <img src="../assets/img/futbol.jpg" class="logo-perfil">
                </RouterLink>

                <img @click="logout" src="../assets/img/logout.png" class="logout-logo">
            </div>

            <div v-if="!isLoggedIn" class="login-register">
                <RouterLink to="/login">
                    <img src="../assets/img/enter.png" class="login-register-btn">
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
* {
    background-color: rgb(36, 36, 36);
    margin: 5%;
    padding: 2%;
}

.menu {
    width: 150%;
    height: 100%;
}

.info-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px rgba(255, 255, 255, 0.178) solid;
}

.info-menu img {
    width: 35px;
}

.nav-item {
    display: flex;
    flex-direction: column;
}

.nav-link {
    color: white;
    margin-bottom: 5%;
    text-decoration: none;
}

.log-regist {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-info{
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px rgba(255, 255, 255, 0.178) solid;
}
.logout-logo{
    width: 25px;
    transition: 0.5s ease;
}
.logout-logo:hover{
    transform: scale(1.1);
}

.logo-perfil{
    width: 35px;
    height: 35px;
    border-radius: 50px;
}
</style>