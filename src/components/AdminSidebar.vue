<script setup>
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <div class="admin-sidebar d-flex flex-column p-3 text-white bg-dark">
    
    <h4 class="text-center mb-4 fw-bold">
      Admin Panel
    </h4>

    <ul class="nav nav-pills flex-column mb-auto">

      <li class="nav-item">
        <router-link
          to="/admin/companies"
          class="nav-link text-white"
          :class="{ active: route.path.includes('businesses') }"
        >
          🏢 Businesses
        </router-link>
      </li>

      <li>
        <router-link
          to="/admin/categories"
          class="nav-link text-white"
          :class="{ active: route.path.includes('categories') }"
        >
          📂 Categories
        </router-link>
      </li>

      <li>
        <router-link
          to="/admin/products"
          class="nav-link text-white"
          :class="{ active: route.path.includes('products') }"
        >
          📦 Products
        </router-link>
      </li>

      <li>
        <router-link
          to="/admin/orders"
          class="nav-link text-white"
          :class="{ active: route.path.includes('orders') }"
        >
          🛒 Orders
        </router-link>
      </li>

    </ul>

    <hr class="text-secondary" />

    <div class="mt-auto">
      <router-link to="/" class="btn btn-outline-light w-100">
        ← Back to Store
      </router-link>
    </div>

  </div>
</template>

<style scoped>
.admin-sidebar {
  width: 260px;
  min-height: 100vh;
  position: fixed;
}

.nav-link {
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #495057;
}

.nav-link.active {
  background-color: #0d6efd !important;
}
</style>