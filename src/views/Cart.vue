<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import api from "@/services/api.js";

// ✅ FIXED endpoints (match backend index.js mounts)
const CART_URL = "/cart";
const CART_ITEMS_URL = "/cart_items";
const ORDERS_URL = "/orders";
const ORDER_ITEMS_URL = "/order_items";

// Snake discount
const SNAKE_DISCOUNT_KEY = "snake_discount_unlocked";

const store = useStore();

const loading = ref(true);
const error = ref("");

const cart = ref(null);
const cartItems = ref([]);

const creatingOrder = ref(false);
const actionError = ref("");

// ✅ Checkout success modal
const showSuccess = ref(false);
const successMessage = ref("");

// If you already load products/items elsewhere, we can enrich cart display from store.items
const itemsCatalog = computed(() => store.state?.items || []);
const user = computed(() => store.state?.user);

// ✅ your UI now says 10% (if you changed snake reward)
const discountUnlocked = computed(() => localStorage.getItem(SNAKE_DISCOUNT_KEY) === "true");
const discountPercent = computed(() => (discountUnlocked.value ? 10 : 0));

function money(n) {
  const num = Number(n || 0);
  return num.toFixed(2);
}

function getCatalogItem(item_id) {
  return itemsCatalog.value.find((i) => String(i.item_id) === String(item_id));
}

function displayName(ci) {
  return (
    ci.item_name ||
    ci.name ||
    getCatalogItem(ci.item_id)?.item_name ||
    getCatalogItem(ci.item_id)?.name ||
    `Item #${ci.item_id}`
  );
}

function displayPrice(ci) {
  const p =
    ci.item_price ??
    ci.price ??
    getCatalogItem(ci.item_id)?.item_price ??
    getCatalogItem(ci.item_id)?.price ??
    0;
  return Number(p || 0);
}

function displayImage(ci) {
  return (
    ci.image ||
    ci.image_url ||
    getCatalogItem(ci.item_id)?.image ||
    getCatalogItem(ci.item_id)?.image_url ||
    "https://via.placeholder.com/120x90"
  );
}

const subtotal = computed(() =>
  cartItems.value.reduce((sum, ci) => sum + displayPrice(ci) * Number(ci.quantity || 0), 0)
);

const discountAmount = computed(() => (subtotal.value * discountPercent.value) / 100);
const total = computed(() => Math.max(0, subtotal.value - discountAmount.value));

async function ensureUserLoaded() {
  if ((store.state?.token || localStorage.getItem("token")) && !store.state?.user) {
    try {
      await store.dispatch("fetchUser");
    } catch {
      // ignore
    }
  }
}

async function ensureCartExists() {
  const res = await api.get(CART_URL);
  const data = res.data;
  cart.value = data?.cart || (Array.isArray(data) ? data[0] : data) || null;

  if (!cart.value) {
    const created = await api.post(CART_URL, {
      user_id: user.value?.user_id || user.value?.id,
    });
    const cd = created.data;
    cart.value = cd?.cart || cd || null;
  }
}

async function fetchCartItems() {
  const res = await api.get(CART_ITEMS_URL);
  const data = res.data;

  cartItems.value =
    (Array.isArray(data) ? data : data?.cartItems || data?.items || data?.cart_items || []) || [];
}

async function loadCart() {
  try {
    loading.value = true;
    error.value = "";
    actionError.value = "";

    await ensureUserLoaded();

    if (!user.value) {
      loading.value = false;
      return;
    }

    await ensureCartExists();
    await fetchCartItems();
  } catch (e) {
    console.error("loadCart error:", e);
    error.value = e?.response?.data?.message || e?.message || "Failed to load cart.";
  } finally {
    loading.value = false;
  }
}

async function updateQty(ci, nextQty) {
  actionError.value = "";
  const qty = Number(nextQty);
  if (!Number.isFinite(qty) || qty < 1) return;

  try {
    await api.patch(`${CART_ITEMS_URL}/${ci.cart_item_id}`, { quantity: qty });
    ci.quantity = qty;
  } catch (e) {
    console.error("updateQty error:", e);
    actionError.value = e?.response?.data?.message || e?.message || "Failed to update quantity.";
  }
}

