<template>
  <div>
    <cascader :source="source" popoverHeight="200px" :selected.sync="selected"></cascader>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import db from './db'
  
  function ajax (parent_id = 0) {
    return db.filter(item => {return item.parent_id == parent_id})
  }
  
  export default {
    name: 'demo',
    components: {Cascader},
    data () {
      return {
        selected: [],
        source: ajax()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
