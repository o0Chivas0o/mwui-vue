<template>
    <div class="w-button-group">
        <slot></slot>
    </div>
</template>
<script>
  export default {
    name:'button-group',
    mounted () {
      for (let node of this.$el.children) {
        let name = node.nodeName.toLowerCase()
        if (name !== 'button') {
          console.warn(`w-button-group 的子元素应该全是 w-button`)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    .w-button-group {
        display: inline-flex;vertical-align: middle;
        > .w-button {
            border-radius: 0;
            &:not(:first-child) { margin-left: -1px;}
            &:first-child {border-top-left-radius: var(--border-radius);border-bottom-left-radius: var(--border-radius);}
            &:last-child {border-top-right-radius: var(--border-radius);border-bottom-right-radius: var(--border-radius);}
            &:hover {
                position: relative;
                z-index: 1;
            }
        }
    }
</style>
