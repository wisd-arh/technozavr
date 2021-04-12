import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
import { API_BASE } from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: [],
        cartLoading: false,
        cartLoadingError: false,
        orderInfo: null,
    },
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo
        },
        resetCart(state) {
            state.cartProducts = []
            state.cartProductsData = []
        },
        updateCartProductAmount(state, {productId, amount}) {
            let item = state.cartProducts.find(item => item.productId === productId)
            if (item) {
                item.amount = amount
            }   
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map( item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        },
        updateLoadingStatus(state, {loading, error}) {
            state.cartLoading = loading
            state.cartLoadingError = error
        }
    },
    getters: {
        getOrderInfo(state) {
            return state.orderInfo
        },
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                const product =  state.cartProductsData.find(p => p.product.id === item.productId).product
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url,
                        
                    },
                    positionCost: product.price * item.amount, 
                }    
            })
        },
        orderProducts(state) {
            if (state.orderInfo) {
                return state.orderInfo.basket.items.map(item => {
                    return {
                        ...item,
                        positionCost: item.price * item.quantity
                    }
                })
            } else { return []; }    
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => acc+= item.amount * item.product.price, 0)
        },
        cartPositionsCount(state) {
            return state.cartProducts.length
        },
        cartLoading(state) {
            return state.cartLoading
        },
        cartLoadingError(state) {
            return state.cartLoadingError
        }
    },
    actions: {
        loadOrderInfo(context, orderId) {
            return new Promise((resolve, reject) => {
                    axios.get(API_BASE + 'orders/'+orderId,  {
                    params: { userAccessKey: context.state.userAccessKey }
                })
                .then(response => { context.commit('updateOrderInfo', response.data)
                    resolve()
                })
                .catch(() => reject())
            })   
        },
        loadCart(context) {
            context.commit('updateLoadingStatus', {loading: true, error: false})
            axios.get(API_BASE + 'baskets', {
                    params: { userAccessKey: context.state.userAccessKey }
                })
                .then(response => {
                    if (!context.state.userAccessKey) {
                        localStorage.setItem('userAccessKey', response.data.user.accessKey)
                        context.commit('updateUserAccessKey', response.data.user.accessKey)
                    }
                    context.commit('updateCartProductsData', response.data.items)
                    context.commit('syncCartProducts')
                    context.commit('updateLoadingStatus', {loading: false, error: false})
                })    
                .catch(() => { 
                    context.commit('updateLoadingStatus', {loading: false, error: true})
                })
        },
        addProductToCart(context, { productId, amount }) {
            return axios.post(API_BASE + 'baskets/products', 
                { productId: productId, quantity: amount },
                {
                    params: { userAccessKey: context.state.userAccessKey }
                })
                .then((response) => {
                    context.commit('updateCartProductsData', response.data.items)
                    context.commit('syncCartProducts')
                })
        },
        updateCartProductAmount(context, { productId, amount }) {
            if (amount < 1) return;
            context.commit('updateCartProductAmount', { productId, amount })
            return new Promise((resolve, reject) => {
                axios.put(API_BASE + 'baskets/products', 
                { productId: productId, quantity: amount },
                {
                    params: { userAccessKey: context.state.userAccessKey }
                })
                .then((response) => {
                    context.commit('updateCartProductsData', response.data.items)
                    resolve()
                })
                .catch(() => {
                    context.commit('syncCartProducts')
                    reject()
                })
            })    
        },
        removeCartProduct(context, productId) {
            context.commit('deleteCartProduct', productId)
            return new Promise((resolve, reject) => {
                axios.delete(API_BASE + 'baskets/products', {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    },
                    data: {
                        productId: productId
                    }
                })
                .then((response) => {
                    context.commit('updateCartProductsData', response.data.items)
                    resolve()
                })
                .catch(() => { 
                    context.commit('syncCartProducts')
                    reject() 
                })
            })    
        }
    },
})