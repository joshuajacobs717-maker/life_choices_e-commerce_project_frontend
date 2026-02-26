<script>
import { ref, computed } from "vue";

export default {
  name: "MilestoneMap",
  setup() {
    const purchaseCount = ref(0);

    const milestones = [
      { purchases: 5, reward: "10% Discount" },
      { purchases: 10, reward: "20% Discount" },
      { purchases: 20, reward: "25% Discount" },
      { purchases: 30, reward: "50% Discount" },
    ];

    const reversedMilestones = computed(() => [...milestones].reverse());

    const maxPurchases = milestones[milestones.length - 1].purchases;

    const progressPercent = computed(() =>
      Math.min((purchaseCount.value / maxPurchases) * 100, 100)
    );

    const addPurchase = () => {
      if (purchaseCount.value >= maxPurchases) purchaseCount.value = 0;
      else purchaseCount.value++;
    };

    return {
      purchaseCount,
      reversedMilestones,
      progressPercent,
      addPurchase,
    };
  },
};
</script>

<template>
  <div class="loyalty-container">
    <div class="top">
      <div>
        <h2>Your Purchase Milestone Track</h2>
        <p class="purchase-count">
          Purchases made: <strong>{{ purchaseCount }}</strong>
        </p>
      </div>

      <button class="purchase-btn" @click="addPurchase">
        Simulate Purchase
      </button>
    </div>

    <!-- Walking Path -->
    <div class="path-wrap" :style="{ '--p': progressPercent }">
      <!-- Wider SVG so the trail can swing more -->
      <svg class="trail" viewBox="0 0 420 900" preserveAspectRatio="none" aria-hidden="true">
        <path
          class="trail-base"
          d="M210 880
             C 40 820, 40 730, 210 660
             C 380 590, 380 500, 210 430
             C 40 360, 40 270, 210 200
             C 380 130, 380 70, 210 40"
        />
        <path
          class="trail-progress"
          d="M210 880
             C 40 820, 40 730, 210 660
             C 380 590, 380 500, 210 430
             C 40 360, 40 270, 210 200
             C 380 130, 380 70, 210 40"
        />
      </svg>

      <!-- milestones (descending order) -->
      <div class="milestones">
        <div
          v-for="(m, index) in reversedMilestones"
          :key="m.purchases"
          class="milestone"
          :class="[
            index % 2 === 0 ? 'left' : 'right',
            { unlocked: purchaseCount >= m.purchases }
          ]"
        >
          <div class="bubble">
            <p class="m-title">{{ m.purchases }} Purchases</p>
            <p class="m-reward">{{ m.reward }}</p>
          </div>

          <div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loyalty-container {
  width: 100%;
  background: #c8c8c8;
  border-radius: 16px;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 50px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.purchase-count {
  margin: 6px 0 0;
  color: #555;
}

.purchase-btn {
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: #111;
  color: white;
  cursor: pointer;
  transition: 0.25s ease;
}
.purchase-btn:hover {
  background: #333;
}

.path-wrap {
  position: relative;
  min-height: 560px;
  padding: 10px 0;
  --p: 0;
}

/* Wider container for the trail */
.trail {
  position: absolute;
  inset: 0;
  width: 420px; /* was 320px */
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.trail-base {
  fill: none;
  stroke: rgba(0, 0, 0, 0.16);
  stroke-width: 18; /* unchanged */
  stroke-linecap: round;
  stroke-linejoin: round;
}

.trail-progress {
  fill: none;
  stroke: #234fff;
  stroke-width: 18; /* unchanged */
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1400;
  stroke-dashoffset: calc(1400 - (1400 * (var(--p) / 100)));
  transition: stroke-dashoffset 0.45s ease;
}

.milestones {
  position: relative;
  height: 100%;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
}

.milestone {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 72px;
}

.milestone.left {
  justify-content: flex-start;
  padding-right: 55%;
}
.milestone.right {
  justify-content: flex-end;
  padding-left: 55%;
}

/* Bubble (default) */
.bubble {
  background: rgba(255, 255, 255, 0.86);
  border-radius: 14px;
  padding: 10px 12px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
  max-width: 260px;
  border: 2px solid transparent;
  transition: 0.25s ease;
}

.m-title {
  margin: 0;
  font-weight: 800;
  color: #111;
  transition: 0.25s ease;
}
.m-reward {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: #666;
  transition: 0.25s ease;
}

/* Unlocked */
.milestone.unlocked .bubble {
  background: rgba(35, 79, 255, 0.12);
  border-color: rgba(35, 79, 255, 0.45);
  box-shadow: 0 0 0 6px rgba(35, 79, 255, 0.12), 0 14px 28px rgba(35, 79, 255, 0.18);
}
.milestone.unlocked .m-title {
  color: #234fff;
}
.milestone.unlocked .m-reward {
  color: #234fff;
  opacity: 0.9;
}

/* Dot */
.dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e6e6e6;
  border: 4px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
  transition: 0.25s ease;
}

/* follow curve */
.milestone.left .dot {
  transform: translateX(calc(-50% - 26px));
}
.milestone.right .dot {
  transform: translateX(calc(-50% + 26px));
}

.milestone.unlocked .dot {
  background: #234fff;
  box-shadow: 0 0 0 6px rgba(35, 79, 255, 0.18), 0 12px 26px rgba(35, 79, 255, 0.25);
}

/* Mobile */
@media (max-width: 700px) {
  .trail {
    width: 300px; /* was 260px */
  }

  .milestone.left,
  .milestone.right {
    padding-left: 0;
    padding-right: 0;
    justify-content: center;
  }

  .milestone.left .dot,
  .milestone.right .dot {
    transform: translateX(-50%);
  }

  .bubble {
    max-width: 220px;
    text-align: center;
  }
}
</style>