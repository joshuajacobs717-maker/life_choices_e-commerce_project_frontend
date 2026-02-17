<script>
export default {
  name: "Questions",

  data() {
    return {
      activeIndex: null
    };
  },

  methods: {
    toggle(index) {
      this.activeIndex =
        this.activeIndex === index ? null : index;
    }
  }
};
</script>

<template>
  <div class="faq-container">
    <h3>Frequently Asked Questions</h3>

    <!-- Question 1 -->
    <button class="drop-btn" @click="toggle(0)">
      Morbi sagittis enim non metus varius condimentum 
      <i class="fa-solid fa-plus"></i>
    </button>
    <div class="drop-content" v-show="activeIndex === 0">
      <p>
        Morbi sagittis enim non metus varius condimentum. Sed et scelerisque mi.
        Quisque dapibus odio nibh, eget aliquet sapien sagittis id.
        fa-regula
      </p>
    </div>

    <!-- Question 2 -->
    <button class="drop-btn" @click="toggle(1)">
      Morbi sagittis enim non metus varius condimentum 
      <i class="fa-solid fa-plus"></i>
    </button>
    <div class="drop-content" v-show="activeIndex === 1">
      <p>
        Sed et scelerisque mi. Quisque dapibus odio nibh, eget aliquet sapien
        sagittis id.
      </p>
    </div>

    <!-- Question 3 -->
    <button class="drop-btn" @click="toggle(2)">
      Morbi sagittis enim non metus varius condimentum 
      <i class="fa-solid fa-plus"></i>
    </button>
    <div class="drop-content" v-show="activeIndex === 2">
      <p>
        Vivamus non nisl posuere, gravida urna posuere, blandit tortor.
      </p>
    </div>

    <!-- Question 4 -->
    <button class="drop-btn" @click="toggle(3)">
      Morbi sagittis enim non metus varius condimentum 
      <i class="fa-solid fa-plus"></i>
    </button>
    <div class="drop-content" v-show="activeIndex === 3">
      <p>
        Aliquam risus justo, viverra id risus at, bibendum hendrerit augue 
      </p>
    </div>

  </div>
</template>

<style>
/* Center Everything */
.faq-container {
  min-width: 300px;;
  text-align: center;
  padding: 20px 20px;
  background-color: #040404;
  color: #f3f3f3;
}

.faq-container h3 {
  margin-bottom: 40px;
  font-size: 2rem;
}

/* Button */
.drop-btn {
  width: 60%;
  padding: 15px;
  border: 1px solid #f3f3f3;
  background-color: transparent;
  color: #f3f3f3;
  border-radius: 3px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;
}

.drop-btn:hover {
  background-color: #333;
}

/* Dropdown Content */
.drop-content {
  color: #f3f3f3;
  padding: 15px;
  border-radius: 8px;
  margin-top: 8px;
  text-align: center;
}
</style>
