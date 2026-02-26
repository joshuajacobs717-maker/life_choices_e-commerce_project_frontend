<template>
  <div class="container-fluid ps-4 pe-3 pt-4">
    <h2 class="mb-4 fw-semibold">Orders</h2>

    <!-- Navigation Buttons -->
    <div class="mb-4">
      <button
        class="btn btn-dark me-2 rounded-pill px-4"
        @click="activeSection = 'unhandled'"
      >
        Unhandled Orders
      </button>
      <button
        class="btn btn-outline-dark me-2 rounded-pill px-4"
        @click="activeSection = 'processing'"
      >
        Processing Orders
      </button>
      <button
        class="btn btn-outline-dark rounded-pill px-4"
        @click="activeSection = 'history'"
      >
        Order History
      </button>
    </div>

    <!-- Dynamic Section -->
    <component
      :is="currentComponent"
      :orders="orders"
      :activeSection="activeSection"
      @update:activeSection="activeSection = $event"
      :key="activeSection"
    />
  </div>
</template>

<script>
import UnhandledOrders from './UnhandledOrders.vue'
import ProcessingOrders from './ProcessingOrders.vue'
import OrderHistory from './OrderHistory.vue'

// Helper to create dummy items
const createItems = (names, prices, quantities) =>
  names.map((name, i) => ({
    name,
    quantity: quantities[i] ?? 1,
    price: prices[i] ?? 10,
  }))

export default {
  name: 'OrdersComponent',
  components: { UnhandledOrders, ProcessingOrders, OrderHistory },

  data() {
    return {
      activeSection: 'unhandled',

      orders: [
        {
          id: 'ORD10001',
          customer: 'John Smith',
          total: 2500,
          status: 'pending', // unhandled
          createdAt: new Date('2026-01-20'),
          items: createItems(
            ['Laptop','Mouse','Keyboard','USB Drive','Headphones','Charger','Webcam'],
            [1200,150,200,50,300,100,200],
            [1,2,1,1,1,1,1]
          ),
        },
        {
          id: 'ORD10002',
          customer: 'Sarah Williams',
          total: 1800,
          status: 'relayed', // processing
          createdAt: new Date('2026-02-20'),
          items: createItems(
            ['Sneakers','Socks','T-Shirt','Cap','Jacket','Shorts','Backpack'],
            [500,50,200,150,800,250,400],
            [1,3,2,1,1,2,1]
          ),
        },
        {
          id: 'ORD10003',
          customer: 'Michael Brown',
          total: 3200,
          status: 'cancelled', // history
          createdAt: new Date('2026-02-24'),
          items: createItems(
            ['Smartphone','Earbuds','Power Bank','Case','Screen Protector','Charger','SD Card'],
            [2000,300,400,150,100,100,150],
            [1,2,1,1,2,1,1]
          ),
        },
      ],
    }
  },

  computed: {
    currentComponent() {
      if (this.activeSection === 'unhandled') return UnhandledOrders
      if (this.activeSection === 'processing') return ProcessingOrders
      if (this.activeSection === 'history') return OrderHistory
    },
  },
}
</script> 