import { FileDescriptorProto, ServiceDescriptorProto } from 'ts-proto-descriptors/google/protobuf/descriptor';
import { Code, code, imp, joinCode } from 'ts-poet';
import {
  detectBatchMethod,
  isEmptyType,
  requestType,
  responseObservable,
  responsePromise,
  responseType,
} from './types';
import SourceInfo, { Fields } from './sourceInfo';
import { contextTypeVar } from './main';
import { maybeAddComment, singular } from './utils';
import { camelCase } from './case';
import { Context } from './context';

export function generateNestjsServiceController(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);
  const t = options.context ? `<${contextTypeVar}>` : '';
  chunks.push(code`
    export interface ${serviceDesc.name}Controller${t} {
  `);

  serviceDesc.method.forEach((methodDesc, index) => {
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, serviceDesc.options?.deprecated);

    const params: Code[] = [];
    if (options.context) {
      params.push(code`ctx: Context`);
    }
    params.push(code`request: ${requestType(ctx, methodDesc)}`);
    // Use metadata as last argument for interface only configuration
    if (options.addGrpcMetadata) {
      const q = options.addNestjsRestParameter ? '' : '?';
      params.push(code`metadata${q}: ${imp('Metadata@grpc')}`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    // Return observable for interface only configuration, passing returnObservable=true and methodDesc.serverStreaming=true
    let returns: Code;
    if (isEmptyType(methodDesc.outputType)) {
      returns = code`void`;
    } else if (options.returnObservable || methodDesc.serverStreaming) {
      returns = code`${responseObservable(ctx, methodDesc)}`;
    } else {
      // generate nestjs union type
      returns = code`
        ${responsePromise(ctx, methodDesc)}
        | ${responseObservable(ctx, methodDesc)}
        | ${responseType(ctx, methodDesc)}
      `;
    }

    const name = options.lowerCaseServiceMethods ? camelCase(methodDesc.name) : methodDesc.name;
    chunks.push(code`
      ${name}(${joinCode(params, { on: ', ' })}): ${returns};
    `);

    if (options.context) {
      const batchMethod = detectBatchMethod(ctx, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        const maybeCtx = options.context ? 'ctx: Context,' : '';
        chunks.push(code`
          ${name}(
            ${maybeCtx}
            ${singular(batchMethod.inputFieldName)}: ${batchMethod.inputType},
          ): Promise<${batchMethod.outputType}>;
        `);
      }
    }
  });

  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n\n' });
}

export function generateNestjsServiceClient(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks);
  const t = options.context ? `<${contextTypeVar}>` : ``;
  chunks.push(code`
    export interface ${serviceDesc.name}Client${t} {
  `);

  serviceDesc.method.forEach((methodDesc, index) => {
    if (options.lowerCaseServiceMethods) {
      methodDesc.name = camelCase(methodDesc.name);
    }

    const params: Code[] = [];
    if (options.context) {
      params.push(code`ctx: Context`);
    }
    params.push(code`request: ${requestType(ctx, methodDesc)}`);
    // Use metadata as last argument for interface only configuration
    if (options.addGrpcMetadata) {
      const q = options.addNestjsRestParameter ? '' : '?';
      params.push(code`metadata${q}: ${imp('Metadata@grpc')}`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    // Return observable since nestjs client always returns an Observable
    const returns = responseObservable(ctx, methodDesc);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);
    chunks.push(code`
      ${methodDesc.name}(
        ${joinCode(params, { on: ',' })}
      ): ${returns};
    `);

    if (options.context) {
      const batchMethod = detectBatchMethod(ctx, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        const maybeContext = options.context ? `ctx: Context,` : '';
        chunks.push(code`
          ${name}(
            ${maybeContext}
            ${singular(batchMethod.inputFieldName)}
          ): Promise<${batchMethod.inputType}>;
        `);
      }
    }
  });

  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n\n' });
}

export function generateNestjsGrpcServiceMethodsDecorator(ctx: Context, serviceDesc: ServiceDescriptorProto): Code {
  const { options } = ctx;
  const GrpcMethod = imp('GrpcMethod@@nestjs/microservices');
  const GrpcStreamMethod = imp('GrpcStreamMethod@@nestjs/microservices');

  const grpcMethods = serviceDesc.method
    .filter((m) => !m.clientStreaming)
    .map((m) => (options.lowerCaseServiceMethods ? camelCase(m.name) : m.name))
    .map((n) => `"${n}"`);

  const grpcStreamMethods = serviceDesc.method
    .filter((m) => m.clientStreaming)
    .map((m) => (options.lowerCaseServiceMethods ? camelCase(m.name) : m.name))
    .map((n) => `"${n}"`);

  return code`
    export function ${serviceDesc.name}ControllerMethods() {
      return function(constructor: Function) {
        const grpcMethods: string[] = [${grpcMethods.join(', ')}];
        for (const method of grpcMethods) {
          const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
          ${GrpcMethod}('${serviceDesc.name}', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods: string[] = [${grpcStreamMethods.join(', ')}];
        for (const method of grpcStreamMethods) {
          const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
          ${GrpcStreamMethod}('${serviceDesc.name}', method)(constructor.prototype[method], method, descriptor);
        }
      };
    }
  `;
}
