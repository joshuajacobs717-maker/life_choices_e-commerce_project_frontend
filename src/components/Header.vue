<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showLogin = ref(false)
const isVisible = ref(true) // header visibility
let lastScrollY = window.scrollY

function toggleLogin() {
  showLogin.value = !showLogin.value
}

function handleScroll() {
  const currentScroll = window.scrollY
  if (currentScroll > lastScrollY && currentScroll > 30) {
    // scrolling down -> hide header
    isVisible.value = false
  } else {
    // scrolling up -> show header
    isVisible.value = true
  }
  lastScrollY = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="nav-container"
    :class="{ hidden: !isVisible }"
  >

    <!-- LEFT -->
    <div class="logo-container">
      <h2 class="logo">
        <i class="fa-solid fa-eye"></i> Impulsive Shopping
      </h2>
    </div>

    <!-- CENTER -->
    <div class="menu-container">
      <button><router-link class="link" to="/home">Home</router-link></button>
      <button>Brands</button>
      <button>Contact Us</button>
    </div>

    <!-- RIGHT -->
    <div class="right-section">
      <div class="cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>

      <div class="login-options">
        <button class="login-btn" @click="toggleLogin">Login</button>
        <button class="signup-btn">Sign Up</button>
      </div>
    </div>

  </header>

  <!-- LOGIN MODAL -->
  <div v-if="showLogin" class="modal-overlay" @click.self="toggleLogin">
    <div class="login-card">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button class="submit-btn">Login</button>
    </div>
  </div>
</template>

<style scoped>
/* MAIN NAVBAR */
.nav-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    background-color: transparent; 
    color: white;
    z-index: 1000;
    cursor: context-menu;
    transition: top 0.3s ease; /* Added for smooth hide/show */
}

/* Hides header */
.nav-container.hidden {
  top: -80px; /* moves header out of view */
}

/* LEFT */
.logo {
    font-weight: bold;
    color: #040404;
    background: transparent;
    padding: 3px;
    border-radius: 15px;
    margin-left: 10px;
}

/* CENTER */
.menu-container {
    display: flex;
    gap: 5px;
    margin-right: 180px;
}

.menu-container button {
    background-color: #e7e7e7;
    border: none;
    border-radius: 10px;
    padding: 3px;
    width: 100px;
    color: #040404;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s
}

.menu-container button:hover {
    color: #e7e7e7;
    background-color: #040404;
}

/* RIGHT SECTION */
.right-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

.cart {
    font-size: 20px;
    cursor: pointer;
    color: #040404;
}

.login-options {
    display: flex;
    gap: 10px;
    margin-right: 50px;
}

.login-btn,
.signup-btn {
    background: #040404;
    border: none;
    color: #e7e7e7;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s
}

.login-btn:hover,
.signup-btn:hover {
    background-color: #e7e7e7;
    color: #040404;
}

/* MODAL OVERLAY */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* LOGIN CARD */
.login-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal h2 {
  text-align: center;
}

.modal input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  padding: 10px;
  border: none;
  background-color: #040404;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #333;
}
</style>
