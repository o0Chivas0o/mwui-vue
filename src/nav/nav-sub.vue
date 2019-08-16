<template>
  <div class="w-nav-sub">
    <span>
    <slot name="title"></slot>
    </span>
    <div class="popover">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WNavSub',
    
  }
</script>

<style lang="scss" scoped>
  .w-nav-sub {
    position: relative; padding: 10px 20px;cursor: pointer;
    &-popover {position: absolute;top: 100%;left: 0;bottom: 1px solid;white-space: nowrap}
  }
</style>
