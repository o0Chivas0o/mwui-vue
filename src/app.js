import Vue from 'vue'
import Button from './button'
import ButtonGroup from './button-group'
import Cascader from './cascader'
import Col from './col'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Content from './content'
import Footer from './footer'
import Header from './header'
import Icon from './icon'
import Input from './input'
import Layout from './layout'
import plugin from './plugin'
import Popover from './popover'
import Row from './row'
import Sider from './sider'
import Tabs from './tabs'
import TabsContent from './tabs-content'
import TabsItem from './tabs-item'
import TabsNav from './tabs-nav'
import TabsPane from './tabs-pane'
import Toast from './toast'

Vue.component('w-button', Button)
Vue.component('w-button-group', ButtonGroup)
Vue.component('w-cascader', Cascader)
Vue.component('w-col', Col)
Vue.component('w-collapse', Collapse)
Vue.component('w-collapse-item', CollapseItem)
Vue.component('w-content', Content)
Vue.component('w-footer', Footer)
Vue.component('w-header', Header)
Vue.component('w-icon', Icon)
Vue.component('w-input', Input)
Vue.component('w-layout', Layout)
Vue.component('w-popover', Popover)
Vue.component('w-row', Row)
Vue.component('w-sider', Sider)
Vue.component('w-tabs', Tabs)
Vue.component('w-tabs-content', TabsContent)
Vue.component('w-tabs-item', TabsItem)
Vue.component('w-tabs-nav', TabsNav)
Vue.component('w-tabs-pane', TabsPane)
Vue.component('w-toast', Toast)
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    source: [
      {
        name: '湖北',
        children: [
          {
            name: '武汉',
            children: [
              {name: '武昌'},
              {name: '汉阳'},
              {name: '汉口'},
            ]
          }]
      },
      {
        name: '湖南',
        children: [
          {
            name: '长沙', children: [
              {name: '1区'},
              {name: '2区'},
              {name: '3区'}
            ]
          }
        ]
      }
    ],
  },
  created () {},
  methods: {}
})
