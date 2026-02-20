<script setup>
import { ref, onMounted } from 'vue'

const countdown = ref('')

function updateCountdown() {
  const now = new Date()
  // Set target date 3 months from now
  const target = new Date()
  target.setMonth(target.getMonth() + 3)

  const diff = target - now
  if (diff <= 0) {
    countdown.value = 'Contest started!'
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
}

onMounted(() => {
  updateCountdown()
  setInterval(updateCountdown, 1000)
})
</script>

<template>
  <div class="hero">
    <img class="hero-background" src="https://i.postimg.cc/fyP4q2k2/eye.gif" alt="Hero Background">
    <h1>Keep Your Eye On The Prize</h1>
    <p>Win a trip to one of 5 places</p>
  </div>

  <div class="countdown">
    <h4>Next contest in: {{ countdown }}</h4>
  </div>

  <div class="how-to">
    <h3>How to enter</h3>
    <div class="cards-con">
      <div class="card"><p><i class="fa-solid fa-coins"></i> Add a R5 to any purchase</p></div>
      <div class="card"><p><i class="fa-solid fa-ticket"></i> You'll be entered into the draw</p></div>
      <div class="card"><p><i class="fa-solid fa-award"></i> Win one of 3 prizes</p></div>
    </div>
  </div>

  <div class="prizes-con">
    <h3>Prizes</h3>
    <div class="prize"><p>All paid week trip to Goudini Spa</p></div>
    <div class="prize"><p>25% off your next purchase</p></div>
    <div class="prize"><p>R500 coupon</p></div>
  </div>
</template>

<style>
/* Hero Section */
.hero {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
}

.hero img.hero-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero h1,
.hero p {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
}

.hero p {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

/* Countdown */
.countdown {
  text-align: center;
  margin: 2rem 0;
}

/* How-to Section */
.how-to {
  position: relative;
  padding: 2rem;
  background: #f5f5f5;
}

.how-to h3 {
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0;
}

/* Cards container */
.cards-con {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem; /* make room for h3 */
  flex-wrap: wrap;
}

.card {
  flex: 1 1 30%;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
}

.card p {
  margin: 0;
  font-size: 1rem;
}

/* Prizes Section */
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
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
}
</style>