import { optionsFromParameter, ServiceOption } from '../src/options';

describe('options', () => {
  it('can set outputJsonMethods with nestJs=true', () => {
    expect(optionsFromParameter('nestJs=true,outputJsonMethods=true')).toMatchInlineSnapshot(`
      Object {
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
        "lowerCaseServiceMethods": true,
        "nestJs": true,
        "oneof": "properties",
        "onlyTypes": false,
        "outputClientImpl": false,
        "outputEncodeMethods": false,
        "outputJsonMethods": true,
        "outputPartialMethods": false,
        "outputSchema": false,
        "outputServices": "default",
        "outputTypeRegistry": false,
        "returnObservable": false,
        "snakeToCamel": Array [
          "json",
          "keys",
        ],
        "stringEnums": false,
        "unknownFields": false,
        "unrecognizedEnum": true,
        "useDate": "timestamp",
        "useExactTypes": true,
        "useMongoObjectId": false,
        "useOptionals": "none",
        "usePrototypeForDefaults": false,
      }
    `);
  });

  it('can set outputJsonMethods with nestJs=true', () => {
    const options = optionsFromParameter('outputClientImpl=grpc-web,addGrpcMetadata=false');
    expect(options).toMatchObject({
      outputClientImpl: 'grpc-web',
      addGrpcMetadata: false,
    });
  });

  it('can set fileSuffix', () => {
    const options = optionsFromParameter('fileSuffix=.pb');
    expect(options).toMatchObject({
      fileSuffix: '.pb',
    });
  });

  it('can set outputServices to false', () => {
    const options = optionsFromParameter('outputServices=false');
    expect(options).toMatchObject({
      outputServices: ServiceOption.NONE,
    });
  });

  it('can set outputServices to grpc', () => {
    const options = optionsFromParameter('outputServices=grpc-js');
    expect(options).toMatchObject({
      outputServices: ServiceOption.GRPC,
    });
  });

  it('can set useOptionals to boolean', () => {
    const options = optionsFromParameter('useOptionals=true');
    expect(options).toMatchObject({
      useOptionals: true,
    });
  });

  it('can set useOptionals to string', () => {
    const options = optionsFromParameter('useOptionals=messages');
    expect(options).toMatchObject({
      useOptionals: 'messages',
    });
  });
});
