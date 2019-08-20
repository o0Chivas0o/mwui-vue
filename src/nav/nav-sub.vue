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
  @import '../style/_var.scss';
  .w-nav-sub {
    position: relative;cursor: pointer;
    > span {padding: 10px 20px;display: block;}
    &-popover {
      position: absolute;top: 100%;left: 0;white-space: nowrap;background: white;margin-top: 4px;min-width: 8em;
      box-shadow: 0 0 3px fade_out(black, 0.8);border-radius: $border-radius; font-size: $font-size;color: $light-color;
    }
  }
  .w-nav-sub .w-nav-sub .w-nav-sub-popover {
    top: 0;left: 100%;margin-left: 8px;
  }
</style>
