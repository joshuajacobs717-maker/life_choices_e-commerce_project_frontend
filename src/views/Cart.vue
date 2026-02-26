<script setup>
import { computed, ref } from "vue";

const discountCode = ref("");
const appliedDiscount = ref(500);

const cartItems = [
  {
    id: 1,
    name: "DuoComfort Sofa Premium",
    qty: 1,
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: 2,
    name: "IronOne Desk",
    qty: 1,
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=320&q=80",
  },
];

const shipping = 150;

const subtotal = computed(() =>
  cartItems.reduce((total, item) => total + item.price * item.qty, 0),
);
const total = computed(() => subtotal.value + shipping - appliedDiscount.value);

function formatZAR(value) {
  return `R${value.toLocaleString("en-ZA").replace(/,/g, " ")}`;
}

function applyDiscountCode() {
  if (discountCode.value.trim().toUpperCase() === "SAVE500") {
    appliedDiscount.value = 500;
    return;
  }

  appliedDiscount.value = 0;
}
</script>

<template>
  <main class="cart-page">
    <section class="checkout-shell">
      <header class="checkout-header">
        <h1>Impulsive Shopping</h1>

        <div class="checkout-steps">
          <div class="step">
            <span class="step-icon done"><i class="fa-solid fa-check"></i></span>
            <span>Cart</span>
          </div>
          <div class="line"></div>
          <div class="step">
            <span class="step-icon done"><i class="fa-solid fa-check"></i></span>
            <span>Review</span>
          </div>
          <div class="line"></div>
          <div class="step active">
            <span class="step-icon current">3</span>
            <span>Checkout</span>
          </div>
        </div>
      </header>

      <div class="checkout-content">
        <section class="left-panel">
          <h2>Checkout</h2>
          <p class="label-title">Shipping Information</p>

          <div class="delivery-pill">
            <i class="fa-solid fa-circle-dot"></i>
            <i class="fa-solid fa-truck-fast"></i>
            <span>Delivery</span>
          </div>

          <form class="checkout-form" @submit.prevent>
            <label>
              Full name <span>*</span>
              <input type="text" placeholder="Enter full name" />
            </label>

            <label>
              Email address <span>*</span>
              <input type="email" placeholder="Enter email address" />
            </label>

            <label>
              Phone number <span>*</span>
              <div class="input-with-icon">
                <span class="prefix">ZA</span>
                <input type="tel" placeholder="Enter phone number" />
              </div>
            </label>

            <label>
              Country <span>*</span>
              <div class="select-wrap">
                <select>
                  <option selected disabled>Choose country</option>
                  <option>South Africa</option>
                  <option>Namibia</option>
                  <option>Botswana</option>
                </select>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </label>

            <div class="inline-fields">
              <label>
                City
                <input type="text" placeholder="Enter city" />
              </label>
              <label>
                Province
                <input type="text" placeholder="Enter province" />
              </label>
              <label>
                ZIP Code
                <input type="text" placeholder="Enter ZIP code" />
              </label>
            </div>

            <label class="terms">
              <input type="checkbox" checked />
              <span>I have read and agree to the Terms and Conditions.</span>
            </label>
          </form>
        </section>

        <aside class="right-panel">
          <h3>Review your cart</h3>

          <div class="cart-list">
            <article class="cart-item" v-for="item in cartItems" :key="item.id">
              <img :src="item.image" :alt="item.name" />
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p class="qty">{{ item.qty }}X</p>
                <p class="price">{{ formatZAR(item.price) }}</p>
              </div>
            </article>
          </div>

          <div class="coupon-row">
            <div class="coupon-input">
              <i class="fa-solid fa-ticket"></i>
              <input
                v-model="discountCode"
                type="text"
                placeholder="Discount code"
              />
            </div>
            <button type="button" @click="applyDiscountCode">Apply</button>
          </div>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ formatZAR(subtotal) }}</span>
            </div>
            <div class="total-row">
              <span>Shipping</span>
              <span>{{ formatZAR(shipping) }}</span>
            </div>
            <div class="total-row">
              <span>Discount</span>
              <span>-{{ formatZAR(appliedDiscount) }}</span>
            </div>
            <div class="total-row final">
              <span>Total</span>
              <span>{{ formatZAR(total) }}</span>
            </div>
          </div>

          <button class="primary-btn">Pay Now</button>
          <button class="secondary-btn">Continue Shopping</button>

          <div class="secure-box">
            <p class="secure-title">
              <i class="fa-solid fa-lock"></i>
              Secure Checkout - SSL Encrypted
            </p>
            <p>
              Ensuring your financial and personal details are secure during every
              transaction.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Bebas+Neue&display=swap");

.cart-page {
  min-height: 100vh;
  background: #17181b;
  padding: 70px 16px 20px;
}

.checkout-shell {
  max-width: 1240px;
  margin: 0 auto;
  background: #f1f2f5;
  border: 1px solid #2d2d2d;
}

.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid #d7d9de;
}

.checkout-header h1 {
  margin: 0;
  color: #3f58e2;
  font-family: "Bebas Neue", "Montserrat", sans-serif;
  letter-spacing: 0.6px;
  font-size: 2.8rem;
  line-height: 1;
}

