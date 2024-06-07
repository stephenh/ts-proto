import { Proto2TestMessage } from './proto-2';

describe('proto2', () => {
  it('preserves undefined values on optional fields', () => {
    const message = Proto2TestMessage.fromJSON({});

    const data = Proto2TestMessage.encode(message).finish();
    const result = Proto2TestMessage.decode(data);

    expect(result).toEqual({
      intValue: undefined,
      stringValue: undefined,
      boolValue: undefined,
      mapValue: {},
    });
  });

  it('encodes/decodes defined values on optional fields', () => {
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

  it('encodes/decodes defined values set to standard protobuf defaults', () => {
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