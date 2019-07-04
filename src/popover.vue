<template>
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper" v-if="visible" ref="contentWrapper" @click.stop>
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
      xxx () {
        this.visible = !this.visible
        if (this.visible) {
          let eventHandler = () => {
            this.visible = false
            document.removeEventListener('click', eventHandler)
          }
          this.$nextTick(() => {
            let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
            this.$refs.contentWrapper.style.left = left + 'px'
            this.$refs.contentWrapper.style.top = top + 'px'
            document.body.appendChild(this.$refs.contentWrapper)
            document.addEventListener('click', eventHandler)
          })
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
