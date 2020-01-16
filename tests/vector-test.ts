import { google } from '../build/pbjs';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { readFileSync } from 'fs';
import { generateFile } from '../src/main';
import { StringBuffer } from 'ts-poet/build/StringBuffer';
import { createTypeMap } from "../src/types";
import { optionsFromParameter } from "../src/utils";

describe('vector-tile', () => {
  it('works', () => {
    const stdin = readFileSync('./vector_tile.bin');
    const request = CodeGeneratorRequest.decode(stdin);
    const typeMap = createTypeMap(request, optionsFromParameter(request.parameter));
    for (let file of request.protoFile) {
      const spec = generateFile(typeMap, file, "");
      const out = new StringBuffer();
      spec.emit(out);
      expect(out.toString()).toMatchSnapshot();
    }
  });
});
