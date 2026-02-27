<script>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "Products",
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch("fetchItems")
    })

    const products = computed(() => {
      return store.state.items || []
    })

    const topFiveProducts = computed(() => {
      return products.value.slice(0, 5)
    })

    return {
      topFiveProducts
    }
  }
}
</script>

<template>
  <section class="category-section">

    <!-- Top Header -->
    <div class="section-header">
      <h2>Top Products</h2>
      <p class="see-more">
        <router-link class="link" to="/products">
          See More <i class="fa-solid fa-angle-right"></i>
        </router-link>
      </p>
    </div>

    <!-- Cards Container -->
    <div class="shop-by-cat">

      <div
        v-for="product in topFiveProducts"
        :key="product.item_id"
        class="items"
      >
        <img
          :src="product.photo || 'http://localhost:5490/uploads/default.png'"
          alt="product"
        />
        <h4>{{ product.name }}</h4>
        <p>R {{ product.price }}</p>
      </div>

      <p v-if="topFiveProducts.length === 0">
        No products available.
      </p>

    </div>

  </section>
</template>

<style>
.category-section {
  padding: 60px 80px;
  background-color: #e7e7e7;
}

/* Top header area */
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

/* Cards layout */
.shop-by-cat {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* Individual card */
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