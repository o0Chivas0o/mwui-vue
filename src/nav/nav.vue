<template>
  <div class="w-nav" :class="{vertical:vertical}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WNav',
    provide () {
      return {
        root: this,
        vertical: this.vertical
      }
    },
    props: {
      selected: {type: String,},
      vertical: {type: Boolean, default: false}
    },
    data () {
      return {
        items: [],
        namePath: []
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
          vm.selected = this.selected === vm.name
        })
      },
      listenToChildren () {
        this.items.forEach(vm => {
          vm.$on('update:selected', (name) => {
            this.$emit('update:selected', name)
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
    user-select: none;
    &.vertical {
      flex-direction: column; border: 1px solid $grey;
    }
  }
</style>
