<template>
  <div class="row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WRow',
    props: {
      gutter: {type: [Number, String]}
    },
    computed: {
      rowStyle () {
        let {gutter} = this
        return {
          paddingLeft: -gutter / 2 + 'px',
          paddingRight: -gutter / 2 + 'px'
        }
      }
    },
    mounted () {
      this.$children.forEach((vm) => {
        vm.gutter = this.gutter
      })
    }
  }
</script>

<style scoped lang="scss">
  .row {
    display: flex;
  }
</style>
