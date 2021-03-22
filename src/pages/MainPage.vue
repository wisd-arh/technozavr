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
        <div class="b-popup" v-if="productsLoading">
          <div>Загрузка товаров...
            <div class="b-popup-content">
              <div class="holder">Загрузка товаров...
                <div class="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>        
            </div>  
          </div>
        </div>
      <div v-if="productsLoadingFailed">Ошибка при загрузке товаров...
        <p><a @click.prevent="loadProducts" class="errLink">Попробовать ещё раз</a></p>
        <div><img src="../../public/img/icons/SVG-Animation-404-Page.gif"/></div>
      </div>
      <ProductList :products="products"/>
      <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import AppPagination from '@/components/AppPagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import axios from 'axios'
import getNumEnding from '@/helpers/getNumEnding'
import { API_BASE } from '@/config'

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
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE + 'products2',
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
      }, 5000)    
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