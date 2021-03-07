<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price}} ₽
    </span>

    <ColorPicker class="colors colors--black" :colors="productColors" :currentColor.sync="currentColor"/>
  </li>
</template>

<script>
import ColorPicker from './ColorPicker.vue'
import colors from '@/data/colors'

export default {
  components: {
    ColorPicker,
  },
  name: 'ProductItem',
  props: ['product'],
  computed: {
    productColors() {
      return colors.filter(color => {
        return this.product.colorsIds.indexOf(color.id) >=0
      })
    }
  },
  data() {
    return {
      currentColor: '',
    }
  },
  created() {
    this.currentColor = this.productColors[0].id
  }
}
</script>
