<script>
export default{
    name: "About"
}</script>

<template>
  <div class="about-container">
    <!-- Left: About Story -->
    <div class="about-story">
      <h3>About Us</h3>
      <p>
        Morbi sagittis enim non metus varius condimentum. Sed et scelerisque mi.
        Quisque dapibus odio nibh, eget aliquet sapien sagittis id. Nullam sed
        arcu rhoncus, tempus odio sed, rutrum purus. Vivamus non nisl posuere,
        gravida urna posuere, blandit tortor. Praesent non iaculis arcu, sit
        amet dapibus velit. Aliquam risus justo, viverra id risus at, bibendum
        hendrerit augue. Fusce vestibulum diam ac odio ultricies, a aliquam
        justo tempus. Vestibulum gravida orci sed ipsum vehicula pharetra. Sed
        accumsan pharetra pretium. Pellentesque posuere magna vitae rhoncus
        lobortis. Donec sit amet elit at orci feugiat pellentesque nec nec orci.
      </p>
    </div>

    <!-- Right: Image -->
    <div class="about-image">
      <img src="https://images.unsplash.com/photo-1677849242177-2a86834456f0?q=80&w=1067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="About Image">
    </div>
  </div>
</template>

<style>
.about-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 60px 80px;
  background-color: #f5f5f5;
  flex-wrap: wrap; /* for responsiveness */
}

/* About Story (left) */
.about-story {
  flex: 1;
  min-width: 300px;
}

.about-story h3 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.about-story p {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

/* About Image (right) */
.about-image {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  object-fit: cover;
}
</style>
