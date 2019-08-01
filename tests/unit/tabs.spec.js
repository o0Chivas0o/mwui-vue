import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Tabs from '@/tabs/tabs'
import TabsNav from '@/tabs/tabs-nav'
import TabsContent from '@/tabs/tabs-content'
import TabsItem from '@/tabs/tabs-item'
import TabsPane from '@/tabs/tabs-pane'

describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist
  })
  xit('接受 selected 属性', (done) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
     <w-tabs selected="sports">
    <w-tabs-nav>
      <w-tabs-item name="woman">美女</w-tabs-item>
      <w-tabs-item name="finance">财经</w-tabs-item>
      <w-tabs-item name="sports">体育</w-tabs-item>
    </w-tabs-nav>
    <w-tabs-content>
      <w-tabs-pane name="woman">美女相关资讯</w-tabs-pane>
      <w-tabs-pane name="finance">财经相关资讯</w-tabs-pane>
      <w-tabs-pane name="sports">体育相关资讯</w-tabs-pane>
    </w-tabs-content>
  </w-tabs>
    `
    let vm = new Vue({
      el: div
    })
    vm.$nextTick(() => {
      let target = vm.$el.querySelector(`.tabs-item[data-name=${'sports'}]`)
      expect(target.classList.contains('active')).to.be.true
      done()
    })
  })
  xit('可以接受 direction props', () => {})
})
