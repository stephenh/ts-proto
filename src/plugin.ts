import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  FieldDescriptorProto,
  FileDescriptorProto,
} from 'ts-proto-descriptors';
import { promisify } from 'util';
import { prefixDisableLinter, readToBuffer } from './utils';
import { generateFile, makeUtils } from './main';
import { createTypeMap } from './types';
import { Context, TransientExtensionMeta } from './context';
import { getTsPoetOpts, optionsFromParameter } from './options';
import { generateTypeRegistry } from './generate-type-registry';

/**
 * Resolve the protobuf field numbers for the `permissions` extension on
 * FieldOptions and the `transient` field inside the Permission message,
 * by looking them up by name in the file descriptors.
 */
function resolveTransientExtension(
  protoFiles: Array<FileDescriptorProto>
): TransientExtensionMeta | undefined {
  // Find the "permissions" extension on FieldOptions
  let ext: FieldDescriptorProto | undefined;
  for (const file of protoFiles) {
    for (const e of file.extension) {
      if (e.name === 'permissions' && e.extendee === '.google.protobuf.FieldOptions') {
        ext = e;
        break;
      }
    }
    if (ext) break;
  }
  if (!ext) return undefined;

  // Find the Permission message and its "transient" field
  let transientFieldNumber: number | undefined;
  for (const file of protoFiles) {
    for (const msg of file.messageType) {
      if (msg.name === 'Permission') {
        const transientField = msg.field.find((f) => f.name === 'transient');
        if (transientField) {
          transientFieldNumber = transientField.number;
        }
        break;
      }
    }
    if (transientFieldNumber !== undefined) break;
  }
  if (transientFieldNumber === undefined) return undefined;

  // Wire type 2 = length-delimited (embedded message)
  return {
    permissionsTag: (ext.number << 3) | 2,
    transientFieldNumber,
  };
}

// this would be the plugin called by the protoc compiler
async function main() {
  const stdin = await readToBuffer(process.stdin);
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);

  const options = optionsFromParameter(request.parameter);
  const typeMap = createTypeMap(request, options);
  const utils = makeUtils(options);
  const transientMeta = resolveTransientExtension(request.protoFile);
  const ctx: Context = { typeMap, options, utils, transientMeta };

  const files = await Promise.all(
    request.protoFile.map(async (file) => {
      const [path, code] = generateFile(ctx, file);
      const spec = await code.toStringWithImports({ ...getTsPoetOpts(options), path });
      return { name: path, content: prefixDisableLinter(spec) };
    })
  );

  if (options.outputTypeRegistry) {
    const utils = makeUtils(options);
    const ctx: Context = { options, typeMap, utils, transientMeta };

    const path = 'typeRegistry.ts';
    const code = generateTypeRegistry(ctx);

    const spec = await code.toStringWithImports({ ...getTsPoetOpts(options), path });
    files.push({ name: path, content: prefixDisableLinter(spec) });
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
    process.stderr.write('FAILED!');
    process.stderr.write(e.message);
    process.stderr.write(e.stack);
    process.exit(1);
  });
