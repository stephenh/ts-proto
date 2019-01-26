import { readToBuffer } from "./utils";
import { google } from "../build/pbjs";
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import { generateFile } from "./main";

// this would be the plugin called by the protoc compiler
async function main() {
  const stdin = await readToBuffer(process.stdin);
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);
  for (let file of request.protoFile) {
    generateFile(file);
  }
  // TODO write to stdout
}


