<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :priceFrom.sync="filterPriceFrom" :priceTo.sync="filterPriceTo" :categoryId.sync="filterCategory" :colorId.sync="filterColor"/>
    <section class="catalog">
      <ProductList :products="products" @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"/>
      <AppPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products'
import ProductList from '@/components/ProductList.vue'
import AppPagination from '@/components/AppPagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'

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
    }
  },
  watch: {
    countProducts() {
      this.page = 1
    }  
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products
      if (this.filterPriceFrom > 0) 
        filteredProducts = filteredProducts.filter(product => product.price >= this.filterPriceFrom)
      if (this.filterPriceTo > 0) 
        filteredProducts = filteredProducts.filter(product => product.price <= this.filterPriceTo)
      if (this.filterCategory) 
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategory)
      
      if (this.filterColor)  
        filteredProducts = filteredProducts.filter(product => {
              for (var i = 0; i < product.colorsIds.length; i++) {
                    if (product.colorsIds[i] == this.filterColor) {
                        return true;
                    }
                }
              return false;     
            }
          )
      return filteredProducts
    },
    products()  {
        const offset = (this.page - 1)*this.productsPerPage
        return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
    countProducts() {
        return this.filteredProducts.length
    }
  }
}
</script>
