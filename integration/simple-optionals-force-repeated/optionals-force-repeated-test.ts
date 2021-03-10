import { Simple, SimpleWithWrappers, StateEnum } from './simple'

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'Bob',
      age: 33,
      // We don't have to pass `createdAt` and `child` as these are non-scalar
      // and thus optional.
      state: StateEnum.ON,
      // We don't have to pass any of the repeated fields as we used
      // `forceOptionalRepeated=true` to make them optional.
    }

    const simpleWithWrappers: SimpleWithWrappers = {
    }
  })
})
