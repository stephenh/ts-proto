import { Example } from './oneof';

describe('oneof=unions,useOptionals=none', () => {
  it('generated type require oneof field to some value', () => {
    const alice: Example = {
      some: undefined, // here typescript must throws error without field value
    };
  });
});
