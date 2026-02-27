<script setup>
import { computed, ref, onMounted } from "vue";
import Cards from "@/components/CatergoryCards.vue";
import { useStore } from "vuex";
import ProductModal from "@/components/ProductModal.vue"
// Track the currently active category
const activeCategory = ref("ALL");
const searchQuery = ref("")
const REWARD_TARGET_APPLES = 50;
const store = useStore();
onMounted(() => {
  store.dispatch("fetchCategories")
  store.dispatch("fetchItems")
})
const snakeApples = computed(() => store.getters.snakeApples);
const snakeDiscountUnlocked = computed(() => store.getters.snakeDiscountUnlocked);
const applesRemaining = computed(() =>
  Math.max(REWARD_TARGET_APPLES - snakeApples.value, 0),
);

// List of categories
const categories = computed(() => {
  return [
    { category_id: "ALL", name: "All" },
    ...(store.state.categories.categories || [])
  ]
})
console.log(categories);


// Function to select a category
function selectCategory(categoryId) {
  activeCategory.value = categoryId
}
const showModal = ref(false)
const selectedProduct = ref(null)

function openCreate() {
  selectedProduct.value = null
  showModal.value = true
}

function openEdit(product) {
  selectedProduct.value = product
  showModal.value = true
}
</script>

<template>
  <div class="category-page">
    <!-- Title -->
    <div class="title">
      <h1>Products</h1>
      <p>Pick Which Category Below</p>
      <div class="snake-banner" :class="{ unlocked: snakeDiscountUnlocked }">
        <p v-if="snakeDiscountUnlocked">
          Snake reward unlocked: 5% off is active for any product at checkout.
        </p>
        <p v-else>
          Eat {{ applesRemaining }} more apples in the Snake Challenge to unlock 5%
          off any product.
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
    <input
      type="search"
      v-model="searchQuery"
      placeholder="Search products..."
    />
    <button class="search-btn">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</div>
    </div>
    <div style="width:100%; text-align:center; margin-top:20px;">
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
.add-btn {
  padding:10px 20px;
  border:none;
  border-radius:8px;
  background:black;
  color:white;
  cursor:pointer;
}
.add-btn:hover {
  background:#333;
}
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

/* Highlight active button */
.category-btn-div button.active {
  background-color: #040404;
  color: #e7e7e7;
  font-weight: bold;
}

/* Search */
.search-wrapper {
  position: relative;
  width: 250px; /* adjust width if needed */
}

.search-wrapper input {
  width: 100%;
  padding: 8px 40px 8px 12px; /* padding-right for button space */
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.search-wrapper .search-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: #040404;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}

.search-wrapper .search-btn:hover {
  background-color: #333;
}

/* Cards */
.card-container {
  margin-top: 20px;
}
</style>
