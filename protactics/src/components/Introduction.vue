<template>
    <section class="intro">
        <h1 v-if="username">Bienvenido/a, {{ username }} a <span class="brand">ProTactics</span></h1>
        <h1 v-else>Bienvenidos/as a <span class="brand">ProTactics</span></h1>
        <p v-if="userEmail">📧 Tu correo: <span class="highlight">{{ userEmail }}</span></p>
        <p>🎯 ¡Esperamos que disfrutes de la plataforma y mejores tus entrenamientos!</p>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const username = ref('');
const userEmail = ref('');

onMounted(() => {
    username.value = localStorage.getItem('username') || '';
    userEmail.value = localStorage.getItem('userEmail') || '';
});
</script>

<style scoped>
.intro {
    text-align: center;
    margin-top: 200px; 
    padding: 20px;
    border-radius: 10px;
}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
}

.brand {
    color: #00c3ff;
}

p {
    font-size: 1.2rem;
    color: #ddd;
    margin-top: 10px;
}

.highlight {
    font-weight: bold;
    color: #00ffcc;
}
</style>
