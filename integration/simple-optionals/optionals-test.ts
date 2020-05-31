import { OneOfMessage, Simple, SimpleWithWrappers, StateEnum } from './simple'

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'Bob',
      age: 33,
      // We don't have to pass `createdAt` and `child` as these are non-scalar
      // and thus optional.
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

    const oneof1: OneOfMessage = {
      first: "Bob",
    }
    const oneof2: OneOfMessage = {
      last: "Bobman",
    }
  })
})
