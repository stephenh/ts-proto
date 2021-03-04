import { optionsFromParameter } from '../src/options';

describe('options', () => {
  it('can set outputJsonMethods with nestJs=true', () => {
    expect(optionsFromParameter('nestJs=true,outputJsonMethods=true')).toMatchInlineSnapshot(`
      Object {
        "addGrpcMetadata": false,
        "addNestjsRestParameter": false,
        "context": false,
        "env": "both",
        "esModuleInterop": false,
        "exportCommonSymbols": true,
        "forceLong": "number",
        "lowerCaseServiceMethods": true,
        "nestJs": true,
        "oneof": "properties",
        "outputClientImpl": false,
        "outputEncodeMethods": false,
        "outputJsonMethods": true,
        "outputPartialMethods": false,
        "outputSchema": false,
        "returnObservable": false,
        "snakeToCamel": true,
        "stringEnums": false,
        "unrecognizedEnum": true,
        "useDate": "timestamp",
        "useOptionals": false,
      }
    `);
  });
});
