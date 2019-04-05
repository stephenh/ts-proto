import { mkdir, readFile, writeFile } from 'fs';
import { parse } from 'path';
import { google } from '../build/pbjs';
import { generateFile } from '../src/main';
import { promisify } from 'util';
import { createTypeMap } from '../src/types';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;

/**
 * Generates output from our example proto files.
 *
 * We use snapshots of the protoc CodeGeneratorRequest's that are captured
 * by running ./update_proto_bins.sh, just because various machines/CI/etc
 * may not have the `protoc` compiler on their path.
 */
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
    const filePath = `./build/integration/${spec.path}`;
    const dirPath = parse(filePath).dir;
    await promisify(mkdir)(dirPath, { recursive: true });
    await promisify(writeFile)(filePath, spec.toString());
  }
}

main().then(() => {
  console.log('done');
});
