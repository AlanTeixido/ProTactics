<template>
  <section class="main-section">
    <div class="section">
      <img class="estadistica" src="../assets/img/Fondo.png">
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
  align-items: center;
}
.text{
  width: 100%;
  justify-content: center;
  margin-top: 10%;
  text-align: left;
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
  text-align: center;
}
.main-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.estadistica{
  width: 85%;
  margin-left: 8%; 
  transition: 1s;
  margin-top: 15%;
}
.estadistica:hover{
  transform: scale(1.1);
}

.main-paragraph {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.secondary-paragraph {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1rem;
}

/* Responsiveness */
@media (max-width: 1024px) {
  .section {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .text {
    margin-top: 5%;
    text-align: center;
  }
  .text p {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .estadistica {
    width: 90%;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .main-section h1 {
    font-size: 2rem;
  }
  .main-section p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .main-section {
    padding: 2rem 1rem;
  }
  .main-section h1 {
    font-size: 1.8rem;
  }
  .main-section p {
    font-size: 0.9rem;
  }
  .estadistica {
    width: 100%;
  }
}
</style>
