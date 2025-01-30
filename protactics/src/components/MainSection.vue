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
// No hay lógica específica para esta sección por ahora.
</script>

<style scoped>
.text h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.main-paragraph,
.secondary-paragraph {
  font-size: 1.2rem;
  color: white;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.main-paragraph:hover,
.secondary-paragraph:hover {
  color: rgb(0, 195, 255); /* Cambia el color a azul claro */
  transform: translateY(-5px); /* Efecto de desplazamiento para un toque sutil */
}

</style>
