<template>
  <section class="main-section">
    <div class="section">
      <img class="estadistica" src="../assets/img/dispositivos.png" alt="Dispositivos">
      <div class="text">
        <h1>Crea y personaliza tus entrenamientos</h1>
        <p class="main-paragraph">
          Con ProTactics, puedes personalizar tus entrenamientos de manera eficiente y visual. Mejora tu rendimiento y lleva el control de cada sesión.
        </p>
        <p class="secondary-paragraph">
          Planifica de manera inteligente y ajusta cada detalle según tu progreso y objetivos.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-right: 5%;
}
.text{
  width: 100%;
  justify-content: center;
  margin-top: 30%;
}
.text p{
  width: 70%;
  margin-left: 15%;
}
.main-section {
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 3rem;
  margin-top: 10%;
}
.main-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.main-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.estadistica{
  width: 75%;
  margin-left: 8%; 
  transition: 1s;
}
.estadistica:hover{
  transform: scale(1.1);
}
</style>
