<template>
    <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
        <div v-if='cartLoading'>
            <img src='../../../public/img/icons/loader.gif' width='30'/>
        </div>
        <div v-else-if='cartLoadingError'>
            <img src='../../../public/img/icons/error.png' width='30'/>
        </div>
        <div v-else>
            <svg width="30" height="21" fill="currentColor">
                <use xlink:href="#icon-cart"></use>
            </svg>
            <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
        </div>    
    </router-link>
</template>
<script>
import { mapGetters} from 'vuex'
export default {
    name: 'CartIndicator',
    computed: {
      ...mapGetters(['cartLoading', 'cartLoadingError']),
    },  
}
</script>