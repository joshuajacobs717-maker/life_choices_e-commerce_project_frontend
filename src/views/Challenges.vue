<script setup>
import { ref, onMounted } from "vue";
import Milestone from "../components/MilestoneTrack.vue";
import Raffle from "../components/Raffle.vue";
import SnakeGame from "../components/SnakeGame.vue"; // ✅ NEW

const showPage = ref(false);
const showLoader = ref(true);
const audioRef = ref(null);

onMounted(() => {
  const TOTAL_MS = 3200;

  setTimeout(() => {
    showPage.value = true;
  }, 2300);

  setTimeout(() => {
    showLoader.value = false;

    // 🔥 Play AFTER loader disappears (better autoplay success rate)
    if (audioRef.value) {
      audioRef.value.volume = 0.4;
      audioRef.value.play().catch(() => {
        console.log("Autoplay blocked by browser");
      });
    }
  }, TOTAL_MS);
});

// ✅ optional: listen for discount unlock
function onDiscountUnlocked(payload) {
  // payload = { discountPercent: 5, apples: 50 }
  console.log("Discount unlocked:", payload);
  // If you have a Pinia cart/store, this is where you'd apply it
}
</script>

<template>
  <main class="challenges">
    <div class="bg-layer" aria-hidden="true">
      <div class="color-string color-1"></div>
      <div class="color-string color-2"></div>
      <div class="color-string color-3"></div>
      <div class="color-string color-4"></div>
      <div class="color-string color-5"></div>
      <div class="color-string color-6"></div>
      <div class="color-string color-7"></div>
      <div class="color-string color-8"></div>
      <div class="color-string color-9"></div>
      <div class="color-string color-10"></div>
      <div class="color-string color-11"></div>
      <div class="color-string color-12"></div>
      <div class="color-string color-13"></div>
      <div class="color-string color-14"></div>
      <div class="color-string color-15"></div>
      <div class="color-string color-16"></div>
    </div>

    <div v-if="showLoader" class="spiral-loader" aria-hidden="true">
      <div class="spiral"></div>
      <div class="spiral-color"></div>
    </div>

    <div v-show="showPage" class="page">
      <div class="left">
        <Raffle />
      </div>

      <div class="right">
        <Milestone />

        <!-- ✅ Snake game sits under milestone -->
        <section class="snake-slot">
          <SnakeGame @discount-unlocked="onDiscountUnlocked" />
        </section>
      </div>
    </div>
  </main>

  <!-- 🔊 Hidden Background Audio -->
  <audio ref="audioRef" loop preload="auto">
    <source
      src="../assests/mfcc-lounge-jazz-elevator-music-372734 (1).mp3"
      type="audio/mpeg"
    />
  </audio>
</template>

<style scoped>
audio {
  display: none;
}

