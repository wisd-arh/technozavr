<template>
    <div>{{ title }}
        <p><a @click.prevent="reloadAgain" class="errLink">Попробовать ещё раз</a></p>
        <div><img src="../../../public/img/icons/SVG-Animation-404-Page.gif"/></div>
    </div>
</template>
<script>
export default {
    name: 'LoaderErrorInfo',
    props: ['title'],
    methods: {
        reloadAgain() {
            this.$emit('reload')
        },
    }
}
</script>
<style scoped>
a {
    text-decoration: underline;
    cursor: pointer;
}
</style>