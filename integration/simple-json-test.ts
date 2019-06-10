import { Simple } from '../build/integration/simple';
import { simple as pbjs } from '../build/integration/pbjs';
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbState = pbjs.StateEnum;

describe('simple', () => {
  it('can decode json', () => {
    // given a pbjs object
    const s1: ISimple = {
      name: 'asdf',
      age: 1,
      child: PbChild.fromObject({ name: 'foo' }),
      state: PbState.ON,
      grandChildren: [PbChild.fromObject({ name: 'grand1' }), PbChild.fromObject({ name: 'grand2' })],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [PbState.ON, PbState.OFF]
    };
    // when it goes to json and back to us
    const s2 = Simple.fromJSON(PbSimple.fromObject(s1).toJSON());
    // then it matches the original pbjs object
    // (even though its really our object/representation
    expect(s2).toEqual(s1);
  });
});
