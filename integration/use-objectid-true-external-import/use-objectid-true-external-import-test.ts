import { Todo } from "./use-objectid-true";

import * as mongodb from "mongodb";

const id1 = new mongodb.ObjectId("647ca164a22d71f13fb856f1");
const id2 = new mongodb.ObjectId("647ca164a22d71f13fb856f2");

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
          "id1": "647ca164a22d71f13fb856f1",
          "id2": "647ca164a22d71f13fb856f2",
        },
        "oid": "647ca164a22d71f13fb856f1",
        "optionalOid": undefined,
        "repeatedOid": [
          "647ca164a22d71f13fb856f1",
          "647ca164a22d71f13fb856f2",
        ],
      }
    `);

    expect(Todo.toJSON(Todo.decode(output))).toMatchInlineSnapshot(`
      {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfOids": {
          "id1": "647ca164a22d71f13fb856f1",
          "id2": "647ca164a22d71f13fb856f2",
        },
        "oid": "647ca164a22d71f13fb856f1",
        "repeatedOid": [
          "647ca164a22d71f13fb856f1",
          "647ca164a22d71f13fb856f2",
        ],
      }
    `);
  });
});
