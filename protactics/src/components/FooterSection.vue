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
      </div>

      <!-- Métodos de pago -->
      <div class="footer-section">
        <p class="text-footer">Métodos de Pago</p>
        <ul class="payment-methods">
          <li><img src="../assets/img/bizum.png"  /></li>
          <li><img src="../assets/img/mastercard.png"  /></li>
          <li><img src="../assets/img/paypal.png" /></li>
          <li><img src="../assets/img/googlepay.png"  /></li>
          <li><img src="../assets/img/applepay.png"  /></li>
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

</style>
