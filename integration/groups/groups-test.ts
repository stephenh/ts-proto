import { GroupsOptionalTest, GroupsRepeatedTest, GroupsNestedTest } from './test'

describe('groups-test', () => {
  it('works with optional fields', () => {
    const test = {
      int1: 5,
      group: {
        key: 'hello',
        value: 'world',
        _unknownFields: {
          [(20 << 3) | 2]: [Buffer.from([2, 20, 21])]
        }
      },
      int3: 7,
      _unknownFields: {
        [(24 << 3) | 2]: [Buffer.from([0])]
      }
    };

    const data = GroupsOptionalTest.encode(test).finish();
    const result = GroupsOptionalTest.decode(data);

    expect(result).toEqual(test);
  });

  it('works with missing optional fields', () => {
    const test = {
      group: {
        value: 'key',
        _unknownFields: {
          [(15 << 3) | 2]: [Buffer.from([2, 1, 2])]
        }
      },
      int3: 20,
      _unknownFields: {
        [(10 << 3) | 2]: [Buffer.from([3, 4, 5, 6])]
      }
    };

    const data = GroupsOptionalTest.encode(test).finish();
    const result = GroupsOptionalTest.decode(data);

    expect(result).toEqual({
      int1: 0,
      group: {
        key: '',
        value: 'key',
        _unknownFields: {
          [(15 << 3) | 2]: [Buffer.from([2, 1, 2])]
        }
      },
      int3: 20,
      _unknownFields: {
        [(10 << 3) | 2]: [Buffer.from([3, 4, 5, 6])]
      }
    });
  });

  it('works with repeated fields', () => {
    const test = {
      int1: [1, 2, 3, 4],
      group: [
        {
          value: ['key'],
          _unknownFields: {
            [(10 << 3) | 2]: [Buffer.from([2, 0xa, 0xb])]
          }
        },
      ],
      _unknownFields: {
        [(27 << 3) | 2]: [Buffer.from([2, 0x10, 0x20])]
      }
    };

    const data = GroupsRepeatedTest.encode(test).finish();
    const result = GroupsRepeatedTest.decode(data);

    expect(result).toEqual({
      int1: [1, 2, 3, 4],
      group: [
        {
          key: [],
          value: ['key'],
          _unknownFields: {
            [(10 << 3) | 2]: [Buffer.from([2, 0xa, 0xb])]
          }
        },
      ],
      int3: [],
      _unknownFields: {
        [(27 << 3) | 2]: [Buffer.from([2, 0x10, 0x20])]
      }
    });
  });

  it('works with nested fields', () => {
    const test = {
      group: [
        {
          nested: [
            {
              nested2: [
                {
                  string1: 'hello world',
                  _unknownFields: {
                    [(9 << 3) | 2]: [Buffer.from([3, 9, 10, 11])]
                  }
                },
                {
                  string1: 'value2',
                  _unknownFields: {
                    [(10 << 3) | 2]: [Buffer.from([4, 10, 11, 12, 13])]
                  }
                }
              ],
              _unknownFields: {
                [(50 << 3) | 2]: [Buffer.from([0])]
              }
            }
          ],
          _unknownFields: {
            [(65 << 3) | 2]: [Buffer.from([2, 12, 34])]
          }
        },
      ],
      int3: [3, 4, 5, 6],
      _unknownFields: {
        [(55 << 3) | 2]: [Buffer.from([3, 6, 5, 4])]
      }
    };

    const data = GroupsNestedTest.encode(test).finish();
    const result = GroupsNestedTest.decode(data);

    expect(result).toEqual({
      int1: [],
      ...test
    });
  });
})
