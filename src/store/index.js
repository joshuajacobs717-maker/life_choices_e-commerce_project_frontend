import { createStore } from "vuex"
import api from "@/services/api.js"

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
    companies: [],
    selectedCompany: null,
    categories: [],
    items: [],
    orders: []
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
    LOGOUT(state) {
      state.user = null
      state.token = null
    },



    SET_COMPANIES(state, payload){
        state.companies = payload
    },
    ADD_COMPANY(state, company) {
      state.companies.push(company)
    },   
    UPDATE_COMPANY(state, updatedCompany) {
      const index = state.companies.findIndex(
        cmp => cmp.company_id === updatedCompany.company_id
      )

      if (index !== -1) {
        state.companies[index] = updatedCompany
      }
    },
    SET_SELECTED_COMPANY(state, company) {
    state.selectedCompany = company
    },
    DELETE_COMPANY(state, company_id) {
      state.companies = state.companies.filter(
        cmp => cmp.company_id !== company_id
      )
    },



    SET_CATEGORIES(state, categories){
        state.categories = categories
    },
    ADD_CATEGORY(state, category) {
      state.categories.push(category)
    },   
    UPDATE_CATEGORY(state, updatedCategory) {
      const index = state.categories.findIndex(
        ctg => ctg.category_id === updatedCategory.category_id
      )

      if (index !== -1) {
        state.categories[index] = updatedCategory
      }
    },
    DELETE_CATEGORY(state, category_id) {
      state.categories = state.categories.filter(
        ctg => ctg.category_id !== category_id
      )
    },     



    SET_ITEMS(state, payload){
        state.items = payload
    },
    ADD_ITEM(state, item) {
      state.items.push(item)
    },   
    UPDATE_ITEM(state, updatedItem) {
      const index = state.items.findIndex(
        itm => itm.item_id === updatedItem.item_id
      )

      if (index !== -1) {
        state.items[index] = updatedItem
      }
    },
    DELETE_ITEM(state, item_id) {
      state.items = state.items.filter(
        itm => itm.item_id !== item_id
      )
    },     



    SET_ORDERS(state, payload){
        state.orders = payload
    },
    ADD_ORDER(state, order) {
      state.orders.push(order)
    },   
    UPDATE_ORDER(state, updatedOrder) {
      const index = state.orders.findIndex(
        odr => odr.order_id === updatedOrder.order_id
      )

      if (index !== -1) {
        state.orders[index] = updatedOrder
      }
    },
    DELETE_ORDER(state, order_id) {
      state.orders = state.orders.filter(
        odr => odr.order_id !== order_id
      )
    },     
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const response = await api.post("/users/login",
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
    //   router.push("/login") do this in a component, you can't import router in store
    },
    async fetchUser({ commit }) {
    try {
        const response = await api.get("/users/profile")
        commit("SET_USER", {
        user: response.data,
        token: localStorage.getItem("token")
        })
    } catch (error) {
        localStorage.removeItem("token")
        commit("LOGOUT")
        throw error
    }
    },   



    async fetchCompanies({ commit }) {
      try {
        const response = await api.get("/companies")

        commit("SET_COMPANIES", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Fetch Companies"
      }
    },
    async createCompany({ commit }, companyData) {
      try {
        const response = await api.post("/companies", companyData)

        commit("ADD_COMPANY", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Create Company"
      }
    },
    async updateCompany({ commit }, { company_id, updates }) {
      try {
        const response = await api.patch(
          `/companies/${company_id}`,
          updates
        )

        commit("UPDATE_COMPANY", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Update Company"
      }
    },
    async getCompany({ commit }, company_id) {
    try {
        const response = await api.get(`/companies/${company_id}`)
        commit("SET_SELECTED_COMPANY", response.data.company)
    } catch (error) {
        throw error.response?.data?.message || "Failed To Get Company"
    }
    },
    async deleteCompany({ commit }, company_id) {
      try {
        await api.delete(`/companies/${company_id}`)

        commit("DELETE_COMPANY", company_id)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Delete Company"
      }
    },



    async fetchCategories({ commit }) {
      try {
        const response = await api.get("/categories")

        commit("SET_CATEGORIES", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Fetch Categories"
      }
    },
    async createCategory({ commit }, categoryData) {
      try {
        const response = await api.post("/categories", categoryData)
        console.log(response.data)
        commit("ADD_CATEGORY", response.data.categories)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Create Category"
      }
    },
    async updateCategory({ commit }, { category_id, updates }) {
      try {
        const response = await api.patch(
          `/categories/${category_id}`,
          updates
        )

        commit("UPDATE_CATEGORY", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Update Category"
      }
    },
    async deleteCategory({ commit }, category_id) {
      try {
        await api.delete(`/categories/${category_id}`)

        commit("DELETE_CATEGORY", category_id)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Delete Category"
      }
    },  

    

    async fetchItems({ commit }) {
      try {
        const response = await api.get("/items")

        commit("SET_ITEMS", response.data.items)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Fetch Items"
      }
    },
    async createItem({ commit }, itemData) {
      try {
        const response = await api.post("/items", itemData)

        commit("ADD_ITEM", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Create Item"
      }
    },
    async updateItem({ commit }, { item_id, updates }) {
      try {
        const response = await api.patch(
          `/items/${item_id}`,
          updates
        )

        commit("UPDATE_ITEM", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Update Item"
      }
    },
    async deleteItem({ commit }, item_id) {
      try {
        await api.delete(`/items/${item_id}`)

        commit("DELETE_ITEM", item_id)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Delete Item"
      }
    },     

    

    async fetchOrders({ commit }) {
      try {
        const response = await api.get("/orders")

        commit("SET_ORDERS", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Fetch Orders"
      }
    },
    async createOrder({ commit }, orderData) {
      try {
        const response = await api.post("/orders", orderData)

        commit("ADD_ORDER", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed TO Create Order"
      }
    },
    async updateOrder({ commit }, { order_id, updates }) {
      try {
        const response = await api.patch(
          `/orders/${order_id}`,
          updates
        )

        commit("UPDATE_ORDER", response.data)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Update Order"
      }
    },
    async deleteOrder({ commit }, order_id) {
      try {
        await api.delete(`/orders/${order_id}`)

        commit("DELETE_ORDER", order_id)

      } catch (error) {
        throw error.response?.data?.message || "Failed To Delete Order"
      }
    },     
  }
})
