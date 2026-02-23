<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const scrollProgress = ref(0)

const updateScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
}

onMounted(() => {
  window.addEventListener("scroll", updateScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", updateScroll)
})
</script>

<template>
  <div class="customer-layout">

    <div class="scroll-bar">
      <div 
        class="scroll-progress" 
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <!-- <Header v-if="!$route.meta.hideLayout"/> -->
    <Header/>
    <router-view />
    <Footer/>
    <!-- <Footer v-if="!$route.meta.hideLayout"/> -->
    
  </div>
</template>

<style>
body {
  margin: 0;
}

.customer-layout {
  min-height: 100vh;
  background-color: #ffffff;
  color: #000000;

  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.link {
  text-decoration: none;
  color: inherit; /* or set a specific color, e.g., #000 */
}

/* Scroll Bar Container */
.scroll-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 9999;
}

/* Animated Progress */
.scroll-progress {
  height: 100%;
  background: #000000;
  transition: width 0.1s ease-out;
}
</style>
