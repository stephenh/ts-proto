import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { DateOption, LongOption, optionsFromParameter, ServiceOption } from "../src/options";

describe("options", () => {
  it("can set outputJsonMethods with nestJs=true", () => {
    expect(optionsFromParameter("nestJs=true,outputJsonMethods=true")).toMatchInlineSnapshot(`
      {
        "M": {},
        "addGrpcMetadata": false,
        "addNestjsRestParameter": false,
        "annotateFilesWithVersion": true,
        "anyType": "@type",
        "bigIntLiteral": true,
        "comments": true,
        "constEnums": false,
        "context": false,
        "disableProto2DefaultValues": false,
        "disableProto2Optionals": false,
        "emitDefaultValues": [],
        "emitImportedFiles": true,
        "enumPrefix": "",
        "enumSuffix": "",
        "enumsAsLiterals": false,
        "env": "both",
        "esModuleInterop": false,
        "exportCommonSymbols": true,
        "fileSuffix": "",
        "forceLong": "number",
        "globalThisPolyfill": false,
        "importSuffix": "",
        "initializeFieldsAsUndefined": false,
        "lowerCaseServiceMethods": true,
        "messagePrefix": "",
        "messageSuffix": "",
        "metadataType": undefined,
        "nestJs": [
          "client",
          "server",
        ],
        "nestJsStructEncodeWrappers": false,
        "noDefaultsForOptionals": false,
        "oneof": "properties",
        "onlyTypes": false,
        "outputClientImpl": false,
        "outputDecodeIncludeTypes": "",
        "outputEncodeIncludeTypes": "",
        "outputEncodeMethods": false,
        "outputExtensions": false,
        "outputIndex": false,
        "outputJsonMethods": true,
        "outputPartialMethods": false,
        "outputSchema": false,
        "outputServices": [],
        "outputStandaloneFunctions": false,
        "outputTypeAnnotations": false,
        "outputTypeRegistry": false,
        "protoJsonFormat": true,
        "removeEnumPrefix": false,
        "returnObservable": false,
        "rpcAfterResponse": false,
        "rpcBeforeRequest": false,
        "rpcErrorHandler": false,
        "snakeToCamel": [
          "json",
          "keys",
        ],
        "stringEnums": false,
        "typePrefix": "",
        "typeSuffix": "",
        "unknownFields": false,
        "unrecognizedEnum": true,
        "unrecognizedEnumName": "UNRECOGNIZED",
        "unrecognizedEnumValue": -1,
        "useAbortSignal": false,
        "useAsyncIterable": false,
        "useContextDataloaders": true,
        "useDate": "timestamp",
        "useDuration": "duration",
        "useExactTypes": true,
        "useJsTypeOverride": false,
        "useJsonName": false,
        "useJsonTimestamp": "rfc3339",
        "useJsonWireFormat": false,
        "useMapType": false,
        "useMongoObjectId": false,
        "useNestjsFqnServiceName": false,
        "useNullAsOptional": false,
        "useNumericEnumForJson": false,
        "useOptionals": "none",
        "usePrototypeForDefaults": false,
        "useReadonlyTypes": false,
        "useSnakeTypeName": true,
        "useUnknownForValue": false,
      }
    `);
  });

  it("can set addGrpcMetadata=false", () => {
    const options = optionsFromParameter("outputClientImpl=grpc-web,addGrpcMetadata=false");
    expect(options).toMatchObject({
      outputClientImpl: "grpc-web",
      addGrpcMetadata: false,
      outputServices: ["default"],
    });
  });

  it("can set fileSuffix", () => {
    const options = optionsFromParameter("fileSuffix=.pb");
    expect(options).toMatchObject({
      fileSuffix: ".pb",
    });
  });

  it("can set outputServices to false", () => {
    const options = optionsFromParameter("outputServices=false");
    expect(options).toMatchObject({
      outputServices: [ServiceOption.NONE],
    });
  });

  it("can set outputServices to grpc", () => {
    const options = optionsFromParameter("outputServices=grpc-js");
    expect(options).toMatchObject({
      outputServices: [ServiceOption.GRPC],
    });
  });

  it("can set useOptionals to boolean", () => {
    const options = optionsFromParameter("useOptionals=true");
    expect(options).toMatchObject({
      useOptionals: true,
    });
  });

  it("can set useOptionals to string", () => {
    const options = optionsFromParameter("useOptionals=messages");
    expect(options).toMatchObject({
      useOptionals: "messages",
    });
  });

  it("can set snakeToCamel as string", () => {
    const options = optionsFromParameter("snakeToCamel=keys,protoJsonFormat=false");
    expect(options).toMatchObject({ snakeToCamel: ["keys"] });
  });

  it("can set snakeToCamel as two values", () => {
    const options = optionsFromParameter("snakeToCamel=keys_json");
    expect(options).toMatchObject({ snakeToCamel: ["keys", "json"] });
  });

  it("can set multiple values as an array", () => {
    const options = optionsFromParameter("foo=one,foo=two");
    expect(options).toMatchObject({ foo: ["one", "two"] });
  });

  it("´output*=false implies onlyTypes", () => {
    const options = optionsFromParameter("outputJsonMethods=false,outputEncodeMethods=false,outputClientImpl=false");
    expect(options).toMatchObject({
      onlyTypes: true,
    });
  });

  it("onlyTypes implies output*=false", () => {
    const options = optionsFromParameter("onlyTypes=true");
    expect(options).toMatchObject({
      outputJsonMethods: false,
      outputEncodeMethods: false,
      outputClientImpl: false,
      nestJs: [],
    });
  });

  it("useJsonWireFormat requires onlyTypes", () => {
    const options = optionsFromParameter("useJsonWireFormat=true");
    expect(options).toMatchObject({
      useJsonWireFormat: false,
    });
  });

  it("useSnakeTypeName", () => {
    const options = optionsFromParameter("useSnakeTypeName=false");
    expect(options).toMatchObject({
      useSnakeTypeName: false,
    });
  });

  it("useJsonWireFormat implies useDate=string and stringEnums=true", () => {
    const options = optionsFromParameter("useJsonWireFormat=true,onlyTypes=true");
    expect(options).toMatchObject({
      useJsonWireFormat: true,
      onlyTypes: true,
      stringEnums: true,
      useDate: DateOption.STRING,
    });
  });

  it("rpcAfterResponse implies default service", () => {
    const options = optionsFromParameter("rpcAfterResponse=true");
    expect(options).toMatchObject({
      rpcAfterResponse: true,
      outputServices: [ServiceOption.DEFAULT],
    });
  });

  it("rpcBeforeRequest implies default service", () => {
    const options = optionsFromParameter("rpcBeforeRequest=true");
    expect(options).toMatchObject({
      rpcBeforeRequest: true,
      outputServices: [ServiceOption.DEFAULT],
    });
  });

  it("rpcAfterResponse implies default service but allows generics too", () => {
    const options = optionsFromParameter(
      "rpcBeforeRequest=true,outputServices=generic-definitions,outputServices=default",
    );
    expect(options).toMatchObject({
      rpcBeforeRequest: true,
      outputServices: [ServiceOption.DEFAULT, ServiceOption.GENERIC],
    });
  });

  it("useNestjsFqnServiceName requires nestJs=true", () => {
    expect(optionsFromParameter("useNestjsFqnServiceName=true")).toMatchObject({
      nestJs: [],
      useNestjsFqnServiceName: false,
    });
  });

  it("can set useNestjsFqnServiceName with nestJs=true", () => {
    expect(optionsFromParameter("nestJs=true,useNestjsFqnServiceName=true")).toMatchObject({
      nestJs: ["client", "server"],
      useNestjsFqnServiceName: true,
    });
  });

  it("can set initializeFieldsAsUndefined with nestJs=true", () => {
    expect(optionsFromParameter("nestJs=true,initializeFieldsAsUndefined=true")).toMatchObject({
      nestJs: ["client", "server"],
      initializeFieldsAsUndefined: true,
    });
  });

  it("nestJs=false disables the nestjs output", () => {
    expect(optionsFromParameter("nestJs=false")).toMatchObject({
      nestJs: [],
      outputEncodeMethods: true,
      outputServices: [ServiceOption.DEFAULT],
    });
  });

  it("can set nestJs=client", () => {
    expect(optionsFromParameter("nestJs=client")).toMatchObject({
      nestJs: ["client"],
      lowerCaseServiceMethods: true,
      outputEncodeMethods: false,
      outputJsonMethods: false,
      outputClientImpl: false,
      outputServices: [],
      initializeFieldsAsUndefined: false,
    });
  });

  it("can set nestJs=server", () => {
    expect(optionsFromParameter("nestJs=server")).toMatchObject({
      nestJs: ["server"],
      lowerCaseServiceMethods: true,
      outputEncodeMethods: false,
      outputServices: [],
    });
  });

  it("can set both nestJs=client and nestJs=server", () => {
    expect(optionsFromParameter("nestJs=client,nestJs=server")).toMatchObject({
      nestJs: ["client", "server"],
    });
  });

  it("rejects unknown nestJs values", () => {
    expect(() => optionsFromParameter("nestJs=both")).toThrow(
      "nestJs must be true, false, client, or server, but got 'both'",
    );
  });

  it("allow use 'null' instead of 'undefined'", () => {
    const options = optionsFromParameter("useNullAsOptional=true");
    expect(options).toMatchObject({
      useNullAsOptional: true,
      // outputServices: [ServiceOption.DEFAULT, ServiceOption.GENERIC],
    });
  });

  it("outputStandaloneFunctions rejects the options it doesn't support", () => {
    for (const param of [
      "outputTypeRegistry=true",
      "outputTypeAnnotations=static-only",
      "outputServices=generic-definitions",
      "nestJs=true",
      "nestJs=client",
      "useMongoObjectId=true",
    ]) {
      expect(() => optionsFromParameter(`outputStandaloneFunctions=true,${param}`)).toThrow(
        "outputStandaloneFunctions=true can't be used with",
      );
    }
  });

  describe("optionsFile", () => {
    let dir: string;

    beforeEach(() => {
      dir = mkdtempSync(join(tmpdir(), "ts-proto-options-"));
    });

    afterEach(() => {
      rmSync(dir, { recursive: true, force: true });
    });

    function writeOptionsFile(contents: unknown): string {
      const path = join(dir, "ts-proto.json");
      writeFileSync(path, typeof contents === "string" ? contents : JSON.stringify(contents));
      return path;
    }

    it("reads options from a JSON file", () => {
      const path = writeOptionsFile({
        useDate: "string",
        esModuleInterop: true,
        forceLong: "bigint",
        unrecognizedEnumValue: 0,
        outputServices: ["grpc-js", "generic-definitions"],
        snakeToCamel: "keys",
        "Mgoogle/protobuf/empty.proto": "./google3/protobuf/empty",
      });
      const options = optionsFromParameter(`optionsFile=${path}`);
      expect(options).toMatchObject({
        useDate: DateOption.STRING,
        esModuleInterop: true,
        forceLong: LongOption.BIGINT,
        unrecognizedEnumValue: 0,
        outputServices: [ServiceOption.GRPC, ServiceOption.GENERIC],
        snakeToCamel: ["keys", "json"],
        M: { "google/protobuf/empty.proto": "./google3/protobuf/empty" },
      });
      expect(options).not.toHaveProperty("optionsFile");
    });

    it("treats values the same as protoc parameters", () => {
      const path = writeOptionsFile({ useDate: true, outputJsonMethods: "false", outputServices: ["false"] });
      expect(optionsFromParameter(`optionsFile=${path}`)).toEqual(
        optionsFromParameter("useDate=true,outputJsonMethods=false,outputServices=false"),
      );
    });

    it("applies the nestJs defaults from the file", () => {
      const path = writeOptionsFile({ nestJs: "client", outputJsonMethods: true });
      expect(optionsFromParameter(`optionsFile=${path}`)).toMatchObject({
        nestJs: ["client"],
        lowerCaseServiceMethods: true,
        outputEncodeMethods: false,
        outputJsonMethods: true,
      });
    });

    it("lets protoc parameters override the file", () => {
      const path = writeOptionsFile({
        useDate: "string",
        stringEnums: true,
        outputServices: ["grpc-js", "generic-definitions"],
        "Mfoo.proto": "./foo",
        "Mbar.proto": "./bar",
      });
      const options = optionsFromParameter(
        `useDate=false,optionsFile=${path},outputServices=nice-grpc,Mbar.proto=./baz`,
      );
      expect(options).toMatchObject({
        useDate: DateOption.TIMESTAMP,
        stringEnums: true,
        outputServices: [ServiceOption.NICE_GRPC],
        M: { "foo.proto": "./foo", "bar.proto": "./baz" },
      });
    });

    it("rejects a missing file", () => {
      const path = join(dir, "missing.json");
      expect(() => optionsFromParameter(`optionsFile=${path}`)).toThrow(`Could not read optionsFile '${path}'`);
    });

    it("rejects invalid JSON", () => {
      const path = writeOptionsFile("useDate=string");
      expect(() => optionsFromParameter(`optionsFile=${path}`)).toThrow(`Could not read optionsFile '${path}'`);
    });

    it("rejects JSON that isn't an object", () => {
      const path = writeOptionsFile(["useDate=string"]);
      expect(() => optionsFromParameter(`optionsFile=${path}`)).toThrow(
        `optionsFile '${path}' must contain a JSON object of options`,
      );
    });

    it("rejects values that can't be protoc parameters", () => {
      for (const value of [null, {}, [], [["grpc-js"]]]) {
        const path = writeOptionsFile({ outputServices: value });
        expect(() => optionsFromParameter(`optionsFile=${path}`)).toThrow(
          `optionsFile '${path}' must set outputServices to a string, number, boolean, or non-empty array of them, but got ${JSON.stringify(value)}`,
        );
      }
    });

    it("rejects M options that aren't strings", () => {
      const path = writeOptionsFile({ "Mfoo.proto": true });
      expect(() => optionsFromParameter(`optionsFile=${path}`)).toThrow(
        `optionsFile '${path}' must set Mfoo.proto to a string, but got true`,
      );
    });

    it("rejects nested options files", () => {
      const path = writeOptionsFile({ optionsFile: "other.json" });
      expect(() => optionsFromParameter(`optionsFile=${path}`)).toThrow(`optionsFile '${path}' can't set optionsFile`);
    });

    it("rejects an optionsFile that isn't a single path", () => {
      expect(() => optionsFromParameter("optionsFile=true")).toThrow(
        "optionsFile must be set to a single file path, but got 'true'",
      );
      expect(() => optionsFromParameter("optionsFile=a.json,optionsFile=b.json")).toThrow(
        "optionsFile must be set to a single file path, but got 'a.json,b.json'",
      );
    });
  });
});
