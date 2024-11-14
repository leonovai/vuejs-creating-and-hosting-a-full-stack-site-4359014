<template>
  <h1>Products</h1>
  <div class="grid-wrap">
    <div v-for="product in products" class="product-item" :key="product.id">
      <img :src="product.imageName" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <RouterLink :to="'/product/' + product.id">
        <button>View Details</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { products } from '../temp-data'

export default {
  name: 'ProductPage',
  data() {
    return {
      products,
    }
  }
}
</script>