import { Aws, Gcp } from './import-collision';
import { Job_State } from './aws/aws';

describe('import-collision', () => {
  it('is resolved for aws', () => {
    const aws = {
      swf: {
        id: 1,
        state: Job_State.STARTED,
      },
    };

    const encoded = Aws.encode(aws).finish();
    const decoded = Aws.decode(encoded);

    expect(decoded).toEqual(aws);
  });
  
  it('is resolved for gcp', () => {
    const gcp = {
      dag: {
        id: 3,
        id_dependencies: [ 1, 2, 3 ],
      }
    }

    const encoded = Gcp.encode(gcp).finish();
    const decoded = Gcp.decode(encoded);

    expect(decoded).toEqual(gcp)
  });
});

