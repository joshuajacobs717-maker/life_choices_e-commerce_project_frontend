<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const isVisible = ref(true)
const router = useRouter()
let lastScrollY = window.scrollY

function goToAuth(mode) {
  router.push({
    path: '/auth',
    query: { mode },
  })
}

function handleScroll() {
  const currentScroll = window.scrollY

  if (currentScroll > lastScrollY && currentScroll > 30) {
    isVisible.value = false
  } else {
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
      <a 
        href="https://youtu.be/pvbU_Ouj2Wc"
        target="_blank"
        rel="noopener noreferrer"
        class="logo-link"
      >
        <h2 class="logo">
          <i class="fa-solid fa-eye"></i>
          Impulsive Shopping
        </h2>
      </a>
    </div>

    <!-- CENTER -->
    <div class="menu-container">
      <button>
        <router-link class="link" to="/home">Home</router-link>
      </button>
      <button>
        <router-link class="link" to="/companies">Companies</router-link>
      </button>
      <button>
        <router-link class="link" to="/contact">Contact Us</router-link>
      </button>
    </div>

    <!-- RIGHT -->
    <div class="right-section">
      <div class="cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>

      <div class="login-options">
        <button class="login-btn" @click="goToAuth('login')">
          Login
        </button>
        <button class="signup-btn" @click="goToAuth('register')">
          Sign Up
        </button>
      </div>
    </div>

  </header>
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

  padding: 0 20px;

  background-color: transparent;
  color: #040404;
  z-index: 1000;

  transition: top 0.3s ease;
}

/* Hide on scroll */
.nav-container.hidden {
  top: -80px;
}

/* LOGO */
.logo-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.logo {
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-link:hover {
  opacity: 0.8;
}

/* CENTER MENU */
.menu-container {
  display: flex;
  gap: 10px;
}

.menu-container button {
  background-color: #E7E7E7;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  width: 120px;

  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.menu-container button:hover {
  background-color: #040404;
}

.link {
  text-decoration: none;
  color: #040404;
}

.menu-container button:hover .link {
  color: #E7E7E7;
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
}

.login-options {
  display: flex;
  gap: 10px;
}

.login-btn,
.signup-btn {
  background: #040404;
  border: none;
  color: #E7E7E7;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s ease;
}

.login-btn:hover,
.signup-btn:hover {
  background-color: #E7E7E7;
  color: #040404;
}

</style>