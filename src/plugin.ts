import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  FileDescriptorProto,
} from "ts-proto-descriptors";
import { promisify } from "util";
import { generateIndexFiles, protoFilesToGenerate, readToBuffer } from "./utils";
import { generateFile, makeUtils } from "./main";
import { createTypeMap } from "./types";
import { BaseContext, createFileContext } from "./context";
import { getTsPoetOpts, optionsFromParameter } from "./options";
import { generateTypeRegistry } from "./generate-type-registry";

// this would be the plugin called by the protoc compiler
async function main() {
  const stdin = await readToBuffer(process.stdin);
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);

  let protocVersion = "unknown";
  if (request.compilerVersion) {
    const { major, minor, patch } = request.compilerVersion;
    protocVersion = `v${major}.${minor}.${patch}`;
  }

  const tsProtoVersion = await import("../package.json").then((pkg) => `v${pkg.version}`);

  const options = optionsFromParameter(request.parameter);
  const typeMap = createTypeMap(request, options);
  const utils = makeUtils(options);
  const ctx: BaseContext = { typeMap, options, utils };

  let filesToGenerate: FileDescriptorProto[];

  if (options.emitImportedFiles) {
    const fileSet = new Set();
    function addFilesUnlessAliased(filenames: string[]) {
      filenames
        .filter((name) => !options.M[name])
        .forEach((name) => {
          if (fileSet.has(name)) return;
          fileSet.add(name);
          const file = request.protoFile.find((file) => file.name === name);
          if (file && file.dependency.length > 0) {
            addFilesUnlessAliased(file.dependency);
          }
        });
    }
    addFilesUnlessAliased(request.fileToGenerate);
    filesToGenerate = request.protoFile.filter((file) => fileSet.has(file.name));
  } else {
    filesToGenerate = protoFilesToGenerate(request).filter((file) => !options.M[file.name]);
  }
  console.warn("TCL ~ filesToGenerate.map ~ tsProtoVersion:", tsProtoVersion);
  console.warn("TCL ~ filesToGenerate.map ~ protocVersion:", protocVersion);

  const files = await Promise.all(
    filesToGenerate.map(async (file) => {
      const [path, code] = generateFile({ ...ctx, currentFile: createFileContext(file) }, file);
      const content = code.toString({ ...getTsPoetOpts(options, tsProtoVersion, protocVersion, file.name), path });
      return { name: path, content };
    }),
  );

  if (options.outputTypeRegistry) {
    const utils = makeUtils(options);
    const ctx: BaseContext = { options, typeMap, utils };

    const path = "typeRegistry.ts";
    const code = generateTypeRegistry(ctx);

    const content = code.toString({ ...getTsPoetOpts(options, tsProtoVersion, protocVersion), path });
    files.push({ name: path, content });
  }

  if (options.outputIndex) {
    for (const [path, code] of generateIndexFiles(filesToGenerate, options)) {
      const content = code.toString({ ...getTsPoetOpts(options, tsProtoVersion, protocVersion), path });
      files.push({ name: path, content });
    }
  }

  const response = CodeGeneratorResponse.fromPartial({
    file: files,
    supportedFeatures: CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL,
  });
  const buffer = CodeGeneratorResponse.encode(response).finish();
  const write = promisify(process.stdout.write as (buffer: Buffer) => boolean).bind(process.stdout);
  await write(Buffer.from(buffer));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    process.stderr.write("FAILED!");
    process.stderr.write(e.message);
    process.stderr.write(e.stack);
    process.exit(1);
  });
