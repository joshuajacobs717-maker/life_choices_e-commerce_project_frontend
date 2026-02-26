<script setup>
import Socials from '../components/Socials.vue';
</script>

<template>
  <main class="story-page">
    
    <!-- HERO -->
    <section class="story-hero">
      <div class="wave-background"></div>

      <div class="hero-content">
        <h3>Who We Are</h3>
        <h1>Our Story</h1>
        <p class="intro">
          Impulsive Shopping started with one goal: make online shopping feel fast,
          fun, and stress-free. We focus on products people actually use and service
          people actually remember.
        </p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="story-content">
      <article class="story-block">
        <h2>How It Started</h2>
        <p>
          In 2024, we launched as a small student-led e-commerce project with a
          simple idea: people should be able to discover useful products without
          endless scrolling. We began by curating a few product categories and
          listening closely to customer feedback.
        </p>
      </article>

      <article class="story-block">
        <h2>What We Stand For</h2>
        <ul>
          <li>Simple shopping experience with clear product information.</li>
          <li>Fast and reliable customer support for every order.</li>
          <li>Honest pricing with no confusing checkout surprises.</li>
          <li>Continuous improvement based on real customer needs.</li>
        </ul>
      </article>

      <article class="story-block">
        <h2>Where We Are Going</h2>
        <p>
          We are expanding our catalog, improving delivery performance,
          and building better tools to help customers find the right
          product faster. Our next chapter is all about smarter
          recommendations and stronger community trust.
        </p>
      </article>
    </section>
    
    <Socials />
  </main>
</template>

<style scoped>

/* HERO */
.story-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: #ffffff;
  z-index: 0; /* create stacking context */
}

/* WAVE BACKGROUND — NOW ACTUALLY BEHIND */
.wave-background {
  position: absolute;
  inset: 0;
  width: 200%;
  background: repeating-linear-gradient(
    to right,
    #545454 0px 2px,
    transparent 2px 8px
  );
  animation: waveMove 3s linear infinite;
  opacity: 0.18;
  z-index: -1;
}

@keyframes waveMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* HERO CONTENT */
.hero-content {
  position: relative;
  z-index: 1;
  width: min(860px, 100%);
  padding: 20px;
}

.hero-content h3 {
  margin: 0;
  font-weight: 500;
  color: #444;
}

.hero-content h1 {
  margin: 12px 0 0;
  font-size: 3.4rem;
  color: #111111;
}

.intro {
  margin: 14px auto 0;
  max-width: 700px;
  color: #3d3d3d;
  line-height: 1.6;
  font-size: 1.05rem;
}

/* STORY CONTENT */
.story-content {
  max-width: 980px;
  margin: 0 auto;
  padding: 50px 20px 30px;
  display: grid;
  gap: 24px;
}

.story-block {
  background: #efefef;
  border: 1px solid #dfdfdf;
  border-radius: 12px;
  padding: 24px;
}

.story-block h2 {
  margin: 0;
  font-size: 1.45rem;
  color: #151515;
}

.story-block p {
  margin: 12px 0 0;
  line-height: 1.65;
  color: #333333;
}

.story-block ul {
  margin: 12px 0 0;
  padding-left: 20px;
  color: #333333;
  line-height: 1.75;
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .hero-content h1 {
    font-size: 2.4rem;
  }

  .intro {
    font-size: 0.95rem;
  }

  .story-block {
    padding: 18px;
  }
}
</style>
