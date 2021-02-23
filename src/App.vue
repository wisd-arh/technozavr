<template>
  <section class="catalog">
    <ProductList :products="products"/>
    <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
  </section>
</template>

<script>
import products from './data/products'
import ProductList from './components/ProductList.vue'
import AppPagination from './components/AppPagination.vue'

export default {
  components: {
    ProductList,
    AppPagination
  },
  name: 'App',
  data() {
    return {
        page: 1,
        productsPerPage: 6,
    }
  },
  computed: {
    products()  {
        const offset = (this.page - 1)*this.productsPerPage
        return products.slice(offset, offset + this.productsPerPage)
    },
    countProducts() {
        return products.length
    }
  }
}
</script>
