<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

const store = useStore()
const route = useRoute()

const user = computed(() => store.state.user)
const userRole = computed(() => store.getters.userRole)

const isAdmin = computed(() => userRole.value === "Admin")

// only match EXACT /admin
const isAdminRoute = computed(() => route.path === "/admin")

const showAdminHeader = computed(() => isAdmin.value && isAdminRoute.value)
</script>

<template>
  <div v-if="showAdminHeader">
    <h1>Hi, {{ user?.first_name }} {{ user?.last_name }}</h1>
  </div>

  <router-view />
</template>