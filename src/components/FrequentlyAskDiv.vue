<script>
export default {
  name: "Questions",

  data() {
    return {
      activeIndex: null,
    };
  },

  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<template>
  <div class="faq-container">
    <h3>Frequently Asked Questions</h3>

    <!-- Question 1 -->
    <button class="drop-btn" @click="toggle(0)">
      How does the 10% discount challenge work?
      <i class="fa-solid fa-plus icon" :class="{ rotate: activeIndex === 0 }"></i>
    </button>

    <transition name="dropdown">
      <div class="drop-content" v-if="activeIndex === 0">
        <p>
          Our Challenge section lets you play a short interactive game to unlock a
          10% discount code. Once completed successfully, the code is
          automatically applied at checkout or saved to your account. Each user
          can participate once per promotional cycle to keep it fair and fun.
        </p>
      </div>
    </transition>

    <!-- Question 2 -->
    <button class="drop-btn" @click="toggle(1)">
      What is the milestone tracker?
      <i class="fa-solid fa-plus icon" :class="{ rotate: activeIndex === 1 }"></i>
    </button>

    <transition name="dropdown">
      <div class="drop-content" v-if="activeIndex === 1">
        <p>
          The milestone tracker rewards loyal customers. As you make purchases,
          you move closer to milestone rewards like exclusive discounts or special
          offers. Once you reach a milestone, the reward is automatically
          activated on your account. After the final milestone is reached, the
          tracker resets so you can start earning again.
        </p>
      </div>
    </transition>

    <!-- Question 3 -->
    <button class="drop-btn" @click="toggle(2)">
      How does the quarterly competition work?
      <i class="fa-solid fa-plus icon" :class="{ rotate: activeIndex === 2 }"></i>
    </button>

    <transition name="dropdown">
      <div class="drop-content" v-if="activeIndex === 2">
        <p>
          Every 3 months, we run a major competition where customers stand a
          chance to win exciting prizes. Entries are typically earned through
          purchases or participation in special promotions. Winners are announced
          at the end of each cycle and contacted directly via email.
        </p>
      </div>
    </transition>

    <!-- Question 4 -->
    <button class="drop-btn" @click="toggle(3)">
      What brands do you partner with?
      <i class="fa-solid fa-plus icon" :class="{ rotate: activeIndex === 3 }"></i>
    </button>

    <transition name="dropdown">
      <div class="drop-content" v-if="activeIndex === 3">
        <p>
          We’ve merged with five trusted brands to expand our product range and
          improve quality assurance. This partnership allows us to offer a wider
          variety of products while maintaining reliable delivery and customer
          support standards across all categories.
        </p>
      </div>
    </transition>
  </div>
</template>

<style>
/* Center Everything */
.faq-container {
  min-width: 300px;
  text-align: center;
  padding: 20px 20px;
  background-color: #040404;
  color: #f3f3f3;
}

.faq-container h3 {
  margin-bottom: 40px;
  font-size: 2rem;
}

/* Button */
.drop-btn {
  width: 60%;
  padding: 15px;
  border: 1px solid #f3f3f3;
  background-color: transparent;
  color: #f3f3f3;
  border-radius: 3px;
  margin: 0 auto 10px auto;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drop-btn:hover {
  background-color: #333;
}

/* Icon rotate */
.icon {
  transition: transform 0.3s ease;
}

.rotate {
  transform: rotate(45deg);
}

/* Dropdown Content */
.drop-content {
  width: 60%;
  margin: 0 auto 15px auto;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

/* Smooth dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>