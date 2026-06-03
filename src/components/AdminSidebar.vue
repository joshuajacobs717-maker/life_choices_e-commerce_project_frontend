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
  top: 0;
  left: 0;
  z-index: 1000;
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

@media (max-width: 900px) {
  .admin-sidebar {
    position: sticky;
    top: 0;
    width: 100%;
    min-height: auto;
    padding: 12px !important;
  }

  .admin-sidebar h4 {
    margin-bottom: 10px !important;
    font-size: 1rem;
    text-align: left !important;
  }

  .admin-sidebar .nav {
    flex-direction: row !important;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .admin-sidebar .nav-link {
    white-space: nowrap;
    margin-bottom: 0;
  }

  .admin-sidebar hr,
  .admin-sidebar .mt-auto {
    display: none;
  }
}
</style>
