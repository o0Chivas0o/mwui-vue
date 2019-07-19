<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{result||`&nbsp;`}}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible" :style="{height:popoverHeight}">
      <cascader-items :items="source" :height="popoverHeight" :selected="selected"
                      @update:selected="onUpdateSelected" @load-data="loadData"></cascader-items>
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items'
  
  export default {
    name: 'WCascader',
    components: {CascaderItems},
    props: {
      source: {type: Array},
      popoverHeight: {type: String},
      selected: {type: Array, default: () => {return []}},
      loadData: {type: Function}
    },
    data () {
      return {
        popoverVisible: false
      }
    },
    computed: {
      result () {
        return this.selected.map(item => item.name).join('/')
      }
    },
    methods: {
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
        let item = newSelected[newSelected.length - 1]
        
        
        let simplest = (children, id) => {return children.filter(item => item.id === id)[0]}
        let complex = (children, id) => {
          let noChildren = []
          let hasChildren = []
          children.forEach(item => {item.children ? hasChildren.push(item) : noChildren.push(item)})
          let found = simplest(noChildren, id)
          if (found) {
            return found
          } else {
            found = simplest(hasChildren, id)
            if (found) { return found } else {
              for (let i = 0; i < hasChildren.length; i++) {
                found = complex(hasChildren[i].children, id)
                if (found) {return found}
              }
              return undefined
            }
          }
        }
        
        
        let updateSource = (result) => {
          let copy = JSON.parse(JSON.stringify(this.source))
          let toUpdate = complex(copy, item.id)
          toUpdate.children = result
          this.$emit('update:source', copy)
        }
        this.loadData(item, updateSource)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .cascader {
    position: relative;
    .trigger {
      border: 1px solid $border-color-hover;border-radius: $border-radius;min-width: 10em;height: $height;
      display: inline-flex;align-items: center;padding: 0 1em;}
    .popover-wrapper {position: absolute;top: 100%;margin-top: 8px;left: 0;background: white;@extend .box-shadow;}
  }
</style>
