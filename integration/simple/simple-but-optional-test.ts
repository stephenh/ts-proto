import { SimpleButOptional } from './simple';

describe('simple-but-optional', () => {
  it('can encode', () => {
    const s1: SimpleButOptional = {
      name: 'Joe',
      age: 17,
      child: undefined,
      state: undefined,
      createdAt: undefined,
      thing: undefined,
      birthday: undefined,
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

    expect(mockWriter.string).toHaveBeenCalledWith('Joe');
    expect(mockWriter.int32).toHaveBeenCalledWith(17);
  });

  it('can encode to json', () => {
    const s1: SimpleButOptional = {
      name: '',
      age: 0,
      child: undefined,
      state: undefined,
      createdAt: undefined,
      thing: undefined,
      birthday: undefined,
    };

    expect(SimpleButOptional.toJSON(s1)).toMatchInlineSnapshot(`
      Object {
        "age": 0,
        "name": "",
      }
    `);
  });
});
