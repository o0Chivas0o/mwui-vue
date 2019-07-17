<template>
  <div class="cascaderItems" :style="{height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="onClickLabel(item)">{{item.name}}
        <icon v-if="item.children" name="right"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <w-cascader-item :items="rightItems" :height="height" :level="level + 1" :selected="selected"
                       @update:selected="onUpdateSelected"></w-cascader-item>
    </div>
  </div>
</template>

<script>
  import Icon from './icon'
  
  export default {
    name: 'WCascaderItem',
    components: {Icon},
    props: {
      items: {type: Array},
      height: {type: String},
      selected: {type: Array, default: () => []}
    },
    computed: {
      rightItems () {
        let currentSelected = this.selected[this.level]
        return currentSelected && currentSelected.children ? currentSelected.children : null
      }
    },
    methods: {
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      },
      onClickLabel (item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        this.$emit('update:selected', copy)
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'var';
  .cascaderItems {
    display: flex;align-items: flex-start;justify-content: flex-start;white-space: nowrap;
    .label {
      padding: .3em 1em;display: flex;align-items: center;
      .icon {margin-left: .75em;transform: scale(.5)}
    }
    .left {height: 100%;padding: .3em 0;}
    .right {height: 100%;border-left: 1px solid $border-color-light;}
  }
</style>
