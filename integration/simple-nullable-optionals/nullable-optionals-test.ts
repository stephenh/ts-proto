import { Simple, SimpleWithWrappers, StateEnum } from './simple'

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'Bob',
      age: 33,
      state: StateEnum.ON,
      grandChildren: [],
      coins: [],
      snacks: [],
      oldStates: [],
    }

    const simpleWithWrappers: SimpleWithWrappers = {
      coins: [],
      snacks: [],
    }
  })
})
