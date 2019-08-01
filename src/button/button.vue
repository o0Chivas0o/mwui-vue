<template>
  <button class="w-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
    <w-icon v-if="icon && !loading" :name="icon" class="icon"></w-icon>
    <w-icon v-if="loading" name="loading" class="loading icon"></w-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
  import Icon from '@/icon/icon'
  
  export default {
    name: 'WButton',
    components: {'w-icon': Icon},
    props: {
      icon: {type: String, default: undefined},
      loading: {type: Boolean, default: false},
      iconPosition: {
        type: String, default: 'left',
        validator (value) {
          return value === 'left' || value === 'right'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/_var.scss';
  
  .w-button {
    font-size: $font-size;height: $button-height;padding: 0 1em;border-radius: $border-radius;
    border: 1px solid $border-color;background: $button-bg;
    display: inline-flex;justify-content: center;align-items: center;vertical-align: top;
    &:hover {border-color: $border-color-hover;}
    &:active {background: $button-active-bg;}
    &:focus {outline: none;}
    > .icon {order: 1;margin-right: .1em;}
    > .content {order: 2;}
    &.icon-right {
      > .content {order: 1;}
      > .icon {order: 2;margin-right: 0;margin-left: .1em;}
    }
    .loading {animation: spin 1s infinite linear;}
  }
</style>
