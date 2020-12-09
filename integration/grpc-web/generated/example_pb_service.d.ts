// package: rpx
// file: example.proto

import * as example_pb from "./example_pb";
import * as types_pb from "./types_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DashStateUserSettings = {
  readonly methodName: string;
  readonly service: typeof DashState;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof types_pb.Empty;
  readonly responseType: typeof example_pb.DashUserSettingsState;
};

type DashStateActiveUserSettingsStream = {
  readonly methodName: string;
  readonly service: typeof DashState;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof types_pb.Empty;
  readonly responseType: typeof example_pb.DashUserSettingsState;
};

export class DashState {
  static readonly serviceName: string;
  static readonly UserSettings: DashStateUserSettings;
  static readonly ActiveUserSettingsStream: DashStateActiveUserSettingsStream;
}

type DashAPICredsCreate = {
  readonly methodName: string;
  readonly service: typeof DashAPICreds;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof example_pb.DashAPICredsCreateReq;
  readonly responseType: typeof example_pb.DashCred;
};

type DashAPICredsUpdate = {
  readonly methodName: string;
  readonly service: typeof DashAPICreds;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof example_pb.DashAPICredsUpdateReq;
  readonly responseType: typeof example_pb.DashCred;
};

type DashAPICredsDelete = {
  readonly methodName: string;
  readonly service: typeof DashAPICreds;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof example_pb.DashAPICredsDeleteReq;
  readonly responseType: typeof example_pb.DashCred;
};

export class DashAPICreds {
  static readonly serviceName: string;
  static readonly Create: DashAPICredsCreate;
  static readonly Update: DashAPICredsUpdate;
  static readonly Delete: DashAPICredsDelete;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class DashStateClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  userSettings(
    requestMessage: types_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashUserSettingsState|null) => void
  ): UnaryResponse;
  userSettings(
    requestMessage: types_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashUserSettingsState|null) => void
  ): UnaryResponse;
  activeUserSettingsStream(requestMessage: types_pb.Empty, metadata?: grpc.Metadata): ResponseStream<example_pb.DashUserSettingsState>;
}

export class DashAPICredsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  create(
    requestMessage: example_pb.DashAPICredsCreateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashCred|null) => void
  ): UnaryResponse;
  create(
    requestMessage: example_pb.DashAPICredsCreateReq,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashCred|null) => void
  ): UnaryResponse;
  update(
    requestMessage: example_pb.DashAPICredsUpdateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashCred|null) => void
  ): UnaryResponse;
  update(
    requestMessage: example_pb.DashAPICredsUpdateReq,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashCred|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: example_pb.DashAPICredsDeleteReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashCred|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: example_pb.DashAPICredsDeleteReq,
    callback: (error: ServiceError|null, responseMessage: example_pb.DashCred|null) => void
  ): UnaryResponse;
}

