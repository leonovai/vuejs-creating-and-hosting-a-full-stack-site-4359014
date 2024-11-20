<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue'
import axios from 'axios';

export default {
  name: 'ProductDetailPage',
  data() {
    return {
      product: {},
    }
  },
  methods: {
    async addToCart() {
      console.log(this.$route.params.productId)
      await axios.post(
        '/api/users/12345/cart',
        {
          id: this.$route.params.productId,
        }
      );
      alert("Added to cart!");
    }
  },
  components: {
    NotFoundPage,
  },
  async created() {
    const response = await axios.get(`/api/products/${this.$route.params.productId}`)
    this.product = response.data;
  }
}
</script>