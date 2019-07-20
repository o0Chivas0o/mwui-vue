import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Input from '@/input'

describe('Input', () => {
  it('存在.', () => {
    expect(Input).exist
  })
  
  describe('props', () => {
    let vm
    it('接收 value', () => {
      vm = mount(Input, {propsData: {value: '1234'}}).vm
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.value).to.equal('1234')
    })
    
    it('接收 disabled', () => {
      vm = mount(Input, {propsData: {disabled: true}}).vm
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.disabled).to.equal(true)
    })
    
    it('接收 readonly', () => {
      vm = mount(Input, {propsData: {readonly: true}}).vm
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.readOnly).to.equal(true)
    })
    
    it('接收 error', () => {
      vm = mount(Input, {propsData: {error: '出错了'}}).vm
      const useElement = vm.$el.querySelector('use')
      expect(useElement.getAttribute('xlink:href')).to.equal('#i-error')
      const errorMessage = vm.$el.querySelector('.error-message')
      expect(errorMessage.innerHTML).to.equal('出错了')
    })
  })
  
  describe('事件', () => {
    let vm
    afterEach(() => {vm.$destroy()})
    
    it('支持 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur'].forEach((eventName) => {
        vm = mount(Input, {}).vm
        const callback = sinon.fake()
        vm.$on(eventName, callback)
        // 触发 input 的 change 事件
        const event = new Event(eventName)
        Object.defineProperty(
            event, 'target', {
              value: {value: 'hi', enumerable: true}
            })
        const inputElement = vm.$el.querySelector('input')
        inputElement.dispatchEvent(event)
        expect(callback).to.have.been.calledWith('hi')
      })
    })
  })
})
