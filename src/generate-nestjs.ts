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
import { CodeBlock, FunctionSpec, InterfaceSpec, Modifier, TypeNames } from 'ts-poet';
import { maybeAddComment, singular } from './utils';
import { camelCase } from './case';
import { contextTypeVar, Options } from './main';
import { google } from '../build/pbjs';
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

export function generateNestjsServiceController(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): InterfaceSpec {
  let service = InterfaceSpec.create(`${serviceDesc.name}Controller`).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    service = service.addTypeVariable(contextTypeVar);
  }
  maybeAddComment(sourceInfo, (text) => (service = service.addJavadoc(text)));

  serviceDesc.method.forEach((methodDesc, index) => {
    if (options.lowerCaseServiceMethods) {
      methodDesc.name = camelCase(methodDesc.name);
    }

    let requestFn = FunctionSpec.create(methodDesc.name);
    if (options.useContext) {
      requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
    }
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, (text) => (requestFn = requestFn.addJavadoc(text)));

    requestFn = requestFn.addParameter('request', requestType(typeMap, methodDesc, options));

    // Use metadata as last argument for interface only configuration
    if (options.addGrpcMetadata) {
      requestFn = requestFn.addParameter(options.addNestjsRestParameter ? 'metadata' : 'metadata?', 'Metadata@grpc');
    }
    if (options.addNestjsRestParameter) {
      requestFn = requestFn.addParameter('...rest', 'any');
    }

    // Return observable for interface only configuration, passing returnObservable=true and methodDesc.serverStreaming=true
    if (isEmptyType(methodDesc.outputType)) {
      requestFn = requestFn.returns(TypeNames.anyType('void'));
    } else if (options.returnObservable || methodDesc.serverStreaming) {
      requestFn = requestFn.returns(responseObservable(typeMap, methodDesc, options));
    } else {
      // generate nestjs union type
      requestFn = requestFn.returns(
        TypeNames.unionType(
          responsePromise(typeMap, methodDesc, options),
          responseObservable(typeMap, methodDesc, options),
          responseType(typeMap, methodDesc, options)
        )
      );
    }

    service = service.addFunction(requestFn);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        let batchFn = FunctionSpec.create(name);
        if (options.useContext) {
          batchFn = batchFn.addParameter('ctx', TypeNames.typeVariable('Context'));
        }
        batchFn = batchFn.addParameter(singular(batchMethod.inputFieldName), batchMethod.inputType);
        batchFn = batchFn.returns(TypeNames.PROMISE.param(batchMethod.outputType));
        service = service.addFunction(batchFn);
      }
    }
  });
  return service;
}

export function generateNestjsServiceClient(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): InterfaceSpec {
  let service = InterfaceSpec.create(`${serviceDesc.name}Client`).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    service = service.addTypeVariable(contextTypeVar);
  }
  maybeAddComment(sourceInfo, (text) => (service = service.addJavadoc(text)));

  serviceDesc.method.forEach((methodDesc, index) => {
    if (options.lowerCaseServiceMethods) {
      methodDesc.name = camelCase(methodDesc.name);
    }

    let requestFn = FunctionSpec.create(methodDesc.name);
    if (options.useContext) {
      requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
    }
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, (text) => (requestFn = requestFn.addJavadoc(text)));

    requestFn = requestFn.addParameter('request', requestType(typeMap, methodDesc, options));

    // Use metadata as last argument for interface only configuration
    if (options.addGrpcMetadata) {
      requestFn = requestFn.addParameter(options.addNestjsRestParameter ? 'metadata' : 'metadata?', 'Metadata@grpc');
    }
    if (options.addNestjsRestParameter) {
      requestFn = requestFn.addParameter('...rest', 'any');
    }

    // Return observable since nestjs client always returns an Observable
    requestFn = requestFn.returns(responseObservable(typeMap, methodDesc, options));

    service = service.addFunction(requestFn);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        let batchFn = FunctionSpec.create(name);
        if (options.useContext) {
          batchFn = batchFn.addParameter('ctx', TypeNames.typeVariable('Context'));
        }
        batchFn = batchFn.addParameter(singular(batchMethod.inputFieldName), batchMethod.inputType);
        batchFn = batchFn.returns(TypeNames.PROMISE.param(batchMethod.outputType));
        service = service.addFunction(batchFn);
      }
    }
  });
  return service;
}

export function generateNestjsGrpcServiceMethodsDecorator(
  serviceDesc: ServiceDescriptorProto,
  options: Options
): FunctionSpec {
  let grpcServiceDecorator = FunctionSpec.create(`${serviceDesc.name}ControllerMethods`).addModifiers(Modifier.EXPORT);

  const grpcMethods = serviceDesc.method
    .filter((m) => !m.clientStreaming)
    .map((m) => `'${options.lowerCaseServiceMethods ? camelCase(m.name) : m.name}'`)
    .join(', ');

  const grpcStreamMethods = serviceDesc.method
    .filter((m) => m.clientStreaming)
    .map((m) => `'${options.lowerCaseServiceMethods ? camelCase(m.name) : m.name}'`)
    .join(', ');

  const grpcMethodType = TypeNames.importedType('GrpcMethod@@nestjs/microservices');
  const grpcStreamMethodType = TypeNames.importedType('GrpcStreamMethod@@nestjs/microservices');

  let decoratorFunction = FunctionSpec.createCallable().addParameter('constructor', TypeNames.typeVariable('Function'));

  // add loop for applying @GrpcMethod decorators to functions
  decoratorFunction = generateGrpcMethodDecoratorLoop(
    decoratorFunction,
    serviceDesc,
    'grpcMethods',
    grpcMethods,
    grpcMethodType
  );

  // add loop for applying @GrpcStreamMethod decorators to functions
  decoratorFunction = generateGrpcMethodDecoratorLoop(
    decoratorFunction,
    serviceDesc,
    'grpcStreamMethods',
    grpcStreamMethods,
    grpcStreamMethodType
  );

  const body = CodeBlock.empty().add('return function %F', decoratorFunction);

  grpcServiceDecorator = grpcServiceDecorator.addCodeBlock(body);

  return grpcServiceDecorator;
}

function generateGrpcMethodDecoratorLoop(
  decoratorFunction: FunctionSpec,
  serviceDesc: ServiceDescriptorProto,
  grpcMethodsName: string,
  grpcMethods: string,
  grpcType: any
): FunctionSpec {
  return decoratorFunction
    .addStatement('const %L: string[] = [%L]', grpcMethodsName, grpcMethods)
    .beginControlFlow('for (const method of %L)', grpcMethodsName)
    .addStatement(`const %L: any = %L`, 'descriptor', `Reflect.getOwnPropertyDescriptor(constructor.prototype, method)`)
    .addStatement(`%T('${serviceDesc.name}', method)(constructor.prototype[method], method, descriptor)`, grpcType)
    .endControlFlow();
}
