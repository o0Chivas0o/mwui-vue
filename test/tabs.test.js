const expect = chai.expect
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsNav from '../src/tabs-nav'
import TabsContent from '../src/tabs-content'
import TabsItem from '../src/tabs-item'
import TabsPane from '../src/tabs-pane'

Vue.component('w-tabs', Tabs)
Vue.component('w-tabs-nav', TabsNav)
Vue.component('w-tabs-item', TabsItem)
Vue.component('w-tabs-content', TabsContent)
Vue.component('w-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist
  })
  it('接受 selected 属性', (done) => {
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
  it('可以接受 direction props',()=>{})
})
