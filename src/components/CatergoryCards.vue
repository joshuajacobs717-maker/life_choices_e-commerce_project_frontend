<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "@/services/api.js";

const props = defineProps({
  category: String,
  search: String,
});

defineEmits(["edit"]);

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user);
const isAdmin = computed(() => String(user.value?.role || "").toLowerCase() === "admin");
const items = computed(() => store.state.items || []);

// Endpoints (keep consistent)
const CART_URL = "/cart";
const CART_ITEMS_URL = "/cart_items";

// Filter items
const filteredItems = computed(() => {
  let results = items.value || [];

  if (props.category !== "ALL") {
    results = results.filter((item) => String(item.category_id) === String(props.category));
  }

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
const toast = ref({ show: false, message: "", type: "success" });
let toastTimer = null;

function showToast(message, type = "success") {
  toast.value = { show: true, message, type };
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value.show = false), 1800);
}

// Admin delete
async function deleteItem(id) {
  await store.dispatch("deleteItem", id);
}

/**
 * Ensures a cart exists and returns cart_id
 * Backend usually needs cart_id for cart_items insert.
 */
async function getOrCreateCartId() {
  const res = await api.get(CART_URL);

  // Support multiple backend response shapes
  const data = res.data;
  const cartObj =
    data?.cart ||
    data?.data?.cart ||
    (Array.isArray(data) ? data[0] : data) ||
    null;

  if (cartObj?.cart_id || cartObj?.id) {
    return cartObj.cart_id || cartObj.id;
  }

  // No cart found -> create it
  const created = await api.post(CART_URL, {
    user_id: user.value?.user_id || user.value?.id,
  });

  const cd = created.data;
  const createdCart =
    cd?.cart ||
    cd?.data?.cart ||
    (Array.isArray(cd) ? cd[0] : cd) ||
    null;

  return createdCart?.cart_id || createdCart?.id;
}

async function addToCart(item) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first.", "error");
      router.push({ path: "/auth", query: { mode: "login" } });
      return;
    }

    const cart_id = await getOrCreateCartId();
    if (!cart_id) {
      showToast("Could not create/load cart.", "error");
      return;
    }

    // Send cart_id + item_id + quantity (this usually fixes the 500)
    await api.post(CART_ITEMS_URL, {
      cart_id,
      item_id: item.item_id,
      quantity: 1,
    });

    showToast("Added to cart", "success");
  } catch (e) {
    console.error("addToCart error:", e);

    // This will show you the actual server message (SUPER important for 500s)
    console.log("Server error body:", e?.response?.data);

    const msg =
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      "Server error: failed to add to cart.";

    if (e?.response?.status === 401 || e?.response?.status === 403) {
      showToast("Session expired. Please login again.", "error");
      router.push({ path: "/auth", query: { mode: "login" } });
      return;
    }

    showToast(msg, "error");
  }
}

async function buyNow(item) {
  await addToCart(item);
  const token = localStorage.getItem("token");
  if (token) router.push("/cart");
}
</script>

<template>
  <div class="cards-wrapper">
    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>

    <div v-for="item in filteredItems" :key="item.item_id" class="items" @click="openDetails(item)">
      <img :src="item.photo || 'http://localhost:5490/uploads/default.png'" alt="product" />
      <h4>{{ item.name }}</h4>
      <p class="price">R {{ item.price }}</p>

      <div class="buttons" @click.stop>
        <button @click="addToCart(item)">Add to Cart</button>
        <button class="buy" @click="buyNow(item)">Buy Now</button>
      </div>

      <div v-if="isAdmin" class="admin-icons" @click.stop>
        <i class="fa-solid fa-trash" @click="deleteItem(item.item_id)"></i>
      </div>
    </div>

    <div v-if="selectedItem" class="modal-overlay" @click.self="closeDetails">
      <div class="modal">
        <img :src="selectedItem.photo || 'http://localhost:5490/uploads/default.png'" />
        <h2>{{ selectedItem.name }}</h2>
        <p>Price: R {{ selectedItem.price }}</p>
        <p>Stock: {{ selectedItem.stock }}</p>
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
.price { font-weight: 700; }
.buttons { display: flex; gap: 10px; justify-content: center; }
button {
  padding: 8px 10px;
  border: 1px solid #111;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}
.buy { background: #111; color: #fff; }
.admin-icons { position: absolute; top: 10px; right: 10px; }
.toast {
  position: fixed;
  top: 110px;
  right: 20px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #111;
  color: #fff;
  z-index: 9999;
}
.toast.error { background: #b00020; }
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  z-index: 9999;
}
.modal {
  background: #fff;
  padding: 18px;
  border-radius: 12px;
  width: min(520px, 92vw);
}
.modal img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
}
</style>