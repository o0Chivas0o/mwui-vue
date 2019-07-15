<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :items="source"></cascader-items>
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items'
  
  export default {
    name: 'WCascader',
    components: {CascaderItems},
    props: {source: {type: Array}},
    data () {
      return {
        popoverVisible: false,
        level1Selected: null,
        level2Selected: null
      }
    },
    computed: {
      level1Items () {
        return this.level1Selected ? this.level1Selected.children : []
      },
      level2Items () {
        return this.level2Selected ? this.level2Selected.children : []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .cascader {
    .trigger {
      border: 1px solid red;
      width: 100px;
      height: 30px;
    }
    .popover {
      height: 300px;
      display: flex;
      border: 1px solid green;
      .label {
        border: 1px solid black;
      }
    }
  }
</style>
