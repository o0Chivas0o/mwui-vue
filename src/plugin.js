import Toast from './toast'

export default {
  install (Vue, options) {
    Vue.prototype.$toast = function (message, toastOptions) {
      let Constructor = Vue.extend(Toast)
      let toast = new Constructor({
        propsData: {toastOptions}
      })
      toast.$slots.default = [message]
      toast.$mount() // 必须mount 否则生命周期都不会实现
      document.body.appendChild(toast.$el)
    }
  }
}
