import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Popover from '@/popover'

describe('Popover', () => {
  it('存在.', () => {
    expect(Popover).exist
  })
  
  xit('可以设置 position.', (done) => {
    Vue.component('w-popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <w-popover position="bottom" ref="a">
      <template slot="content" slot-scope="{close}">
        我是内容
        <button @click="close">关闭</button>
      </template>
      <button>点我</button>
    </w-popover>
    `
    const vm = new Vue({
      el: div
    })
    vm.$nextTick(() => {
      vm.$el.querySelector('button').click()
      vm.$nextTick(() => {
        expect(vm.$refs.a.$refs.contentWrapper.classList.contains('position-bottom')).to.be.true
        done()
      })
    })
  })
  
  xit('可以设置 trigger.', (done) => {
    Vue.component('w-popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <w-popover trigger="hover" ref="a">
      <template slot="content" slot-scope="{close}">
        我是内容
        <button @click="close">关闭</button>
      </template>
      <button>点我</button>
    </w-popover>
    `
    const vm = new Vue({
      el: div
    })
    setTimeout(() => {
      const event = new Event('mouseenter')
      vm.$el.dispatchEvent(event)
      vm.$nextTick(() => {
        const {contentWrapper} = vm.$refs.a.$refs
        expect(contentWrapper).to.exist
      })
    })
  })
})
