import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
const app = createApp(App)

app.use(store)
app.use(router)

router.beforeEach(async (to, from, next) => {
  if (store.getters.isAuthenticated && !store.state.user) {
    try {
      await store.dispatch("fetchUser")
    } catch {
      return next("/login")
    }
  }
  next()
})

app.mount('#app')
