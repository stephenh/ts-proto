import { Example } from './oneof';

describe('oneof=unions,useOptionals=none', () => {
  it('generated type require oneof field to some value', () => {
    // @ts-expect-error Property 'some' is missing in type '{}' but required in type 'Example'.
    const example: Example = {};
  });
});
