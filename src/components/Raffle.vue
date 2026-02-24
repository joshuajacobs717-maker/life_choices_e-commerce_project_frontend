<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const countdown = ref("");

// June 1, 2026 at 00:00
const TARGET_DATE = new Date(2026, 5, 1, 0, 0, 0);

let timerId = null;

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    countdown.value = "Contest started!";
    if (timerId) clearInterval(timerId);
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (n) => String(n).padStart(2, "0");

  countdown.value = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

onMounted(() => {
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<template>
  <!-- HERO -->
  <div class="hero">
    <div class="hero-text">
      <h1>Keep Your Eye On The Prize</h1>
      <p>Win a trip, Get a discount, Win a coupon</p>
    </div>
  </div>

  <!-- COUNTDOWN (Liquid Glass) -->
  <div class="countdown">
    <h4>Next contest in: {{ countdown }}</h4>
  </div>

  <!-- HOW TO -->
  <div class="how-to">
    <h2>How to enter</h2>

    <div class="cards-con">
      <div class="card">
        <i class="fa-solid fa-coins"></i>
        <p>Add a R5 to any purchase</p>
      </div>

      <div class="card">
        <i class="fa-solid fa-ticket"></i>
        <p>You'll be entered into the draw</p>
      </div>

      <div class="card">
        <i class="fa-solid fa-award"></i>
        <p>Win one of 3 prizes</p>
      </div>
    </div>
  </div>

  <!-- PRIZES -->
  <div class="prizes-con">
    <h3>Prizes</h3>

    <div class="prize prize-one">
      <p>🥇 First Place: All paid week trip to Goudini Spa</p>
    </div>

    <div class="prize prize-two">
      <p>🥈 Second Place: 25% off your next purchase</p>
    </div>

    <div class="prize prize-three">
      <p>🥉 Third Place: R500 coupon</p>
    </div>
  </div>
</template>

<style>

/* HERO */
.hero {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
}

.hero-text {
  position: absolute;
  color: #000000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* ============================= */
/* COUNTDOWN - LIQUID GLASS */
/* ============================= */

.countdown {
  position: relative;
  margin: 2rem auto;
  padding: 20px 32px;
  width: fit-content;

  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);

  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);

  text-align: center;
  font-weight: bold;

  overflow: hidden;
}

/* Subtle glass highlight */
.countdown::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 24px;
  pointer-events: none;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.05)
  );

  opacity: 0.6;
}

.countdown h4 {
  position: relative;
  margin: 0;
  font-size: 1.3rem;
  color: #111;
  letter-spacing: 0.5px;
}

/* HOW TO */
.how-to {
  position: relative;
  padding: 3rem 2rem 2rem;
  background: #c8c8c8;
  border-radius: 8px;
}

.how-to h2 {
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0;
}

/* CARDS */
.cards-con {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}

.card i {
  font-size: 2.8rem;
}

/* PRIZES */
.prizes-con {
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 10px;
  justify-content: space-between;
  background-color: #c8c8c8;
  border-radius: 8px;
}

.prizes-con h3 {
  width: 100%;
  margin-bottom: 1rem;
}

.prize {
  flex: 1 1 30%;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  background-color: #eeebeb;
}

.prize:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 25px #b6b6b699;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .cards-con,
  .prizes-con {
    flex-direction: column;
  }

  .card,
  .prize {
    flex: 1 1 100%;
  }
}

</style>