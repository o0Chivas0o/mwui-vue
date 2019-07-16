<template>
  <div>
    <cascader :source="source" popoverHeight="200px"></cascader>
  </div>
</template>

<script>
  import Cascader from './cascader'
  
  export default {
    name: 'demo',
    components: {Cascader},
    data () {
      return {
        source: [
          {
            name: '湖北',
            children: [
              {
                name: '武汉',
                children: [{name: '武昌'}, {name: '汉阳'}, {name: '汉口'}]
              }
            ]
          },
          {
            name: '湖南',
            children: [
              {
                name: '长沙',
                children: [{name: '1区'}, {name: '2区'}, {name: '3区'}]
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
