import { ServiceDescriptorProto, MethodOptions } from "ts-proto-descriptors";
import { Code, code, joinCode } from "ts-poet";
import { requestType, responseType } from "./types";
import { assertInstanceOf, FormattedMethodDescriptor, findHttpRule } from "./utils";
import { Context } from "./context";

export function generateGenericGoogleApiHttpServiceDefinition(ctx: Context, serviceDesc: ServiceDescriptorProto): Code {
  const chunks: Code[] = [];

  const httpRules: Record<string, ReturnType<typeof findHttpRule> | undefined> = {};
  let hasHttpRule = false;

  serviceDesc.method.forEach((methodDesc) => {
    const httpRule = findHttpRule(methodDesc.options?.httpRule);

    if (httpRule) {
      hasHttpRule = true;
      assertInstanceOf(methodDesc, FormattedMethodDescriptor);
      httpRules[methodDesc.formattedName] = httpRule;
    }
  });

  if (hasHttpRule) {
    chunks.push(code`
      export const ${serviceDesc.name} = {
    `);

    serviceDesc.method.forEach((methodDesc) => {
      assertInstanceOf(methodDesc, FormattedMethodDescriptor);
      const httpRule = httpRules[methodDesc.formattedName];

      if (!httpRule) {
        return;
      }

      chunks.push(code`\
        ${methodDesc.formattedName}: {
          path: "${httpRule.path}",
          method: "${httpRule.method}",${httpRule.body ? `\nbody: "${httpRule.body}",` : ""}
          requestType: undefined as unknown as ${requestType(ctx, methodDesc)},
          responseType: undefined as unknown as ${responseType(ctx, methodDesc)},
        },`);
    });

    chunks.push(code`}`);
    return joinCode(chunks, { on: "\n" });
  }

  return code``;
}
