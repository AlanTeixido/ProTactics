<script setup></script>
<template>
    <div>
        <button>Nueva tarea</button>
    </div>
</template>
<style scoped>
div {
    display: block;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
}

button {
    width: 67%;
    padding: 5%;
    border-radius: 10px;
    padding: 15px 25px;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: 50px;
    background-image: linear-gradient(to right, #0098e5, #00a86b);
    color: white;
    text-align: center;
    cursor: pointer;
    transition: 0.4s;
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

button:hover {
    transform: scale(1.1);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}
</style>