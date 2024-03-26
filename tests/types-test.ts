import { Options, defaultOptions } from "../src/options";
import { messageToTypeName, TypeMap } from "../src/types";
import { Code, code, imp } from "ts-poet";
import { Utils } from "../src/main";

const fakeProto = undefined as any;

describe("types", () => {
  describe("messageToTypeName", () => {
    type TestCase = {
      descr: string;
      typeMap: TypeMap;
      protoType: string;
      options?: Options;
      expected: Code;
    };
    const testCases: Array<TestCase> = [
      {
        descr: "top-level messages",
        typeMap: new Map([[".namespace.Message", ["namespace", "Message", fakeProto]]]),
        protoType: ".namespace.Message",
        expected: code`${imp("Message@./namespace")}`,
      },
      {
        descr: "nested messages",
        typeMap: new Map([[".namespace.Message.Inner", ["namespace", "Message_Inner", fakeProto]]]),
        protoType: ".namespace.Message.Inner",
        expected: code`${imp("Message_Inner@./namespace")}`,
      },
      {
        descr: "nested messages: .js import suffix",
        typeMap: new Map([[".namespace.Message.Inner", ["namespace", "Message_Inner", fakeProto]]]),
        protoType: ".namespace.Message.Inner",
        options: { ...defaultOptions(), importSuffix: ".js" },
        expected: code`${imp("Message_Inner@./namespace.js")}`,
      },
      {
        descr: "value types",
        typeMap: new Map(),
        protoType: ".google.protobuf.StringValue",
        expected: code`string | undefined`,
      },
      {
        descr: "value types (useOptionals=true)",
        typeMap: new Map(),
        protoType: ".google.protobuf.StringValue",
        options: { ...defaultOptions(), useOptionals: true },
        expected: code`string | undefined`,
      },
      {
        descr: 'value types (useOptionals="all")',
        typeMap: new Map(),
        protoType: ".google.protobuf.StringValue",
        options: { ...defaultOptions(), useOptionals: "all" },
        expected: code`string | undefined`,
      },
      {
        descr: 'use "null" value instead of "undefined" (useNullAsOptional=true)',
        typeMap: new Map(),
        protoType: ".google.protobuf.StringValue",
        options: { ...defaultOptions(), useNullAsOptional: true },
        expected: code`string | null`,
      },
    ];
    testCases.forEach((t) =>
      it(t.descr, async () => {
        const ctx = {
          options: defaultOptions(),
          utils: undefined as any as Utils,
          ...t,
          currentFile: { isProto3Syntax: false },
        };
        const got = messageToTypeName(ctx, t.protoType);
        expect(got.toString()).toEqual(t.expected.toString());
      }),
    );
  });
});
