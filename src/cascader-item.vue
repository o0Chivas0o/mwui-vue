<template>
  <div class="x">
    {{sourceItem.name}}
    <w-cascader-item
        v-if="sourceItem.children"
        v-for="item in sourceItem.children"
        :sourceItem="item"></w-cascader-item>
  </div>
</template>

<script>
  export default  {
    name: 'WCascaderItem',
    props: {
      sourceItem: {type: Object}
    }
  }

</script>

<style lang="scss" scoped>
  .x {
    border: red 1px solid;
    margin: 10px;
  }
</style>
