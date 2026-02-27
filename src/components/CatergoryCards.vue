<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "@/services/api.js";

const props = defineProps({
  category: String,
  search: String,
});

const emit = defineEmits(["edit"]);

const store = useStore();
const router = useRouter();

// Get user
const user = computed(() => store.state.user);

// Admin check (case-insensitive + supports Admin/admin)
const isAdmin = computed(() => String(user.value?.role || "").toLowerCase() === "admin");

// Get items (make sure your store.items is an array; if it’s { items: [] } adjust below)
const items = computed(() => store.state.items);

// Filter items
const filteredItems = computed(() => {
  let results = items.value || [];

  // CATEGORY FILTER
  if (props.category !== "ALL") {
    results = results.filter((item) => String(item.category_id) === String(props.category));
  }

  // SEARCH FILTER
  if (props.search) {
    const query = props.search.toLowerCase();
    results = results.filter((item) => String(item.name || "").toLowerCase().includes(query));
  }

  return results;
});

// Details modal
const selectedItem = ref(null);

function openDetails(item) {
  selectedItem.value = item;
}
function closeDetails() {
  selectedItem.value = null;
}

// Toast popup
const toast = ref({
  show: false,
  message: "",
  type: "success", // success | error
});

let toastTimer = null;

function showToast(message, type = "success") {
  toast.value = { show: true, message, type };
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.value.show = false;
  }, 1800);
}

// Delete (admin)
async function deleteItem(id) {
  await store.dispatch("deleteItem", id);
}

// ✅ Add to cart -> BACKEND (so Cart.vue can fetch it)
async function addToCart(item) {
  try {
    // If not logged in, force login first
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first.", "error");
      router.push({ path: "/auth", query: { mode: "login" } });
      return;
    }

    await api.post("/cartitems", {
      item_id: item.item_id,
      quantity: 1,
    });

    showToast("Added to cart ✅", "success");
  } catch (e) {
    console.error("addToCart error:", e);

    const msg =
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.message ||
      "Failed to add to cart.";

    // If token invalid/expired
    if (e?.response?.status === 401 || e?.response?.status === 403) {
      showToast("Session expired. Please login again.", "error");
      router.push({ path: "/auth", query: { mode: "login" } });
      return;
    }

    showToast(msg, "error");
  }
}

// ✅ Buy now -> add + go to cart
async function buyNow(item) {
  await addToCart(item);
  // Only go if it likely succeeded (toast might be error if not logged in)
  const token = localStorage.getItem("token");
  if (token) router.push("/cart");
}
</script>

<template>
  <div class="cards-wrapper">
    <!-- ✅ Toast popup -->
    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>

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
        <i class="fa-solid fa-pen" @click="$emit('edit', item)"></i>
        <i class="fa-solid fa-trash" @click="deleteItem(item.item_id)"></i>
      </div>
    </div>

    <!-- ITEM DETAILS MODAL -->
    <div v-if="selectedItem" class="modal-overlay" @click.self="closeDetails">
      <div class="modal">
        <img :src="selectedItem.photo || 'http://localhost:5490/uploads/default.png'" />
        <h2>{{ selectedItem.name }}</h2>
        <p>Price: R {{ selectedItem.price }}</p>
        <p>Stock: {{ selectedItem.stock }}</p>

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

    <p v-if="filteredItems.length === 0">No products found.</p>
  </div>
</template>

<style scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  justify-content: center;
  gap: 30px;
  width: 100%;
  position: relative;
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
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
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

/* ADMIN ICONS */
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 14px;
  width: 420px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.modal img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
}

/* ✅ Toast */
.toast {
  position: fixed;
  top: 90px;
  right: 24px;
  z-index: 3000;
  padding: 12px 14px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

.toast.success {
  background: #eafff1;
  border: 1px solid #2ea44f;
  color: #0b3d1d;
}

.toast.error {
  background: #fff0f0;
  border: 1px solid #d22;
  color: #6b0f0f;
}
</style>