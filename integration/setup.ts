import { mkdir, readFile, writeFile } from 'fs';
import { parse } from 'path';
import { google } from '../build/pbjs';
import { generateFile } from '../src/main';
import { promisify } from 'util';
import { createTypeMap } from '../src/types';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { optionsFromParameter } from '../src/utils';

/**
 * Generates output from our example proto files.
 *
 * We use snapshots of the protoc CodeGeneratorRequest's that are captured
 * by running ./update_proto_bins.sh, just because various machines/CI/etc
 * may not have the `protoc` compiler on their path.
 */
async function main() {
  await generate('./google/protobuf/wrappers.bin');
  await generate('./google/protobuf/wrappers.bin', './build/integration-snake');
  await generate('./simple.bin');
  await generate('./simple.bin', './build/integration-snake', 'snakeToCamel=false');
  await generate('./vector_tile.bin');
  await generate('./batching.bin');
  await generate('./batching.bin', './build/integration-context/', 'context=true');
  await generate('./point.bin');
}

async function generate(binFile: string, baseDir: string = './build/integration', parameter?: string) {
  const stdin = await promisify(readFile)(binFile);
  const request = CodeGeneratorRequest.decode(stdin);
  if (parameter) {
    request.parameter = parameter;
  }
  const map = createTypeMap(request, optionsFromParameter(parameter || ''));
  for (let file of request.protoFile) {
    const spec = generateFile(map, file, request.parameter);
    const filePath = `${baseDir}/${spec.path}`;
    const dirPath = parse(filePath).dir;
    await promisify(mkdir)(dirPath, { recursive: true }).catch(() => {});
    await promisify(writeFile)(filePath, spec.toString());
  }
}

main().then(() => {
  console.log('done');
});
