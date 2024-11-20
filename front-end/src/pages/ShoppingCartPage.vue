<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartList :cartItems="cartItems" @remove-from-cart="removeFromCart($event)" />
    <button class="checkout-button">Checkout</button>
  </div>
  <div v-else>
    <p>Your cart is empty</p>
  </div>
</template>

<script>
import ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';

export default {
  name: 'ShoppingCartPage',
  data() {
    return {
      cartItems: [],
    }
  },
  components: {
    ShoppingCartList,
  },
  async created() {
    const response = await axios.get('/api/users/12345/cart')
    this.cartItems = response.data;
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/12345/cart/${productId}`)
      this.cartItems = response.data;
    }
  },
}
</script>