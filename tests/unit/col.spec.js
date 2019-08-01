import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'
import Col from '@/grid/col'

describe('Col', () => {
  it('存在.', () => {
    expect(Col).to.exist
  })
  xit('接受 span 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({propsData: {span: '1'}}).$mount(div)
    const element = vm.$el
    expect(element.classList.contains('col-1')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  xit('接受 offset 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({propsData: {offset: '1'}}).$mount(div)
    const element = vm.$el
    expect(element.classList.contains('offset-1')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  xit('接受 pc 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        pc: {span: '1', offset: '2'}
      }
    }).$mount(div)
    const element = vm.$el
    expect(element.classList.contains('col-pc-1')).to.eq(true)
    expect(element.classList.contains('offset-pc-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  xit('接受 ipad 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        ipad: {span: '1', offset: '2'}
      }
    }).$mount(div)
    const element = vm.$el
    expect(element.classList.contains('col-ipad-1')).to.eq(true)
    expect(element.classList.contains('offset-ipad-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  xit('接受 narrow-pc 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        narrowPc: {span: '1', offset: '2'}
      }
    }).$mount(div)
    const element = vm.$el
    expect(element.classList.contains('col-narrow-pc-1')).to.eq(true)
    expect(element.classList.contains('offset-narrow-pc-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  xit('接受 wide-pc 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        widePc: {span: '1', offset: '2'}
      }
    }).$mount(div)
    const element = vm.$el
    expect(element.classList.contains('col-wide-pc-1')).to.eq(true)
    expect(element.classList.contains('offset-wide-pc-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  
})
