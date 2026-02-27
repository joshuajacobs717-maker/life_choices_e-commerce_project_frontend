<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex"

const props = defineProps({
  category: String,
  search: String
})

const emit = defineEmits(["edit"])

const store = useStore()

// Get user
const user = computed(() => store.state.user)

// Check admin
const isAdmin = computed(() => user.value?.role === "Admin")

// Get items
const items = computed(() => store.state.items)

// Filter by category
const filteredItems = computed(() => {
  let results = items.value

  // CATEGORY FILTER
  if (props.category !== "ALL") {
    results = results.filter(
      item => item.category_id === props.category
    )
  }

  // SEARCH FILTER
  if (props.search) {
    const query = props.search.toLowerCase()

    results = results.filter(item =>
      item.name.toLowerCase().includes(query)
    )
  }

  return results
})

// Modal handling
const selectedItem = ref(null)

function openDetails(item) {
  selectedItem.value = item
}

function closeDetails() {
  selectedItem.value = null
}

// Delete
async function deleteItem(id) {
  await store.dispatch("deleteItem", id)
}

// Add to cart
async function addToCart(item) {
  await store.dispatch("addToCart", {
    item_id: item.item_id,
    quantity: 1
  })
}

// Buy now
async function buyNow(item) {
  await addToCart(item)
  // redirect to checkout if you have it
  // router.push("/checkout")
}
</script>

<template>
  <div class="cards-wrapper">

    <div
      v-for="item in filteredItems"
      :key="item.item_id"
      class="items"
      @click="openDetails(item)"
    >
      <img
        :src="item.photo || 'http://localhost:5490/uploads/default.png'"
        alt="product"
      />

      <h4>{{ item.name }}</h4>
      <p class="price">R {{ item.price }}</p>

      <div class="buttons" @click.stop>
        <button @click="addToCart(item)">Add to Cart</button>
        <button class="buy" @click="buyNow(item)">Buy Now</button>
      </div>

      <!-- ADMIN ICONS -->
      <div v-if="isAdmin" class="admin-icons" @click.stop>
        <i
          class="fa-solid fa-pen"
          @click="$emit('edit', item)"
        ></i>
        <i
          class="fa-solid fa-trash"
          @click="deleteItem(item.item_id)"
        ></i>
      </div>

    </div>

    <!-- ITEM DETAILS MODAL -->
    <div v-if="selectedItem" class="modal-overlay">
      <div class="modal">
        <img :src="selectedItem.photo" />
        <h2>{{ selectedItem.name }}</h2>
        <p>Price: R {{ selectedItem.price }}</p>
        <p>Stock: {{ selectedItem.stock }}</p>

        <!-- Variants -->
        <div v-if="selectedItem.variants?.length">
          <h4>Variants:</h4>
          <ul>
            <li v-for="v in selectedItem.variants" :key="v.variant_id">
              {{ v.name }}
            </li>
          </ul>
        </div>

        <button @click="closeDetails">Close</button>
      </div>
    </div>

    <p v-if="filteredItems.length === 0">
  No products found.
</p>

  </div>
</template>

<style scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  justify-content: center;
  gap: 30px;
  width: 100%;
}

.items {
  width: 250px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  padding: 18px;
  border-radius: 14px;
  cursor: pointer;
  position: relative;

  background: white;

  border: 1px solid #ececec;

  transition: all 0.25s ease;
}

.items:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.items:hover {
  transform: translateY(-5px);
}

.items img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  background: #f5f5f5;
}
.items h4 {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-top: 10px;
}

.price {
  font-weight: 700;
  font-size: 18px;
  color: #111;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  flex: 1;
  border-radius: 8px;
  border: none;
  padding: 8px 10px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

button:first-child {
  background: #222;
  color: white;
}

button.buy {
  background: #0d6efd;
  color: white;
}

button:first-child:hover {
  background: #000;
}

button.buy:hover {
  background: #0b5ed7;
}

.admin-icons {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.admin-icons i {
  background: white;
  border-radius: 6px;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #e5e5e5;
  transition: 0.2s;
}

.admin-icons i:hover {
  transform: scale(1.1);
}

.admin-icons i.fa-pen:hover {
  color: #0d6efd;
}

.admin-icons i.fa-trash:hover {
  color: red;
}
/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 14px;
  width: 420px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.modal img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
}
</style>