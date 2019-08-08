<template>
  <WSlides :selected.sync="selected">
    <WSlidesItem name="1">
      <div class="box">1</div>
    </WSlidesItem>
    <WSlidesItem name="2">
      <div class="box">2</div>
    </WSlidesItem>
    <WSlidesItem name="3">
      <div class="box">3</div>
    </WSlidesItem>
  </WSlides>
</template>

<script>
  import WSlides from './slides/slides'
  import WSlidesItem from './slides/slides-item'
  
  export default {
    name: 'demo',
    components: {WSlides, WSlidesItem},
    data () {
      return {
        selected: undefined
      }
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 200px;
    height: 150px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
