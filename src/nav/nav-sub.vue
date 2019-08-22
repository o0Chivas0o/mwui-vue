<template>
  <div class="w-nav-sub" :class="{active,vertical}" v-click-outside="onClose">
    <span class="w-nav-sub-label" @click="onClick">
    <slot name="title"></slot>
      <span class="w-nav-sub-icon" :class="{open,vertical}">
        <w-icon name="right"></w-icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
        <div class="w-nav-sub-popover" v-show="open" :class="{vertical}">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="w-nav-sub-popover" v-show="open" :class="{vertical}">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
  import ClickOutside from '../cascader/click-outside'
  import WIcon from '../icon/icon'
  
  export default {
    name: 'WNavSub',
    inject: ['root', 'vertical'],
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
      },
      enter (el, done) {
        let {height} = el.getBoundingClientRect()
        el.style.height = 0
        el.getBoundingClientRect() // 浏览器会合并css属性 此行代码强制让高度先为0 后为120
        el.style.height = `${height}px`
        el.addEventListener('transitionend', () => { // 不以此形式监听 会造成没有动画 并且 after函数立即执行
          done()
        })
      },
      afterEnter (el) {
        el.style.height = 'auto'
      },
      leave (el, done) {
        let {height} = el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.getBoundingClientRect()
        el.style.height = 0
        el.addEventListener('transitionend', () => {
          done()
        })
      },
      afterLeave (el) {
        el.style.height = 'auto'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/_var.scss';
  
  .w-nav-sub {
    position: relative;cursor: pointer;
    &.active:not(.vertical) {
      &::after {
        content: '';position: absolute;bottom: 0;left: 0;border-bottom: 2px solid $blue;width: 100%;
      }
    }
    &-icon {display: none;}
    &-label {padding: 10px 20px;display: block;}
    &-popover {
      position: absolute;top: 100%;left: 0;white-space: nowrap;background: white;margin-top: 4px;min-width: 8em;
      transition: height 300ms;box-shadow: 0 0 3px fade_out(black, 0.8);border-radius: $border-radius; font-size: $font-size;
      color: $light-color;
      &.vertical {position: static;border-radius: 0;border: none;box-shadow: none;overflow: hidden;}
    }
  }
  .w-nav-sub .w-nav-sub {
    .w-nav-sub-popover {
      top: 0;left: 100%;margin-left: 8px;
      &.vertical {margin: 0;}
    }
    .w-nav-sub-label { display: flex;align-items: center;padding: 10px 10px 10px 20px;}
    .w-nav-sub-icon {
      display: inline-flex;margin-left: auto;transition: all .2s;
      svg {fill: $light-color}
      &.open {transform: rotate(180deg);}
      &.vertical {
        transform: rotate(90deg);
        &.open {
          transform: rotate(270deg);
        }
      }
    }
    &.active {
      &::after {
        display: none;
      }
    }
  }
</style>
