<template>
  <div class="w-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WNavItem',
    inject: ['root'],
    props: {
      name: {type: [String], required: true}
    },
    data () {
      return {
        selected: false
      }
    },
    created () {
      this.root.addItem(this)
    },
    methods: {
      onClick () {
        this.$emit('add:selected', this.name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/var';
  
  .w-nav-item {
    padding: 10px 20px;cursor: pointer;
    &.selected {
      background: red;
    }
  }
</style>
