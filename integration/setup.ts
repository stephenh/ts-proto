import { readFile, writeFile } from 'fs';
import { google } from '../build/pbjs';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { generateFile } from '../src/main';
import { StringBuffer } from 'ts-poet/build/StringBuffer';
import { promisify } from 'util';

async function main() {
  const stdin = await promisify(readFile)('./simple.bin');
  const request = CodeGeneratorRequest.decode(stdin);
  for (let file of request.protoFile) {
    const spec = generateFile(file);
    const out = new StringBuffer();
    spec.emit(out);
    await promisify(writeFile)('./build/ts_proto_tests.ts', out.toString());
  }
}

main().then(() => {
  console.log('done');
});
