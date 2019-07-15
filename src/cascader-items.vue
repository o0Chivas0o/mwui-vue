<template>
  <div class="cascaderItems">
    <div class="left">
      <div class="label" v-for="item in items" @click="leftSelected = item">
        {{item.name}}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <w-cascader-item :items="rightItems"></w-cascader-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WCascaderItem',
    props: {
      items: {type: Array}
    },
    data () {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems () {
        return this.leftSelected && this.leftSelected.children ? this.leftSelected.children : null
      }
    }
  }

</script>

<style lang="scss" scoped>
  .cascaderItems {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .left {
      border: 1px solid red;
    }
    .right {
      margin-top: -1px;
    }
  }
</style>
