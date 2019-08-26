import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import Validator from '../../src/validate'

describe('Validator', () => {
  it('存在', () => {
    expect(Validator).to.exist
  })
  
  it('test 1', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let errors = Validator(data, rules)
    expect(errors.email.required).to.eq('必填')
  })
})
