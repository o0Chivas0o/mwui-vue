<template>
  <div class="tabs-nav">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WTabsNav',
    inject: ['eventBus'],
    created () {
    
    }
  }
</script>

<style scoped lang="scss">
  $tab-height: 40px;
  .tabs-nav {
    display: flex;
    height: $tab-height;
    justify-content: flex-starts;
    align-items: center;
    border: 1px solid;
    > .actions-wrapper {
      // 自动最右边
      margin-left: auto;
    }
  }
</style>
