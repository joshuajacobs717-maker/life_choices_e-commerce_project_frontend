<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const isVisible = ref(true)
const router = useRouter()
const store = useStore()

let lastScrollY = window.scrollY

// ✅ Check if user is logged in
const isLoggedIn = computed(() => {
  return !!store.state.token && !!store.state.user
})

function goToAuth(mode) {
  router.push({
    path: '/auth',
    query: { mode },
  })
}

// ✅ Logout function
async function logout() {
  try {
    await store.dispatch('logout') // must exist in Vuex
  } catch (e) {
    console.warn('Logout fallback triggered')
  }

  // Fallback if no Vuex logout action exists
  store.commit('SET_TOKEN', null)
  store.commit('SET_USER', null)
  localStorage.removeItem('token')

  router.push('/home')
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
  <header class="nav-container" :class="{ hidden: !isVisible }">

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
      <button><router-link class="link" to="/home">Home</router-link></button>
      <button><router-link class="link" to="/companies">Businesses</router-link></button>
      <button><router-link class="link" to="/contact">Contact Us</router-link></button>
    </div>

    <!-- RIGHT -->
    <div class="right-section">
      <router-link class="cart-link" to="/cart" aria-label="Go to cart">
        <div class="cart">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </router-link>

      <!-- ✅ IF LOGGED IN -->
      <div v-if="isLoggedIn" class="login-options">
        <button class="logout-btn" @click="logout">
          Logout
        </button>
      </div>

      <!-- ✅ IF NOT LOGGED IN -->
      <div v-else class="login-options">
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

/* Add logout button style */
.logout-btn {
  background: #b00020;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

.logout-btn:hover {
  background: #040404;
  color: #E7E7E7;
}

/* (your existing styles remain unchanged below) */

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

.nav-container.hidden {
  top: -80px;
}

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

.menu-container {
  display: flex;
  gap: 10px;
  margin-right: 150px;
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

.right-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart {
  font-size: 20px;
  cursor: pointer;
  color: inherit;
}

.cart-link {
  background: #040404;
  color: #E7E7E7;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.cart-link:hover {
  background-color: #E7E7E7;
  color: #040404;
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
  border-radius: 5px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

.login-btn:hover,
.signup-btn:hover {
  background-color: #E7E7E7;
  color: #040404;
}
</style>