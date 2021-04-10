<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>
    <div class="fl_container">
    <ColorPicker class="colors colors--black" :colors="productColors" :currentColor.sync="currentColor"/>
      <img width=30 height=30 src="/img/svg/trolley_cart.svg" @click="addToCart(product.id)"/>
    </div>
    <div class="info hidden" ref="info">Добавлен в корзину</div>
  </li>
</template>

<script>
import ColorPicker from '../App/AppColorPicker.vue'
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'

export default {
    components: {
      ColorPicker,
    },
  name: 'ProductItem',
  props: ['product'],
  filters: {
    numberFormat
  },
  computed: {
    productColors() {
      return this.product.colors
    },
  },
  data() {
    return {
      currentColor: '',
    }
  },
  created() {
    this.currentColor = this.productColors[0].id
  },
  methods: {
    gotoPage,
    addToCart(id) {
      this.$store.dispatch('addProductToCart', {productId: id, amount: 1})
      this.$refs.info.classList.toggle('hidden')
      setTimeout(() => { this.$refs.info.classList.toggle('hidden') }, 2000)
    },
  }
}
</script>
<style scoped>
.fl_container {
  display: flex;
  align-content: space-around;
}

.info {
  display: inline-block;
  transition: all 1000ms ease;
}
.hidden {
  color: white;
  display: none;
  transition: all 1000ms ease;
}
</style>