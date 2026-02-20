<script>
export default {
    name: 'Footer',
      data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}

</script>

<template>
  <section class="footer-content">
    <div class="footer-grid">
      
      <div class="footer-col">
        <h3>Social Media</h3>
        <div class="social-icons">
          <a href="#" aria-label="Facebook">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="#" aria-label="Threads">
            <i class="fa-brands fa-threads"></i>
          </a>
          <a href="#" aria-label="X">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h3>Our Store</h3>
        <router-link class="footer-link" to="/">Home</router-link>
        <router-link class="footer-link" to="/products">All Collections</router-link>
        <router-link class="footer-link" to="/products">Shop All</router-link>
      </div>

      <div class="footer-col">
        <h3>Information</h3>
        <a class="footer-link" href="#">Warranty Information</a>
        <a class="footer-link" href="#">Privacy Policy</a>
        <a class="footer-link" href="#">Terms & Conditions</a>
      </div>

      <div class="footer-col">
        <h3>Contact</h3>
        <a class="footer-link" href="mailto:info@example.com">
          info@example.com
        </a>
        <a class="footer-link" href="tel:1234567890">
          1234567890
        </a>
      </div>

    </div>
  </section>

  <section class="footer-bottom">
    <p>© {{ currentYear }} - Store Name. All Rights Reserved</p>

    <div class="payment-badges">
      <span><i class="fa-brands fa-cc-visa"></i></span>
      <span><i class="fa-brands fa-cc-mastercard"></i></span>
      <span><i class="fa-brands fa-cc-amex"></i></span>
      <span><i class="fa-brands fa-paypal"></i></span>
    </div>
  </section>
</template>

<style>
.footer-content {
  background: #EAEAEA;
  padding: 56px 24px;
}

.footer-grid {
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 40px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-col h3 {
  margin: 0 0 16px;
  font-size: 1.2rem;
  font-weight: 500;
}

.footer-link {
  text-decoration: none;
  color: #1F1F1F;
  margin-bottom: 12px;
  font-size: 0.95rem;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 0.65;
}

.social-icons {
  display: flex;
  gap: 14px;
}

.social-icons a {
  color: #1F1F1F;
  text-decoration: none;
  font-size: 1.1rem;
  transition: opacity 0.2s ease;
}

.social-icons a:hover {
  opacity: 0.65;
}

.footer-bottom {
  background: #EAEAEA;
  border-top: 1px solid #767676;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer-bottom p {
  margin: 0;
  color: #3C3C3C;
  font-size: 0.86rem;
}

.payment-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.payment-badges span {
  padding: 5px 9px;
  border: 1px solid #C8C8C8;
  border-radius: 4px;
  background: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  color: #3D3D3D;
}

/* Responsive */
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    gap: 28px;
  }
}

@media (max-width: 680px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
