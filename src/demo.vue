<template>
  <div>
    <w-pagination :total-page="1" :current-page.sync="currentPage"></w-pagination>
  </div>
</template>

<script>
  import WPagination from '@/pagination/pagination'
  
  export default {
    name: 'demo',
    components: {WPagination},
    data () {
      return {
        currentPage: 1
      }
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
