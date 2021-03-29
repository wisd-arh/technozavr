<template>
    <main class="content container" v-if="cartLoading">
        <LoaderInfo title="Загрузка корзины"/>
    </main>
    <main class="content container" v-else-if="cartLoadingError">
        <LoaderErrorInfo title='Ошибка при загрузке корзины...' v-on:reload="reload"/>
    </main>
    <main class="content container" v-else>
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
            Корзина
          </a>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
        {{ cartCount }}
      </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <ul class="cart__list">
                        <CartItem v-for="item in products" :key="item.productId" :item="item"/>
                    </ul>
                </div>

                <div class="cart__block">
                    <p class="cart__desc">
                        Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
                    </p>
                    <p class="cart__price">
                        Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
                    </p>

                    <router-link tag="button" :to="{name: 'order'}" v-show="cartPositionsCount" class="cart__button button button--primery" type="submit">
                        Оформить заказ
                    </router-link>
                </div>
            </form>
        </section>
    </main>
</template>
<script>
import numberFormat from '@/helpers/numberFormat'
import { mapGetters, mapActions} from 'vuex'
import getNumEnding from '@/helpers/getNumEnding'
import CartItem from '@/components/Cart/CartItem.vue'
import LoaderInfo from '@/components/Loaders/LoaderInfo.vue'
import LoaderErrorInfo from '@/components/Loaders/LoaderErrorInfo.vue'

export default {
    components: { CartItem, LoaderInfo, LoaderErrorInfo },
    filters: {
      numberFormat
    },
    computed: {
      ...mapGetters({products: 'cartDetailProducts', 
                    totalPrice: 'cartTotalPrice',
                    cartPositionsCount: 'cartPositionsCount', 
                    cartLoading: 'cartLoading', 
                    cartLoadingError: 'cartLoadingError'}),
      cartCount() {
        return this.cartPositionsCount + ' ' + getNumEnding(this.cartPositionsCount, ['товар', 'товара', 'товаров'])
      }                    
    },
    methods: {
        ...mapActions(['loadCart']),
        reload() {
            this.loadCart()
        }
    },
}
</script>