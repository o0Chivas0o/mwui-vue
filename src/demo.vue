<template>
  <div>
    <w-pagination :total-page="10" :current-page="10"></w-pagination>
  </div>
</template>

<script>
  import WPagination from '@/pagination/pagination'
  
  export default {
    name: 'demo',
    components: {WPagination},
    data () {
      return {}
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
