<template>
  <ul class="catalog__list">
    <ProductItem  v-for="(product, index) in products" :key="index" :product="product"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue'
export default {
  name: 'ProductList',
  props: ['products'],
  components: {
      ProductItem
  }
}
</script>
