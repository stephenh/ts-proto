import { google } from "../build/pbjs";
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { readFileSync } from "fs";
import { generateFile } from "../src/main";
import { StringBuffer } from "ts-poet/build/StringBuffer";

describe('vector-tile', () => {
  it('works', () => {
    const stdin = readFileSync('./vector_tile.bin');
    const request = CodeGeneratorRequest.decode(stdin);
    for (let file of request.protoFile) {
      const spec = generateFile(file);
      const out = new StringBuffer();
      spec.emit(out);
      expect(out.toString()).toMatchSnapshot();
    }
  });
});
