import { SampleService } from './sample-service';

describe('nestjs-restparameters-test', () => {
  it('compiles', () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });
});
