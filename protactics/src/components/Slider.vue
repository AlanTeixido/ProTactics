<template>
    <section>
        <p class="title"><span>Crea personaliza</span> i <span>comparte</span> tus entrenamientos</p>
        <div class="slider">
            <img src="../assets/img/vestuario.jpg">
            <img src="../assets/img/atletismo.jpg">
            <img src="../assets/img/ciclismo.jpg">
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.title{
  font-size: 500%;
  text-transform: uppercase;
  position: absolute;
  color: white;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  z-index: 1;
}

.title p{
  font-weight: 100;
}
.title span{
  font-weight: 600;
}

.slider {
  width: 100%;
  height: 550px;
  overflow: hidden; 
  position: relative;
  margin-top: 6%;
}

.slider img {
  width: 100%;
  height: 550px;
  object-fit: cover; 
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0; 
  filter: brightness(60%);
  animation: slide 12s infinite; 
}

/* Animación del slider */
@keyframes slide {
  0% {
    opacity: 0;
  }
  10%,
  30% {
    opacity: 1; /* Muestra la primera imagen */
  }
  33% {
    opacity: 0; /* Oculta la primera imagen */
  }
  33%,
  53% {
    opacity: 1; /* Muestra la segunda imagen */
  }
  56% {
    opacity: 0; /* Oculta la segunda imagen */
  }
  56%,
  76% {
    opacity: 1; /* Muestra la tercera imagen */
  }
  79% {
    opacity: 0; /* Oculta la tercera imagen */
  }
}

/* Añadir diferentes retrasos a cada imagen para que aparezcan secuencialmente */
.slider img:nth-child(1) {
  animation-delay: 0s;
}
.slider img:nth-child(2) {
  animation-delay: 4s;
}
.slider img:nth-child(3) {
  animation-delay: 8s;
}

</style>