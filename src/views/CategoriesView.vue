<script setup>
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
import AddCategories from "@/components/AddCategories.vue"

const store = useStore()

onMounted(() => {
  store.dispatch("fetchCategories")
  store.dispatch("fetchItems")
  console.log("ITEMS FROM STORE:", store.state.items)
})

const sections = computed(() => store.state.categories.categories)
const items = computed(() => store.state.items || [])

const selectedCategory = ref(null)
const addCategoryModalRef = ref(null)

const openCreateModal = () => {
  selectedCategory.value = null
  addCategoryModalRef.value?.show()
}

const openEditModal = (category) => {
  selectedCategory.value = category
  addCategoryModalRef.value?.show()
}

/* 🔹 track slide index per category */
const slideIndexes = ref({})

function getCategoryProducts(categoryId) {
  return items.value.filter(i => i.category_id === categoryId)
}

function getCurrentImage(categoryId) {
  const products = getCategoryProducts(categoryId)

  if (!products.length) return null

  const index = slideIndexes.value[categoryId] || 0
  return products[index]?.photo
}
// console.log(getCurrentImage(category_id))

/* 🔹 Auto sliding */
setInterval(() => {
  sections.value.forEach(section => {
    const products = getCategoryProducts(section.category_id)

    if (!products.length) return

    const current = slideIndexes.value[section.category_id] || 0
    slideIndexes.value[section.category_id] =
      (current + 1) % products.length
  })
}, 2500)
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h3 class="fw-bold">Categories</h3>

      <button
        class="btn btn-dark px-4 py-2 fw-semibold shadow-sm"
        @click="openCreateModal"
      >
        + New Category
      </button>
    </div>

    <div class="row justify-content-center gx-5 gy-4">
      <div
        v-for="section in sections"
        :key="section.category_id"
        class="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
      >
        <div class="category-card text-center">
          <div
            class="category-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
          >
<img
  :src="getCurrentImage(section.category_id) || 'https://via.placeholder.com/200'"
  :alt="section.name"
  class="img-fluid category-image"
/>
          </div>

          <h6 class="fw-semibold text-dark">{{ section.name }}</h6>

          <div class="d-flex justify-content-center gap-3 mt-2">
            <i
              class="bi bi-pencil-square text-primary"
              role="button"
              @click="openEditModal(section)"
            ></i>

            <i
              class="bi bi-trash text-danger"
              role="button"
              @click="store.dispatch('deleteCategory', section.category_id)"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Pass ref to child component -->
    <AddCategories
      :category="selectedCategory"
      ref="addCategoryModalRef"
    />
  </div>
</template>

<style scoped>
.category-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-6px);
}

/* Circular Container */
.category-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffffff, #f1f3f5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.category-card:hover .category-circle {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}

.category-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: opacity 0.4s ease;
}
.bi {
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.bi:hover {
  transform: scale(1.2);
}
</style>