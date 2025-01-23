<template>
    <div id="app">
      <Header />
      <main>
        <MainSection />
        <LogosSection />
        <Slider/>
        <ThreeText/>
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

  </style>
  