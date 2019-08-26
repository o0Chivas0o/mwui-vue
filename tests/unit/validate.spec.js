import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import Validate from '../../src/validate'

describe('Validate', () => {
  it('存在', () => {
    expect(Validate).to.exist
  })
})
