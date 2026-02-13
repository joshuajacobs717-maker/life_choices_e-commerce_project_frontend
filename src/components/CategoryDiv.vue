<script>
export default{
    name: "ShopBy"
}
</script>

<template>
  <section class="category-section">

    <!-- Top Right Link -->
    <div class="section-header">
      <p class="see-more">
        See More <i class="fa-solid fa-angle-right"></i>
      </p>
    </div>

    <!-- Cards Container -->
    <div class="shop-by-cat">
      <div class="items">
        <img src="https://via.placeholder.com/250x180" alt="Clothing">
        <h4>Clothing</h4>
        <p>Style that moves with you.</p>
      </div>

      <div class="items">
        <img src="https://via.placeholder.com/250x180" alt="Equipment">
        <h4>Equipment</h4>
        <p>Built for performance. Ready for anything.</p>
      </div>

      <div class="items">
        <img src="https://via.placeholder.com/250x180" alt="Appliances">
        <h4>Appliances</h4>
        <p>Smart essentials for everyday living.</p>
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
  justify-content: flex-end;
  margin-bottom: 30px;
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
