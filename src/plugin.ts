import { promisify } from 'util';
import { readToBuffer } from './utils';
import { google } from '../build/pbjs';
import { generateFile } from './main';
import { createTypeMap } from './types';
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import CodeGeneratorResponse = google.protobuf.compiler.CodeGeneratorResponse;

// this would be the plugin called by the protoc compiler
async function main() {
  const stdin = await readToBuffer(process.stdin);
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);
  const typeMap = createTypeMap(request);
  const files = request.protoFile.map(file => {
    const spec = generateFile(typeMap, file);
    return new CodeGeneratorResponse.File({
      name: spec.path,
      content: spec.toString(),
    });
  });
  const response = new CodeGeneratorResponse({ file: files });
  const buffer = CodeGeneratorResponse.encode(response).finish();
  const write = promisify(process.stdout.write as (buffer: Buffer) => boolean).bind(process.stdout);
  await write(Buffer.from(buffer));
}

main().then(() => {
  process.stderr.write('DONE');
  process.exit(0);
}).catch(e => {
  process.stderr.write('FAILED!');
  process.stderr.write(e.message);
  process.stderr.write(e.stack);
  process.exit(1);
});
