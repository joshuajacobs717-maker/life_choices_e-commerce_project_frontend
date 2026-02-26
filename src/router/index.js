import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import Auth from '@/views/Auth.vue'
import Contact from '@/views/Contact.vue'
import OurStory from '@/views/OurStory.vue'
import Challenges from '@/views/Challenges.vue'
import Cart from '@/views/Cart.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import OrdersView from '@/views/OrdersView.vue'
import Companies from '@/views/Companies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
    path: '/',
    redirect: '/home'
  },
  {
      path: "/companies",
      component: Companies,
      meta: {layout: "default"}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {layout: "default"}
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { layout: "auth" }
  },
  {
    path: "/admin",
    component: AdminDashboard,
    meta: {
      layout: "admin",
      requiresAuth: true,
      role: "Admin"
    },
    children: [
    {
      path: "products",
      component: Products
    },
    {
      path: "categories",
      component: CategoriesView
    },
    {
      path: "orders",
      component: OrdersView
    },
    {
      path: "companies",
      component: Companies
    }
    ]

  }, 
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/ourstory',
    name: 'OurStory',
    component: OurStory
  },
  // {
  //   path: '/auth',
  //   name: 'Auth',
  //   component: Auth,
  //   meta: { hideLayout: true }
  // },
  {
    path: '/login',
    redirect: '/auth?mode=login',
  },
  {
    path: '/register',
    redirect: '/auth?mode=register',
  },
  {
    path: '/challenges',
    name: 'Challenges',
    component: Challenges,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  }
  ],
})

export default router
