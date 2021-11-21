import { SimpleWithMap } from './simple';

describe('simple', () => {
  it('can fromPartial maps', () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 1 },
      longLookup: { '1': 2, '2': 1 },
    });
    expect(s1).toMatchInlineSnapshot(`
      Object {
        "intLookup": Object {
          "1": 2,
          "2": 1,
        },
        "longLookup": Object {
          "1": Long {
            "high": 0,
            "low": 2,
            "unsigned": false,
          },
          "2": Long {
            "high": 0,
            "low": 1,
            "unsigned": false,
          },
        },
        "nameLookup": Object {},
      }
    `);
  });

  it('can toJSON/fromJSON maps', () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 1 },
      longLookup: { '1': 2, '2': 1 },
    });

    const json = SimpleWithMap.toJSON(s1);
    expect(json).toMatchInlineSnapshot(`
      Object {
        "intLookup": Object {
          "1": 2,
          "2": 1,
        },
        "longLookup": Object {
          "1": "2",
          "2": "1",
        },
        "nameLookup": Object {},
      }
    `);

    const s2 = SimpleWithMap.fromJSON(JSON.parse(JSON.stringify(json)));
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "intLookup": Object {
          "1": 2,
          "2": 1,
        },
        "longLookup": Object {
          "1": Long {
            "high": 0,
            "low": 2,
            "unsigned": false,
          },
          "2": Long {
            "high": 0,
            "low": 1,
            "unsigned": false,
          },
        },
        "nameLookup": Object {},
      }
    `);
  });
});
