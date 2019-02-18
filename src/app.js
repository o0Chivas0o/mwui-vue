import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('w-icon',Icon)
Vue.component('w-button',Button)
Vue.component('w-button-group',ButtonGroup)

new Vue({
  el:'#app',
  data:{
    loading:false
  }
})

import chai from 'chai'

const expect = chai.expect
// 单元测试
{
  const Constructor = Vue.extend(Button)
  const button = new Constructor({
    propsData:{
      icon:'settings'
    }
  })
  button.$mount('#test')
  let useElement = button.$el.querySelector('use')
  console.log(useElement)
  expect(useElement.getAttribute('xlink:href')).to.eq('settings')
}
