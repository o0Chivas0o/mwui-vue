<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: 'WTabs',
    props: {
      selected: {type: String, required: true},
      direction: {
        type: String,
        default: 'horizontal',
        validator (value) {
          return ['horizontal', 'vertical'].indexOf(value) >= 0
        }
      }
    },
    data () {
      return {
        eventBus: new Vue()
      }
    },
    provide () {
      return {
        eventBus: this.eventBus
      }
    },
    methods: {
      checkChildren () {
        if (this.$children.length === 0) {
          console && console.warn &&
          console.warn('tabs的子组件应该是tabs-nav和tabs-content,但是没有子组件 ')
        }
      },
      selectTab () {
        this.$children.forEach((vm) => {
          if (vm.$options.name === 'WTabsNav') {
            vm.$children.forEach((item) => {
              if (item.$options.name === 'WTabsItem' && item.name === this.selected) {
                this.eventBus.$emit('update:selected', this.selected, item)
              }
            })
          }
        })
      }
    },
    mounted () {
      this.checkChildren()
      this.selectTab()
    }
  }
</script>

<style scoped lang="scss">
  .tabs {
  }
</style>
