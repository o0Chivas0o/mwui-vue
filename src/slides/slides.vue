<template>
  <div class="w-slides">
    <div class="w-slides-window">
      <div class="w-slides-wrapper" ref="window">
        <slot></slot>
      </div>
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
    mounted () {
      this.updateChildren()
      this.playAutomatically()
    },
    updated () {
      this.updateChildren()
    },
    methods: {
      playAutomatically () {
        const names = this.$children.map(vm => vm.name)
        let index = names.indexOf(this.getSelected())
        let run = () => {
          if (index === names.length) {index = 0}
          if (index === -1) {index = names.length - 1}
          this.$emit('update:selected', names[index + 1])
          index++
          setTimeout(run, 3000)
        }
        setTimeout(run, 3000)
        console.log(names)
      },
      getSelected () {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.$children.forEach((vm) => {
          vm.selected = selected
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .w-slides {
    display: inline-block;
    &-window {
      overflow: hidden;
    }
    &-wrapper {
      position: relative;
    }
  }
</style>
