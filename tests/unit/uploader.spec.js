import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'

chai.use(sinonChai)

import Uploader from '@/uploader/uploader'
import http from '../../src/http'

describe('Uploader', () => {
  it('存在.', () => {
    expect(Uploader).to.exist
  })
  xit('可以上传一个文件', (done) => {
    
    http.post = (url, options) => {
      setTimeout(function () {
        options.success('{"id": "123123"}')
        let use = wrapper.find('use').element
        expect(use.getAttribute('xlink:href')).to.eq('#i-loading')
        done()
      }, 1000)
    }
    
    const wrapper = mount(Uploader, {
      propsData: {
        name: 'file',
        action: '/upload',
        method: 'post',
        parseResponse: (response) => {
          let object = JSON.parse(response)
          return `/preview/${object.id}`
        },
        fileList: []
      },
      slots: {default: `<button id="xx">click me</button>`},
      listeners: {
        'update:fileList': (fileList) => { wrapper.setProps({fileList}) },
        'uploaded': () => {
          expect(wrapper.find('use').exists()).to.eq(false)
          expect(wrapper.props().fileList[0].url).to.eq('/preview/123123')
        }
      }
    })
    wrapper.find('#xx').trigger('click')
    let input = wrapper.find('input[type="file"]').element
    const data = new DataTransfer()
    data.items.add(new File(['foo'], 'foo.txt', {type: 'png'}))
    input.files = data.files
    // 赋值并没有解决change事件被调用 需要手动触发
    wrapper.find('input[type="file"]').trigger('change')
  })
})
