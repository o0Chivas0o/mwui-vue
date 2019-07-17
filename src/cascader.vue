<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      <slot></slot>
    </div>
    <div class="popover-wrapper" v-if="popoverVisible" :style="{height:popoverHeight}">
      <cascader-items :items="source" :height="popoverHeight" :selected="selected"
                      @update:selected="onUpdateSelected"></cascader-items>
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
      selected: {type: Array, default: () => []},
      level: {type: Number, default: 0}
    },
    data () {
      return {
        popoverVisible: false
      }
    },
    methods: {
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .cascader {
    position: relative;
    .trigger {border: 1px solid red;width: 100px;height: 30px;}
    .popover-wrapper {position: absolute;top: 100%;left: 0;background: white;@extend .box-shadow;}
  }
</style>
