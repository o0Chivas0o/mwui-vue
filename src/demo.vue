<template>
  <div>
    <w-nav :selected.sync='selected' :multiple="false">
      <w-nav-item name="home">首页</w-nav-item>
      <w-nav-sub>
        <template slot="title">关于</template>
        <w-nav-item name="culture">企业文化</w-nav-item>
        <w-nav-item name="developers">开发团队</w-nav-item>
        <w-nav-item name="contacts">联系电话</w-nav-item>
      </w-nav-sub>
      <w-nav-item name="hire">招聘</w-nav-item>
    </w-nav>
  </div>
</template>

<script>
  import WNav from './nav/nav'
  import WNavItem from './nav/nav-item'
  import WNavSub from './nav/nav-sub'
  
  export default {
    name: 'demo',
    components: {WNav, WNavItem, WNavSub},
    data () {
      return {
        selected: ['home']
      }
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
