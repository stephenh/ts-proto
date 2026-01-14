import { Code, code, def, imp, joinCode } from "ts-poet";
import { FileDescriptorProto, ServiceDescriptorProto } from "ts-proto-descriptors";
import { Context } from "./context";
import SourceInfo, { Fields } from "./sourceInfo";
import { messageToTypeName } from "./types";
import { assertInstanceOf, FormattedMethodDescriptor, maybeAddComment, maybePrefixPackage } from "./utils";
import { generateDecoder, generateEncoder } from "./encode";

const CallOptions = imp("t:CallOptions@@grpc/grpc-js");
const ChannelCredentials = imp("t:ChannelCredentials@@grpc/grpc-js");
const ClientOptions = imp("t:ClientOptions@@grpc/grpc-js");
const Client = imp("Client@@grpc/grpc-js");
const ClientDuplexStream = imp("t:ClientDuplexStream@@grpc/grpc-js");
const ClientReadableStream = imp("t:ClientReadableStream@@grpc/grpc-js");
const ClientUnaryCall = imp("t:ClientUnaryCall@@grpc/grpc-js");
const ClientWritableStream = imp("t:ClientWritableStream@@grpc/grpc-js");
const handleBidiStreamingCall = imp("t:handleBidiStreamingCall@@grpc/grpc-js");
const handleClientStreamingCall = imp("t:handleClientStreamingCall@@grpc/grpc-js");
const handleServerStreamingCall = imp("t:handleServerStreamingCall@@grpc/grpc-js");
const handleUnaryCall = imp("t:handleUnaryCall@@grpc/grpc-js");
const UntypedServiceImplementation = imp("t:UntypedServiceImplementation@@grpc/grpc-js");
const makeGenericClientConstructor = imp("makeGenericClientConstructor@@grpc/grpc-js");
const Metadata = imp("t:Metadata@@grpc/grpc-js");
const ServiceError = imp("t:ServiceError@@grpc/grpc-js");

/**
 * Generates a service definition and server / client stubs for the
 * `@grpc/grpc-js` library.
 */
export function generateGrpcJsService(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  chunks.push(generateServiceDefinition(ctx, fileDesc, sourceInfo, serviceDesc));
  chunks.push(generateServerStub(ctx, sourceInfo, serviceDesc));
  if (options.outputClientImpl) {
    chunks.push(generateClientStub(ctx, sourceInfo, serviceDesc));
    chunks.push(generateClientConstructor(fileDesc, serviceDesc));
  }

  return joinCode(chunks, { on: "\n\n" });
}

function generateServiceDefinition(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
) {
  const chunks: Code[] = [];

  maybeAddComment(ctx.options, sourceInfo, chunks, serviceDesc.options?.deprecated);

  // Service definition type
  const name = def(`${serviceDesc.name}Service`);
  chunks.push(code`
    export type ${name} = typeof ${name};
  `);

  // Service definition
  chunks.push(code`
    export const ${name} = {
  `);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);

    const inputType = messageToTypeName(ctx, methodDesc.inputType);
    const outputType = messageToTypeName(ctx, methodDesc.outputType);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(ctx.options, info, chunks, methodDesc.options?.deprecated);

    const inputEncoder = generateEncoder(ctx, methodDesc.inputType);
    const outputEncoder = generateEncoder(ctx, methodDesc.outputType);

    const inputDecoder = generateDecoder(ctx, methodDesc.inputType);
    const outputDecoder = generateDecoder(ctx, methodDesc.outputType);

    chunks.push(code`
      ${methodDesc.formattedName}: {
        path: '/${maybePrefixPackage(fileDesc, serviceDesc.name)}/${methodDesc.name}',
        requestStream: ${methodDesc.clientStreaming},
        responseStream: ${methodDesc.serverStreaming},
        requestSerialize: (value: ${inputType}): Buffer =>
          Buffer.from(${inputEncoder}),
        requestDeserialize: (value: Buffer): ${inputType} => ${inputDecoder},
        responseSerialize: (value: ${outputType}): Buffer =>
          Buffer.from(${outputEncoder}),
        responseDeserialize: (value: Buffer): ${outputType} => ${outputDecoder},
      },
    `);
  }

  chunks.push(code`} as const;`);

  return joinCode(chunks, { on: "\n" });
}

