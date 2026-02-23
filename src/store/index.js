import { createStore } from "vuex"
import axios from "axios"

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null
  },

  getters: {
    isAuthenticated: state => !!state.token,
    userRole: state => state.user?.role
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload.user
      state.token = payload.token
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