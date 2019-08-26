export default function validate (data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if (rule.required) {
      if (value !== 0 && !value) {
        errors[rule.key] = {required: '必填'}
        return
      }
    }
    if (rule.pattern) {
      if (rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if (rule.pattern.test(value) === false) {
        ensureObject(errors, rule.key)
        errors[rule.key].pattern = '格式不正确' // 整体覆盖 之前的数据丢失了
      }
    }
    if (rule.minLength) {
      if (value.length < rule.minLength) {
        ensureObject(errors, rule.key)
        errors[rule.key].minLength = '太短'
      }
    }
  })
  return errors
}

function ensureObject (obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
