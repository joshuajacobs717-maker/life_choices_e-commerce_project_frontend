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

// Admin-only button logic
const isAdmin = computed(() => {
  const roleFromState = store.state?.user?.role;
  const roleFromGetter = store.getters?.userRole;
  const role = String(roleFromState || roleFromGetter || "").toLowerCase();
  return role === "admin";
});

const categories = computed(() => {
  const list = store.state.categories?.categories || store.state.categories || [];
  return [{ category_id: "ALL", name: "All" }, ...(Array.isArray(list) ? list : [])];
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
    <div class="title">
      <h1>Products</h1>
      <p>Pick Which Category Below</p>

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

    <div v-if="isAdmin" class="admin-actions">
      <button class="add-btn" @click="openCreate">+ New Product</button>
    </div>

    <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
      <div class="modal-center">
        <ProductModal :show="showModal" :product="selectedProduct" @close="showModal = false" />
      </div>
    </div>

    <div class="card-container">
      <Cards :category="activeCategory" :search="searchQuery" @edit="openEdit" />
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

.title h1 {
  margin: 0;
  font-size: 2rem;
}
.title p {
  margin: 4px 0 0 0;
  font-size: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}

.category-btn-div {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn-div button {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}
.category-btn-div button.active {
  border-color: #111;
  background: #111;
  color: #fff;
}

.search-wrapper {
  display: flex;
  gap: 10px;
}
.search-wrapper input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  width: 260px;
}
.search-btn {
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  padding: 10px 12px;
  cursor: pointer;
}

.admin-actions {
  display: flex;
  justify-content: flex-end;
}
.add-btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
}

.card-container {
  width: 100%;
}

.snake-banner {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.snake-banner.unlocked {
  border-color: #111;
}
.snake-link {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #111;
  color: #111;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
  z-index: 9999;
}
.modal-center {
  width: min(900px, 95vw);
}
</style>