<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import AuthLayout from "@/layouts/AuthLayout.vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import CustomerLayout from "@/layouts/CustomerLayout.vue"

const route = useRoute()

const layoutComponent = computed(() => {
  const matchedLayouts = route.matched
    .map(record => record.meta.layout)
    .filter(Boolean)

  const layout = matchedLayouts[matchedLayouts.length - 1] || "default"

  if (layout === "auth") return AuthLayout
  if (layout === "admin") return AdminLayout
  return CustomerLayout
})

</script>

<template>
  <component :is="layoutComponent" />
</template>