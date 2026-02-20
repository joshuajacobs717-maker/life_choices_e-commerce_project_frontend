<script setup>
import { ref } from 'vue'

const form = ref({
  fullName: '',
  email: '',
  subject: '',
  orderNumber: '',
  message: '',
})

const isSubmitted = ref(false)

function submitContact() {
  isSubmitted.value = true
  form.value = {
    fullName: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: '',
  }
}
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero">
      <div class="wave-background" aria-hidden="true"></div>
      <div class="hero-content">
        <h1>Contact Us</h1>
        <p>
          Need help with an order, account access, returns, or product details? Reach out and
          our support team will get back to you.
        </p>
      </div>
    </section>

    <section class="contact-layout">
      <div class="contact-details">
        <article class="detail-card">
          <h3><i class="fa-regular fa-envelope"></i> Email Support</h3>
          <p>support@impulsiveshopping.com</p>
          <span>Best for account, delivery, and return questions.</span>
        </article>

        <article class="detail-card">
          <h3><i class="fa-solid fa-phone"></i> Call Us</h3>
          <p>+1 (800) 555-0142</p>
          <span>Monday to Friday, 9:00 AM - 6:00 PM (PST)</span>
        </article>

        <article class="detail-card">
          <h3><i class="fa-solid fa-location-dot"></i> Office Address</h3>
          <p>210 Market Street, San Francisco, CA 94103</p>
          <span>Visits by appointment only.</span>
        </article>

        <article class="detail-card">
          <h3><i class="fa-solid fa-circle-info"></i> Support Details</h3>
          <p>Typical response time: Within 24 hours (business days)</p>
          <span>Include your order number for faster support.</span>
        </article>
      </div>

      <form class="contact-form" @submit.prevent="submitContact">
        <h2>Send Us a Message</h2>
        <p>We usually reply within one business day.</p>

        <label for="full-name">Full Name</label>
        <input id="full-name" v-model="form.fullName" type="text" required />

        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />

        <label for="subject">Subject</label>
        <input id="subject" v-model="form.subject" type="text" required />

        <label for="order-number">Order Number (Optional)</label>
        <input id="order-number" v-model="form.orderNumber" type="text" />

        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="5" required></textarea>

        <button type="submit">Send Message</button>

        <p v-if="isSubmitted" class="success-msg">
          Message sent. We will get back to you soon.
        </p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.contact-hero {
  position: relative;
  height: 60vh;
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: #ffffff;
}

.wave-background {
  position: absolute;
  inset: 0;
  width: 200%;
  background: repeating-linear-gradient(to right, #545454 0px 2px, transparent 2px 8px);
  animation: waveMove 3s linear infinite;
  opacity: 0.24;
}

@keyframes waveMove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.hero-content {
  max-width: 760px;
  padding: 0 16px;
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  margin: 0;
  font-size: 3rem;
  color: #111;
}

.hero-content p {
  margin-top: 14px;
  font-size: 1.05rem;
  color: #424242;
}

.contact-layout {
  max-width: 1200px;
  margin: 42px auto 0;
  padding: 0 24px 30px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
}

.contact-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 16px;
}

.detail-card {
  background: #f0f0f0;
  border: 1px solid #dfdfdf;
  border-radius: 12px;
  padding: 18px;
}

.detail-card h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #111;
}

.detail-card p {
  margin: 14px 0 8px;
  color: #232323;
  font-size: 0.97rem;
  line-height: 1.45;
}

.detail-card span {
  color: #666;
  font-size: 0.85rem;
}

.contact-form {
  background: #ebebeb;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d8d8d8;
}

.contact-form h2 {
  margin: 0;
  font-size: 1.65rem;
  color: #131313;
}

.contact-form p {
  margin: 8px 0 18px;
  color: #676767;
  font-size: 0.9rem;
}

.contact-form label {
  font-size: 0.9rem;
  color: #2a2a2a;
  margin: 10px 0 6px;
}

.contact-form input,
.contact-form textarea {
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.95rem;
  background: #f7f7f7;
  color: #171717;
  font-family: inherit;
}

.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form button {
  margin-top: 16px;
  height: 44px;
  border: 0;
  border-radius: 8px;
  background: #040404;
  color: #e7e7e7;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.contact-form button:hover {
  opacity: 0.85;
}

.success-msg {
  margin: 12px 0 0;
  color: #1d7f3f;
  font-weight: 500;
}

@media (max-width: 980px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .contact-details {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }

  .hero-content p {
    font-size: 0.95rem;
  }

  .contact-layout {
    padding: 0 16px 20px;
  }

  .contact-details {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 18px;
  }
}
</style>
