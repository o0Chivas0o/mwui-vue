import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Toast from '@/toast'

describe('Toast', () => {
  it('存在.', () => {
    expect(Toast).to.exist
  })
  describe('props', function () {
    it('接受 autoClose', (done) => {
      const wrapper = mount(Toast, {propsData: {autoClose: 1}, attachToDocument: true})
      const vm = wrapper.vm
      vm.$on('close', () => {
        expect(document.body.contains(vm.$el)).to.eq(false)
        done()
      }, 200)
    })
    
    it('接受 closeButton', (done) => {
      const callback = sinon.fake()
      const wrapper = mount(Toast, {propsData: {closeButton: {text: '关闭吧', callback}}})
      const vm = wrapper.vm
      let closeButton = vm.$el.querySelector('.close')
      expect(closeButton.textContent.trim()).to.eq('关闭吧')
      vm.$nextTick(() => {
        closeButton.click()
        expect(callback).to.have.been.called
        done()
      })
    })
    
    xit('接受 enableHtml', () => {
      const wrapper = mount(Toast, {
        propsData: {enableHtml: true},
        slots: {strong: '<strong>hi</strong>'}
      })
      setTimeout(()=>{
        expect(wrapper.contains('strong')).to.eq(true)
      })
    })
    
    it('接受 position', () => {
      const wrapper = mount(Toast, {propsData: {position: 'bottom'}})
      const vm = wrapper.vm
      expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
    })
    
  })
})
