<template>
  <section>
      <p class="title"><span>Crea personaliza</span> i <span>comparte</span> tus entrenamientos</p>
      <div class="slider">
        <img src="../assets/img/deportes/slider/damm.jpg">
        <img src="../assets/img/deportes/slider/vestuario.jpg">
        <img src="../assets/img/deportes/slider/ciudadespanyol.jpg">
      </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.title {
font-size: 5vw;
text-transform: uppercase;
position: absolute;
color: white;
margin-top: 5%;
margin-left: 10%;
margin-right: 10%;
margin-bottom: 5%;
z-index: 1;
text-align: left;
line-height: 90%;
}

.title span {
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

@keyframes slide {
0% {
  opacity: 0;
}
10%, 30% {
  opacity: 1;
}
33% {
  opacity: 0;
}
33%, 53% {
  opacity: 1;
}
56% {
  opacity: 0;
}
56%, 76% {
  opacity: 1;
}
79% {
  opacity: 0;
}
}

.slider img:nth-child(1) {
animation-delay: 0s;
}
.slider img:nth-child(2) {
animation-delay: 4s;
}
.slider img:nth-child(3) {
animation-delay: 8s;
}

@media (max-width: 768px) {
.title {
  font-size: 8vw;
  margin-top: 20%;
}

.slider {
  height: 400px;
}

.slider img {
  height: 400px;
}
}

@media (max-width: 480px) {
.title {
  font-size: 10vw;
  margin-top: 25%;
}

.slider {
  height: 300px;
}

.slider img {
  height: 300px;
}
}
</style>
