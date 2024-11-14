<template>
  <div class="nav-bar">
    <RouterLink to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo" height="128" width="128">
      </div>
    </RouterLink>
    <RouterLink to="/cart" class="cart-link">
      <button>Shopping Cart</button>
    </RouterLink>
  </div>
</template>

<script>
import logo from '@/assets/8.png'

export default {
  name: 'NavBar',
  components: {
  },
  data() {
    return {
      logo,
    }
  }
}
</script>