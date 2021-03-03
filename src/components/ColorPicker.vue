<template>
  <ul :class="classList">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :name="'color-'+groupId" :value="color.id"
          :checked="color"
          @change="$emit('update:currentColor', $event.target.value)"        
        >
        <span class="colors__value" :style="{'background-color': color.value, 'border': '1px solid lightgrey'}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColorPicker',
  model: {
    prop: 'currentColor',
    event: 'update'
  },
  props: ['colors', 'groupId', 'classList', 'currentColor'],
}
</script>
