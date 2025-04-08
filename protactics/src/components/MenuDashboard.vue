<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoggedIn = ref(false);
const userRole = ref(null);
const userPic = ref('https://via.placeholder.com/100');

const checkAuthStatus = () => {
    isLoggedIn.value = !!localStorage.getItem('authToken');
    userRole.value = localStorage.getItem('userRol'); 
};

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

const logout = () => {
    localStorage.clear();
    isLoggedIn.value = false;
    userRole.value = null;
    userPic.value = 'https://via.placeholder.com/100';
    router.push('/');
    setTimeout(() => window.location.reload(), 500);
};

onMounted(() => {
    checkAuthStatus();
    if (isLoggedIn.value) fetchProfilePic();
});

const menuItems = computed(() => {
    if (!isLoggedIn.value) {
        return [
            { path: '/', label: 'INICIO' },
            { path: '/contact', label: 'CONTACTO' },
            { path: '/about', label: 'SOBRE NOSOTROS' }
        ];
    } else if (userRole.value === 'club') {
        return [
            { path: '/dashboard', label: 'DASHBOARD' },
            { path: '/equipos', label: 'EQUIPOS' },
            { path: '/entrenadores', label: 'ENTRENADORES' },
            { path: '/publicaciones', label: 'PUBLICACIONES' },
            { path: '/perfil-club', label: 'PERFIL' }
        ];
    } else if (userRole.value === 'entrenador') {
        return [
            { path: '/dashboard', label: 'DASHBOARD' },
            { path: '/entrenos', label: 'ENTRENAMIENTOS' },
            { path: '/perfil-entrenador', label: 'PERFIL' },
            { path: '/publicaciones', label: 'PUBLICACIONES' }
        ];
    }
    return [];
});
</script>

<template>
    <div class="menu">
        <div class="info-menu">
            <img src="../assets/img/logo.png" class="logo">
        </div>

        <nav class="nav-container">
            <div class="nav-item">
                <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-link">
                    {{ item.label }}
                </RouterLink>
            </div>
        </nav>

        <div class="log-regist">
            <div v-if="isLoggedIn" class="user-info">
                <RouterLink :to="userRole === 'club' ? '/perfil-club' : '/perfil-entrenador'" class="profile-pic-link">
                    <img :src="userPic" class="logo-perfil">
                </RouterLink>
                <img @click="logout" src="../assets/img/logout.png" class="logout-logo">
            </div>

            <div v-else class="login-register">
                <RouterLink to="/login">
                    <img src="../assets/img/enter.png" class="login-register-btn">
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu {
    width: 250px;
    height: 100vh;
    background-color: #0b0f1a;
    filter: brightness(0.9);
}

.nav-container {
    margin-top: 50%;
}

.info-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px rgba(255, 255, 255, 0.178) solid;
    margin-left: 5%;
    margin-right: 5%;
    padding: 30px;
}

.info-menu img {
    width: 35px;
}

.nav-item {
    display: flex;
    flex-direction: column;
    margin: 15%;
}

.nav-link {
    color: white;
    margin-bottom: 15%;
    text-decoration: none;
    font-size: 15px;
    transition: 0.4s;
}

.nav-link:hover {
    transform: scale(1.1);
    font-weight: bolder;
    color: transparent;
    background-image: linear-gradient(to right, #0098e5, #00a86b);
    background-clip: text;
    -webkit-background-clip: text;
}

.user-info {
    margin-top: 100%;
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px rgba(255, 255, 255, 0.178) solid;
    padding: 5%;
}

.logout-logo {
    width: 25px;
    transition: 0.5s ease;
    margin: 15px;
}

.logout-logo:hover {
    transform: scale(1.1);
}

.logo-perfil {
    width: 35px;
    height: 35px;
    border-radius: 50px;
}
</style>
