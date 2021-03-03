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

    <!-- <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :name="'color-'+ product.id" :value="color">
          <span class="colors__value" :style="{'background-color': color, 'border': '1px solid lightgrey'}">
          </span>
        </label>
      </li>
    </ul> -->
    <ColorPicker :colors="productColors" :groupId="product.id" classList="colors colors--black" :currentColor.sync="currentColor"/>
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
    this.currentColor = this.productColors[0].value
  }
}
</script>
