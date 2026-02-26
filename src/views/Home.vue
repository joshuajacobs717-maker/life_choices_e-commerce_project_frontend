<script setup>
import { ref, onMounted } from 'vue'

import Hero from '../components/Hero.vue'
import TopCat from '../components/CategoryDiv.vue'
import Products from '../components/ProductsDiv.vue'
import Questions from '../components/FrequentlyAskDiv.vue'


const showBlink = ref(true)

onMounted(() => {
  setTimeout(() => {
    showBlink.value = false
  }, 900) // matches animation time
})
</script>

<template>
  <!-- Page content loads immediately -->
  <Hero />
  <TopCat />
  <Products />
  <Questions />


  <!-- FULLSCREEN PIXEL EYE -->
  <div v-if="showBlink" class="eye-overlay">
    <div class="eye">
      <div class="iris"></div>
    </div>
  </div>
</template>

<style>
/* Overlay covers entire screen */
.eye-overlay {
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;

}

/* FULLSCREEN OVAL EYE */
.eye {
  width: 140vw;
  height: 100vh;
  background: white;

  border-radius: 50% / 60%;

  position: relative;

  /* Pixel look */
  image-rendering: pixelated;

  animation: blink 0.9s ease-in-out forwards;
}

/* IRIS */
.iris {
  width: 15vw;
  height: 15vw;
  background: radial-gradient(circle, black);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  image-rendering: pixelated;
}

/* Blink animation */
@keyframes blink {
  0% {
    transform: scaleY(0);
  }
  30% {
    transform: scaleY(1);
  }
  70% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0);
  }
}
</style>