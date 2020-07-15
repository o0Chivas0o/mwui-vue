<template>
  <div class="w-sticky-wrapper" ref="wrapper" :style="{height}">
    <div class="w-sticky" :class="classes" :style="{left,width,top}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WSticky',
    props: {
      distance: {type: Number, default: 0}
    },
    data () {
      return {
        sticky: false,
        left: undefined,
        width: undefined,
        height: undefined,
        top: undefined
      }
    },
    mounted () {
      // bind(this)之后 会产生一个新的函数
      this.windowScrollHandler = this._windowScrollHandler.bind(this)
      window.addEventListener('scroll', this.windowScrollHandler)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.windowScrollHandler)
    },
    created () {
    },
    computed: {
      classes () {
        return {
          sticky: this.sticky,
          timerId: null
        }
      }
    },
    methods: {
      getOffsetTop () {
        let {top} = this.$refs.wrapper.getBoundingClientRect()
        return top + window.scrollY
      },
      _windowScrollHandler () {
        let top = this.getOffsetTop()
        if (window.scrollY > top - this.distance) {
          let {height, left, width} = this.$refs.wrapper.getBoundingClientRect()
          this.height = height + 'px'
          this.left = left + 'px'
          this.width = width + 'px'
          this.top = this.distance + 'px'
          this.sticky = true
        } else {
          this.height = undefined
          this.left = undefined
          this.width = undefined
          this.top = undefined
          this.sticky = false
        }
        // debounce
        // if (this.timerId) {window.clearTimeout(this.timerId)}
        // this.timerId = setTimeout(x, 200)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .w-sticky {
    &.sticky {
      position: fixed;
    }
  }
</style>
