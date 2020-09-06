import { SimpleButOptional } from './oneof';

describe('simple-but-optional', () => {
  it('can encode', () => {
    const s1: SimpleButOptional = {
      name: '',
      age: 0,
    };

    const mockWriter = {
      uint32: jest.fn().mockImplementation(function (this: any) {
        return this;
      }),
      string: jest.fn(),
      int32: jest.fn(),
      fork: jest.fn(),
    };
    SimpleButOptional.encode(s1, mockWriter as any);

    expect(mockWriter.string).toHaveBeenCalledWith('');
    expect(mockWriter.int32).toHaveBeenCalledWith(0);
  });

  it('can encode to json', () => {
    const s1: SimpleButOptional = {
      name: '',
      age: 0,
    };

    expect(SimpleButOptional.toJSON(s1)).toMatchInlineSnapshot(`
      Object {
        "age": 0,
        "name": "",
      }
    `);
  });

  it('has optional-by-default keys', () => {
    // usually leaving off age requires useOptionals
    const s1: SimpleButOptional = { name: '' };
    expect(SimpleButOptional.toJSON(s1)).toMatchInlineSnapshot(`
      Object {
        "name": "",
      }
    `);
  });
});
