<template>
  <div>
    <div class="table-responsive">
      <div class="d-flex flex-column gap-2">
        <div
          v-for="order in processingOrders"
          :key="order.id"
          class="d-flex align-items-center justify-content-between border-bottom py-2"
        >
          <div class="d-flex w-100">
            <div class="me-3" style="min-width: 150px;">{{ order.id }}</div>
            <div class="me-3" style="min-width: 250px;">{{ order.customer }}</div>
            <div class="me-3" style="min-width: 120px;">{{ order.status }}</div>
          </div>

          <button
            class="btn btn-outline-primary rounded-pill px-3 py-1"
            @click="openModal(order)"
          >
            Details &gt;
          </button>
        </div>

        <div v-if="processingOrders.length === 0" class="text-center py-4 text-muted">
          No processing orders
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedOrder"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0,0,0,0.5)"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Order Details - {{ selectedOrder.id }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Customer:</strong> {{ selectedOrder.customer }}</p>
            <p><strong>Total:</strong> R {{ selectedOrder.total }}</p>
            <p><strong>Status:</strong> {{ selectedOrder.status }}</p>

            <!-- Items Table -->
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
                  <td>R {{ item.price }}</td>
                </tr>
              </tbody>
            </table>

            <hr />
            <h6>Update Stage</h6>
            <button class="btn btn-outline-primary btn-sm me-2" @click="updateStatus('relayed')">Relayed</button>
            <button class="btn btn-outline-success btn-sm me-2" @click="updateStatus('delivered')">Delivered</button>
            <button class="btn btn-outline-danger btn-sm" @click="cancelOrder">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProcessingOrders',
  props: ['orders'],
  data() { return { selectedOrder: null } },
  computed: {
    processingOrders() { return this.orders.filter(o => ['relayed', 'delivered'].includes(o.status)) },
  },
  methods: {
    openModal(order) { this.selectedOrder = order },
    closeModal() { this.selectedOrder = null },
    updateStatus(newStatus) { this.selectedOrder.status = newStatus; this.closeModal() },
    cancelOrder() { this.selectedOrder.status = 'cancelled'; this.closeModal() },
  },
}
</script>