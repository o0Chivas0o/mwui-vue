<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{result||`&nbsp;`}}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible" :style="{height:popoverHeight}">
      <cascader-items :items="source" :height="popoverHeight"
                      :selected="selected" @update:selected="onUpdateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items'
  
  export default {
    name: 'WCascader',
    components: {CascaderItems},
    props: {
      source: {type: Array},
      popoverHeight: {type: String},
      selected: {type: Array, default: () => {return []}}
    },
    data () {
      return {
        popoverVisible: false
      }
    },
    computed: {
      result () {
        return this.selected.map(item => item.name).join('/')
      }
    },
    methods: {
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .cascader {
    position: relative;
    .trigger {
      border: 1px solid $border-color-hover;border-radius: $border-radius;min-width: 10em;height: $height;
      display: inline-flex;align-items: center;padding: 0 1em;}
    .popover-wrapper {position: absolute;top: 100%;margin-top: 8px;left: 0;background: white;@extend .box-shadow;}
  }
</style>
