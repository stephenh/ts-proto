import { protoMetadata } from './options';

describe('options', () => {
  it('generates types correctly', () => {
    expect(protoMetadata).toMatchSnapshot();
  });

  it('includes the options of enums nested in messages', () => {
    expect(protoMetadata.options?.messages?.['MyMessage']?.enums?.['MyNestedEnum']).toEqual({
      options: { my_enum_option: true },
      values: { NESTED_FOO: { my_enum_value_option: 654 } },
    });
  });
});