async function removeItem(ci) {
  actionError.value = "";
  try {
    await api.delete(`${CART_ITEMS_URL}/${ci.cart_item_id}`);
    cartItems.value = cartItems.value.filter((x) => x.cart_item_id !== ci.cart_item_id);
  } catch (e) {
    console.error("removeItem error:", e);
    actionError.value = e?.response?.data?.message || e?.message || "Failed to remove item.";
  }
}

async function clearCart() {
  actionError.value = "";
  try {
    for (const ci of [...cartItems.value]) {
      // eslint-disable-next-line no-await-in-loop
      await api.delete(`${CART_ITEMS_URL}/${ci.cart_item_id}`);
    }
    cartItems.value = [];
  } catch (e) {
    console.error("clearCart error:", e);
    actionError.value = e?.response?.data?.message || e?.message || "Failed to clear cart.";
  }
}

// ✅ Simulated checkout (uses your backend order routes)
async function checkout() {
  actionError.value = "";

  if (!user.value) {
    actionError.value = "Please log in to checkout.";
    return;
  }
  if (cartItems.value.length === 0) {
    actionError.value = "Your cart is empty.";
    return;
  }

  try {
    creatingOrder.value = true;

    // 1) Create order
    const orderPayload = {
      user_id: user.value.user_id || user.value.id,
      total_amount: total.value,
      discount_percent: discountPercent.value,
      discount_amount: discountAmount.value,
    };

    const orderRes = await api.post(ORDERS_URL, orderPayload);
    const createdOrder = orderRes.data?.order || orderRes.data;
    const order_id = createdOrder?.order_id || createdOrder?.id;

    if (!order_id) throw new Error("Order created but order_id not returned by backend.");

    // 2) Create order items
    for (const ci of cartItems.value) {
      const orderItemPayload = {
        order_id,
        item_id: ci.item_id,
        quantity: Number(ci.quantity || 0),
        price: displayPrice(ci),
      };
      // eslint-disable-next-line no-await-in-loop
      await api.post(ORDER_ITEMS_URL, orderItemPayload);
    }

    // 3) Clear cart
    await clearCart();

    // ✅ Success popup
    successMessage.value = `Checkout successful! Order #${order_id}`;
    showSuccess.value = true;
  } catch (e) {
    console.error("checkout error:", e);
    actionError.value = e?.response?.data?.message || e?.message || "Checkout failed.";
  } finally {
    creatingOrder.value = false;
  }
}

function closeSuccess() {
  showSuccess.value = false;
  successMessage.value = "";
}

onMounted(async () => {
  if (!store.state?.items?.length) {
    try {
      await store.dispatch("fetchItems");
    } catch {
      // ignore
    }
  }

  await loadCart();
});
</script>

