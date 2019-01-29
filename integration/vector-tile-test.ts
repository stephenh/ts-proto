import { Reader } from "protobufjs/minimal";
import { vector_tile } from "../build/pbjs";
import { decodeTile_Value } from "../build/vector_tile";
import IValue = vector_tile.Tile.IValue;
import PbValue = vector_tile.Tile.Value;

describe('vector-file', () => {
  it('can decode', () => {
    const v1 : IValue = {
      intValue: 1_000,
      uintValue: 2_000
    };
    const v2 = decodeTile_Value(Reader.create(PbValue.encode(PbValue.fromObject(v1)).finish()));
    expect(v2).toEqual(v1);
  });
});
