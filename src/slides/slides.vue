<template>
  <div class="w-slides"
       @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
       @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="w-slides-window">
      <div class="w-slides-wrapper" ref="window">
        <slot></slot>
      </div>
    </div>
    <div class="w-slides-dots">
      <span @click="select(selectedIndex - 1)">
        <w-icon name="left"></w-icon>
      </span>
      <span v-for="n in childrenLength" :class="{active:selectedIndex === n-1}" @click="select(n-1)">
        {{n}}
      </span>
      <span @click="select(selectedIndex + 1)">
        <w-icon name="right"></w-icon>
      </span>
    </div>
  </div>
</template>

<script>
  import WIcon from '../icon/icon'
  
  export default {
    name: 'WSlides',
    components: {WIcon},
    props: {
      selected: {type: String},
      autoPlay: {type: Boolean, default: true}
    },
    data () {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timerId: undefined,
        startTouch: undefined
      }
    },
    computed: {
      selectedIndex () {
        let index = this.names.indexOf(this.selected)
        return index === -1 ? 0 : index
      },
      names () {
        return this.$children.map(vm => vm.name)
      }
    },
    mounted () {
      this.updateChildren()
      this.playAutomatically()
      this.childrenLength = this.$children.length
    },
    updated () {
      this.updateChildren()
    },
    methods: {
      onTouchStart (e) {
        if (e.touches.length > 1) {return}
        this.startTouch = e.touches[0]
        this.pause()
      },
      onTouchMove () {},
      onTouchEnd (e) {
        let {clientX: x1, clientY: y1} = this.startTouch
        let {clientX: x2, clientY: y2} = e.changedTouches[0]
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        let deltaY = Math.abs(y2 - y1)
        let rate = distance / deltaY // 检测用户是否要切换slide
        if (rate > 2) {
          if (x2 > x1) {
            this.select(this.selectedIndex - 1)   // 右
          } else {
            this.select(this.selectedIndex + 1)   // 左
          }
        } else {
          return
        }
        this.$nextTick(() => {
          this.playAutomatically()
        })
      },
      onMouseEnter () {
        this.pause()
      },
      onMouseLeave () {
        this.playAutomatically()
      },
      playAutomatically () {
        if (this.timerId) {return}
        let run = () => {
          let index = this.names.indexOf(this.getSelected())
          let newIndex = index + 1
          this.select(newIndex) // 告诉外界选中 newIndex
          this.timerId = setTimeout(run, 2000)
        }
        this.timerId = setTimeout(run, 2000)
      },
      pause () {
        window.clearTimeout(this.timerId)
        this.timerId = undefined
      },
      select (index) {
        this.lastSelectedIndex = this.selectedIndex
        if (index === -1) {index = this.names.length - 1}
        if (index === this.names.length) {index = 0}
        this.$emit('update:selected', this.names[index])
      },
      getSelected () {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.$children.forEach((vm) => {
          let reverse = this.selectedIndex <= this.lastSelectedIndex
          if (this.timerId) {
            if (this.lastSelectedIndex === this.$children.length - 1 && this.selectedIndex === 0) {
              reverse = false
            }
            if (this.lastSelectedIndex === 0 && this.selectedIndex === this.$children.length - 1) {
              reverse = true
            }
          }
          vm.reverse = reverse
          this.$nextTick(() => {
            vm.selected = selected
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .w-slides {
    &-window {overflow: hidden;}
    &-wrapper {position: relative;}
    &-dots {
      padding: 8px 0;display: flex;justify-content: center;align-items: center;
      > span {
        width: 24px;height: 24px;border-radius: 50%;margin: 0 4px;font-size: 16px;
        display: inline-flex;background: #dddddd;justify-content: center;align-items: center;color: white;
        &:hover {cursor: pointer;}
        &.active {
          background: #000000;
          &:hover {cursor: default;}
        }
      }
    }
  }
</style>
