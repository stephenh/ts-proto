/**
 * @jest-environment node
 */

/**
 * This test verifies that the generated code is compatible with
 * TypeScript's isolatedDeclarations mode for grpc-js services.
 */

import { TestServiceService, TestRequest, TestResponse } from "./service";

describe("isolated-declarations-grpc-js", () => {
  it("service definition should be properly typed", () => {
    // This test ensures the circular type definition works
    expect(TestServiceService).toBeDefined();
    expect(TestServiceService.testMethod).toBeDefined();
    
    // Verify the method definition structure
    const method = TestServiceService.testMethod;
    expect(method.path).toBe("/isolated.declarations.grpcjs.TestService/TestMethod");
    expect(method.requestStream).toBe(false);
    expect(method.responseStream).toBe(false);
  });

  it("can export service definition type", () => {
    // This export would fail with isolatedDeclarations if types aren't explicit
    type ServiceDef = typeof TestServiceService;
    
    const definition: ServiceDef = TestServiceService;
    expect(definition.testMethod.path).toBe("/isolated.declarations.grpcjs.TestService/TestMethod");
  });
});
