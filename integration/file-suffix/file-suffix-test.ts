import { Parent } from './parent.pb';
import { ChildEnum } from './child.pb';

describe('file-suffix', () => {
  it('generates types correctly', () => {
    const parent: Parent = {
      child: {
        name: 'child name'
      },
      childEnum: ChildEnum.FOO,
      createdAt: new Date('2020-01-01T00:00:00.000Z'),
    }
    expect(parent.child?.name).toEqual('child name');
  });
});
