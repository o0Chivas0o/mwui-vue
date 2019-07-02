<template>
  <div class="tabs-nav">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WTabsNav',
    inject: ['eventBus'],
    mounted () {
      this.eventBus.$on('update:selected', (item, vm) => {
        let {width, height, top, left} = vm.$el.getBoundingClientRect()
        console.log(width, height, top, left)
        this.$refs.line.style.width = `${width}px`
        this.$refs.line.style.left = `${left}px`
      })
    }
  }
</script>

<style scoped lang="scss">
  $tab-height: 40px;
  $blue: blue;
  .tabs-nav {
    display: flex;
    height: $tab-height;
    justify-content: flex-starts;
    align-items: center;
    border: 1px solid;
    position: relative;
    > .line {
      position: absolute;
      bottom: 0;
      border-bottom: 1px solid $blue;
      transition: all .3s;
    }
    > .actions-wrapper {
      // 自动最右边
      margin-left: auto;
    }
  }
</style>
