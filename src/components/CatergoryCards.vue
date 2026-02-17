<script>
export default{
    name: "Cards"
}
</script>

<template>
<div class="items">
    <img src="https://via.placeholder.com/250x180" alt="Equipment">
    <h4>placeholder</h4>
    <p>placeholder text</p>
</div>
</template>

<style>
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