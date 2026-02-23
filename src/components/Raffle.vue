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
    <img
      class="hero-background"
      src="https://i.postimg.cc/Cx15yBcp/eyes-black.gif"
      alt="Hero Background"
    />
    <div class="hero-text">
      <h1>Keep Your Eye On The Prize</h1>
      <p>Win a trip, Get a discount, Win a coupon</p>
    </div>
  </div>

  <!-- COUNTDOWN -->
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

.hero-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* COUNTDOWN */
.countdown {
  text-align: center;
  margin: 2rem 0;
  font-weight: bold;
}

/* HOW TO */
.how-to {
  position: relative;
  padding: 3rem 2rem 2rem;
  background: #f5f5f5;
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
  color: #24e5ff;
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
  justify-content: space-between;
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
}

/* GOLD */
.prize-one:hover {
  background: linear-gradient(135deg, #fdd81b, #ffb347, #d4af37);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}

/* SILVER */
.prize-two:hover {
  background: linear-gradient(135deg, #f0f0f0, #9d9d9d, #8f8f8f);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 25px rgba(192, 192, 192, 0.6);
}

/* BRONZE */
.prize-three:hover {
  background: linear-gradient(135deg, #e28426, #b87333, #773a01);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 25px rgba(205, 127, 50, 0.6);
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