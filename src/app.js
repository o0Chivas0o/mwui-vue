import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'

Vue.component('w-icon', Icon)
Vue.component('w-button', Button)
Vue.component('w-button-group', ButtonGroup)
Vue.component('w-input', Input)
Vue.component('w-row', Row)
Vue.component('w-col', Col)

new Vue({
  el: '#app',
  data: {
    loading: false,
    message: 'hi'
  },
  methods: {
    inputChange (e) {
      console.log(e.target.value)
    }
  }
})
