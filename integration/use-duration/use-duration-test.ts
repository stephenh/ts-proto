import { Duration } from "./google/protobuf/duration";

describe('useDuration', () => {
  it('generates a type that converts to/from string', () => {
    let t: Duration = {
      seconds: 123,
      nanos: 456,
    }
    expect(Duration.toJSON(t)).toEqual('123.000000456s');
    expect(Duration.fromJSON('123.000000456s')).toEqual(t);
  });
});
