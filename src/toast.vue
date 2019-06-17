<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WToast'
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $height: 40px;
  $toast-bg: rgba(0, 0, 0, .75);
  .toast {font-size: $font-size;line-height: 1.8;height: $height;bottom: 1px solid red;position: fixed;top: 0;left: 50%;transform: translateX(-50%);display: flex;align-items: center;background: $toast-bg;box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);border-radius: 4px;color: white;padding: 0 16px;}
</style>
