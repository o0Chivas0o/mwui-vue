<template>
  <div class="tabs-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WTabsContent',
    inject: ['eventBus']
  
  }
</script>

<style scoped lang="scss">
  .tabs-content {}
</style>
