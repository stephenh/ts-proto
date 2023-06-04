import { Todo } from "./use-objectid-true";

import * as mongodb from "mongodb";

const id1 = new mongodb.ObjectId();
const id2 = new mongodb.ObjectId();

describe("useMongoObjectId=true External Import", () => {
  it("generates types that compile and encode", () => {
    const output = Todo.encode({
      id: "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
      oid: id1,
      repeatedOid: [id1, id2],
      mapOfOids: {
        id1,
        id2,
      },
    }).finish();

    expect(Todo.decode(output)).toMatchInlineSnapshot(`
      {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfOids": {
          "id1": "647c9f88f04b55a2ad916c7f",
          "id2": "647c9f88f04b55a2ad916c80",
        },
        "oid": "647c9f88f04b55a2ad916c7f",
        "optionalOid": undefined,
        "repeatedOid": [
          "647c9f88f04b55a2ad916c7f",
          "647c9f88f04b55a2ad916c80",
        ],
      }
    `);

    expect(Todo.toJSON(Todo.decode(output))).toMatchInlineSnapshot(`
      {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfOids": {
          "id1": "647c9f88f04b55a2ad916c7f",
          "id2": "647c9f88f04b55a2ad916c80",
        },
        "oid": "647c9f88f04b55a2ad916c7f",
        "repeatedOid": [
          "647c9f88f04b55a2ad916c7f",
          "647c9f88f04b55a2ad916c80",
        ],
      }
    `);
  });
});
