<script>
export default{
    name: 'Socials'
}
</script>

<template>
  <h2>@Instagram</h2>
  <div class="social-container">

    <div class="social-profile">
      <a href="https://www.instagram.com/siza_m_official/">
        <img src="https://i.postimg.cc/RZQ8TnfG/siza.jpg" alt="profile"></a>
        <p>Siza</p>
    </div>

    <div class="social-profile">
      <a href="https://www.instagram.com/triple_j_11_/">
        <img src="https://i.postimg.cc/K8rV5gL7/Joshua.jpg" alt="profile"></a>
        <p>Joshua</p>
    </div>

    <div class="social-profile">
      <a href="https://www.instagram.com/_petersen.storm_/">
        <img src="https://i.postimg.cc/cLMjc8Y5/storm.jpg" alt="profile"></a>
        <p>Storm</p>
    </div>

    <div class="social-profile">
      <a href="https://www.instagram.com/ohsochalant/">
        <img src="https://i.postimg.cc/t4HwPz1B/abdul.jpg" alt="profile"></a>
        <p>Abdul</p>
    </div>

    <div class="social-profile">
      <a href="https://www.instagram.com/charlton_poole/">
        <img src="https://i.postimg.cc/t4HwPz1B/abdul.jpg" alt="profile"></a>
        <p>Charlton</p>
    </div>

  </div>
</template>

<style>

/* Parent container */
.social-container {
  display: flex;
  justify-content: center;  /* center everything */
  gap: 40px;                /* space between cards */
  flex-wrap: wrap;          /* responsive */
  padding: 60px 20px;

}

h2 {
  text-align: center;
  font-size: 2rem;
}
/* Individual profile */
.social-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}


/* Circular Images */
.social-profile img {
  width: 120px;
  height: 120px;
  border-radius: 50%;   /* makes circle */
  object-fit: cover;    /* prevents stretching */
  transition: 0.3s ease;
  cursor: pointer;
}

/* Hover effect */
.social-profile img:hover {
  transform: scale(1.08);
}

</style>
