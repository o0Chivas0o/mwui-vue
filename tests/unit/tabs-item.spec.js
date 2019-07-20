import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Tabs from '@/tabs'
import TabsNav from '@/tabs-nav'
import TabsContent from '@/tabs-content'
import TabsItem from '@/tabs-item'
import TabsPane from '@/tabs-pane'


describe('TabsItem', () => {
  it('存在.', () => {
    expect(TabsItem).to.exist
  })
  xit('可以接受 name 属性', () => {
    const Constructor = Vue.extend(TabsItem)
    const vm = new Constructor({
      propsData: {
        name: 'xxx'
      }
    }).$mount()
    expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
  })
  xit('可以接受 disabled 属性', () => {
    const Constructor = Vue.extend(TabsItem)
    const vm = new Constructor({
      propsData: {
        disabled: true,
      }
    }).$mount()
    expect(vm.$el.classList.contains('disabled')).to.be.true
    const callback = sinon.fake()
    vm.$on('click',callback)
    vm.$el.click()
    expect(callback).to.have.not.been.called
  })
})
