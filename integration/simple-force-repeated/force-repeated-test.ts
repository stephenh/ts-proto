import { Simple, SimpleWithWrappers, StateEnum } from './simple'

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'Bob',
      age: 33,
      createdAt: new Date(),
      child: undefined,
      thing: undefined,
      state: StateEnum.ON,
      // We can set the repeated fields to `undefined` since we
      // used `forceOptionalRepeated=true`.
      grandChildren: undefined,
      coins: undefined,
      snacks: undefined,
      oldStates: undefined,
    }

    const simpleWithWrappers: SimpleWithWrappers = {
      name: 'foo',
      age: 42,
      enabled: false,
      coins: undefined,
      snacks: undefined,
    }
  })
})
