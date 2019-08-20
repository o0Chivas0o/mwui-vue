<template>
  <div class="w-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WNav',
    provide () {
      return {
        root: this
      }
    },
    props: {
      selected: {type: Array, default: () => []},
      multiple: {type: Boolean, default: false}
    },
    data () {
      return {
        items: []
      }
    },
    mounted () {
      this.updateChildren()
      this.listenToChildren()
    },
    updated () {
      this.updateChildren()
    },
    methods: {
      addItem (vm) {
        this.items.push(vm)
      },
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
    border-bottom: 1px solid $grey;
    color: black;
    cursor: default;
  }
</style>
