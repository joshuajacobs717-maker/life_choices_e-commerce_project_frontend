<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue"
</script>

<template>
  <div class="d-flex">

    <AdminSidebar />

    <div class="admin-content flex-grow-1 p-4">
      <router-view />
    </div>

  </div>
</template>

<style>
.admin-content {
  margin-left: 260px;
}
</style>