<script setup>
import { computed } from 'vue'

// Props: full orders array
defineProps({
  orders: {
    type: Array,
    required: true,
  },
})

// Today's date
const today = new Date()

// Filter historical orders
const orderHistory = computed(() =>
  orders.filter(order => new Date(order.date) < today)
)

// Function to compute dynamic status
const getHistoryStatus = (order) => {
  const orderDate = new Date(order.date)
  const diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24))

  if (order.status.toLowerCase() === 'cancelled') return 'Cancelled'
  if (diffDays < 25 && order.status.toLowerCase() === 'processing') return 'Processing'
  if (diffDays >= 25 && order.status.toLowerCase() !== 'delivered') return 'Failed'
  return order.status
}
</script>

<template>
  <div>
    <h4 class="mb-3">Order History</h4>

    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Order ID</th>
            <th>User Details</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderHistory" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userDetails }}</td>
            <td>{{ order.date }}</td>
            <td>{{ getHistoryStatus(order) }}</td>
          </tr>
          <tr v-if="orderHistory.length === 0">
            <td colspan="4" class="text-center text-muted py-3">No historical orders</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
table th, table td {
  min-width: 120px;
}
</style>