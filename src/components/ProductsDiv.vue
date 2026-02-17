<script>
export default {
  name: "Products"
}
</script>

<template>
  <section class="category-section">

    <!-- Top Header -->
    <div class="section-header">
      <h2>Top Products</h2>
      <p class="see-more">
        <router-link class="link" to="/products">See More <i class="fa-solid fa-angle-right"></i></router-link>
      </p>
    </div>

    <!-- Cards Container -->
    <div class="shop-by-cat">
      <div class="items">
        <img src="https://via.placeholder.com/250x180">
        <h4>placeholder</h4>
        <p>Neque porro quisquam est qui dolorem ipsum </p>
      </div>

      <div class="items">
        <img src="https://via.placeholder.com/250x180">
        <h4>placeholder</h4>
        <p>Neque porro quisquam est qui dolorem ipsum </p>
      </div>

      <div class="items">
        <img src="https://via.placeholder.com/250x180">
        <h4>placeholder</h4>
        <p>Neque porro quisquam est qui dolorem ipsum </p>
      </div>

      <div class="items">
        <img src="https://via.placeholder.com/250x180">
        <h4>placeholder</h4>
        <p>Neque porro quisquam est qui dolorem ipsum </p>
      </div>

      <div class="items">
        <img src="https://via.placeholder.com/250x180">
        <h4>placeholder</h4>
        <p>Neque porro quisquam est qui dolorem ipsum </p>
      </div>
    </div>

  </section>
</template>

<style>
.category-section {
  padding: 60px 80px;
  background-color: #e7e7e7;
}

/* Top header area */
.section-header {
  display: flex;
  justify-content: space-between; /* <--- makes h2 left and see-more right */
  align-items: center;           /* vertically center them */
  margin-bottom: 30px;
}

.section-header h2 {
  margin: 0; /* remove default margin */
}

.see-more {
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s ease;
}

.see-more:hover {
  opacity: 0.7;
}

/* Cards layout */
.shop-by-cat {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* Individual card */
.items {
  flex: 1;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s ease;
}

.items img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.items:hover {
  transform: translateY(-5px);
}
</style>
