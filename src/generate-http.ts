import { FileDescriptorProto, ServiceDescriptorProto } from "ts-proto-descriptors";
import { Code, code, joinCode } from "ts-poet";
import { requestType, responseType } from "./types";
import SourceInfo from "./sourceInfo";
import { assertInstanceOf, FormattedMethodDescriptor } from "./utils";
import { Context } from "./context";
require("../vendor/google/api/annotations_pb");

interface HTTPRule {
  get: string;
  put: string;
  post: string;
  pb_delete: string;
  patch: string;
  body: "*" | string;
}

function mapHTTPOptions(http: HTTPRule) {
  for (const method of ["post", "put", "get", "pb_delete", "patch"] as const) {
    if (http[method]) {
      return {
        method: method,
        path: http[method],
        body: http.body,
      };
    }
  }

  throw new Error("No HTTP method found");
}

export function generateHttpService(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  _sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
): Code {
  const chunks: Code[] = [];

  const methodList = ctx.fileDescriptorProtoMap![fileDesc.name].toObject().serviceList.find((service) => {
    return service.name === serviceDesc.name;
  })?.methodList;

  const httpOptions: Record<string, ReturnType<typeof mapHTTPOptions>> = {};
  let hasHttpOptions = false;

  if (methodList) {
    serviceDesc.method.forEach((methodDesc, i) => {
      // @ts-expect-error
      const http = methodList[i]?.options?.http as HTTPRule | undefined;

      if (http) {
        hasHttpOptions = true;
        assertInstanceOf(methodDesc, FormattedMethodDescriptor);
        httpOptions[methodDesc.formattedName] = mapHTTPOptions(http);
      }
    });
  }

  if (hasHttpOptions) {
    chunks.push(code`
      export const ${serviceDesc.name} = {
    `);

    serviceDesc.method.forEach((methodDesc) => {
      assertInstanceOf(methodDesc, FormattedMethodDescriptor);
      const httpMethod = httpOptions[methodDesc.formattedName];
      chunks.push(code`
        ${methodDesc.formattedName}: {
          path: "${httpMethod.path}",
          method: "${httpMethod.method}",${httpMethod.body ? `\nbody: "${httpMethod.body}",` : ""}
          request: undefined as ${requestType(ctx, methodDesc)} | undefined,
          response: undefined as ${responseType(ctx, methodDesc)} | undefined,
        },
      `);
    });

    chunks.push(code`}`);
    return joinCode(chunks, { on: "\n\n" });
  }

  return code``;
}
