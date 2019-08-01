<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: 'WCollapse',
    props: {
      single: {type: Boolean, default: false},
      selected: {type: Array},
    },
    data () {
      return {
        eventBus: new Vue(),
      }
    },
    provide () {
      return {
        eventBus: this.eventBus,
        selectedArray: []
      }
    },
    mounted () {
      // 初始状态
      this.eventBus.$emit('update:selected', this.selected)
      // 深拷贝值 vue 不支持直接修改this.selected
      let selectedCopy = JSON.parse(JSON.stringify(this.selected))
      // 打开事件
      this.eventBus.$on('update:addSelected', (name) => {
        if (this.single) {
          selectedCopy = [name]
        } else {
          selectedCopy.push(name)
        }
        this.$emit('update:selected', selectedCopy)
        this.eventBus.$emit('update:selected', selectedCopy)
      })
      // 关闭事件
      this.eventBus.$on('update:removeSelected', (name) => {
        let index = this.selected.indexOf(name)
        selectedCopy.splice(index, 1)
        this.$emit('update:selected', selectedCopy)
        this.eventBus.$emit('update:selected', selectedCopy)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/_var.scss';
  
  .collapse {
    border: 1px solid $grey;
    border-radius: $border-radius;
  }
</style>
