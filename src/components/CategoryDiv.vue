<script>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "TopCat",
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch("fetchCategories")
      store.dispatch("fetchItems")
    })

    const categories = computed(() => {
      return store.state.categories?.categories || []
    })

    const items = computed(() => {
      return store.state.items || []
    })

    // ✅ Get ONE item per category
    const categoryPreview = computed(() => {
      return categories.value.map(category => {
        const product = items.value.find(
          item => String(item.category_id) === String(category.category_id)
        )

        return {
          category_id: category.category_id,
          name: category.name,
          product: product || null
        }
      }).filter(c => c.product !== null) // remove empty categories
    })

    return {
      categoryPreview
    }
  }
}
</script>

<template>
  <section class="category-section">

    <!-- Top Header -->
    <div class="section-header">
      <h2>Top Categories</h2>
      <p class="see-more">
        <router-link class="link" to="/products">
          See More <i class="fa-solid fa-angle-right"></i>
        </router-link>
      </p>
    </div>

    <!-- Cards Container -->
    <div class="shop-by-cat">

      <div
        v-for="category in categoryPreview"
        :key="category.category_id"
        class="items"
      >
        <img
          :src="category.product.photo || 'http://localhost:5490/uploads/default.png'"
          alt="category"
        />
        <h4>{{ category.name }}</h4>
        <p>Explore top picks in {{ category.name }}</p>
      </div>

      <p v-if="categoryPreview.length === 0">
        No categories available.
      </p>

    </div>

  </section>
</template>

<style>
.category-section {
  padding: 60px 80px;
  background-color: #e7e7e7;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  margin: 0;
}

.see-more {
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s ease;
}

.see-more:hover {
  opacity: 0.7;
}

.shop-by-cat {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.items {
  flex: 1;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s ease;
  background: white;
}

.items img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.items:hover {
  transform: translateY(-5px);
}
</style>