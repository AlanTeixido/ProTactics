<script setup>
</script>

<template>
  <footer>
    <div class="footer-container">

      <!-- Información de contacto -->
      <div class="footer-section">
        <h2>Contactanos</h2>
        <p>Calle Falsa 123, Ciudad, País</p>
        <p>+34 123 456 789</p>
        <a href="https://workspace.google.com/intl/es/gmail/">protactics@gmail.com</a>
      </div>

      <!-- Métodos de pago -->
      <div class="footer-section">
        <p class="text-footer">Métodos de Pago</p>
        <ul class="payment-methods">
          <li><img src="../assets/img/bizum.png" /></li>
          <li><img src="../assets/img/mastercard.png" /></li>
          <li><img src="../assets/img/paypal.png" /></li>
          <li><img src="../assets/img/googlepay.png" /></li>
          <li><img src="../assets/img/applepay.png" /></li>
        </ul>
      </div>

      <!-- Redes sociales -->
      <div class="footer-section">
        <ul class="social-links">
          <li><a href="#"><img src="../assets/img/gmail.png" /></a></li>
          <li><a href="#"><img src="../assets/img/instagram.png" /></a></li>
          <li><a href="#"><img src="../assets/img/linkedin.png" /></a></li>
          <li><a href="#"><img src="../assets/img/x.png" /></a></li>
        </ul>
      </div>

    </div>

    <!-- Sección legal -->
    <div class="legals">
      <p>&copy; ProTactics</p>
      <p>|</p>

      <RouterLink to="/about" class="link">Sobre Nosotros</RouterLink>
      <RouterLink to="/contact" class="link">Contacto</RouterLink>

      <p>Aviso legal</p>
      <p>Política de privacidad</p>
    </div>
  </footer>
</template>

<style scoped>
.link{
  text-decoration: none;
  color: white;
}
footer {
  background-color: rgb(8, 8, 8);
  padding: 20px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  /* Asegura que todo se ajuste en pantallas pequeñas */
}

.footer-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  /* Alinea verticalmente */
  margin-top: 8%;
  flex-wrap: wrap;
}

.footer-section {
  margin: 5%;
  text-align: center;
  flex: 1 1 250px; /* Esto asegura que las secciones se ajusten correctamente en pantallas pequeñas */
}

.footer-section a{
  color: white;
  text-decoration: none;
}

.logo-container {
  text-align: center;
}

.logo {
  width: 80px;
  /* Ajusta el tamaño del logo */
}

.social-links,
.payment-methods {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* Espacio entre los íconos */
  list-style: none;
  padding: 0;
  margin: 0;
}

.text-footer {
  font-size: 0.5em;
  margin-bottom: 10px;
  /* Espacio entre el texto y las imágenes */
  text-transform: uppercase;
  font-weight: 600;
}

.social-links img {
  width: 25px;
  /* Tamaño de las imágenes de redes sociales */
}

.payment-methods img {
  width: 50px;
  /* Tamaño de las imágenes de los métodos de pago */
}

.legals {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 80%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  /* Espacio entre los enlaces legales */
}

@media (max-width: 768px) {
  footer {
    padding: 20px 5%;
  }

  .footer-container {
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }

  .footer-section {
    margin: 10px 0;
    flex: 1 1 100%; /* Cada sección ocupa el 100% del ancho */
    text-align: center;
  }

  .social-links, .payment-methods {
    flex-direction: column;
    gap: 15px;
  }

  .social-links img, .payment-methods img {
    width: 40px; /* Ajusta el tamaño de los iconos para pantallas más pequeñas */
  }

  .legals {
    flex-direction: column;
    gap: 1rem;
    font-size: 90%;
  }
}

@media (max-width: 480px) {
  footer {
    padding: 20px 3%;
  }

  .footer-container {
    margin-top: 0;
  }

  .social-links img, .payment-methods img {
    width: 30px; /* Ajusta aún más el tamaño de los iconos */
  }

  .legals {
    font-size: 85%;
  }
}

</style>
