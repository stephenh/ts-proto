import { FileDescriptorProto, ServiceDescriptorProto } from "ts-proto-descriptors";
import { Code, code, joinCode } from "ts-poet";
import { requestType, responseType } from "./types";
import SourceInfo from "./sourceInfo";
import { assertInstanceOf, FormattedMethodDescriptor } from "./utils";
import { Context } from "./context";

interface HTTPRule {
  get: string;
  put: string;
  post: string;
  pb_delete: string;
  patch: string;
  option: string;
  body: "*" | string;
}

function mapHTTPOptions(http: HTTPRule) {
  for (const method of ["get", "post", "put", "pb_delete", "patch", "option"] as const) {
    if (http[method]) {
      return {
        method: method === "pb_delete" ? "delete" : method,
        path: http[method],
        body: http.body,
      };
    }
  }
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

  const httpOptions: Record<string, ReturnType<typeof mapHTTPOptions> | undefined> = {};
  let hasHttpOptions = false;

  if (methodList) {
    serviceDesc.method.forEach((methodDesc, i) => {
      const http = (methodList[i]?.options as { http?: HTTPRule } | undefined)?.http as HTTPRule | undefined;
      const httpOption = http ? mapHTTPOptions(http) : undefined;

      if (httpOption) {
        hasHttpOptions = true;
        assertInstanceOf(methodDesc, FormattedMethodDescriptor);
        httpOptions[methodDesc.formattedName] = httpOption;
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

      if (!httpMethod) {
        return;
      }

      chunks.push(code`
        ${methodDesc.formattedName}: {
          path: "${httpMethod.path}",
          method: "${httpMethod.method}",${httpMethod.body ? `\nbody: "${httpMethod.body}",` : ""}
          requestType: undefined as unknown as ${requestType(ctx, methodDesc)},
          responseType: undefined as unknown as ${responseType(ctx, methodDesc)},
        },
      `);
    });

    chunks.push(code`}`);
    return joinCode(chunks, { on: "\n\n" });
  }

  return code``;
}
