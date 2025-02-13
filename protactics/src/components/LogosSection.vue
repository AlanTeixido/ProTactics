<template>
    <section class="logos-section">
      <h3>Algunos de nuestros clubs</h3>
      <div class="logos">
      <img src="../assets/img/oxygen.png" class="popup-image" ref="image1"/>
      <img src="../assets/img/cornella.png" class="popup-image" ref="image2"/>
      <img src="../assets/img/rcdespanyol.png" class="popup-image" ref="image3"/>
      <img src="../assets/img/triatloprat.png" class="popup-image" ref="image4"/>
      <img src="../assets/img/uae.png" class="popup-image" ref="image5"/>
    </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const image1 = ref(null);
  const image2 = ref(null);
  const image3 = ref(null);
  const image4 = ref(null);
  const image5 = ref(null);
  
  // Detectar cuando el elemento entra en la vista
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('popup-in-view');
      }
    });
  };
  
  onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
  
    // Observar los textos e imágenes
    observer.observe(image1.value);
    observer.observe(image2.value);
    observer.observe(image3.value);
    observer.observe(image4.value);
    observer.observe(image5.value);
  });
  </script>
  
  <style scoped>
 .popup-image {
    opacity: 0;
    transform: scale(0.5);  /* Inicia pequeño */
    transition: opacity 0.6s ease, transform 0.6s ease;
    margin: 20px 0;
  }
  
  .popup-image.popup-in-view {
    opacity: 1;
    transform: scale(1); /* Toma el tamaño original */
  }

  .logos-section {
  display: block;
  justify-content: center;
  padding: 5rem 0;
  border-radius: 10px;
  margin-bottom: 3rem;
}
.logos-section h3{
  font-weight: 400;
  text-align: center;
  margin-bottom: 2%;
}
.logos-section img {
  height: 90px;
  object-fit: contain;
}
.logos{
  display: flex;
  justify-content: center;
  gap: 2em;
}
  
  </style>
  