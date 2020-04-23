import { SampleService } from './sample-service';

describe('nestjs-metadata-observables-test', () => {
  it('compiles', () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });
});
