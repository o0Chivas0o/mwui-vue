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
    let errors = Validator(data, rules)
    expect(errors.email.required).to.eq('必填')
  })
  
  it('test 2 : number 0 required true 通过', () => {
    let data = {
      email: 0
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let errors = Validator(data, rules)
    expect(errors.email).to.not.exist
  })
  
  it('test 3 : pattern 通过', () => {
    let data = {
      email: 'lzy@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]
    let errors = Validator(data, rules)
    expect(errors.email).to.not.exist
  })
  
  it('test 4 : pattern 报错', () => {
    let data = {
      email: '@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]
    let errors = Validator(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })
  
  it('test 5 : pattern:`email` 报错', () => {
    let data = {
      email: '@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]
    let errors = Validator(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })
  
  it('test 6 : pattern:`email` 通过', () => {
    let data = {
      email: 'lzy@zjl.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]
    let errors = Validator(data, rules)
    expect(errors.email).to.not.exist
  })
  
  it('test 7 : required & pattern', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true}
    ]
    let errors = Validator(data, rules)
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
    let errors = Validator(data, rules)
    expect(errors.email.minLength).to.exist
    expect(errors.email.pattern).to.exist
  })
})
