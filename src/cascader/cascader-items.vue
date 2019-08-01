<template>
  <div class="cascaderItems" :style="{height}">
    <div class="left">
      <div class="label" v-for="(item,index) in items" :key="index" @click="onClickLabel(item)">
        <span class="name">{{item.name}}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <icon class="icon loading" name="loading"></icon>
          </template>
          <template v-else>
            <icon class="icon arrow" v-if="rightArrowVisible(item)" name="right"></icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <w-cascader-item :items="rightItems" :height="height" :level="level+1" :selected="selected" :load-data="loadData"
                       :loading-item="loadingItem" @update:selected="onUpdateSelected"></w-cascader-item>
    </div>
  </div>
</template>

<script>
  import Icon from '@/icon/icon'
  
  export default {
    name: 'WCascaderItem',
    components: {Icon},
    props: {
      items: {type: Array},
      height: {type: String},
      selected: {type: Array, default: () => {return []}},
      level: {type: Number, default: 0},
      loadData: {type: Function},
      loadingItem: {type: Object, default: () => ({})}
    },
    computed: {
      rightItems () {
        if (this.selected[this.level]) {
          let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
        // let currentSelected = this.selected[this.level]
        // return currentSelected && currentSelected.children ? currentSelected.children : null
      }
    },
    methods: {
      rightArrowVisible (item) {
        return this.loadData ? !item.isLeaf : item.children
      },
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      },
      onClickLabel (item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        copy.splice(this.level + 1) // 一句话
        this.$emit('update:selected', copy)
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/_var.scss';
  
  .cascaderItems {
    display: flex;align-items: flex-start;justify-content: flex-start;white-space: nowrap;
    .label {
      padding: .3em 1em;display: flex;align-items: center;cursor: pointer;white-space: nowrap;
      &:hover {background: $grey;}
      .name {margin-right: 1em;user-select: none;}
      .icons {
        margin-left: auto;
        .arrow {transform: scale(.5);}
        .loading {animation: spin 1s infinite linear;}
      }
    }
    .left {height: 100%;padding: .3em 0;overflow: auto;}
    .right {height: 100%;border-left: 1px solid $border-color-light;}
  }
</style>
