import { Todo } from './use-objectid-true';

import * as mongodb from 'mongodb';

const id1 = new mongodb.ObjectId();
const id2 = new mongodb.ObjectId();

describe('useMongoObjectId=true External Import', () => {
  it('generates types that compile and encode', () => {
    const output = Todo.encode({
      id: '6883ed6e-bd0d-4817-ba58-c2a53c73edc2',
      oid: id1,
      repeatedOid: [id1, id2],
      mapOfOids: {
        id1,
        id2,
      },
    }).finish();

    expect(Todo.decode(output)).toMatchInlineSnapshot(`
      Object {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfOids": Object {
          "id1": "${id1.toString()}",
          "id2": "${id2.toString()}",
        },
        "oid": "${id1.toString()}",
        "optionalOid": undefined,
        "repeatedOid": Array [
          "${id1.toString()}",
          "${id2.toString()}",
        ],
      }
    `);

    expect(Todo.toJSON(Todo.decode(output))).toMatchInlineSnapshot(`
      Object {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfOids": Object {
          "id1": "${id1.toString()}",
          "id2": "${id2.toString()}",
        },
        "oid": "${id1.toString()}",
        "repeatedOid": Array [
          "${id1.toString()}",
          "${id2.toString()}",
        ],
      }
    `);
  });
});
