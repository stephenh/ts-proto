import { google } from "../build/pbjs";
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import IFileDescriptorProto = google.protobuf.IFileDescriptorProto;
import { ClassSpec, FileSpec, InterfaceSpec, PropertySpec, TypeNames } from "ts-poet";

function readStdin(): Promise<Buffer> {
  return new Promise(resolve => {
    const ret: Array<Buffer | string> = [];
    let len = 0;
    const stdin = process.stdin;
    stdin.on('readable', () => {
      let chunk;
      while ((chunk = stdin.read())) {
        ret.push(chunk);
        len += chunk.length;
      }
    });
    stdin.on('end', () => {
      resolve(Buffer.concat(ret as any, len));
    });
  });
}

async function main() {
  const stdin = await readStdin();
  const json = JSON.parse(stdin.toString());
  const request = CodeGeneratorRequest.fromObject(json);
  console.log(request.fileToGenerate);
  for (let file of request.protoFile) {
    generateFile(file);
  }
  console.log(request.protoFile.length);
}

function generateFile(fileDesc: IFileDescriptorProto) {
  let file = FileSpec.create(fileDesc.name!);
  if (fileDesc.messageType) {
    for (const messageDesc of fileDesc.messageType) {
      let message = InterfaceSpec.create(messageDesc.name!);
      for (const fieldDesc of messageDesc.field) {
        message = message.addProperty(PropertySpec.create(fieldDesc.name!, TypeNames.anyType(fieldDesc.type.toString())));
      }
      file = file.addInterface(message);
    }
  }
  console.log(file.toString());
}

main().then(() => {
  console.log('done');
});

