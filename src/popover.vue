<template>
  <div class="popover" @click="onClick" ref="popover">
    <div class="content-wrapper" v-if="visible" ref="contentWrapper" :class="{[`position-${position}`]:true}">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'WPopover',
    data () {
      return {
        visible: false
      }
    },
    props: {
      position: String,
      default: 'top',
      validator (value) {
        return ['top', 'left', 'right', 'bottom'].indexOf(value) >= 0
      }
    },
    methods: {
      positionContent () {
        const {contentWrapper, triggerWrapper} = this.$refs
        document.body.appendChild(contentWrapper)
        let {width, height, top, left} = triggerWrapper.getBoundingClientRect()
        let {height: height2} = contentWrapper.getBoundingClientRect()
        switch (this.position) {
          case 'top':
            contentWrapper.style.left = left + window.scrollX + 'px'
            contentWrapper.style.top = top + window.scrollY + 'px'
            break
          case 'bottom':
            contentWrapper.style.left = left + window.scrollX + 'px'
            contentWrapper.style.top = top + height + window.scrollY + 'px'
            break
          case 'left':
            contentWrapper.style.left = left + window.scrollX + 'px'
            contentWrapper.style.top = top + window.scrollY + (height - height2) / 2 + 'px'
            break
          case 'right':
            contentWrapper.style.left = left + window.scrollX + width + 'px'
            contentWrapper.style.top = top + window.scrollY + (height - height2) / 2 + 'px'
            break
        }
        
      },
      onClickDocument (e) {
        if (this.$refs.popover && (this.$refs.popover.contains(e.target) || this.$refs.popover === e.target)) {return}
        if (this.$refs.contentWrapper && (this.$refs.contentWrapper.contains(e.target) || this.$refs.contentWrapper === e.target)) {return}
        this.close()
      },
      open () {
        this.visible = !this.visible
        this.$nextTick(() => {
          this.positionContent()
          document.addEventListener('click', this.onClickDocument)
        })
      },
      close () {
        this.visible = false
        document.removeEventListener('click', this.onClickDocument)
      },
      onClick (event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (!this.visible) {
            this.open()
          } else {
            this.close()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: black;
  $border-radius: 4px;
  .popover {display: inline-block;vertical-align: top;position: relative;}
  .content-wrapper {
    position: absolute;background: white; /*box-shadow: 0 0 3px rgba(0, 0, 0, .5);*/
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
    border: 1px solid $border-color;border-radius: $border-radius;padding: .5em 1em;max-width: 20em;word-break: break-all;
    &::before, &::after {content: '';display: block;width: 0;height: 0;border: 10px solid transparent;position: absolute;}
    &.position-top {
      margin-top: -10px;
      transform: translateY(-100%);
      &::before, &::after {left: 10px;}
      &::before {top: 100%;border-top-color: black;}
      &::after {top: calc(100% - 1px);border-top-color: white;}
    }
    &.position-bottom {
      margin-top: 10px;
      &::before, &::after {left: 10px;}
      &::before {bottom: 100%;border-bottom-color: black;}
      &::after {bottom: calc(100% - 1px);border-bottom-color: white;}
    }
    &.position-left {
      margin-left: -10px;
      transform: translateX(-100%);
      &::before, &::after {left: 100%;top: 50%;transform: translateY(-50%);}
      &::before {border-left-color: black;}
      &::after {border-left-color: white;left: calc(100% - 1px);}
    }
    &.position-right {
      margin-left: 10px;
      &::before, &::after {right: 100%;top: 50%;transform: translateY(-50%);}
      &::before {border-right-color: black;}
      &::after {border-right-color: white;right: calc(100% - 1px);}
    }
  }
</style>
