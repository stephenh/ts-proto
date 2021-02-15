import { Object, Error } from './global-this';

describe('global-this', () => {
  it('generates types correctly', () => {
    Object.fromPartial({});
    Error.fromPartial({});
  });
});
