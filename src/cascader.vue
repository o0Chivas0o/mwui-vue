<template>
  <div class="cascader">
    <div class="trigger">
      <slot></slot>
    </div>
    <div class="popover">
      <div v-for="item in source">
        <w-cascader-item :sourceItem="item"></w-cascader-item>
      </div>
    </div>
  </div>
</template>

<script>
  import WCascaderItem from './cascader-item'
  export default {
    name: 'WCascader',
    components: {WCascaderItem},
    props: {
      source: {
        type: Array
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'var';

</style>
