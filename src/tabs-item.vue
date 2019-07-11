<template>
  <div class="tabs-item" @click="onClick" :class="classes" :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WTabsItem',
    inject: ['eventBus'],
    data () {
      return {
        active: false
      }
    },
    props: {
      disabled: {type: Boolean, default: false},
      name: {type: String | Number, required: true}
    },
    computed: {
      classes () {
        return {
          active: this.active,
          disabled: this.disabled
        }
      }
    },
    created () {
      this.eventBus &&
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name
      })
    },
    methods: {
      onClick () {
        if (this.disabled) {return}
        this.eventBus && this.eventBus.$emit('update:selected', this.name, this)
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'var';
  .tabs-item {
    flex-shrink: 0;
    padding: 0 1em;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    &.active {
      color: $blue;
      font-weight: bold;
    }
    &.disabled {
      color: $disable-text-color;
      cursor: not-allowed;
    }
  }
</style>
