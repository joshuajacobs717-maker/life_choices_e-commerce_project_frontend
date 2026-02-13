<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import ShopBy from './components/CategoryDiv.vue'

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
  <div class="app">

    <!-- Scroll Progress Bar -->
    <div class="scroll-bar">
      <div 
        class="scroll-progress" 
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <Header/>
    <Hero/>
    <ShopBy/>
  </div>
</template>

<style>
body {
  margin: 0;
}

.app {
  min-height: 100vh;
  background-color: #ffffff;
  color: #000000;

  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
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
