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
  for (let file of request.protoFile) {
    generateFile(typeMap, file);
  }
  const response = new CodeGeneratorResponse();
  const buffer = CodeGeneratorResponse.encode(response).finish();
  process.stdout.write(Buffer.from(buffer));
}