<template>
  <main class="cart-page">
    <header class="top">
      <div>
        <h1>Your Cart</h1>
        <p class="sub">Review items, update quantities, and checkout.</p>
      </div>

      <button class="btn ghost" @click="loadCart" :disabled="loading">
        Refresh
      </button>
    </header>

    <div v-if="loading" class="state">Loading cart...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else-if="!user" class="state">You must be logged in to view your cart.</div>

    <section v-else class="layout">
      <div class="left">
        <div v-if="actionError" class="banner error">{{ actionError }}</div>

        <div v-if="cartItems.length === 0" class="empty">
          <h3>Your cart is empty</h3>
          <p>Add some products to see them here.</p>
        </div>

        <div v-else class="items">
          <article v-for="ci in cartItems" :key="ci.cart_item_id" class="row">
            <img class="thumb" :src="displayImage(ci)" :alt="displayName(ci)" />

            <div class="info">
              <h3 class="name">{{ displayName(ci) }}</h3>
              <p class="price">R {{ money(displayPrice(ci)) }}</p>

              <div class="qty">
                <button
                  class="qtybtn"
                  @click="updateQty(ci, Number(ci.quantity) - 1)"
                  :disabled="Number(ci.quantity) <= 1"
                >
                  −
                </button>

                <input
                  class="qtyinput"
                  type="number"
                  min="1"
                  :value="ci.quantity"
                  @change="updateQty(ci, $event.target.value)"
                />

                <button class="qtybtn" @click="updateQty(ci, Number(ci.quantity) + 1)">+</button>

                <button class="remove" @click="removeItem(ci)">Remove</button>
              </div>
            </div>

            <div class="lineTotal">
              R {{ money(displayPrice(ci) * Number(ci.quantity || 0)) }}
            </div>
          </article>
        </div>

        <button v-if="cartItems.length" class="btn danger" @click="clearCart">
          Clear cart
        </button>
      </div>

      <aside class="right">
        <div class="summary">
          <h2>Summary</h2>

          <div class="sumrow">
            <span>Subtotal</span>
            <span>R {{ money(subtotal) }}</span>
          </div>

          <div class="sumrow" v-if="discountUnlocked">
            <span>Snake discount ({{ discountPercent }}%)</span>
            <span>- R {{ money(discountAmount) }}</span>
          </div>

          <div class="sumrow total">
            <span>Total</span>
            <span>R {{ money(total) }}</span>
          </div>

          <button class="btn" @click="checkout" :disabled="creatingOrder || cartItems.length === 0">
            {{ creatingOrder ? "Placing order..." : "Checkout" }}
          </button>

          <p class="note" v-if="discountUnlocked">
            Discount applied from <code>snake_discount_unlocked</code>.
          </p>
        </div>
      </aside>
    </section>

    <!-- ✅ Success modal -->
    <div v-if="showSuccess" class="modal-backdrop" @click.self="closeSuccess">
      <div class="modal">
        <h2>Success</h2>
        <p>{{ successMessage }}</p>
        <button class="btn" @click="closeSuccess">OK</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
}

.top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

h1 {
  margin: 0;
  font-size: 2.2rem;
}
.sub {
  margin: 6px 0 0 0;
  color: #666;
}

.state {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
}
.state.error {
  border-color: #ffccd2;
  color: #b00020;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 22px;
  align-items: start;
}

.left {
  display: grid;
  gap: 14px;
}

.banner {
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eee;
}
.banner.error {
  border-color: #ffccd2;
  color: #b00020;
}

.empty {
  padding: 18px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
}

.items {
  display: grid;
  gap: 12px;
}

.row {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  gap: 14px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #fff;
  align-items: center;
}

.thumb {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
}

.name {
  margin: 0;
  font-size: 1.05rem;
}
.price {
  margin: 6px 0 0 0;
  color: #555;
}

.qty {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.qtybtn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #111;
  background: #fff;
  cursor: pointer;
}

.qtyinput {
  width: 70px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 0 10px;
}

.remove {
  margin-left: 6px;
  border: 0;
  background: transparent;
  color: #b00020;
  cursor: pointer;
}

.lineTotal {
  justify-self: end;
  font-weight: 700;
}

.summary {
  position: sticky;
  top: 18px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #fff;
  display: grid;
  gap: 12px;
}

.sumrow {
  display: flex;
  justify-content: space-between;
  color: #333;
}
.sumrow.total {
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-weight: 800;
}

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn.ghost {
  background: #fff;
  color: #111;
}
.btn.danger {
  background: #b00020;
  border-color: #b00020;
}

.note {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}
code {
  background: #f3f3f3;
  padding: 2px 6px;
  border-radius: 6px;
}

/* ✅ Checkout success modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  z-index: 9999;
  padding: 16px;
}

.modal {
  width: min(520px, 100%);
  background: #fff;
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.25);
  display: grid;
  gap: 10px;
}

.modal h2 {
  margin: 0;
}
.modal p {
  margin: 0;
  color: #444;
}
</style>