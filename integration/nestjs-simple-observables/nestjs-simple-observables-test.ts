import { SampleService } from './sample-service';

describe('nestjs-simple-observables-test', () => {
  it('compiles', () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });
});
