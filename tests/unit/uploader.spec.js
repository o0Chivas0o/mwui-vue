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
        console.log(wrapper.html())
        done()
      }, 100)
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
      }
    })
    
    wrapper.find('#xx').trigger('click')
    
    let input = wrapper.find('input[type="file"]').element
    const data = new DataTransfer()
    data.items.add(new File(["foo"], 'foo.png'))
    data.items.add(new File(["bar"], 'bar.png'))
    input.files = data.files
  
  
    // console.log(wrapper.html())
    let use = wrapper.find('use').element
    expect(use.getAttribute('xlink:href')).to.eq('#i-loading')
  })
})
