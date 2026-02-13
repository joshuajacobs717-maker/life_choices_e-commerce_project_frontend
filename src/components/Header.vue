<script>
export default {
  name: "Header",
  data() {
    return {
      showLogin: false
    }
  },
  methods: {
    toggleLogin() {
      this.showLogin = !this.showLogin
    }
  }
};
</script>

<template>
  <header class="nav-container">

    <!-- LEFT -->
    <div class="logo-container">
      <h2 class="logo">
        <i class="fa-solid fa-eye"></i> Impulsive Shopping
      </h2>
    </div>

    <!-- CENTER -->
    <div class="menu-container">
      <button>Home</button>
      <button>Brands</button>
      <button>Contact Us</button>
    </div>

    <!-- RIGHT -->
    <div class="right-section">
      <div class="cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>

      <div class="login-options">
        <button class="login-btn" @click="toggleLogin">Login</button>
        <button class="signup-btn">Sign Up</button>
      </div>
    </div>

  </header>

  <!-- LOGIN MODAL -->
  <div v-if="showLogin" class="modal-overlay" @click.self="toggleLogin">
    <div class="login-card">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button class="submit-btn">Login</button>
    </div>
  </div>
</template>

<style>
/* MAIN NAVBAR */
.nav-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    background-color: transparent; 
    color: white;
    z-index: 1000;
    cursor: context-menu;
}

/* LEFT */
.logo {
    font-weight: bold;
    color: #040404;
    background: transparent;
    padding: 3px;
    border-radius: 15px;
    margin-left: 10px;
}

/* CENTER */
.menu-container {
    display: flex;
    gap: 5px;
    margin-right: 95px;
}

.menu-container button {
    background-color: #e7e7e7;
    border: none;
    border-radius: 10px;
    padding: 3px;
    width: 100px;
    color: #040404;
    font-size: 16px;
    cursor: pointer;
}

.menu-container button:hover {
    color: #e7e7e7;
    background-color: #040404;
}

/* RIGHT SECTION */
.right-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

.cart {
    font-size: 20px;
    cursor: pointer;
    color: #040404;
}

.login-options {
    display: flex;
    gap: 10px;
    margin-right: 50px;
}

.login-btn,
.signup-btn {
    background: #040404;
    border: none;
    color: #e7e7e7;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.login-btn:hover,
.signup-btn:hover {
    background-color: #e7e7e7;
    color: #040404;
}

/* MODAL OVERLAY */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* LOGIN CARD */
.login-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal h2 {
  text-align: center;
}

.modal input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  padding: 10px;
  border: none;
  background-color: #040404;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #333;
}
</style>
