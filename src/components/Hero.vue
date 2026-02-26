<script>
export default {
  name: "Hero",
};
</script>

<template>
  <div class="hero-image">
    <div class="wave-background"></div>
    <div class="hero-text">
      <h1>See it, Want it, Get it</h1>
      <p>The thrill is in the click.</p>
      <div class="options-btn">
        <router-link class="btn-link" to="/ourstory"> Our Story </router-link>

        <router-link class="btn-link" to="/challenges">Challenges</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-image {
  position: relative;
  width: 100%;
  height: 60vh; /* adjust height as needed */
  overflow: hidden;
  background-color: #ffffff; /* fallback background */
}

/* Animated light grey waveform */
.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    to right,
    #545454 0px 2px,
    transparent 2px 8px
  );
  animation: waveMove 3s linear infinite;
  opacity: 0.3; /* subtle */
}

/* Wave animation */
@keyframes waveMove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Center the hero text */
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #111; /* dark text for light background */
}

.hero-text h1 {
  font-size: 3rem;
  margin: 0;
}

.hero-text p {
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
}

.hero-text button {
  padding: 10px 20px;
  border: none;
  background-color: #040404;
  color: #e7e7e7;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  transition: 0.2s;
}

.hero-text button:hover {
  background-color: #e7e7e7;
  color: #040404;
}

.btn-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #040404;
  color: #e7e7e7;
  font-size: 1rem;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 10px;
  margin-right: 10px;
  transition: 0.2s;
}

.btn-link:hover {
  background-color: #e7e7e7;
  color: #040404;
}

</style>
