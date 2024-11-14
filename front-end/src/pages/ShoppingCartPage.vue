<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <div v-for="product in cartItems" :key="product.id" class="product-container">
      <img :src="product.imageName" class="product-image" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <button class="remove-button">Remove</button>
    </div>
    <button class="checkout-button">Checkout</button>
  </div>
  <div v-else>
    <p>Your cart is empty</p>
  </div>
</template>

<script>
import { cartItems } from '../temp-data'

export default {
  name: 'ShoppingCartPage',
  data() {
    return {
      cartItems,
    }
  }
}
</script>