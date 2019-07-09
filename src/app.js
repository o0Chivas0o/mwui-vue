import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Sider from './sider'
import Content from './content'
import Footer from './footer'
import Tabs from './tabs'
import TabsNav from './tabs-nav'
import TabsContent from './tabs-content'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'
import Toast from './toast'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import plugin from './plugin'

Vue.component('w-icon', Icon)
Vue.component('w-button', Button)
Vue.component('w-button-group', ButtonGroup)
Vue.component('w-input', Input)
Vue.component('w-row', Row)
Vue.component('w-col', Col)
Vue.component('w-layout', Layout)
Vue.component('w-header', Header)
Vue.component('w-sider', Sider)
Vue.component('w-content', Content)
Vue.component('w-footer', Footer)
Vue.component('w-toast', Toast)
Vue.component('w-tabs', Tabs)
Vue.component('w-tabs-nav', TabsNav)
Vue.component('w-tabs-item', TabsItem)
Vue.component('w-tabs-content', TabsContent)
Vue.component('w-tabs-pane', TabsPane)
Vue.component('w-popover', Popover)
Vue.component('w-collapse', Collapse)
Vue.component('w-collapse-item', CollapseItem)
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    selectedTab: 'sports'
  },
  created () {},
  methods: {}
})
