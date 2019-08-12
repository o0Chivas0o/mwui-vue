<template>
  <div class="w-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WNav',
    props: {
      selected: {type: Array, default: () => []},
      multiple: {type: Boolean, default: false}
    },
    mounted () {
      this.updateChildren()
      this.listenToChildren()
    },
    updated () {
      this.updateChildren()
    },
    computed: {
      items () {
        return this.$children.filter(vm => {return vm.$options.name === 'WNavItem'})
      }
    },
    methods: {
      updateChildren () {
        this.items.forEach(vm => {
          vm.selected = this.selected.indexOf(vm.name) >= 0
        })
      },
      listenToChildren () {
        this.items.forEach(vm => {
          vm.$on('add:selected', (name) => {
            if (this.multiple) {
              if (this.selected.indexOf(name) < 0) {
                let copy = JSON.parse(JSON.stringify(this.selected))
                copy.push(name)
                this.$emit('update:selected', copy)
              }
            } else {
              this.$emit('update:selected', [name])
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/var';
  
  .w-nav {
    display: flex;
    border: 1px solid red;
  }
</style>
