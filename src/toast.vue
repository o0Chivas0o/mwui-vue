<template>
  <div class="toast" ref="wrapper" :class="toastClasses">
    <div class="message">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>
    <div class="line" ref="line"></div>
    <span class="close" v-if="closeButton" @click="onClickClose">{{closeButton.text}}</span>
  </div>
</template>

<script>
  export default {
    name: 'WToast',
    props: {
      autoClose: {type: Boolean, default: false},
      autoCloseDelay: {type: Number, default: 5},
      enableHtml: {type: Boolean, default: false},
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'left', 'bottom', 'right', 'middle'].indexOf(value) >= 0
        }
      },
      closeButton: {
        type: Object,
        // 多个toast存在的情况下对象改变属性,不会互相影响
        default: () => {return {text: '关闭', callback: undefined}}
      }
    },
    mounted () {
      this.updateStyles()
      this.execAutoClose()
    },
    computed: {
      toastClasses () {return {[`position-${this.position}`]: true}}
    },
    methods: {
      updateStyles () {
        this.$nextTick(() => {
          this.$refs.line.style.height = `${this.$refs.wrapper.getBoundingClientRect().height}px`
        })
      },
      execAutoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoCloseDelay * 1000)
        }
      },
      close () {
        this.$el.remove()
        this.$destroy()
      },
      onClickClose () {
        this.close()
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback(this) // this === toast 实例
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-bg: rgba(0, 0, 0, .75);
  .toast {
    font-size: $font-size;line-height: 1.8;min-height: $toast-min-height;bottom: 1px solid red;
    display: flex;align-items: center;color: white;padding: 0 16px;
    background: $toast-bg;box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);border-radius: 4px;
    position: fixed;
    .message {padding: 8px 0;}
    .close {padding-left: 16px;cursor: pointer;flex-shrink: 0;}
    .line {border: 1px solid #666666;margin-left: 16px;}
    &.position-top {top: 0;left: 50%;transform: translateX(-50%);}
    &.position-left {top: 0;left: 0;}
    &.position-bottom {bottom: 0;left: 50%;transform: translateX(-50%);}
    &.position-middle {top: 50%;transform: translate(-50%, -50%)}
    &.position-right {top: 0;right: 0;}
  }
</style>
