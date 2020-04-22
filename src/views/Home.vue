<template>
  <div class="home">
    <ImagesGrid/>
  </div>
</template>

<script>
// @ is an alias to /src
import ImagesGrid from '@/components/images-grid/images-grid.vue'

export default {
  name: 'Home',
  components: {
    ImagesGrid
  }
}
</script>
