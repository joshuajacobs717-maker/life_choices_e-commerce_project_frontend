<script>
import { ref, computed, onMounted } from "vue";

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

    const nextMilestone = computed(() =>
      milestones.find((m) => purchaseCount.value < m.purchases)
    );

    const progressPercent = computed(() => {
      if (!nextMilestone.value) return 100;
      const prev =
        milestones
          .slice()
          .reverse()
          .find((m) => purchaseCount.value >= m.purchases) || { purchases: 0 };
      const range = nextMilestone.value.purchases - prev.purchases;
      const progress = purchaseCount.value - prev.purchases;
      return (progress / range) * 100;
    });

    // Reset after passing the last milestone
    const addPurchase = () => {
      if (purchaseCount.value >= milestones[milestones.length - 1].purchases) {
        purchaseCount.value = 0; // reset
      } else {
        purchaseCount.value++;
      }
    };

    const pathRef = ref(null);
    const milestonePositions = ref([]);

    onMounted(() => {
      if (!pathRef.value) return;
      const pathLength = pathRef.value.getTotalLength();
      milestonePositions.value = milestones.map((_, i) => {
        const point = pathRef.value.getPointAtLength(
          (i / (milestones.length - 1)) * pathLength
        );
        return { x: point.x, y: point.y };
      });
    });

    return {
      purchaseCount,
      milestones,
      progressPercent,
      addPurchase,
      pathRef,
      milestonePositions,
    };
  },
};
</script>


<template>
  <div class="loyalty-container">
    <h2>Purchase Milestone Map</h2>
    <p class="purchase-count">
      Purchases made: <strong>{{ purchaseCount }}</strong>
    </p>

    <div class="map-wrapper">
      <svg viewBox="0 0 1000 600" class="map-svg">
        <!-- Curvy path -->
        <path
          ref="pathRef"
          d="M100,100 C300,50 700,150 900,100 C700,250 300,350 500,500 C700,650 300,550 900,580"
          stroke="#ddd"
          stroke-width="8"
          fill="none"
        />
        <!-- Progress stroke -->
        <path
          d="M100,100 C300,50 700,150 900,100 C700,250 300,350 500,500 C700,650 300,550 900,580"
          stroke="#77e4ff"
          stroke-width="8"
          fill="none"
          stroke-linecap="round"
          :stroke-dasharray="2000"
          :stroke-dashoffset="2000 - 2000*(progressPercent/100)"
          style="transition: stroke-dashoffset 0.6s ease"
        />
        <!-- Milestone circles -->
        <circle
          v-for="(m, index) in milestones"
          :key="index"
          :cx="milestonePositions[index]?.x"
          :cy="milestonePositions[index]?.y"
          r="15"
          :class="{ unlocked: purchaseCount >= m.purchases }"
        />
      </svg>

      <!-- Labels -->
      <div class="milestone-labels">
        <div
          v-for="(m, index) in milestones"
          :key="'label-'+index"
          :style="{ top: milestonePositions[index]?.y - 10 + 'px', left: milestonePositions[index]?.x + 25 + 'px' }"
          class="milestone-info"
        >
          <p>{{ m.purchases }} Purchases</p>
          <p>{{ m.reward }}</p>
        </div>
      </div>
    </div>

    <button class="purchase-btn" @click="addPurchase">
      Simulate Purchase
    </button>
  </div>
</template>

<style>
.loyalty-container {
  max-width: 100%;
  padding: 30px;
  background: #f5f5f5;
  border-radius: 16px;
  text-align: center;
}

.purchase-count {
  margin-bottom: 30px;
  color: #555;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
}

.map-svg {
  width: 100%;
  height: 100%;
}

circle {
  fill: #ddd;
  transition: all 0.3s ease;
}

circle.unlocked {
  fill: #234fff;
  /* transform: scale(1.3); */
  box-shadow: 0 0 10px #77e4ff80;
}

.milestone-labels {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.milestone-info {
  position: absolute;
  font-size: 0.8rem;
  text-align: left;
}

.purchase-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 999px;
  border: none;
  background: #111;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
}

.purchase-btn:hover {
  background: #333;
}
</style>
