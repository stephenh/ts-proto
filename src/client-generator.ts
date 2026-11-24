import { resolve } from "path";
import { FileDescriptorProto, ServiceDescriptorProto } from "ts-proto-descriptors";
import { Code } from "ts-poet";
import { Context } from "./context";

/**
 * A module selected with `--ts_proto_opt=outputClientImpl=<path or package>`, i.e. any value other
 * than `true`, `false` or `grpc-web`. Values starting with `.` or `/` are paths resolved against the
 * cwd; anything else is a package name resolved with Node resolution from the cwd. Export these as named exports or as
 * `default`; every function is optional.
 */
export interface ClientGenerator {
  /** Output inline in the generated file, once per service, next to the built-in clients. */
  generateClientImpl?(ctx: Context, fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto): Code;

  /** Output inline in the generated file, once per file that has services (e.g. a shared `Rpc` type). */
  generateClientMisc?(ctx: Context, fileDesc: FileDescriptorProto): Code;

  /**
   * Extra output files, with paths relative to the output dir. `Code` values get their imports
   * resolved relative to that path; plain strings are written as-is.
   */
  generateFiles?(ctx: Context, fileDesc: FileDescriptorProto): [path: string, content: Code | string][];
}

const isPath = (spec: string) => /^(\.|\/|[A-Za-z]:[\\/])/.test(spec);

const cache = new Map<string, ClientGenerator>();

export function loadClientGenerator(path: string): ClientGenerator {
  let ext = cache.get(path);
  if (!ext) {
    const mod = require(isPath(path) ? resolve(path) : require.resolve(path, { paths: [process.cwd()] }));
    ext = mod.default ?? mod;
    if (!ext || !["generateClientImpl", "generateClientMisc", "generateFiles"].some((f) => f in ext!)) {
      throw new Error(
        `ts-proto client generator '${path}' must export generateClientImpl, generateClientMisc or generateFiles`,
      );
    }
    cache.set(path, ext);
  }
  return ext;
}
