<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" ref="toast">
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>
      <div class="line" ref="line" v-show="closeButton.text"></div>
      <span class="close" v-if="closeButton.text" @click="onClickClose">{{closeButton.text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WToast',
    props: {
      autoClose: {
        type: [Boolean, Number],
        default: 5,
        validator (value) {return value === false || typeof value === 'number'}
      },
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
        default: () => {return {text: undefined, callback: undefined}}
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
          this.$refs.line.style.height = `${this.$refs.toast.getBoundingClientRect().height}px`
        })
      },
      execAutoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoClose * 1000)
        }
      },
      close () {
        this.$el.remove()
        this.$emit('close')
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
  @keyframes slide-up {
    0% {opacity: 0;transform: translateY(100%)}
    100% {opacity: 100%;transform: translateY(0%)}
  }
  @keyframes slide-down {
    0% {opacity: 0;transform: translateY(-100%)}
    100% {opacity: 100%;transform: translateY(0%)}
  }
  @keyframes slide-left {
    0% {opacity: 0;transform: translateX(-100%)}
    100% {opacity: 100%;transform: translateX(0%)}
  }
  @keyframes slide-right {
    0% {opacity: 0;transform: translateX(100%)}
    100% {opacity: 100%;transform: translateX(0%)}
  }
  @keyframes middle {
    0% {opacity: 0;}
    100% {opacity: 100%;}
  }
  .wrapper {
    position: fixed;
    &.position-top {top: 0;left: 50%;transform: translateX(-50%);
      .toast {border-top-left-radius: 0;border-top-right-radius: 0;animation: slide-down .3s}
    }
    &.position-left {top: 0;left: 0;
      .toast {border-top-left-radius: 0;border-bottom-left-radius: 0;animation: slide-left .3s;}
    }
    &.position-bottom {bottom: 0;left: 50%;transform: translateX(-50%);
      .toast {border-bottom-left-radius: 0;border-bottom-right-radius: 0; animation: slide-up .3s;}
    }
    &.position-middle {top: 50%;left: 50%;transform: translate(-50%, -50%);
      .toast {animation: middle .3s;}
    }
    &.position-right {top: 0;right: 0;
      .toast {border-top-right-radius: 0;border-bottom-right-radius: 0;animation: slide-right .3s}
    }
  }
  .toast {
    font-size: $font-size;line-height: 1.8;min-height: $toast-min-height;bottom: 1px solid red;
    display: flex;align-items: center;color: white;padding: 0 16px;
    background: $toast-bg;box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);border-radius: 4px;
    .message {padding: 8px 0;}
    .close {padding-left: 16px;cursor: pointer;flex-shrink: 0;}
    .line {border: 1px solid #666666;margin-left: 16px;}
  }
</style>
