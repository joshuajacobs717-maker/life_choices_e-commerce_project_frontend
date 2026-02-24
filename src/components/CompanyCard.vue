<script>
export default {
  name: "CompanyCard"
}
</script>

<template>
  <div class="brand">
    
    <!-- LEFT SIDE -->
    <div class="brand-left">
      <img src="https://via.placeholder.com/250x180" alt="Equipment">
      <h4>Brandname</h4>
    </div>

    <!-- RIGHT SIDE -->
    <div class="brand-right">
      <p>
        This is the brand description. You can add more text here and it will
        stay aligned nicely on the right side of the card.
      </p>
      <button>View On Map</button>
    </div>

  </div>
</template>

<style>
.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);

  transition: 0.3s ease;
}

.brand:hover {
  transform: translateY(-5px);
}

/* LEFT SIDE */
.brand-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}

.brand-left img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

/* RIGHT SIDE */
.brand-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.brand-right p {
  margin: 0;
  line-height: 1.5;
  color: #333;
}

/* BUTTON */
button {
  align-self: flex-start;
  padding: 10px 18px;
  background-color: #121212;
  color: #ebebeb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  background-color: #484848;
}

/* Responsive (Mobile) */
@media (max-width: 768px) {
  .brand {
    flex-direction: column;
    text-align: center;
  }

  .brand-right {
    align-items: center;
  }

  button {
    align-self: center;
  }
}
</style>