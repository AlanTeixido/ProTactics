<template>
  <div id="app">
    <Header />
    <main>
      <div class="intro">
        <h1>PROTACTICS</h1>
        <p>¡Conecta, crea gana!</p>
        <button class="cta-button">Empezar</button>
        <img src="../assets/img/FondoHome2.png" alt="">
      </div>
      <MainSection />
      <LogosSection />
      <Slider />
      <ThreeText />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import MainSection from '../components/MainSection.vue'
import LogosSection from '../components/LogosSection.vue'
import Footer from '../components/Footer.vue'
import Slider from '../components/Slider.vue'
import ThreeText from '@/components/ThreeText.vue'
</script>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: rgb(48, 48, 48);
  margin-top: 20%;
  margin-bottom: 20%;
  position: relative;
}

.intro h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1000%;
  color: rgb(48, 48, 48);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}

img {
  width: 80%;
  position: absolute;
  z-index: -1;
  opacity: 50%;
}

.cta-button {
  background-color: transparent;
  color: rgb(48, 48, 48);
  border: 2px rgb(48, 48, 48) solid;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;
  margin-top: 1rem;
}

.cta-button:hover {
  transform: scale(1.1);
}
</style>