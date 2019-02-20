<template>
    <button class="w-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('xxx')">
        <w-icon v-if="icon && !loading" :name="icon" class="icon"></w-icon>
        <w-icon v-if="loading" name="loading" class="loading icon"></w-icon>
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>

<script>
  export default {
    props:{
      icon:{
        type:String,
        default:undefined
      },
      loading:{
        type:Boolean,
        default:false
      },
      iconPosition:{
        type:String,
        default:'left',
        validator ( value ) {
          return value === 'left' || value === 'right'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @keyframes spin {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }
    .w-button {
        font-size: var(--font-size);height: var(--button-height);padding: 0 1em;border-radius: var(--border-radius);
        border: 1px solid var(--border-color);background: var(--button-bg);
        display: inline-flex;justify-content: center;align-items: center;vertical-align: top;
        &:hover {border-color: var(--border-color-hover);}
        &:active {background: var(--button-active-bg);}
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
