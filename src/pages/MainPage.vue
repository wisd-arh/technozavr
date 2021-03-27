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
      <div v-if="productsLoading">
        <LoaderInfo title="Загрузка товаров"/>
      </div>
      <div v-if="productsLoadingFailed">
        <LoaderErrorInfo title='Ошибка при загрузке товаров...' v-on:reload="reload"/>
      </div>
      <ProductList :products="products"/>
      <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/Product/ProductList.vue'
import AppPagination from '@/components/App/AppPagination.vue'
import ProductFilter from '@/components/Product/ProductFilter.vue'
import LoaderInfo from '@/components/Loaders/LoaderInfo.vue'
import LoaderErrorInfo from '@/components/Loaders/LoaderErrorInfo.vue'
import axios from 'axios'
import getNumEnding from '@/helpers/getNumEnding'
import { API_BASE } from '@/config'

export default {
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
    LoaderInfo,
    LoaderErrorInfo
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
        productsLoading: false,
        productsLoadingFailed: false,
    }
  },
  watch: {
    countProducts() {
      this.page = 1
    },
    filterPriceFrom() {
      this.loadProducts()
    }, 
    filterPriceTo() {
      this.loadProducts()
    }, 
    filterCategory() {
      this.loadProducts()
    }, 
    filterColor() {
      this.loadProducts()
    }, 
    page() {
      this.loadProducts()
    },
  },
  computed: {
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
    reload() {
      this.loadProducts()
    },
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE + 'products',
          {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategory,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId : this.filterColor
            }
          })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
      }, 0)    
    },
  },
  created() {
    this.loadProducts()
  }
}
</script>
<style scoped>
.errLink {
  text-decoration: underline; 
  cursor: pointer;
}
</style>