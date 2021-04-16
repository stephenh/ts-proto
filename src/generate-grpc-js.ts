import { Code, code, def, imp, joinCode } from 'ts-poet';
import { FileDescriptorProto, ServiceDescriptorProto } from 'ts-proto-descriptors';
import { camelCase } from './case';
import { Context } from './context';
import SourceInfo, { Fields } from './sourceInfo';
import { messageToTypeName } from './types';
import { maybeAddComment } from './utils';

const CallOptions = imp('CallOptions@@grpc/grpc-js');
const ChannelCredentials = imp('ChannelCredentials@@grpc/grpc-js');
const ChannelOptions = imp('ChannelOptions@@grpc/grpc-js');
const Client = imp('Client@@grpc/grpc-js');
const ClientDuplexStream = imp('ClientDuplexStream@@grpc/grpc-js');
const ClientReadableStream = imp('ClientReadableStream@@grpc/grpc-js');
const ClientUnaryCall = imp('ClientUnaryCall@@grpc/grpc-js');
const ClientWritableStream = imp('ClientWritableStream@@grpc/grpc-js');
const handleBidiStreamingCall = imp('handleBidiStreamingCall@@grpc/grpc-js');
const handleClientStreamingCall = imp('handleClientStreamingCall@@grpc/grpc-js');
const handleServerStreamingCall = imp('handleServerStreamingCall@@grpc/grpc-js');
const handleUnaryCall = imp('handleUnaryCall@@grpc/grpc-js');
const UntypedServiceImplementation = imp('UntypedServiceImplementation@@grpc/grpc-js');
const makeGenericClientConstructor = imp('makeGenericClientConstructor@@grpc/grpc-js');
const Metadata = imp('Metadata@@grpc/grpc-js');
const ServiceError = imp('ServiceError@@grpc/grpc-js');

/**
 * Generates a service definition and server / client stubs for the
 * `@grpc/grpc-js` library.
 */
export function generateGrpcJsService(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
): Code {
  const chunks: Code[] = [];

  chunks.push(generateServiceDefinition(ctx, fileDesc, sourceInfo, serviceDesc));
  chunks.push(generateServerStub(ctx, sourceInfo, serviceDesc));
  chunks.push(generateClientStub(ctx, sourceInfo, serviceDesc));
  chunks.push(generateClientConstructor(fileDesc, serviceDesc));

  return joinCode(chunks, { on: '\n\n' });
}

function generateServiceDefinition(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
) {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);

  // Service definition
  chunks.push(code`
    export const ${def(`${serviceDesc.name}Service`)} = {
  `);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    const inputType = messageToTypeName(ctx, methodDesc.inputType);
    const outputType = messageToTypeName(ctx, methodDesc.outputType);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    chunks.push(code`
      ${camelCase(methodDesc.name)}: {
        path: '/${fileDesc.package}.${serviceDesc.name}/${methodDesc.name}',
        requestStream: ${methodDesc.clientStreaming},
        responseStream: ${methodDesc.serverStreaming},
        requestSerialize: (value: ${inputType}) =>
          Buffer.from(${inputType}.encode(value).finish()),
        requestDeserialize: (value: Buffer) => ${inputType}.decode(value),
        responseSerialize: (value: ${outputType}) =>
          Buffer.from(${outputType}.encode(value).finish()),
        responseDeserialize: (value: Buffer) => ${outputType}.decode(value),
      },
    `);
  }

  chunks.push(code`} as const;`);

  return joinCode(chunks, { on: '\n' });
}

function generateServerStub(ctx: Context, sourceInfo: SourceInfo, serviceDesc: ServiceDescriptorProto) {
  const chunks: Code[] = [];

  chunks.push(code`export interface ${def(`${serviceDesc.name}Server`)} extends ${UntypedServiceImplementation} {`);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    const inputType = messageToTypeName(ctx, methodDesc.inputType);
    const outputType = messageToTypeName(ctx, methodDesc.outputType);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    const callType = methodDesc.clientStreaming
      ? methodDesc.serverStreaming
        ? handleBidiStreamingCall
        : handleClientStreamingCall
      : methodDesc.serverStreaming
      ? handleServerStreamingCall
      : handleUnaryCall;

    chunks.push(code`
      ${camelCase(methodDesc.name)}: ${callType}<${inputType}, ${outputType}>;
    `);
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: '\n' });
}

function generateClientStub(ctx: Context, sourceInfo: SourceInfo, serviceDesc: ServiceDescriptorProto) {
  const chunks: Code[] = [];

  chunks.push(code`export interface ${def(`${serviceDesc.name}Client`)} extends ${Client} {`);

  for (const [index, methodDesc] of serviceDesc.method.entries()) {
    const inputType = messageToTypeName(ctx, methodDesc.inputType);
    const outputType = messageToTypeName(ctx, methodDesc.outputType);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    const responseCallback = code`(error: ${ServiceError} | null, response: ${outputType}) => void`;

    if (methodDesc.clientStreaming) {
      if (methodDesc.serverStreaming) {
        // bidi streaming
        chunks.push(code`
          ${camelCase(methodDesc.name)}(): ${ClientDuplexStream}<${inputType}, ${outputType}>;
          ${camelCase(methodDesc.name)}(
            options: Partial<${CallOptions}>,
          ): ${ClientDuplexStream}<${inputType}, ${outputType}>;
          ${camelCase(methodDesc.name)}(
            metadata: ${Metadata},
            options?: Partial<${CallOptions}>,
          ): ${ClientDuplexStream}<${inputType}, ${outputType}>;
        `);
      } else {
        // client streaming
        chunks.push(code`
          ${camelCase(methodDesc.name)}(
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
          ${camelCase(methodDesc.name)}(
            metadata: ${Metadata},
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
          ${camelCase(methodDesc.name)}(
            options: Partial<${CallOptions}>,
            callback: ${responseCallback},
          ): ${ClientWritableStream}<${inputType}>;
          ${camelCase(methodDesc.name)}(
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
          ${camelCase(methodDesc.name)}(
            request: ${inputType},
            options?: Partial<${CallOptions}>,
          ): ${ClientReadableStream}<${outputType}>;
          ${camelCase(methodDesc.name)}(
            request: ${inputType},
            metadata?: ${Metadata},
            options?: Partial<${CallOptions}>,
          ): ${ClientReadableStream}<${outputType}>;
        `);
      } else {
        // unary
        chunks.push(code`
          ${camelCase(methodDesc.name)}(
            request: ${inputType},
            callback: ${responseCallback},
          ): ${ClientUnaryCall};
          ${camelCase(methodDesc.name)}(
            request: ${inputType},
            metadata: ${Metadata},
            callback: ${responseCallback},
          ): ${ClientUnaryCall};
          ${camelCase(methodDesc.name)}(
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

  return joinCode(chunks, { on: '\n' });
}

function generateClientConstructor(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto) {
  return code`
    export const ${def(`${serviceDesc.name}Client`)} = ${makeGenericClientConstructor}(
      ${serviceDesc.name}Service,
      '${fileDesc.package}.${serviceDesc.name}'
    ) as unknown as {
      new (
        address: string,
        credentials: ${ChannelCredentials},
        options?: Partial<${ChannelOptions}>,
      ): ${serviceDesc.name}Client;
    }
  `;
}
