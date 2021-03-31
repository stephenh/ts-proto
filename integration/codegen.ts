import { CodeGeneratorRequest } from 'ts-proto-descriptors/google/protobuf/compiler/plugin';
import { mkdir, readFile, writeFile } from 'fs';
import { parse } from 'path';
import { promisify } from 'util';
import { generateFile, makeUtils } from '../src/main';
import { createTypeMap } from '../src/types';
import { prefixDisableLinter } from '../src/utils';
import { getTsPoetOpts, optionsFromParameter } from '../src/options';
import { Context } from '../src/context';
import { generateTypeRegistry } from '../src/generate-type-registry';

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

  for (let file of request.protoFile) {
    // Make a different utils per file to track per-file usage
    const utils = makeUtils(options);
    const ctx: Context = { options, typeMap, utils };
    const [path, code] = generateFile(ctx, file);
    const filePath = `${baseDir}/${path}`;
    const dirPath = parse(filePath).dir;
    await promisify(mkdir)(dirPath, { recursive: true }).catch(() => {});
    await promisify(writeFile)(
      filePath,
      prefixDisableLinter(await code.toStringWithImports({ ...getTsPoetOpts(options), path }))
    );
  }

  if (options.outputTypeRegistry) {
    const utils = makeUtils(options);
    const ctx: Context = { options, typeMap, utils };

    const path = 'typeRegistry.ts';
    const code = generateTypeRegistry(ctx);

    const filePath = `${baseDir}/${path}`;

    await promisify(writeFile)(
      filePath,
      prefixDisableLinter(await code.toStringWithImports({ ...getTsPoetOpts(options), path }))
    );
  }
}

main().then(() => {
  console.log('done');
});
