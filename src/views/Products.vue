<script setup>
import { computed, ref, onMounted } from "vue";
import Cards from "@/components/CatergoryCards.vue";
import { useStore } from "vuex";
import ProductModal from "@/components/ProductModal.vue";

const activeCategory = ref("ALL");
const searchQuery = ref("");

const REWARD_TARGET_APPLES = 50;

const store = useStore();

onMounted(() => {
  store.dispatch("fetchCategories");
  store.dispatch("fetchItems");
});

const snakeApples = computed(() => store.getters.snakeApples);
const snakeDiscountUnlocked = computed(() => store.getters.snakeDiscountUnlocked);

const applesRemaining = computed(() =>
  Math.max(REWARD_TARGET_APPLES - (snakeApples.value || 0), 0)
);

// ✅ Admin-only button logic
const isAdmin = computed(() => {
  const roleFromState = store.state?.user?.role;
  const roleFromGetter = store.getters?.userRole;

  const role = String(roleFromState || roleFromGetter || "").toLowerCase();
  return role === "admin";
});

const categories = computed(() => {
  return [{ category_id: "ALL", name: "All" }, ...(store.state.categories.categories || [])];
});

function selectCategory(categoryId) {
  activeCategory.value = categoryId;
}

const showModal = ref(false);
const selectedProduct = ref(null);

function openCreate() {
  selectedProduct.value = null;
  showModal.value = true;
}

function openEdit(product) {
  selectedProduct.value = product;
  showModal.value = true;
}
</script>

<template>
  <div class="category-page">
    <!-- Title -->
    <div class="title">
      <h1>Products</h1>
      <p>Pick Which Category Below</p>

      <!-- ✅ Update snake text -->
      <div class="snake-banner" :class="{ unlocked: snakeDiscountUnlocked }">
        <p v-if="snakeDiscountUnlocked">
          Snake reward unlocked: 10% off is active for any product at checkout.
        </p>
        <p v-else>
          Eat 50 apples to get 10% discount.
          <span v-if="applesRemaining > 0"> ({{ applesRemaining }} apples remaining)</span>
        </p>

        <router-link class="snake-link" to="/challenges">Play challenge</router-link>
      </div>
    </div>

    <!-- Buttons + Search -->
    <div class="actions">
      <div class="category-btn-div">
        <button
          v-for="category in categories"
          :key="category.category_id"
          :class="{ active: activeCategory === category.category_id }"
          @click="selectCategory(category.category_id)"
        >
          {{ category.name }}
        </button>
      </div>

      <div class="search">
        <div class="search-wrapper">
          <input type="search" v-model="searchQuery" placeholder="Search products..." />
          <button class="search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ✅ Admin-only: Add product button -->
    <div v-if="isAdmin" class="admin-actions">
      <button class="add-btn" @click="openCreate">
        + New Product
      </button>
    </div>

    <ProductModal
      :show="showModal"
      :product="selectedProduct"
      @close="showModal = false"
    />

    <!-- Cards -->
    <div class="card-container">
      <Cards
        :category="activeCategory"
        :search="searchQuery"
        @edit="openEdit"
      />
    </div>
  </div>
</template>

<style scoped>
.category-page {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 100px;
}

/* Title */
.title h1 {
  margin: 0;
  font-size: 2rem;
}
.title p {
  margin: 4px 0 0 0;
  font-size: 1rem;
  color: #555;
}

/* Snake banner */
.snake-banner {
  margin-top: 12px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #cbcbcb;
  background: #f7f7f7;
  max-width: 620px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.snake-banner p {
  margin: 0;
  color: #1a1a1a;
}
.snake-banner.unlocked {
  border-color: #22944a;
  background: #eef9f2;
}
.snake-link {
  text-decoration: none;
  font-weight: 600;
  color: #161616;
}
.snake-link:hover {
  text-decoration: underline;
}

/* Buttons + Search */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;
}

/* Category Buttons */
.category-btn-div {
  display: flex;
  gap: 5px;
}
.category-btn-div button {
  padding: 5px 15px;
  border-radius: 8px;
  border: none;
  background-color: #e7e7e7;
  cursor: pointer;
  transition: 0.2s;
}
.category-btn-div button:hover {
  background-color: #040404;
  color: #e7e7e7;
}

/* ✅ Admin button positioning (top-right area of page content) */
.admin-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.add-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  cursor: pointer;
}
.add-btn:hover {
  background: #333;
}
</style>