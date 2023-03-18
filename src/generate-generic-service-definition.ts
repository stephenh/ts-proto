import { Code, code, def, joinCode } from "ts-poet";
import {
  FileDescriptorProto,
  MethodDescriptorProto,
  MethodOptions,
  MethodOptions_IdempotencyLevel,
  ServiceDescriptorProto,
} from "ts-proto-descriptors";
import { camelCase } from "./case";
import { Context } from "./context";
import SourceInfo, { Fields } from "./sourceInfo";
import { messageToTypeName } from "./types";
import { maybeAddComment, maybePrefixPackage } from "./utils";

/**
 * Generates a framework-agnostic service descriptor.
 */
export function generateGenericServiceDefinition(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
) {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);

  // Service definition type
  const name = def(`${serviceDesc.name}Definition`);
  chunks.push(code`
    export type ${name} = typeof ${name};
  `);

  // Service definition
  chunks.push(code`
    export const ${name} = {
  `);

  serviceDesc.options?.uninterpretedOption;
  chunks.push(code`
      name: '${serviceDesc.name}',
      fullName: '${maybePrefixPackage(fileDesc, serviceDesc.name)}',
      methods: {
  `);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    chunks.push(code`
      ${camelCase(methodDesc.name)}: ${generateMethodDefinition(ctx, methodDesc)},
    `);
  }

  chunks.push(code`
      },
    } as const;
  `);

  return joinCode(chunks, { on: "\n" });
}

function generateMethodDefinition(ctx: Context, methodDesc: MethodDescriptorProto) {
  const inputType = messageToTypeName(ctx, methodDesc.inputType, { keepValueType: true });
  const outputType = messageToTypeName(ctx, methodDesc.outputType, { keepValueType: true });

  return code`
    {
      name: '${methodDesc.name}',
      requestType: ${inputType},
      requestStream: ${methodDesc.clientStreaming},
      responseType: ${outputType},
      responseStream: ${methodDesc.serverStreaming},
      options: ${generateMethodOptions(ctx, methodDesc.options)}
    }
  `;
}

function generateMethodOptions(ctx: Context, options: MethodOptions | undefined) {
  const chunks: Code[] = [];

  chunks.push(code`{`);

  if (options != null) {
    if (options.idempotencyLevel === MethodOptions_IdempotencyLevel.IDEMPOTENT) {
      chunks.push(code`idempotencyLevel: 'IDEMPOTENT',`);
    } else if (options.idempotencyLevel === MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS) {
      chunks.push(code`idempotencyLevel: 'NO_SIDE_EFFECTS',`);
    }

    if ("_unknownFields" in options) {
      const msgUnknownFields: any = (options as any)["_unknownFields"];
      const unknownFieldsChunks: Code[] = [];

      unknownFieldsChunks.push(code`{`);

      for (const key of Object.keys(msgUnknownFields)) {
        const values = msgUnknownFields[key] as Uint8Array[];
        const valuesChunks: Code[] = [];

        for (const value of values) {
          valuesChunks.push(
            code`${ctx.options.env == "node" ? "Buffer.from" : "new Uint8Array"}([${value.join(", ")}])`
          );
        }

        unknownFieldsChunks.push(code`${key}: [\n${joinCode(valuesChunks, { on: "," }).toCodeString([])}\n],`);
      }

      unknownFieldsChunks.push(code`}`);
      chunks.push(code`_unknownFields: ${joinCode(unknownFieldsChunks, { on: "\n" }).toCodeString([])}`);
    }
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: "\n" });
}