function generateServerStub(ctx: Context, sourceInfo: SourceInfo, serviceDesc: ServiceDescriptorProto) {
  const chunks: Code[] = [];

  chunks.push(code`export interface ${def(`${serviceDesc.name}Server`)} extends ${UntypedServiceImplementation} {`);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);

    const inputType = messageToTypeName(ctx, methodDesc.inputType);
    const outputType = messageToTypeName(ctx, methodDesc.outputType);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(ctx.options, info, chunks, methodDesc.options?.deprecated);

    const callType = methodDesc.clientStreaming
      ? methodDesc.serverStreaming
        ? handleBidiStreamingCall
        : handleClientStreamingCall
      : methodDesc.serverStreaming
      ? handleServerStreamingCall
      : handleUnaryCall;

    chunks.push(code`
      ${methodDesc.formattedName}: ${callType}<${inputType}, ${outputType}>;
    `);
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: "\n" });
}

function generateClientStub(ctx: Context, sourceInfo: SourceInfo, serviceDesc: ServiceDescriptorProto) {
  const chunks: Code[] = [];

  chunks.push(code`export interface ${def(`${serviceDesc.name}Client`)} extends ${Client} {`);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);

    const inputType = messageToTypeName(ctx, methodDesc.inputType);
    const outputType = messageToTypeName(ctx, methodDesc.outputType);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(ctx.options, info, chunks, methodDesc.options?.deprecated);

    const responseCallback = code`(error: ${ServiceError} | null, response: ${outputType}) => void`;

    if (methodDesc.clientStreaming) {
      if (methodDesc.serverStreaming) {
        // bidi streaming
        chunks.push(code`
          ${methodDesc.formattedName}(): ${ClientDuplexStream}<${inputType}, ${outputType}>;
          ${methodDesc.formattedName}(
            options: Partial<${CallOptions}>,
          ): ${ClientDuplexStream}<${inputType}, ${outputType}>;
          ${methodDesc.formattedName}(
            metadata: ${Metadata},
            options?: Partial<${CallOptions}>,
          ): ${ClientDuplexStream}<${inputType}, ${outputType}>;
        `);
      } else {
        // client streaming
        chunks.push(code`
          ${methodDesc.formattedName}(
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
          ${methodDesc.formattedName}(
            metadata: ${Metadata},
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
          ${methodDesc.formattedName}(
            options: Partial<${CallOptions}>,
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
          ${methodDesc.formattedName}(
            metadata: ${Metadata},
            options: Partial<${CallOptions}>,
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
        `);
      }
    } else {
      if (methodDesc.serverStreaming) {
        // server streaming
        chunks.push(code`
          ${methodDesc.formattedName}(
            request: ${inputType},
            options?: Partial<${CallOptions}>,
          ): ${ClientReadableStream}<${outputType}>;
          ${methodDesc.formattedName}(
            request: ${inputType},
            metadata?: ${Metadata},
            options?: Partial<${CallOptions}>,
          ): ${ClientReadableStream}<${outputType}>;
        `);
      } else {
        // unary
        chunks.push(code`
          ${methodDesc.formattedName}(
            request: ${inputType},
            callback: ${responseCallback},
          ): ${ClientUnaryCall};
          ${methodDesc.formattedName}(
            request: ${inputType},
            metadata: ${Metadata},
            callback: ${responseCallback},
          ): ${ClientUnaryCall};
          ${methodDesc.formattedName}(
            request: ${inputType},
            metadata: ${Metadata},
            options: Partial<${CallOptions}>,
            callback: ${responseCallback},
          ): ${ClientUnaryCall};
        `);
      }
    }
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: "\n" });
}

function generateClientConstructor(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto) {
  return code`
    export const ${def(`${serviceDesc.name}Client`)} = ${makeGenericClientConstructor}(
      ${serviceDesc.name}Service,
      '${maybePrefixPackage(fileDesc, serviceDesc.name)}'
    ) as unknown as {
      new (
        address: string,
        credentials: ${ChannelCredentials},
        options?: Partial<${ClientOptions}>,
      ): ${serviceDesc.name}Client;
      service: typeof ${serviceDesc.name}Service;
      serviceName: string;
    }
  `;
}
