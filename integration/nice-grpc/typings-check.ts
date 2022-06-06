import {
  createClientFactory,
  createChannel,
  createServer,
  CallContext,
  ClientMiddleware,
  ServerMiddleware,
} from 'nice-grpc';
import { Empty } from './google/protobuf/empty';
import { Struct, Value, ListValue } from './google/protobuf/struct';
import { Timestamp } from './google/protobuf/timestamp';
import {
  StringValue,
  Int64Value,
  UInt64Value,
  Int32Value,
  UInt32Value,
  BytesValue,
  FloatValue,
  DoubleValue,
  BoolValue,
} from './google/protobuf/wrappers';
import {
  TestDefinition,
  TestClient,
  TestServiceImplementation,
  ServerStreamingMethodResult,
  TestMessage,
  DeepPartial,
} from './simple';

type ClientOptionsExt = {ext: number};
const clientMiddleware: ClientMiddleware<ClientOptionsExt> = (call, options) => call.next(call.request, options);

const client: TestClient<ClientOptionsExt> = createClientFactory()
  .use(clientMiddleware)
  .create(TestDefinition, createChannel(''));

type ServerContextExt = {ext: number};
const serverMiddleware: ServerMiddleware<ServerContextExt> = (call, context) =>
  call.next(call.request, { ...context, ext: 42 });

class TestServiceImpl implements TestServiceImplementation<ServerContextExt> {
  unary(request: Empty, context: CallContext & ServerContextExt): Promise<DeepPartial<Empty>> {
    throw new Error('Not implemented');
  }
  unaryStringValue(request: StringValue, context: CallContext & ServerContextExt): Promise<DeepPartial<StringValue>> {
    throw new Error('Not implemented');
  }
  unaryInt64Value(request: Int64Value, context: CallContext & ServerContextExt): Promise<DeepPartial<Int64Value>> {
    throw new Error('Not implemented');
  }
  unaryUint64Value(request: UInt64Value, context: CallContext & ServerContextExt): Promise<DeepPartial<UInt64Value>> {
    throw new Error('Not implemented');
  }
  unaryInt32Value(request: Int32Value, context: CallContext & ServerContextExt): Promise<DeepPartial<Int32Value>> {
    throw new Error('Not implemented');
  }
  unaryUInt32Value(request: UInt32Value, context: CallContext & ServerContextExt): Promise<DeepPartial<UInt32Value>> {
    throw new Error('Not implemented');
  }
  unaryBytesValue(request: BytesValue, context: CallContext & ServerContextExt): Promise<DeepPartial<BytesValue>> {
    throw new Error('Not implemented');
  }
  unaryFloatValue(request: FloatValue, context: CallContext & ServerContextExt): Promise<DeepPartial<FloatValue>> {
    throw new Error('Not implemented');
  }
  unaryDoubleValue(request: DoubleValue, context: CallContext & ServerContextExt): Promise<DeepPartial<DoubleValue>> {
    throw new Error('Not implemented');
  }
  unaryBoolValue(request: BoolValue, context: CallContext & ServerContextExt): Promise<DeepPartial<BoolValue>> {
    throw new Error('Not implemented');
  }
  unaryTimestamp(request: Timestamp, context: CallContext & ServerContextExt): Promise<DeepPartial<Timestamp>> {
    throw new Error('Not implemented');
  }
  struct(request: Struct, context: CallContext & ServerContextExt): Promise<DeepPartial<Struct>> {
    throw new Error('Not implemented');
  }
  value(request: Value, context: CallContext & ServerContextExt): Promise<DeepPartial<Value>> {
    throw new Error('Not implemented');
  }
  listValue(request: ListValue, context: CallContext & ServerContextExt): Promise<DeepPartial<ListValue>> {
    throw new Error('Not implemented');
  }
  serverStreaming(
    request: TestMessage,
    context: CallContext & ServerContextExt
  ): ServerStreamingMethodResult<DeepPartial<TestMessage>> {
    throw new Error('Not implemented');
  }
  serverStreamingStringValue(
    request: StringValue,
    context: CallContext & ServerContextExt
  ): ServerStreamingMethodResult<DeepPartial<StringValue>> {
    throw new Error('Not implemented');
  }
  serverStreamingStruct(
    request: Struct,
    context: CallContext & ServerContextExt
  ): ServerStreamingMethodResult<DeepPartial<Struct>> {
    throw new Error('Not implemented');
  }
  clientStreaming(
    request: AsyncIterable<TestMessage>,
    context: CallContext & ServerContextExt
  ): Promise<DeepPartial<TestMessage>> {
    throw new Error('Not implemented');
  }
  clientStreamingStringValue(
    request: AsyncIterable<StringValue>,
    context: CallContext & ServerContextExt
  ): Promise<DeepPartial<StringValue>> {
    throw new Error('Not implemented');
  }
  bidiStreaming(
    request: AsyncIterable<TestMessage>,
    context: CallContext & ServerContextExt
  ): ServerStreamingMethodResult<DeepPartial<TestMessage>> {
    throw new Error('Not implemented');
  }
  bidiStreamingStringValue(
    request: AsyncIterable<StringValue>,
    context: CallContext & ServerContextExt
  ): ServerStreamingMethodResult<DeepPartial<StringValue>> {
    throw new Error('Not implemented');
  }
}

const server = createServer().use(serverMiddleware).add(TestDefinition, new TestServiceImpl());
