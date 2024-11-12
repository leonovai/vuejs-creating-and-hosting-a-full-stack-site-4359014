import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import ProductsPage from './pages/ProductsPage.vue'

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [
    {path: "/cart", component: ShoppingCartPage},
    {path: "/product/:id", component: ProductDetailPage},
    {path: "/products", component: ProductsPage},
  ]
}))
.mount('#app')
