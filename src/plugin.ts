import { promisify } from 'util';
import { optionsFromParameter, prefixDisableLinter, readToBuffer } from './utils';
import { google } from '../build/pbjs';
import { generateFile } from './main';
import { createTypeMap } from './types';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import CodeGeneratorResponse = google.protobuf.compiler.CodeGeneratorResponse;
import Feature = google.protobuf.compiler.CodeGeneratorResponse.Feature;

// this would be the plugin called by the protoc compiler
async function main() {
  const stdin = await readToBuffer(process.stdin);
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);
  const typeMap = createTypeMap(request, optionsFromParameter(request.parameter));
  const files = await Promise.all(
    request.protoFile.map(async (file) => {
      const [path, code] = generateFile(typeMap, file, request.parameter);
      const spec = await code.toStringWithImports({ path });
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
