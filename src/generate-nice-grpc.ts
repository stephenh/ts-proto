import { Code, code, def, imp, joinCode } from "ts-poet";
import { FileDescriptorProto, ServiceDescriptorProto } from "ts-proto-descriptors";
import { uncapitalize } from "./case";
import { Context } from "./context";
import SourceInfo, { Fields } from "./sourceInfo";
import { messageToTypeName } from "./types";
import { assertInstanceOf, FormattedMethodDescriptor, maybeAddComment } from "./utils";

const CallOptions = imp("t:CallOptions@nice-grpc-common");
const CallContext = imp("t:CallContext@nice-grpc-common");

/**
 * Generates server / client stubs for `nice-grpc` library.
 */
export function generateNiceGrpcService(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
): Code {
  const chunks: Code[] = [];

  chunks.push(generateServerStub(ctx, sourceInfo, serviceDesc));
  chunks.push(generateClientStub(ctx, sourceInfo, serviceDesc));

  return joinCode(chunks, { on: "\n\n" });
}

function generateServerStub(ctx: Context, sourceInfo: SourceInfo, serviceDesc: ServiceDescriptorProto) {
  const chunks: Code[] = [];

  const maybeSuffix = serviceDesc.name.endsWith("Service") ? "" : "Service";
  chunks.push(code`export interface ${def(`${serviceDesc.name}${maybeSuffix}Implementation`)}<CallContextExt = {}> {`);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);

    const inputType = messageToTypeName(ctx, methodDesc.inputType, { keepValueType: true });
    let outputType = messageToTypeName(ctx, methodDesc.outputType, { keepValueType: true });
    if (ctx.options.outputPartialMethods) {
      outputType = code`${ctx.utils.DeepPartial}<${outputType}>`;
    }

    const ServerStreamingMethodResult = ctx.utils.NiceGrpcServerStreamingMethodResult;

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    if (methodDesc.clientStreaming) {
      if (methodDesc.serverStreaming) {
        // bidi streaming
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: AsyncIterable<${inputType}>,
            context: ${CallContext} & CallContextExt,
          ): ${ServerStreamingMethodResult}<${outputType}>;
        `);
      } else {
        // client streaming
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: AsyncIterable<${inputType}>,
            context: ${CallContext} & CallContextExt,
          ): Promise<${outputType}>;
        `);
      }
    } else {
      if (methodDesc.serverStreaming) {
        // server streaming
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: ${inputType},
            context: ${CallContext} & CallContextExt,
          ): ${ServerStreamingMethodResult}<${outputType}>;
        `);
      } else {
        // unary
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: ${inputType},
            context: ${CallContext} & CallContextExt,
          ): Promise<${outputType}>;
        `);
      }
    }
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: "\n" });
}

function generateClientStub(ctx: Context, sourceInfo: SourceInfo, serviceDesc: ServiceDescriptorProto) {
  const chunks: Code[] = [];

  chunks.push(code`export interface ${def(`${serviceDesc.name}Client`)}<CallOptionsExt = {}> {`);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);

    let inputType = messageToTypeName(ctx, methodDesc.inputType, { keepValueType: true });

    if (ctx.options.outputPartialMethods) {
      inputType = code`${ctx.utils.DeepPartial}<${inputType}>`;
    }

    const outputType = messageToTypeName(ctx, methodDesc.outputType, { keepValueType: true });

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    if (methodDesc.clientStreaming) {
      if (methodDesc.serverStreaming) {
        // bidi streaming
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: AsyncIterable<${inputType}>,
            options?: ${CallOptions} & CallOptionsExt,
          ): AsyncIterable<${outputType}>;
        `);
      } else {
        // client streaming
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: AsyncIterable<${inputType}>,
            options?: ${CallOptions} & CallOptionsExt,
          ): Promise<${outputType}>;
        `);
      }
    } else {
      if (methodDesc.serverStreaming) {
        // server streaming
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: ${inputType},
            options?: ${CallOptions} & CallOptionsExt,
          ): AsyncIterable<${outputType}>;
        `);
      } else {
        // unary
        chunks.push(code`
          ${uncapitalize(methodDesc.name)}(
            request: ${inputType},
            options?: ${CallOptions} & CallOptionsExt,
          ): Promise<${outputType}>;
        `);
      }
    }
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: "\n" });
}
