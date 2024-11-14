<template>
  <div class="page-wrap">
    <h1>404: Page Not Found</h1>
    <img :src="logo" heigh="512" width="512">
  </div>
</template>

<script>
import logo from "@/assets/6.png"

export default {
  name: 'NotFoundPage',
  data() {
    return {
      logo,
    }
  }
}

</script>