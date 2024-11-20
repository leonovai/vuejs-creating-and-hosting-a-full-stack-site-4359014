import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import * as VueRouter from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbGyIIUGw-03m94fk1ribXH_Cd7pY2HcA",
  authDomain: "myproject-c7e1a.firebaseapp.com",
  projectId: "myproject-c7e1a",
  storageBucket: "myproject-c7e1a.firebasestorage.app",
  messagingSenderId: "429022019422",
  appId: "1:429022019422:web:6713833fcb3151210b19cf",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        { path: "/cart", component: ShoppingCartPage },
        { path: "/products/:productId", component: ProductDetailPage },
        { path: "/products", component: ProductsPage },
        { path: "/:pathMatch(.*)*", component: NotFoundPage },
      ],
    })
  )
  .mount("#app");
