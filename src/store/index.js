import Vue from "vue";
import Vuex from "vuex";

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
        }
    }
})