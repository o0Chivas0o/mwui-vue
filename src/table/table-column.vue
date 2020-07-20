<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WTable-column',
    props: {
      text: {type: String, require: true},
      field: {type: String, require: true},
      width: {type: Number}
    }
  }
</script>

<style lang="scss" scoped>

</style>
