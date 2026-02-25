<template>
  <div class="container-fluid ps-4 pe-3 pt-4">
    <h2 class="mb-4 fw-semibold">Orders Management</h2>

    <!-- Section Navigation Buttons -->
    <div class="d-flex gap-3 mb-4">
      <button
        class="btn btn-primary"
        :class="{ active: activeSection === 'processing' }"
        @click="activeSection = 'processing'"
      >
        Processing Orders
      </button>
      <button
        class="btn btn-secondary"
        :class="{ active: activeSection === 'history' }"
        @click="activeSection = 'history'"
      >
        Order History
      </button>
      <button
        v-if="activeSection !== ''"
        class="btn btn-outline-dark"
        @click="activeSection = ''"
      >
        Show All Unhandled Orders
      </button>
    </div>

    <!-- Default: show unhandled orders -->
    <div v-if="activeSection === ''">
      <h4 class="mb-3">Unhandled / Pending Orders</h4>
      <ProcessingOrders
        :orders="orders.filter(o => o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'unhandled')"
      />
    </div>

    <!-- Render Selected Sections -->
    <ProcessingOrders
      v-if="activeSection === 'processing'"
      :orders="orders.filter(
        o => o.status.toLowerCase() !== 'pending' &&
             o.status.toLowerCase() !== 'unhandled' &&
             new Date(o.date) >= today
      )"
    />
    <OrderHistory
      v-if="activeSection === 'history'"
      :orders="orders.filter(o => new Date(o.date) < today)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProcessingOrders from './ProcessingOrders.vue'
import OrderHistory from './OrderHistory.vue'

// Helper to create dummy items
const createItems = (names, prices, quantities) =>
  names.map((name, i) => ({
    name,
    quantity: quantities[i] ?? 1,
    price: prices[i] ?? 10,
  }))

// Central orders array
const orders = ref([
  // Active / processing
  {
    id: 'ORD10001',
    userDetails: 'Alice Johnson, alice@example.com',
    date: new Date().toISOString().slice(0, 10), // today
    status: 'Processing',
    items: createItems(
      ['Laptop', 'Mouse', 'Keyboard'],
      [1200, 25, 45],
      [1, 1, 1]
    ),
  },
  // Historical
  {
    id: 'ORD10002',
    userDetails: 'Bob Smith, bob@example.com',
    date: '2026-01-28', // older than today
    status: 'Delivered',
    items: createItems(
      ['Smartphone', 'Charger', 'Case'],
      [800, 20, 15],
      [1, 1, 2]
    ),
  },
  // Unhandled / pending
  {
    id: 'ORD10003',
    userDetails: 'Charlie Davis, charlie@example.com',
    date: '2026-03-05', // future / pending
    status: 'Pending',
    items: createItems(
      ['Monitor', 'HDMI Cable'],
      [300, 10],
      [1, 2]
    ),
  },
])

const activeSection = ref('') // default: show unhandled orders
const today = new Date()
</script>

<style>
button.active {
  opacity: 0.85;
}
</style>