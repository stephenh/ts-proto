import { mkdir, readFile, writeFile } from 'fs';
import { parse } from 'path';
import { promisify } from 'util';
import { google } from '../build/pbjs';
import { generateFile, makeUtils } from '../src/main';
import { createTypeMap } from '../src/types';
import { prefixDisableLinter } from '../src/utils';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { optionsFromParameter } from '../src/options';
import { Context } from '../src/context';

/**
 * Generates output for our integration tests from their example proto files.
 *
 * We use snapshots of the protoc CodeGeneratorRequest's that are captured
 * by running ./update_proto_bins.sh, just because various machines/CI/etc
 * may not have the `protoc` compiler on their path.
 */
async function main() {
  const dir = process.argv[2];
  const file = process.argv[3];
  const param = process.argv[4];
  await generate(file, dir, param);
}

async function generate(binFile: string, baseDir: string, parameter: string) {
  const stdin = await promisify(readFile)(binFile);
  const request = CodeGeneratorRequest.decode(stdin);
  request.parameter = parameter;

  const options = optionsFromParameter(parameter || '');
  const typeMap = createTypeMap(request, options);
  const utils = makeUtils(options);
  const ctx: Context = { options, typeMap, utils };

  for (let file of request.protoFile) {
    const [path, code] = generateFile(ctx, file);
    const filePath = `${baseDir}/${path}`;
    const dirPath = parse(filePath).dir;
    await promisify(mkdir)(dirPath, { recursive: true }).catch(() => {});
    await promisify(writeFile)(filePath, prefixDisableLinter(await code.toStringWithImports({ path })));
  }
}

main().then(() => {
  console.log('done');
});
