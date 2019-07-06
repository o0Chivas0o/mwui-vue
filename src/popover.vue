<template>
  <div class="popover" @click="onClick" ref="popover">
    <div class="content-wrapper" v-if="visible" ref="contentWrapper">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
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
    methods: {
      positionContent () {
        document.body.appendChild(this.$refs.contentWrapper)
        let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
      },
      onClickDocument (e) {
        if (!this.$refs.popover.contains(e.target)) {
          this.close()
        }
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
  .popover {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  .content-wrapper {
    position: absolute;
    box-shadow: 0 0 3px rgba(0, 0, 0, .5);
    transform: translateY(-150%);
  }
</style>
