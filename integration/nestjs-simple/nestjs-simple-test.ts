import { SampleService } from './sample-service';

describe('nestjs-simple-test', () => {
  it('compiles', () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });
});
