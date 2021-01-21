import { google } from '../build/pbjs';
import { Options } from '../src/main';
import { messageToTypeName, TypeMap } from '../src/types';
import { defaultOptions } from '../src/utils';
import DescriptorProto = google.protobuf.DescriptorProto;
import { Code, code, imp } from 'ts-poet';

const fakeProto = (undefined as any) as DescriptorProto;

describe('types', () => {
  describe('messageToTypeName', () => {
    type TestCase = {
      descr: string;
      typeMap: TypeMap;
      protoType: string;
      options?: Options;
      expected: Code;
    };
    const testCases: Array<TestCase> = [
      {
        descr: 'top-level messages',
        typeMap: new Map([['.namespace.Message', ['namespace', 'Message', fakeProto]]]),
        protoType: '.namespace.Message',
        expected: code`${imp('Message@./namespace')}`,
      },
      {
        descr: 'nested messages',
        typeMap: new Map([['.namespace.Message.Inner', ['namespace', 'Message_Inner', fakeProto]]]),
        protoType: '.namespace.Message.Inner',
        expected: code`${imp('Message_Inner@./namespace')}`,
      },
      {
        descr: 'value types',
        typeMap: new Map(),
        protoType: '.google.protobuf.StringValue',
        expected: code`string | undefined`,
      },
      {
        descr: 'value types (useOptionals=true)',
        typeMap: new Map(),
        protoType: '.google.protobuf.StringValue',
        options: { ...defaultOptions(), useOptionals: true },
        expected: code`string`,
      },
    ];
    testCases.forEach((t) =>
      it(t.descr, async () => {
        const got = messageToTypeName(t.typeMap, t.protoType, t.options ?? defaultOptions());
        expect(await got.toStringWithImports()).toEqual(await t.expected.toStringWithImports());
      })
    );
  });
});
