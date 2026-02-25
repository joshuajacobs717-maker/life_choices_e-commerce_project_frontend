<script setup>
import { ref } from 'vue'

// Props: orders array passed from parent
defineProps({
  orders: {
    type: Array,
    required: true,
  },
})

// Popup state
const showPopup = ref(false)
const selectedOrder = ref(null)

// Open/Close modal
const openDetails = (order) => {
  selectedOrder.value = order
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
  selectedOrder.value = null
}
</script>

<template>
  <div>
    <h4 class="mb-3">Processing Orders</h4>

    <div class="table-responsive">
      <div class="d-flex flex-column gap-2">
        <!-- Render orders -->
        <div
          v-for="order in orders"
          :key="order.id"
          class="d-flex align-items-center justify-content-between border-bottom py-2"
        >
          <!-- Order Info -->
          <div class="d-flex w-100">
            <div class="me-3" style="min-width: 150px;">{{ order.id }}</div>
            <div class="me-3" style="min-width: 250px;">{{ order.userDetails }}</div>
            <div class="me-3" style="min-width: 120px;">{{ order.status }}</div>
          </div>

          <!-- Details Button -->
          <button
            class="btn btn-outline-primary rounded-pill px-3 py-1"
            @click="openDetails(order)"
          >
            Details &gt;
          </button>
        </div>

        <!-- No orders fallback -->
        <div v-if="orders.length === 0" class="text-center py-4 text-muted">
          No processing orders
        </div>
      </div>
    </div>

    <!-- Popup Modal -->
    <div
      v-if="showPopup"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0,0,0,0.5);"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Order Details - {{ selectedOrder.id }}</h5>
            <button type="button" class="btn-close" @click="closePopup"></button>
          </div>
          <div class="modal-body">
            <p><strong>User Details:</strong> {{ selectedOrder.userDetails }}</p>
            <p><strong>Status:</strong> {{ selectedOrder.status }}</p>

            <h6 class="mt-3">Items</h6>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in selectedOrder.items" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>${{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closePopup">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
button.btn-outline-primary {
  font-size: 0.9rem;
}
</style>