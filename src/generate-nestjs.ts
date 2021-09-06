import { FileDescriptorProto, ServiceDescriptorProto } from 'ts-proto-descriptors';
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
import { assertInstanceOf, FormattedMethodDescriptor, maybeAddComment, singular } from './utils';
import { camelCase } from './case';
import { Context } from './context';
import { ServiceOption } from './options';

export function generateNestjsServiceController(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  const Metadata = options.outputServices === ServiceOption.GRPC ? imp('Metadata@@grpc/grpc-js') : imp('Metadata@grpc');

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);
  const t = options.context ? `<${contextTypeVar}>` : '';
  chunks.push(code`
    export interface ${serviceDesc.name}Controller${t} {
  `);

  serviceDesc.method.forEach((methodDesc, index) => {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
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
      params.push(code`metadata${q}: ${Metadata}`);
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

    chunks.push(code`
      ${methodDesc.formattedName}(${joinCode(params, { on: ', ' })}): ${returns};
    `);

    if (options.context) {
      const batchMethod = detectBatchMethod(ctx, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        const maybeCtx = options.context ? 'ctx: Context,' : '';
        chunks.push(code`
          ${batchMethod.singleMethodName}(
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

  const Metadata = options.outputServices === ServiceOption.GRPC ? imp('Metadata@@grpc/grpc-js') : imp('Metadata@grpc');

  maybeAddComment(sourceInfo, chunks);
  const t = options.context ? `<${contextTypeVar}>` : ``;
  chunks.push(code`
    export interface ${serviceDesc.name}Client${t} {
  `);

  serviceDesc.method.forEach((methodDesc, index) => {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
    const params: Code[] = [];
    if (options.context) {
      params.push(code`ctx: Context`);
    }
    params.push(code`request: ${requestType(ctx, methodDesc)}`);
    // Use metadata as last argument for interface only configuration
    if (options.addGrpcMetadata) {
      const q = options.addNestjsRestParameter ? '' : '?';
      params.push(code`metadata${q}: ${Metadata}`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    // Return observable since nestjs client always returns an Observable
    const returns = responseObservable(ctx, methodDesc);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);
    chunks.push(code`
      ${methodDesc.formattedName}(
        ${joinCode(params, { on: ',' })}
      ): ${returns};
    `);

    if (options.context) {
      const batchMethod = detectBatchMethod(ctx, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        const maybeContext = options.context ? `ctx: Context,` : '';
        chunks.push(code`
          ${batchMethod.singleMethodName}(
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
    .map((m) => {
      assertInstanceOf(m, FormattedMethodDescriptor);
      return m.formattedName;
    })
    .map((n) => `"${n}"`);

  const grpcStreamMethods = serviceDesc.method
    .filter((m) => m.clientStreaming)
    .map((m) => {
      assertInstanceOf(m, FormattedMethodDescriptor);
      return m.formattedName;
    })
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
