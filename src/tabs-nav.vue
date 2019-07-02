<template>
  <div class="tabs-nav">
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>

<script>
  export default {
    name: 'WTabsNav'
  }
</script>

<style scoped lang="scss">
  .tabs-nav {}
</style>
