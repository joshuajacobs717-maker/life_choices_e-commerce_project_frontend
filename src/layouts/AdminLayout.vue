<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue"
</script>

<template>
  <div class="admin-layout">

    <AdminSidebar />

    <div class="admin-content">
      <router-view />
    </div>

  </div>
</template>

<style>
.admin-layout {
  min-height: 100vh;
}

.admin-content {
  margin-left: 260px;
  padding: 24px;
  min-width: 0;
}

@media (max-width: 900px) {
  .admin-content {
    margin-left: 0;
    padding: 18px 14px;
  }
}
</style>
