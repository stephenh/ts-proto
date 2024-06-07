import { Proto2TestMessage } from './proto-2';

describe('proto2', () => {
  it('preserves null values on optional fields', () => {
    const message = Proto2TestMessage.fromJSON({
      intValue: null,
      stringValue: null,
      boolValue: null,
      mapValue: {},
    });

    const data = Proto2TestMessage.encode(message).finish();
    const result = Proto2TestMessage.decode(data);

    expect(result).toEqual(message);
  });

  it('encodes/decodes non-null values on optional fields', () => {
    const message = Proto2TestMessage.fromJSON({
      intValue: 100,
      stringValue: 'string',
      boolValue: true,
      mapValue: {
        v1:'1',
        v2:'2',
      }
    });

    const data = Proto2TestMessage.encode(message).finish();
    const result = Proto2TestMessage.decode(data);

    expect(result).toEqual(message);
  });

  it('encodes/decodes non-null values set to standard protobuf defaults', () => {
    const message = Proto2TestMessage.fromJSON({
      intValue: 0,
      stringValue: '',
      boolValue: false,
      mapValue: {},
    });

    const data = Proto2TestMessage.encode(message).finish();
    const result = Proto2TestMessage.decode(data);

    expect(result).toEqual(message);
  });
})