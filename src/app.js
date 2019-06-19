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
import Toast from './toast'
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
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {},
  created () {},
  methods: {
    showToast1 () {
      this.$toast(`${parseInt(Math.random() * 100)}`, {
        position: 'top',
        autoClose: true,
        enableHtml: false,
        autoCloseDelay: 2
      })
    },
    showToast2 () {
      this.$toast(`${parseInt(Math.random() * 100)}`, {
        position: 'left',
        autoClose: true,
        enableHtml: false,
        autoCloseDelay: 2
      })
    },
    showToast3 () {
      this.$toast(`${parseInt(Math.random() * 100)}`, {
        position: 'middle',
        autoClose: true,
        enableHtml: false,
        autoCloseDelay: 2
      })
    },
    showToast4 () {
      this.$toast(`${parseInt(Math.random() * 100)}`, {
        position: 'right',
        autoClose: true,
        enableHtml: false,
        autoCloseDelay: 2
      })
    },
    showToast5 () {
      this.$toast(`${parseInt(Math.random() * 100)}`, {
        position: 'bottom',
        autoClose: true,
        enableHtml: false,
        autoCloseDelay: 2
      })
    }
  }
})
