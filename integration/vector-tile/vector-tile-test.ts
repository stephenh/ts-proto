import { BinaryReader } from "@bufbuild/protobuf/wire";
import { vector_tile } from "./pbjs";
import { Tile_Value } from "./vector_tile";
import IValue = vector_tile.Tile.IValue;
import PbValue = vector_tile.Tile.Value;

describe("vector-tile", () => {
  it("can decode", () => {
    const v1: IValue = {
      boolValue: false,
      doubleValue: 0,
      floatValue: 0,
      intValue: 1_000,
      sintValue: 0,
      stringValue: "",
      uintValue: 2_000,
    };
    const v2 = Tile_Value.decode(new BinaryReader(PbValue.encode(PbValue.fromObject(v1)).finish()));
    expect(v2).toEqual(v1);
  });

  it("can decode Uint8Array input directly", () => {
    const v1: IValue = {
      boolValue: false,
      doubleValue: 0,
      floatValue: 0,
      intValue: 1_000,
      sintValue: 0,
      stringValue: "",
      uintValue: 2_000,
    };
    const bytes = PbValue.encode(PbValue.fromObject(v1)).finish();
    const v2 = Tile_Value.decode(bytes);
    expect(v2).toEqual(v1);
  });

  it("can decode Buffer input", () => {
    const v1: IValue = {
      boolValue: false,
      doubleValue: 0,
      floatValue: 0,
      intValue: 1_000,
      sintValue: 0,
      stringValue: "",
      uintValue: 2_000,
    };
    const bytes = PbValue.encode(PbValue.fromObject(v1)).finish();
    const buffer = Buffer.from(bytes);
    const v2 = Tile_Value.decode(buffer);
    expect(v2).toEqual(v1);
  });

  it("decodes numbers", () => {
    const tile = {
      intValue: 1,
      uintValue: 2,
      sintValue: -3,
      floatValue: 1.1,
      doubleValue: -2.2,
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      {
        "boolValue": false,
        "doubleValue": -2.2,
        "floatValue": 1.1,
        "intValue": 1,
        "sintValue": -3,
        "stringValue": "",
        "uintValue": 2,
      }
    `);
  });

  it("decodes numbers that are falsey", () => {
    const tile = {
      intValue: 0,
      uintValue: 0,
      sintValue: -0,
      floatValue: 0,
      doubleValue: 0,
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      {
        "boolValue": false,
        "doubleValue": 0,
        "floatValue": 0,
        "intValue": 0,
        "sintValue": -0,
        "stringValue": "",
        "uintValue": 0,
      }
    `);
  });

  it("decodes numbers that are strings", () => {
    const tile = {
      intValue: "1",
      uintValue: "2",
      sintValue: "-3",
      floatValue: "1.1",
      doubleValue: "-2.2",
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      {
        "boolValue": false,
        "doubleValue": -2.2,
        "floatValue": 1.1,
        "intValue": 1,
        "sintValue": -3,
        "stringValue": "",
        "uintValue": 2,
      }
    `);
  });

  it("decodes numbers that are weird", () => {
    const tile = {
      floatValue: "NaN",
      doubleValue: "Infinity",
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      {
        "boolValue": false,
        "doubleValue": Infinity,
        "floatValue": NaN,
        "intValue": 0,
        "sintValue": 0,
        "stringValue": "",
        "uintValue": 0,
      }
    `);
  });
});
