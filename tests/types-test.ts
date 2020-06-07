import { google } from '../build/pbjs';
import { Options } from '../src/main';
import { messageToTypeName, TypeMap } from '../src/types';
import { defaultOptions } from '../src/utils';
import { TypeName, TypeNames } from 'ts-poet';
import DescriptorProto = google.protobuf.DescriptorProto;

const fakeProto = (undefined as any) as DescriptorProto;

describe('types', () => {
  describe('messageToTypeName', () => {
    type TestCase = {
      descr: string;
      typeMap: TypeMap;
      protoType: string;
      options?: Options;
      expected: TypeName;
    };
    const testCases: Array<TestCase> = [
      {
        descr: 'top-level messages',
        typeMap: new Map([['.namespace.Message', ['namespace', 'Message', fakeProto]]]),
        protoType: '.namespace.Message',
        expected: TypeNames.anyType('Message@./namespace'),
      },
      {
        descr: 'nested messages',
        typeMap: new Map([['.namespace.Message.Inner', ['namespace', 'Message_Inner', fakeProto]]]),
        protoType: '.namespace.Message.Inner',
        expected: TypeNames.anyType('Message_Inner@./namespace'),
      },
      {
        descr: 'value types',
        typeMap: new Map(),
        protoType: '.google.protobuf.StringValue',
        expected: TypeNames.unionType(TypeNames.STRING, TypeNames.UNDEFINED),
      },
      {
        descr: 'value types (useOptionals=true)',
        typeMap: new Map(),
        protoType: '.google.protobuf.StringValue',
        options: { ...defaultOptions(), useOptionals: true },
        expected: TypeNames.STRING,
      },
    ];
    testCases.forEach((t) =>
      it(t.descr, () => {
        const got = messageToTypeName(t.typeMap, t.protoType, t.options ?? defaultOptions());
        expect(got).toEqual(t.expected);
      })
    );
  });
});
