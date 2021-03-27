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

    <ColorPicker class="colors colors--black" :colors="productColors" :currentColor.sync="currentColor"/>
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
      return this.product.colors.map(color => {
        return {
          ...color,
          value: color.code
        }
      })
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
    gotoPage
  }
}
</script>