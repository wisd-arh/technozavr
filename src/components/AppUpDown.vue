<template>
    <div class="form__counter">
        <button type="button" aria-label="Убрать один товар" @click="amountCurrent = amountCurrent>1 ? amountCurrent-1 : amountCurrent">
            <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
            </svg>
        </button>
        <input type="text" v-model.number="amountCurrent" name="count">
        <button type="button" aria-label="Добавить один товар" @click="amountCurrent++">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>
<script>
export default {
    name: 'AppUpDown',
    props: ['amount'],
    computed: {
        amountCurrent: {
            get() {
                return this.amount
            },
            set(value) {
                this.$emit("update:amount", value)
            }
        }
    }
}
</script>