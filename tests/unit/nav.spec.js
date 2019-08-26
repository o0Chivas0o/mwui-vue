import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Vue from 'vue'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Nav from '@/nav/nav'
import NavItem from '@/nav/nav-item'
import NavSub from '@/nav/nav-sub'

describe('Nav', () => {
  
  it('存在.', () => {
    expect(Nav).exist
  })
  
  it('支持 selected 属性', () => {
    Vue.component('w-nav-item', NavItem)
    Vue.component('w-nav-sub', NavSub)
    const wrapper = mount(Nav, {
      propsData: {selected: 'home'},
      slots: {
        default: `
      <w-nav-item name="home">首页</w-nav-item>
      <w-nav-sub name="about">
        <template slot="title">关于</template>
        <w-nav-item name="culture">企业文化</w-nav-item>
        <w-nav-item name="developers">开发团队</w-nav-item>
        <w-nav-sub name="contact">
          <template slot="title">联系方式</template>
          <w-nav-item name="wechat">微信</w-nav-item>
          <w-nav-item name="qq">QQ</w-nav-item>
          <w-nav-item name="phone">手机</w-nav-item>
        </w-nav-sub>
      </w-nav-sub>
      <w-nav-item name="hire">招聘</w-nav-item>
     `
      }
    })
    setTimeout(() => {
      wrapper.find('[data-name="home"].selected').exists().to.be.true
    })
  })
  
  it('会触发 update:selected 事件', (done) => {
    Vue.component('w-nav-item', NavItem)
    Vue.component('w-sub-nav', NavSub)
    const callback = sinon.fake();
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <w-nav-item name="home">首页</w-nav-item>
          <w-sub-nav name="about">
            <template slot="title">关于</template>
            <w-nav-item name="culture">企业文化</w-nav-item>
            <w-nav-item name="developers">开发团队</w-nav-item>
          </w-sub-nav>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    wrapper.find('[data-name="developers"]').trigger('click')
    expect(callback).to.have.been.calledWith('developers')
    done()
  })
})
