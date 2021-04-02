import { Todo } from './use-date-true';

const jan1 = new Date('1970-01-01T00:00:00.000Z');
const feb1 = new Date('1970-02-01T00:00:00.000Z');

describe('useDate=true', () => {
  it('generates types that compile and encode', () => {
    const output = Todo.encode({
      id: '6883ed6e-bd0d-4817-ba58-c2a53c73edc2',
      timestamp: feb1,
      repeatedTimestamp: [jan1, feb1],
      mapOfTimestamps: {
        jan1,
        feb1,
      },
    }).finish();

    expect(Todo.decode(output)).toMatchInlineSnapshot(`
      Object {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfTimestamps": Object {
          "feb1": 1970-02-01T00:00:00.000Z,
          "jan1": 1970-01-01T00:00:00.000Z,
        },
        "repeatedTimestamp": Array [
          1970-01-01T00:00:00.000Z,
          1970-02-01T00:00:00.000Z,
        ],
        "timestamp": 1970-02-01T00:00:00.000Z,
      }
    `);

    expect(Todo.toJSON(Todo.decode(output))).toMatchInlineSnapshot(`
      Object {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfTimestamps": Object {
          "feb1": "1970-02-01T00:00:00.000Z",
          "jan1": "1970-01-01T00:00:00.000Z",
        },
        "repeatedTimestamp": Array [
          "1970-01-01T00:00:00.000Z",
          "1970-02-01T00:00:00.000Z",
        ],
        "timestamp": "1970-02-01T00:00:00.000Z",
      }
    `);
  });
});
