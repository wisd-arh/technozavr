import Vue from "vue"
import Vuex from "vuex"
import products from '@/data/products'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartProducts: [{
            productId: '2a9bbfeae4ce4f9245c874f30a290fb5',
            amount: 2
        }, {
            productId: '0b3275e2499380a8d7d6420e6b58af8e',
            amount: 4
        }, {
            productId: '09aec722cbb4f3fd751c522ba1bc1499',
            amount: 7
        }, {
            productId: '9f8e33e8b49b17b29894a5aef8afd08c',
            amount: 1
        }, {
            productId: '2e80c5cfad6a361d19b9e01843683a00',
            amount: 20
        }, {
            productId: '1fd5b901132f2c8b488b24230fe8131e',
            amount: 3
        }]
    },
    mutations: {
        addProductToCart(state, {productId, amount}) {
            let item = state.cartProducts.find(item => item.productId === productId)
            if (item) {
                item.amount += amount
            } else 
                state.cartProducts.push({productId, amount})
        },
        updateCartProductAmount(state, {productId, amount}) {
            let item = state.cartProducts.find(item => item.productId === productId)
            if (item) {
                item.amount = amount
            }   
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                return {
                    ...item,
                    product: products.find(p => p.id === item.productId)
                } 
            })
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => acc+= item.amount * item.product.price, 0)
        },
        cartPositionsCount(state) {
            return state.cartProducts.length
        }
    },
})