.checkout-steps {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333640;
  font-size: 0.92rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.step-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.step-icon.done {
  background: #ebecff;
  color: #4d62e5;
  border: 1px solid #cfd3ff;
}

.step-icon.current {
  background: #3f58e2;
  color: #ffffff;
  font-weight: 600;
}

.line {
  width: 34px;
  height: 1px;
  background: #cfd2d8;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  min-height: calc(100vh - 140px);
}

.left-panel {
  padding: 26px 34px 32px;
  border-right: 1px solid #e0e1e6;
}

.left-panel h2 {
  margin: 0;
  font-size: 2.6rem;
  line-height: 1;
  font-family: "Barlow Condensed", "Montserrat", sans-serif;
  font-weight: 500;
  color: #202226;
}

.label-title {
  margin: 20px 0 12px;
  color: #2d2f36;
  font-size: 1.03rem;
}

.delivery-pill {
  border: 1px solid #7185ed;
  border-radius: 7px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4f64e8;
  margin-bottom: 14px;
  background: #f5f7ff;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkout-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #1d1e22;
  font-size: 0.95rem;
}

.checkout-form span {
  color: #f03f4f;
}

.checkout-form input,
.checkout-form select {
  height: 44px;
  border-radius: 7px;
  border: 1px solid #d4d7df;
  background: #f8f9fc;
  color: #2a2b31;
  padding: 0 12px;
  outline: none;
  font-size: 0.93rem;
}

.checkout-form input:focus,
.checkout-form select:focus {
  border-color: #8090ea;
}

.input-with-icon {
  display: flex;
  align-items: center;
  border: 1px solid #d4d7df;
  border-radius: 7px;
  overflow: hidden;
  background: #f8f9fc;
}

.input-with-icon .prefix {
  color: #545867;
  padding: 0 10px;
  font-weight: 600;
  background: #f0f1f6;
  border-right: 1px solid #d4d7df;
  height: 100%;
  display: inline-flex;
  align-items: center;
}

.input-with-icon input {
  border: 0;
  flex: 1;
  background: transparent;
}

.select-wrap {
  position: relative;
}

.select-wrap i {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #5860a0;
  pointer-events: none;
}

.select-wrap select {
  width: 100%;
  appearance: none;
}

.inline-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.terms {
  flex-direction: row !important;
  align-items: center;
  gap: 8px !important;
  margin-top: 4px;
  font-size: 0.85rem !important;
  color: #3f424b !important;
}

.terms input {
  width: 15px;
  height: 15px;
  accent-color: #4f64e8;
}

.terms span {
  color: inherit !important;
}

.right-panel {
  padding: 26px 34px 32px;
}

.right-panel h3 {
  margin: 3px 0 12px;
  font-size: 1.15rem;
  font-weight: 500;
  color: #24262d;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-item {
  display: grid;
  grid-template-columns: 86px 1fr;
  gap: 12px;
  align-items: center;
  border: 1px solid #d8dbe3;
  border-radius: 8px;
  background: #f8f9fc;
  padding: 9px;
}

.cart-item img {
  width: 86px;
  height: 62px;
  object-fit: cover;
  border-radius: 5px;
}

.item-info h4 {
  margin: 0;
  font-size: 0.97rem;
  color: #1f2127;
}

.item-info .qty {
  margin: 1px 0 8px;
  font-size: 0.74rem;
  color: #6d717f;
}

.item-info .price {
  margin: 0;
  color: #1d1f26;
  font-size: 0.92rem;
}

.coupon-row {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
}

.coupon-input {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d2d5df;
  border-radius: 7px;
  background: #f8f9fc;
  padding: 0 10px;
}

.coupon-input i {
  color: #5660a3;
}

.coupon-input input {
  border: 0;
  background: transparent;
  height: 42px;
  width: 100%;
  outline: none;
  font-size: 0.9rem;
}

.coupon-row button {
  border: 0;
  background: transparent;
  color: #4f64e8;
  font-weight: 500;
  padding: 0 6px;
  cursor: pointer;
}

.totals {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  color: #4c4f5a;
  font-size: 0.9rem;
}

.total-row.final {
  margin-top: 2px;
  color: #1f2127;
  font-weight: 600;
}

.primary-btn,
.secondary-btn {
  margin-top: 14px;
  height: 45px;
  width: 100%;
  border: 0;
  border-radius: 8px;
  background: #4259dc;
  color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
}

.secondary-btn {
  margin-top: 10px;
}

.secure-box {
  margin-top: 12px;
  color: #5f6678;
  font-size: 0.84rem;
  line-height: 1.55;
}

.secure-title {
  margin: 0 0 4px;
  color: #2d3340;
  display: flex;
  align-items: center;
  gap: 7px;
}

.secure-box p {
  margin: 0;
}

@media (max-width: 980px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .left-panel {
    border-right: 0;
    border-bottom: 1px solid #e0e1e6;
  }
}

@media (max-width: 760px) {
  .cart-page {
    padding-top: 78px;
  }

  .checkout-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .checkout-header h1 {
    font-size: 2.2rem;
  }

  .left-panel,
  .right-panel {
    padding: 20px;
  }

  .inline-fields {
    grid-template-columns: 1fr;
  }

  .checkout-steps {
    font-size: 0.86rem;
  }
}
</style>
