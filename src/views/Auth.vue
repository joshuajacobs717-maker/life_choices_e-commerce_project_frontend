<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();

const activeMode = ref("login");

const loginForm = ref({
  email: "",
  password: "",
  remember: false,
});

const registerForm = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
});

const googleUser = ref(null); // Google ID token

const isLoginMode = computed(() => activeMode.value === "login");

// Toggle login/register mode
function setMode(mode) {
  activeMode.value = mode;
  router.replace({ path: "/auth", query: { mode } });
}

// Email login/register handlers
async function submitLogin() {
  try {
    const user = await store.dispatch("login", {
      email: loginForm.value.email,
      password: loginForm.value.password,
    });

    // Redirect based on role
    if (user.role === "Admin") {
      router.push("/admin");
    } else {
      router.push("/home");
    }
  } catch (error) {
    alert(error);
  }
}

function submitRegister() {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log("Email register:", registerForm.value);

  // Example (if you have a Vuex action later):
  // store.dispatch("register", { ...registerForm.value })
}

// ------------------- Google Login -------------------
function handleGoogleResponse(response) {
  console.log("Google ID token:", response.credential);
  googleUser.value = response.credential;
  // Send this token to your backend for verification/session
}

function signInWithGoogle() {
  if (!window.google) return console.error("Google SDK not loaded");
  window.google.accounts.id.prompt(); // shows popup / One Tap
}

// Initialize Google Identity Services
onMounted(() => {
  if (!window.google) return;

  window.google.accounts.id.initialize({
    client_id:
      "917078998548-0om70s536hqftmtnc17tdvc7b1dca9iu.apps.googleusercontent.com",
    callback: handleGoogleResponse,
    auto_select: false,
  });
});

// Watch query param mode
watch(
  () => route.query.mode,
  (mode) => {
    activeMode.value = mode === "register" ? "register" : "login";
  },
  { immediate: true }
);
</script>

<template>
  <main class="auth-page">
    <div class="back-to-home">
    <router-link class="btn-link" to="/home" ><button>Back</button></router-link>
    </div>
    <div class="wave-background" aria-hidden="true"></div>
    <section class="auth-card">
      <h1>{{ isLoginMode ? "Welcome back !" : "Create an account" }}</h1>

      <p v-if="isLoginMode" class="subtitle">Please enter your details</p>
      <p v-else class="subtitle">
        Already have an account?
        <button
          type="button"
          class="switch-btn inline"
          @click="setMode('login')"
        >
          Login
        </button>
      </p>

      <!-- Login Form -->
      <form v-if="isLoginMode" class="auth-form" @submit.prevent="submitLogin">
        <div class="field">
          <label for="login-email">Email</label>
          <input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            required
          />
        </div>

        <div class="field">
          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="loginForm.password"
            type="password"
            required
          />
        </div>

        <div class="row">
          <label class="checkbox-row" for="remember">
            <input id="remember" v-model="loginForm.remember" type="checkbox" />
            <span>Remember for 30 days</span>
          </label>
          <button type="button" class="text-link">Forget password</button>
        </div>

        <button type="submit" class="primary-btn">Login</button>

        <button type="button" class="google-btn" @click="signInWithGoogle">
          <i class="fa-brands fa-google"></i> Login with Google
        </button>

        <p class="bottom-text">
          Don&apos;t have an account?
          <button type="button" class="switch-btn" @click="setMode('register')">
            Sign up
          </button>
        </p>
      </form>

      <!-- Register Form -->
       
      <form v-else class="auth-form" @submit.prevent="submitRegister">
        <div class="field">
          <label for="register-name">Name</label>
          <input
            id="register-name"
            v-model="registerForm.name"
            type="text"
            required
          />
        </div>

        <div class="field">
          <label for="register-surname">Surname</label>
          <input
            id="register-surname"
            v-model="registerForm.surname"
            type="text"
            required
          />
        </div>

        <div class="field">
          <label for="register-email">Email</label>
          <input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            required
          />
        </div>

        <div class="field">
          <label for="register-password">Password</label>
          <input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            required
          />
        </div>

        <div class="field">
          <label for="register-confirm">Re-enter Password</label>
          <input
            id="register-confirm"
            v-model="registerForm.confirmPassword"
            type="password"
            required
          />
        </div>

        <label class="checkbox-row" for="terms">
          <input
            id="terms"
            v-model="registerForm.agree"
            type="checkbox"
            required
          />
          <span>I agree to the Terms &amp; Conditions</span>
        </label>

        <button type="submit" class="primary-btn">Create an account</button>

        <div class="divider"><span>Or</span></div>

        <button type="button" class="google-btn" @click="signInWithGoogle">
          <i class="fa-brands fa-google"></i> Login with Google
        </button>

        <p class="bottom-text">
          Already have an account?
          <button type="button" class="switch-btn" @click="setMode('login')">
            Login
          </button>
        </p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 70px);
  position: relative;
  display: flex;
  justify-content: center;
  padding: 110px 16px 42px;
  background: #ffffff;
  overflow: hidden;
}
.btn-link button{
  position: fixed;      /* stays in top-left even when scrolling */
  top: 20px;
  left: 20px;
  z-index: 1000;        /* above background effects */
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  background-color: #171717;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.25s ease;
}

.btn-link button:hover {
  background-color: #949393;
}

.wave-background {
  position: absolute;
  inset: 0;
  width: 200%;
  background: repeating-linear-gradient(
    to right,
    #171717 6px 8px,
    transparent 2px 10px
  );
  animation: waveMove 8s linear infinite;
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}
@keyframes waveMove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.auth-card {
  width: min(460px, 100%);
  background: #ececec;
  border-radius: 16px;
  padding: 38px 30px 28px;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}
h1 {
  margin: 0;
  text-align: center;
  font-size: 2.7rem;
  line-height: 1.15;
  color: #111;
}
.subtitle {
  margin: 10px 0 26px;
  text-align: center;
  color: #727272;
  font-size: 0.9rem;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
}
.field label {
  color: #2a2a2a;
  font-size: 1rem;
}
.field input {
  border: 0;
  border-bottom: 1px solid #a4a4a4;
  background: transparent;
  height: 38px;
  font-size: 1rem;
  color: #1f1f1f;
  outline: none;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.checkbox-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #3d3d3d;
  font-size: 0.8rem;
}
.checkbox-row input {
  margin: 0;
}
.text-link {
  border: 0;
  background: transparent;
  color: #4f4f4f;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
}
.primary-btn {
  margin-top: 6px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: #5eb5f2;
  color: #fff;
  font-size: 1.35rem;
  font-weight: 600;
  cursor: pointer;
}
.google-btn {
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: #e2e2e2;
  color: #262626;
  font-size: 1.35rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.divider {
  position: relative;
  text-align: center;
  color: #7a7a7a;
  font-size: 0.8rem;
}
.divider::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px solid #b0b0b0;
}
.divider span {
  position: relative;
  background: #ececec;
  padding: 0 10px;
}
.bottom-text {
  margin: 8px 0 0;
  text-align: center;
  color: #4d4d4d;
  font-size: 0.85rem;
}
.switch-btn {
  border: 0;
  background: transparent;
  color: #1f1f1f;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
}
.switch-btn.inline {
  margin-left: 4px;
}
@media (max-width: 640px) {
  .auth-page {
    padding-top: 96px;
  }
  .auth-card {
    padding: 28px 20px 24px;
    border-radius: 12px;
  }
  h1 {
    font-size: 2.1rem;
  }
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>