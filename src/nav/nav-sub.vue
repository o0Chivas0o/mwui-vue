<template>
  <div class="w-nav-sub">
    <span @click="onClick">
    <slot name="title"></slot>
    </span>
    <div class="w-nav-sub-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WNavSub',
    data () {
      return {
        open: false
      }
    },
    methods: {
      onClick () {
        this.open = !this.open
      }
    }
  }
</script>

<style lang="scss" scoped>
  .w-nav-sub {
    position: relative;cursor: pointer;
    > span {padding: 10px 20px;display: block;}
    &-popover {position: absolute;top: 100%;left: 0;border: 1px solid;white-space: nowrap}
  }
  .w-nav-sub .w-nav-sub .w-nav-sub-popover {
    top: 0;left: 100%;margin-left: 8px;
  }
</style>
