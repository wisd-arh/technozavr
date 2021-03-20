<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProductsString }} 
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :priceFrom.sync="filterPriceFrom" :priceTo.sync="filterPriceTo" :categoryId.sync="filterCategory" :colorId.sync="filterColor"/>
    <section class="catalog">
      <ProductList :products="filteredProducts"/>
      <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
    </div>
  </main>
</template>

<script>
//import products from '@/data/products'
import ProductList from '@/components/ProductList.vue'
import AppPagination from '@/components/AppPagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import axios from 'axios'
import getNumEnding from '@/helpers/getNumEnding'

export default {
  components: {
    ProductList,
    AppPagination,
    ProductFilter
  },
  data() {
    return {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategory: 0,
        filterColor: "",
        page: 1,
        productsPerPage: 6,
        productsData: null,
    }
  },
  watch: {
    countProducts() {
      this.page = 1
    },
    page() {
      this.loadProducts()
    },
  },
  computed: {
    filteredProducts() {
      let filteredProducts = this.products
      if (this.filterPriceFrom > 0) 
        filteredProducts = filteredProducts.filter(product => product.price >= this.filterPriceFrom)
      if (this.filterPriceTo > 0) 
        filteredProducts = filteredProducts.filter(product => product.price <= this.filterPriceTo)
      // if (this.filterCategory) 
      //   filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategory)
      
      // if (this.filterColor)  
      //   filteredProducts = filteredProducts.filter(product => {
      //         for (var i = 0; i < product.colorsIds.length; i++) {
      //               if (product.colorsIds[i] == this.filterColor) {
      //                   return true;
      //               }
      //           }
      //         return false;     
      //       }
      //     )
      return filteredProducts
    },
    products()  {
      return this.productsData ? this.productsData.items.map(product => {
        return {
          ...product,
          image: product.image.file.url
        }
      }) : []
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    },
    countProductsString() {
      return this.countProducts + ' ' + getNumEnding(this.countProducts, ['товар', 'товара', 'товаров'])
    },
  },
  methods: {
    loadProducts() {
      axios.get(`https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.productsPerPage}`)
        .then(response => this.productsData = response.data)
    },
  },
  created() {
    this.loadProducts()
  }
}
</script>