<template>
  <div v-for="product in cartItems" :key="product.id" class="product-container">
    <img :src="product.imageUrl" class="product-image" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button class="remove-button" @click="$emit('remove-from-cart', product.id)">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartList',
  props: ["cartItems"],
}
</script>