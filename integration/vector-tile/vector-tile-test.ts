import { Reader } from 'protobufjs/minimal';
import { vector_tile } from './pbjs';
import { Tile_Value } from './vector_tile';
import IValue = vector_tile.Tile.IValue;
import PbValue = vector_tile.Tile.Value;
import { readFileSync } from "fs";
import { createTypeMap } from '../../src/types';
import { optionsFromParameter } from '../../src/utils';
import { generateFile } from '../../src/main';
import { StringBuffer } from 'ts-poet/build/StringBuffer';
import { google } from '../../build/pbjs';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;

describe('vector-tile', () => {
  it('works', () => {
    const stdin = readFileSync('integration/vector-tile/vector_tile.bin');
    const request = CodeGeneratorRequest.decode(stdin);
    const typeMap = createTypeMap(request, optionsFromParameter(request.parameter));
    for (let file of request.protoFile) {
      const spec = generateFile(typeMap, file, '');
      const out = new StringBuffer();
      spec.emit(out);
      expect(out.toString()).toMatchSnapshot();
    }
  });

  it('can decode', () => {
    const v1: IValue = {
      intValue: 1_000,
      uintValue: 2_000
    };
    const v2 = Tile_Value.decode(Reader.create(PbValue.encode(PbValue.fromObject(v1)).finish()));
    expect(v2).toEqual(v1);
  });

  it('decodes numbers', () => {
    const tile = {
      intValue: 1,
      uintValue: 2,
      sintValue: -3,
      floatValue: 1.1,
      doubleValue: -2.2
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      Object {
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

  it('decodes numbers that are falsey', () => {
    const tile = {
      intValue: 0,
      uintValue: 0,
      sintValue: -0,
      floatValue: 0,
      doubleValue: 0
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      Object {
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

  it('decodes numbers that are strings', () => {
    const tile = {
      intValue: '1',
      uintValue: '2',
      sintValue: '-3',
      floatValue: '1.1',
      doubleValue: '-2.2'
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      Object {
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

  it('decodes numbers that are weird', () => {
    const tile = {
      floatValue: 'NaN',
      doubleValue: 'Infinity'
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
      Object {
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
