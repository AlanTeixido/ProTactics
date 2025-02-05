<template>
    <section class="intro">
        <h1 v-if="username">Bienvenido/a, <span class="username">{{ username }}</span> a <span class="brand">ProTactics</span></h1>
        <h1 v-else>Bienvenidos/as a <span class="brand">ProTactics</span></h1>
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

.username {
    text-transform: uppercase;
    font-size: 100%;
    color: white;
   
}

h1 {
    font-size: 2.5rem;
    font-weight: 400;
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