.challenges {
  position: relative;

  /* ✅ grows with content (so background can be seen when scrolling) */
  min-height: 100%;
  overflow: hidden;

  background: linear-gradient(135deg, #f2f2f2, #ffffff);
  animation: bgShift 14s ease infinite alternate;
}

/* background layer stretches the full height of .challenges */
.bg-layer {
  position: absolute;
  inset: 0; /* ✅ fills whole .challenges area */
  z-index: 0;
  pointer-events: none;
}

@keyframes bgShift {
  0% {
    background: linear-gradient(135deg, #f1f1f1, #ffffff);
  }
  50% {
    background: linear-gradient(135deg, #eaeaea, #ffffff);
  }
  100% {
    background: linear-gradient(135deg, #f7f7f7, #efefef);
  }
}

/* ----------- COLOR STRINGS (NOW FILL WHOLE SECTION HEIGHT) ----------- */
.color-string {
  position: absolute;
  left: 0;

  width: 120vmax;
  height: 10px;
  border-radius: 999px;

  opacity: 0;
  filter: blur(1px) saturate(320%) contrast(110%);
  pointer-events: none;

  animation: floatRandom 11s linear infinite;
}

/* ✅ each streak starts at a different vertical zone */
.color-1 {
  top: 10%;
  background: linear-gradient(90deg, #ff00ff, #00d4ff, #00ff6a);
  animation-delay: 0s;
}
.color-2 {
  top: 25%;
  background: linear-gradient(90deg, #ff3b3b, #ffdd57, #ff00cc);
  animation-delay: 2.2s;
}
.color-3 {
  top: 40%;
  background: linear-gradient(90deg, #00ffcc, #4aa3ff, #b14dff);
  animation-delay: 4.4s;
}
.color-4 {
  top: 55%;
  background: linear-gradient(90deg, #66ff00, #00ffcc, #0099ff);
  animation-delay: 6.6s;
}
.color-5 {
  top: 70%;
  background: linear-gradient(90deg, #ffd000, #ff6a00, #ff0066);
  animation-delay: 7.8s;
}
.color-6 {
  top: 85%;
  background: linear-gradient(90deg, #7c3cff, #00d4ff, #00ff9d);
  animation-delay: 9.1s;
}
.color-7 {
  top: 5%;
  background: linear-gradient(90deg, #ff5f6d, #ffc371);
  animation-delay: 1.1s;
}
.color-8 {
  top: 15%;
  background: linear-gradient(90deg, #24c6dc, #514a9d);
  animation-delay: 3.3s;
}
.color-9 {
  top: 20%;
  background: linear-gradient(90deg, #ff9966, #ff5e62);
  animation-delay: 5.5s;
}
.color-10 {
  top: 30%;
  background: linear-gradient(90deg, #00f260, #0575e6);
  animation-delay: 7.7s;
}
.color-11 {
  top: 35%;
  background: linear-gradient(90deg, #e1eec3, #f05053);
  animation-delay: 8.9s;
}
.color-12 {
  top: 45%;
  background: linear-gradient(90deg, #f953c6, #b91d73);
  animation-delay: 10.1s;
}
.color-13 {
  top: 60%;
  background: linear-gradient(90deg, #43cea2, #185a9d);
  animation-delay: 11.3s;
}
.color-14 {
  top: 75%;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  animation-delay: 13.5s;
}
.color-15 {
  top: 80%;
  background: linear-gradient(90deg, #a1ffce, #faffd1);
  animation-delay: 14.7s;
}
.color-16 {
  top: 95%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  animation-delay: 15.9s;
}

/* Move left-to-right across the section */
@keyframes floatRandom {
  0% {
    transform: translateX(-140vw) rotate(8deg);
    opacity: 0;
  }
  12% {
    opacity: 0.85;
  }
  50% {
    transform: translateX(40vw) rotate(-8deg);
    opacity: 0.9;
  }
  88% {
    opacity: 0.75;
  }
  100% {
    transform: translateX(140vw) rotate(8deg);
    opacity: 0;
  }
}

/* ---------------- Loader Overlay ---------------- */
.spiral-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #fff;
  display: grid;
  place-items: center;
  overflow: hidden;

  animation: overlayOut 0.8s ease forwards;
  animation-delay: 2.3s;
}

.spiral,
.spiral-color {
  position: absolute;
  width: 140vmax;
  height: 140vmax;
  border-radius: 50%;
  background: repeating-conic-gradient(from 0deg, #000 0deg 10deg, #fff 10deg 20deg);
  filter: contrast(140%) brightness(105%);
  animation: spin 3.6s linear infinite;
}

.spiral-color {
  background: repeating-conic-gradient(
    from 0deg,
    #ff3b3b 0deg 10deg,
    #ffdd57 10deg 20deg,
    #2ee59d 20deg 30deg,
    #4aa3ff 30deg 40deg,
    #b14dff 40deg 50deg
  );
  mix-blend-mode: multiply;
  opacity: 0;
  animation: spin 2.6s linear infinite, colorIn 2.3s ease forwards;
}

/* ---------------- Page Layout ---------------- */
.page {
  position: relative;
  z-index: 1; /* ✅ above bg-layer */

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  padding: 40px;

  min-height: 100vh;
  box-sizing: border-box;

  animation: pageIn 0.6s ease both;
}

.left,
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ✅ spacing between Milestone and Snake */
.right {
  gap: 18px;
}

/* ✅ Snake fits inside the right column nicely */
.snake-slot {
  width: 100%;
  max-width: 720px; /* prevents it from getting too wide on huge screens */
}

/* Make the snake component scale down cleanly */
.snake-slot :deep(.game) {
  grid-template-columns: 1fr; /* stack board + controls inside right column */
}

.snake-slot :deep(.controls) {
  grid-template-columns: 1fr;
}

/* Slightly shrink canvas on smaller screens */
@media (max-width: 1100px) {
  .snake-slot {
    max-width: 100%;
  }
}

@media (max-width: 900px) {
  .page {
    flex-direction: column;
    padding: 24px 16px;
  }

  .snake-slot :deep(.board) {
    width: 100%;
    max-width: 420px;
    height: auto;
  }
}

/* ---------------- Animations ---------------- */
@keyframes spin {
  to {
    transform: rotate(360deg) scale(1.02);
  }
}

@keyframes colorIn {
  0% {
    opacity: 0;
    filter: saturate(0%);
  }
  100% {
    opacity: 1;
    filter: saturate(140%);
  }
}

@keyframes overlayOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spiral,
  .spiral-color,
  .spiral-loader,
  .page,
  .color-string,
  .challenges {
    animation: none !important;
  }
  .spiral-color {
    opacity: 1;
  }
  .color-string {
    opacity: 0.55;
  }
}
</style>
