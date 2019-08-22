<template>
  <div class="w-nav-sub" :class="{active}" v-click-outside="onClose">
    <span class="w-nav-sub-label" @click="onClick">
    <slot name="title"></slot>
      <span class="w-nav-sub-icon" :class="{open}">
        <w-icon name="right"></w-icon>
      </span>
    </span>
    <div class="w-nav-sub-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickOutside from '../cascader/click-outside'
  import WIcon from '../icon/icon'
  
  export default {
    name: 'WNavSub',
    inject: ['root'],
    components: {WIcon},
    directives: {ClickOutside},
    props: {
      name: {type: String, required: true}
    },
    data () {
      return {
        open: false
      }
    },
    computed: {
      active () {
        return this.root.namePath.indexOf(this.name) >= 0
      }
    },
    methods: {
      onClose () {
        this.open = false
      },
      onClick () {
        this.open = !this.open
      },
      updateNamePath () {
        this.root.namePath.unshift(this.name)
        if (this.$parent.updateNamePath) {
          this.$parent.updateNamePath()
        } else {
          // this.root.namePath = []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/_var.scss';
  .w-nav-sub {
    position: relative;cursor: pointer;
    &.active {
      &::after {
        content: '';position: absolute;bottom: 0;left: 0;border-bottom: 2px solid $blue;width: 100%;
      }
    }
    &-icon {display: none;}
    &-label {padding: 10px 20px;display: block;}
    &-popover {
      position: absolute;top: 100%;left: 0;white-space: nowrap;background: white;margin-top: 4px;min-width: 8em;
      box-shadow: 0 0 3px fade_out(black, 0.8);border-radius: $border-radius; font-size: $font-size;color: $light-color;
    }
  }
  .w-nav-sub .w-nav-sub {
    .w-nav-sub-popover {top: 0;left: 100%;margin-left: 8px;}
    .w-nav-sub-label { display: flex;align-items: center;padding: 10px 10px 10px 20px;}
    .w-nav-sub-icon {
      display: inline-flex;margin-left: auto;transition: all .2s;
      svg {fill: $light-color}
      &.open {transform: rotate(180deg);}
    }
    &.active {
      &::after {
        display: none;
      }
    }
  }
</style>
