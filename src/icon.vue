<template>
    <svg class="icon">
        <use :xlink:href=`#i-${name}`></use>
    </svg>
</template>

<script>
    export default {
        name: "icon",
        props: {
            name: {
                type: String,
                default: undefined
            }
        }
    }
</script>

<style lang="scss" scoped>
    .icon {
        width: 1em;
        height: 1em;
    }
</style>
