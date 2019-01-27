import { readFile, writeFile } from 'fs';
import { google } from '../build/pbjs';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { generateFile } from '../src/main';
import { StringBuffer } from 'ts-poet/build/StringBuffer';
import { promisify } from 'util';

async function main() {
  await generate('./simple.bin');
  await generate('./vector_tile.bin');
}

async function generate(path: string) {
  const stdin = await promisify(readFile)(path);
  const request = CodeGeneratorRequest.decode(stdin);
  for (let file of request.protoFile) {
    const spec = generateFile(file);
    await promisify(writeFile)(`./build/${spec.path}.ts`, spec.toString());
  }
}

main().then(() => {
  console.log('done');
});
