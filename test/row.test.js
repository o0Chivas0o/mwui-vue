import { describe } from 'mocha'

const expect = chai.expect
import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Button', () => {
  it('存在.', () => {
    expect(Row).to.exist
  })
  // it('接受 gutter 属性.', () => {
  //   const div = document.createElement('div')
  //   document.body.appendChild(div)
  //   const RowConstructor = Vue.extend(Row)
  //   const ColConstructor = Vue.extend(Col)
  //   const row = new RowConstructor({propsData: {gutter: 10}}).$mount(div)
  //   const
  //   row.$destroy()
  // })
})
