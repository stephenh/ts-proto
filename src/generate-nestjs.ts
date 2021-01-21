import {
  detectBatchMethod,
  isEmptyType,
  requestType,
  responseObservable,
  responsePromise,
  responseType,
  TypeMap,
} from './types';
import SourceInfo, { Fields } from './sourceInfo';
import { contextTypeVar, Options } from './main';
import { google } from '../build/pbjs';
import { arrayOf, Code, code, imp, joinCode } from 'ts-poet';
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import { maybeAddComment, singular } from './utils';
import { camelCase } from './case';

export function generateNestjsServiceController(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): Code {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, (text) => chunks.push(code`${text}`));
  const t = options.useContext ? `<${contextTypeVar}>` : '';
  chunks.push(code`
    export interface ${serviceDesc.name}Controller${t} {
  `);

  serviceDesc.method.forEach((methodDesc, index) => {
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, (text) => chunks.push(code`${text}`));

    const params: Code[] = [];
    if (options.useContext) {
      params.push(code`ctx: Context`);
    }
    params.push(code`request: ${requestType(typeMap, methodDesc, options)}`);
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
      returns = code`${responseObservable(typeMap, methodDesc, options)}`;
    } else {
      // generate nestjs union type
      returns = code`
        ${responsePromise(typeMap, methodDesc, options)}
        | ${responseObservable(typeMap, methodDesc, options)}
        | ${responseType(typeMap, methodDesc, options)}
      `;
    }

    const name = options.lowerCaseServiceMethods ? camelCase(methodDesc.name) : methodDesc.name;
    chunks.push(code`
      ${name}(${joinCode(params, { on: ', ' })}): ${returns};
    `);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        const maybeCtx = options.useContext ? 'ctx: Context,' : '';
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
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): Code {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, (text) => chunks.push(code`${text}`));
  const t = options.useContext ? `<${contextTypeVar}>` : ``;
  chunks.push(code`
    export interface ${serviceDesc.name}Client${t} {
  `);

  serviceDesc.method.forEach((methodDesc, index) => {
    if (options.lowerCaseServiceMethods) {
      methodDesc.name = camelCase(methodDesc.name);
    }

    const params: Code[] = [];
    if (options.useContext) {
      params.push(code`ctx: Context`);
    }
    params.push(code`request: ${requestType(typeMap, methodDesc, options)}`);
    // Use metadata as last argument for interface only configuration
    if (options.addGrpcMetadata) {
      const q = options.addNestjsRestParameter ? '' : '?';
      params.push(code`metadata${q}: ${imp('Metadata@grpc')}`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    // Return observable since nestjs client always returns an Observable
    const returns = responseObservable(typeMap, methodDesc, options);

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, (text) => chunks.push(code`${text}`));
    chunks.push(code`
      ${methodDesc.name}(
        ${joinCode(params, { on: ',' })}
      ): ${returns};
    `);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        const maybeContext = options.useContext ? `ctx: Context,` : '';
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

export function generateNestjsGrpcServiceMethodsDecorator(serviceDesc: ServiceDescriptorProto, options: Options): Code {
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
        const grpcMethods = [${grpcMethods.join(', ')}];
        for (const method of grpcMethods) {
          const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
          ${GrpcMethod}('${serviceDesc.name}', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [${grpcStreamMethods.join(', ')}];
        for (const method of grpcStreamMethods) {
          const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
          ${GrpcStreamMethod}('${serviceDesc.name}', method)(constructor.prototype[method], method, descriptor);
        }
      };
    }
  `;
}
