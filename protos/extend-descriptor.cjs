const fs = require("node:fs");

const annotations = "./google/api/annotations.ts";
const descriptor = "./google/protobuf/descriptor.ts";

const tag = /tag: (\d+)/.exec(fs.readFileSync(annotations, "utf8").toString())[1];

fs.writeFileSync(
  descriptor,
  fs
    .readFileSync(descriptor, "utf8")
    .toString()
    .replace('import _m0 from "protobufjs/minimal";', (target) => {
      return target + `\nimport { HttpRule } from "../api/http";`;
    })
    .replace("export interface MethodOptions {", (target) => {
      return target + `\n  httpRule?: HttpRule;`;
    })
    .replace("message.idempotencyLevel = reader.int32() as any;", (target) => {
      return (
        target +
        `
          continue;
        case ${tag >>> 3}:
          if (tag !== ${tag}) {
            break;
          }

          message.httpRule = HttpRule.decode(reader, reader.uint32());`
      );
    }),
);
