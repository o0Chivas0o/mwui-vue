import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import Validator from '../../src/validate'

describe('Validator', () => {
  it('存在', () => {
    expect(Validator).to.exist
  })
  
  it('test 1 : required true 报错', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })
  
  it('test 2 : number 0 required true 通过', () => {
    let data = {
      email: 0
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email).to.not.exist
  })
  
  it('test 3 : pattern 通过', () => {
    let data = {
      email: 'lzy@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email).to.not.exist
  })
  
  it('test 4 : pattern 报错', () => {
    let data = {
      email: '@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })
  
  it('test 5 : pattern:`email` 报错', () => {
    let data = {
      email: '@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })
  
  it('test 6 : pattern:`email` 通过', () => {
    let data = {
      email: 'lzy@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email).to.not.exist
  })
  
  it('test 7 : required & pattern', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.required).to.eq('必填')
    expect(errors.email.pattern).to.not.exist
  })
  
  it('test 8 : required & minLength', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email', minLength: 6}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.minLength).to.exist
    expect(errors.email.pattern).to.exist
  })
  
  it('test 9 : required & maxLength', () => {
    let data = {
      email: '123123123123'
    }
    let rules = [
      {key: 'email', pattern: 'email', maxLength: 10}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.maxLength).to.exist
    expect(errors.email.pattern).to.exist
  })
  
  it('test 10 :many keys', () => {
    let data = {
      email: '123123123123'
    }
    let rules = [
      {
        key: 'email', required: true, minLength: 5, maxLength: 10,
        hasNumber: true, hasLowerCaseAndUpperCase: true, hasDot: true, hasUnderscore: true,
        hasZjl: true
      }
    ]
    let fn = () => {
      let validator = new Validator()
      validator.validate(data, rules)
    }
    expect(fn).to.throw()
  })
  
  it('test 11 : 自定义测试规则 hasNumber', () => {
    let data = {
      email: 'abcabcabcabc'
    }
    let validator = new Validator()
    validator.hasNumber = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let rules = [{key: 'email', required: true, hasNumber: true}]
    let errors
    let fn = () => {
      errors = validator.validate(data, rules)
    }
    expect(fn).to.not.throw()
    expect(errors.email.hasNumber).to.eq('必须含有数字')
  })
  
  it('test 12 : 两个 validator 互相不影响 ', () => {
    let data = {
      email: 'abcabcabcabc'
    }
    let validator1 = new Validator()
    let validator2 = new Validator()
    validator1.hasNumber = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let rules = [{key: 'email', required: true, hasNumber: true}]
    expect(() => {
      validator1.validate(data, rules)
    }).to.not.throw()
    expect(() => {
      validator2.validate(data, rules)
    }).to.throw()
  })
  
  it('test 13 : 可以全局添加新规则 ', () => {
    let data = {
      email: 'abcabcabcabc'
    }
    let validator1 = new Validator()
    let validator2 = new Validator()
    Validator.add('hasNumber', (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    })
    let rules = [{key: 'email', required: true, hasNumber: true}]
    expect(() => {
      validator1.validate(data, rules)
    }).to.not.throw()
    expect(() => {
      validator2.validate(data, rules)
    }).to.not.throw()
  })
})
