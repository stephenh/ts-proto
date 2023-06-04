import { DateOption, optionsFromParameter, ServiceOption } from "../src/options";

describe("options", () => {
  it("can set outputJsonMethods with nestJs=true", () => {
    expect(optionsFromParameter("nestJs=true,outputJsonMethods=true")).toMatchInlineSnapshot(`
      {
        "M": {},
        "addGrpcMetadata": false,
        "addNestjsRestParameter": false,
        "constEnums": false,
        "context": false,
        "emitImportedFiles": true,
        "enumsAsLiterals": false,
        "env": "both",
        "esModuleInterop": false,
        "exportCommonSymbols": true,
        "fileSuffix": "",
        "forceLong": "number",
        "importSuffix": "",
        "initializeFieldsAsUndefined": false,
        "lowerCaseServiceMethods": true,
        "metadataType": undefined,
        "nestJs": true,
        "oneof": "properties",
        "onlyTypes": false,
        "outputClientImpl": false,
        "outputEncodeMethods": false,
        "outputExtensions": false,
        "outputIndex": false,
        "outputJsonMethods": true,
        "outputPartialMethods": false,
        "outputSchema": false,
        "outputServices": [
          "default",
        ],
        "outputTypeAnnotations": false,
        "outputTypeRegistry": false,
        "removeEnumPrefix": false,
        "returnObservable": false,
        "snakeToCamel": [
          "json",
          "keys",
        ],
        "stringEnums": false,
        "unknownFields": false,
        "unrecognizedEnum": true,
        "useAbortSignal": false,
        "useAsyncIterable": false,
        "useDate": "timestamp",
        "useExactTypes": true,
        "useJsonWireFormat": false,
        "useMapType": false,
        "useMongoObjectId": false,
        "useNumericEnumForJson": false,
        "useOptionals": "none",
        "usePrototypeForDefaults": false,
        "useReadonlyTypes": false,
        "useSnakeTypeName": true,
      }
    `);
  });

  it("can set outputJsonMethods with nestJs=true", () => {
    const options = optionsFromParameter("outputClientImpl=grpc-web,addGrpcMetadata=false");
    expect(options).toMatchObject({
      outputClientImpl: "grpc-web",
      addGrpcMetadata: false,
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
    const options = optionsFromParameter("snakeToCamel=keys");
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
      nestJs: false,
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
});
