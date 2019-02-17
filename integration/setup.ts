import { readFile, writeFile } from 'fs';
import { google } from '../build/pbjs';
import { generateFile } from '../src/main';
import { promisify } from 'util';
import { createTypeMap } from "../src/types";
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;

async function main() {
  await generate('./google/protobuf/wrappers.bin');
  await generate('./simple.bin');
  await generate('./vector_tile.bin');
  await generate('./batching.bin');
}

async function generate(path: string) {
  const stdin = await promisify(readFile)(path);
  const request = CodeGeneratorRequest.decode(stdin);
  const map = createTypeMap(request);
  for (let file of request.protoFile) {
    const spec = generateFile(map, file);
    await promisify(writeFile)(`./build/${spec.path}.ts`, spec.toString());
  }
}

main().then(() => {
  console.log('done');
});
