import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Vue from 'vue'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'

import Slides from '@/slides/slides'
import SlidesItem from '@/slides/slides-item'

describe('Slides', () => {
  it('存在.', () => {
    expect(Slides).exist
  })
  
  it('接受 WSlidesItems.', done => {
    Vue.component('WSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {autoPlay: false},
      slots: {
        default: `
          <w-slides-item name="1">
            <div class="box1">1</div>
          </w-slides-item>
          <w-slides-item name="2">
            <div class="box2">2</div>
          </w-slides-item>
          <w-slides-item name="3">
            <div class="box3">3</div>
          </w-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box1').exists()).to.be.true
      done()
    })
  })
  
  it('selected是几 选中的就是几', done => {
    Vue.component('WSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '2'
      },
      slots: {
        default: `
          <w-slides-item name="1">
            <div class="box1">1</div>
          </w-slides-item>
          <w-slides-item name="2">
            <div class="box2">2</div>
          </w-slides-item>
          <w-slides-item name="3">
            <div class="box3">3</div>
          </w-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box2').exists()).to.be.true
      done()
    })
  })
  
  it('点击第二个 展示第二个.', done => {
    Vue.component('WSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '1'
      },
      listeners: {
        'update:selected': (x) => {
          expect(x).to.eq('2')
          done()
        }
      },
      slots: {
        default: `
          <w-slides-item name="1">
            <div class="box1">1</div>
          </w-slides-item>
          <w-slides-item name="2">
            <div class="box2">2</div>
          </w-slides-item>
          <w-slides-item name="3">
            <div class="box3">3</div>
          </w-slides-item>
        `
      }
    })
    setTimeout(() => {
      wrapper.find('[data-index="1"').trigger('click')
      done()
    })
  })
  
  it('会自动播放', (done) => {
    const callback = sinon.fake()
    Vue.component('WSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: true,
        selected: '1',
        autoPlayDelay: 20
      },
      listeners: {
        'update:selected':callback
      },
      slots: {
        default: `
          <w-slides-item name="1">
            <div class="box1">1</div>
          </w-slides-item>
          <w-slides-item name="2">
            <div class="box2">2</div>
          </w-slides-item>
          <w-slides-item name="3">
            <div class="box3">3</div>
          </w-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(callback).to.have.been.calledWith('2')
      done()
    }, 21)
  })
  
  it('可以点击上一张', (done) => {
    Vue.component('WSlidesItem', SlidesItem)
    const callback = sinon.fake();
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: true,
        autoPlayDelay: 20,
        selected: '1'
      },
      slots: {
        default: `
          <w-slides-item name="1">
            <div class="box1">1</div>
          </w-slides-item>
          <w-slides-item name="2">
            <div class="box2">2</div>
          </w-slides-item>
          <w-slides-item name="3">
            <div class="box3">3</div>
          </w-slides-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      wrapper.find('[data-action="prev"]').trigger('click')
      expect(callback).to.have.been.calledWith('3')
      done()
    }, 21)
  })
  
  it('可以点击下一张', (done) => {
    Vue.component('WSlidesItem', SlidesItem)
    const callback = sinon.fake();
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: true,
        autoPlayDelay: 20,
        selected: '1'
      },
      slots: {
        default: `
          <w-slides-item name="1">
            <div class="box1">1</div>
          </w-slides-item>
          <w-slides-item name="2">
            <div class="box2">2</div>
          </w-slides-item>
          <w-slides-item name="3">
            <div class="box3">3</div>
          </w-slides-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      wrapper.find('[data-action="next"]').trigger('click')
      expect(callback).to.have.been.calledWith('2')
      done()
    }, 21)
  })
})
