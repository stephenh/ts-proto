import { optionsFromParameter } from '../src/options';

describe('options', () => {
  it('can set outputJsonMethods with nestJs=true', () => {
    expect(optionsFromParameter('nestJs=true,outputJsonMethods=true')).toMatchInlineSnapshot(`
      Object {
        "addGrpcMetadata": false,
        "addNestjsRestParameter": false,
        "constEnums": false,
        "context": false,
        "emitImportedFiles": true,
        "env": "both",
        "esModuleInterop": false,
        "exportCommonSymbols": true,
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
        "outputServices": false,
        "outputTypeRegistry": false,
        "returnObservable": false,
        "snakeToCamel": true,
        "stringEnums": false,
        "unrecognizedEnum": true,
        "useDate": "timestamp",
        "useOptionals": false,
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
});
