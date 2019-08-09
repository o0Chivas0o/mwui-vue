<template>
  <div class="w-slides">
    <div class="w-slides-window">
      <div class="w-slides-wrapper" ref="window">
        <slot></slot>
      </div>
    </div>
    <div class="w-slides-dots">
      <span v-for="n in childrenLength" :class="{active:selectedIndex === n-1}" @click="select(n-1)">
        {{n}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WSlides',
    props: {
      selected: {type: String},
      autoPlay: {type: Boolean, default: true}
    },
    data () {
      return {
        childrenLength: 0
      }
    },
    computed: {
      selectedIndex () {
        return this.names.indexOf(this.selected) || 0
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
      playAutomatically () {
        let index = this.names.indexOf(this.getSelected())
        let run = () => {
          if (index === this.names.length) {index = 0}
          if (index === -1) {index = this.names.length - 1}
          this.$emit('update:selected', this.names[index + 1])
          index++
          setTimeout(run, 3000)
        }
        // setTimeout(run, 3000)
      },
      select (index) {
        this.$emit('update:selected', this.names[index])
      },
      getSelected () {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.$children.forEach((vm) => {
          vm.selected = selected
          let oldIndex = this.names.indexOf(vm.name)
          let newIndex = this.names.indexOf(selected)
          vm.reverse = newIndex > oldIndex ? false : true
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
      > span.active {background: red;}
    }
  }
</style>
