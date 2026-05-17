/**
 * This test verifies that the generated code is compatible with
 * TypeScript's isolatedDeclarations mode, which is used by fast
 * compilers like OXC to generate .d.ts files without full type inference.
 */

import { TestServiceDefinition, TestRequest, TestResponse } from "./service";

describe("isolated-declarations", () => {
  it("service definition should be properly typed", () => {
    // This test ensures the circular type definition works
    expect(TestServiceDefinition).toBeDefined();
    expect(TestServiceDefinition.name).toBe("TestService");
    expect(TestServiceDefinition.methods.testMethod).toBeDefined();
    
    // Verify the types are correct
    const method = TestServiceDefinition.methods.testMethod;
    expect(method.requestType).toBe(TestRequest);
    expect(method.responseType).toBe(TestResponse);
  });

  it("can export service definition type", () => {
    // This export would fail with isolatedDeclarations if types aren't explicit
    type ServiceDef = typeof TestServiceDefinition;
    
    const definition: ServiceDef = TestServiceDefinition;
    expect(definition.fullName).toBe("isolated.declarations.TestService");
  });
});
