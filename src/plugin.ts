import { promisify } from 'util';
import { prefixDisableLinter, readToBuffer } from './utils';
import { google } from '../build/pbjs';
import { generateFile, makeUtils } from './main';
import { createTypeMap } from './types';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import CodeGeneratorResponse = google.protobuf.compiler.CodeGeneratorResponse;
import Feature = google.protobuf.compiler.CodeGeneratorResponse.Feature;
import { Context } from './context';
import { getTsPoetOpts, optionsFromParameter } from './options';

// this would be the plugin called by the protoc compiler
async function main() {
  const stdin = await readToBuffer(process.stdin);
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);

  const options = optionsFromParameter(request.parameter);
  const typeMap = createTypeMap(request, options);
  const utils = makeUtils(options);
  const ctx: Context = { typeMap, options, utils };

  const files = await Promise.all(
    request.protoFile.map(async (file) => {
      const [path, code] = generateFile(ctx, file);
      const spec = await code.toStringWithImports({ ...getTsPoetOpts(options), path });
      return new CodeGeneratorResponse.File({
        name: path,
        content: prefixDisableLinter(spec),
      });
    })
  );
  const response = new CodeGeneratorResponse({ file: files, supportedFeatures: Feature.FEATURE_PROTO3_OPTIONAL });
  const buffer = CodeGeneratorResponse.encode(response).finish();
  const write = promisify(process.stdout.write as (buffer: Buffer) => boolean).bind(process.stdout);
  await write(Buffer.from(buffer));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    process.stderr.write('FAILED!');
    process.stderr.write(e.message);
    process.stderr.write(e.stack);
    process.exit(1);
  });
