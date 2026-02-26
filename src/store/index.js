import { createStore } from "vuex"
import axios from "axios"

const SNAKE_APPLES_KEY = "snake_apples"
const SNAKE_DISCOUNT_KEY = "snake_discount_unlocked"
const REWARD_TARGET_APPLES = 50

function readStoredApples() {
  const value = Number(localStorage.getItem(SNAKE_APPLES_KEY))
  if (Number.isNaN(value) || value < 0) return 0
  return value
}

const initialSnakeApples = readStoredApples()
const initialSnakeDiscount =
  localStorage.getItem(SNAKE_DISCOUNT_KEY) === "true" ||
  initialSnakeApples >= REWARD_TARGET_APPLES

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
    snakeApples: initialSnakeApples,
    snakeDiscountUnlocked: initialSnakeDiscount
  },

  getters: {
    isAuthenticated: state => !!state.token,
    userRole: state => state.user?.role,
    snakeApples: state => state.snakeApples,
    snakeDiscountUnlocked: state => state.snakeDiscountUnlocked
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload.user
      state.token = payload.token
    },
    ADD_SNAKE_APPLE(state) {
      const updatedCount = state.snakeApples + 1
      state.snakeApples = updatedCount
      localStorage.setItem(SNAKE_APPLES_KEY, String(updatedCount))

      if (updatedCount >= REWARD_TARGET_APPLES) {
        state.snakeDiscountUnlocked = true
        localStorage.setItem(SNAKE_DISCOUNT_KEY, "true")
      }
    },
    RESET_SNAKE_PROGRESS(state) {
      state.snakeApples = 0
      state.snakeDiscountUnlocked = false
      localStorage.setItem(SNAKE_APPLES_KEY, "0")
      localStorage.setItem(SNAKE_DISCOUNT_KEY, "false")
    },

    LOGOUT(state) {
      state.user = null
      state.token = null
    }
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const response = await axios.post(
          "http://localhost:5490/users/login",
          {
            email: payload.email,
            password: payload.password
          }
        )

        const { token, user } = response.data

        localStorage.setItem("token", token)

        commit("SET_USER", { user, token })

        return user

      } catch (error) {
        throw error.response?.data?.message || "Login failed"
      }
    },

    logout({ commit }) {
      localStorage.removeItem("token")
      commit("LOGOUT")
    }
  }
})
