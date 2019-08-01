import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Popover from '@/popover/popover'

describe('Popover', () => {
  it('存在.', () => {
    expect(Popover).exist
  })
  
  it('可以设置 position.', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: {template: `<button>点我</button>`},
        content: '弹出内容'
      },
      propsData: {
        position: 'top'
      }
    })
    wrapper.find('button').trigger('click')
    let classes = wrapper.find('.content-wrapper').classes()
    expect(classes).to.include('position-top')
  })
  
  xit('可以设置 trigger.', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: {template: `<button>点我</button>`},
        content: '弹出内容'
      },
      propsData: {
        position: 'top',
        trigger: 'hover'
      }
    })
    expect(wrapper.find('.content-wrapper')).to.not.exist
    wrapper.find('.popover').trigger('mouseenter')
    expect(wrapper.find('.content-wrapper')).to.exist
  })
})
