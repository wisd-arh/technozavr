<template>
    <li class="cart__order">
        <h3>{{ cartItem.product.title }}</h3>
        <b>{{ cartItem.positionCost | numberFormat}} ₽</b>
        <span>Артикул: {{ cartItem.product.id }}</span>
    </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat'
export default {
    props: ['cartItem'],
    filters: { numberFormat },
}
</script>