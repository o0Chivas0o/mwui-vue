<template>
  <div>
    <cascader :source.sync="source" popoverHeight="20em" :selected.sync="selected" @update:selected="xxx"
              :load-data="loadData"></cascader>
    <cascader :source.sync="source" popoverHeight="20em" :selected.sync="selected" @update:selected="xxx"
              :load-data="loadData"></cascader>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import db from './db'
  
  function ajax (parentId = 0, success, fail) {
    let id = setTimeout(() => {
      let result = db.filter(item => item.parent_id === parentId)
      success(result)
    }, 300)
    return id
  }
  
  function promise (parentId = 0) {
    return new Promise((success, fail) => {
      setTimeout(() => {
        let result = db.filter(item => item.parent_id === parentId)
        result.forEach(node => {
          return db.filter(item => item.parent_id === node.id).length > 0 ? node.isLeaf = false : node.isLeaf = true
        })
        success(result)
      }, 300)
    })
  }
  
  export default {
    name: 'demo',
    components: {Cascader},
    data () {
      return {
        selected: [],
        source: []
      }
    },
    created () {
      promise(0).then(result => {
        this.source = result
      })
    },
    methods: {
      loadData (item, updateSource) {
        let {name, id, parent_id} = item
        promise(id).then(result => {
          updateSource(result)
        })
      },
      xxx () {
        promise(this.selected[0].id).then(result => {
          let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
          this.$set(lastLevelSelected, 'children', result)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
