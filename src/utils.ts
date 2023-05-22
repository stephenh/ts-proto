import * as path from "path";
import { code, Code, imp, Import, joinCode } from "ts-poet";
import {
  CodeGeneratorRequest,
  FieldDescriptorProto,
  FileDescriptorProto,
  MethodDescriptorProto,
  MethodOptions,
} from "ts-proto-descriptors";
import ReadStream = NodeJS.ReadStream;
import { SourceDescription } from "./sourceInfo";
import { Options, ServiceOption } from "./options";
import { camelCaseGrpc, snakeToCamel } from "./case";

export function protoFilesToGenerate(request: CodeGeneratorRequest): FileDescriptorProto[] {
  return request.protoFile.filter((f) => request.fileToGenerate.includes(f.name));
}

type PackageTree = {
  index: string;
  chunks: Code[];
  leaves: { [k: string]: PackageTree };
};
export function generateIndexFiles(files: FileDescriptorProto[], options: Options): [string, Code][] {
  const packageTree: PackageTree = {
    index: "index.ts",
    leaves: {},
    chunks: [],
  };
  for (const { name, package: pkg } of files) {
    const moduleName = name.replace(".proto", options.fileSuffix);
    const pkgParts = pkg.length > 0 ? pkg.split(".") : [];

    const branch = pkgParts.reduce<PackageTree>((branch, part, i): PackageTree => {
      if (!(part in branch.leaves)) {
        const prePkgParts = pkgParts.slice(0, i + 1);
        const index = `index.${prePkgParts.join(".")}.ts`;
        branch.chunks.push(code`export * as ${part} from "./${path.basename(index, ".ts")}";`);
        branch.leaves[part] = {
          index,
          leaves: {},
          chunks: [],
        };
      }
      return branch.leaves[part];
    }, packageTree);
    branch.chunks.push(code`export * from "./${moduleName}";`);
  }

  const indexFiles: [string, Code][] = [];
  let branches: PackageTree[] = [packageTree];
  let currentBranch;
  while ((currentBranch = branches.pop())) {
    indexFiles.push([currentBranch.index, joinCode(currentBranch.chunks)]);
    branches.push(...Object.values(currentBranch.leaves));
  }

  return indexFiles;
}

export function readToBuffer(stream: ReadStream): Promise<Buffer> {
  return new Promise((resolve) => {
    const ret: Array<Buffer | string> = [];
    let len = 0;
    stream.on("readable", () => {
      let chunk;
      while ((chunk = stream.read())) {
        ret.push(chunk);
        len += chunk.length;
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(ret as any, len));
    });
  });
}

export function fail(message: string): never {
  throw new Error(message);
}

export function singular(name: string): string {
  return name.substring(0, name.length - 1); // drop the 's', which is extremely naive
}

export function lowerFirst(name: string): string {
  return name.substring(0, 1).toLowerCase() + name.substring(1);
}

export function upperFirst(name: string): string {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

// Since we don't know what form the comment originally took, it may contain closing block comments.
const CloseComment = /\*\//g;

/** Removes potentially harmful characters from comments and pushes it into chunks. */
export function maybeAddComment(
  desc: Partial<Pick<SourceDescription, "leadingComments" | "trailingComments">>,
  chunks: Code[],
  deprecated?: boolean,
  prefix: string = ""
): void {
  let lines: string[] = [];
  if (desc.leadingComments || desc.trailingComments) {
    let content = (desc.leadingComments || desc.trailingComments || "").replace(CloseComment, "* /").trim();

    // Detect /** ... */ comments
    const isDoubleStar = content.startsWith("*");
    if (isDoubleStar) {
      content = content.substring(1).trim();
    }

    // Prefix things like the enum name.
    if (prefix) {
      content = prefix + content;
    }

    lines = content.split("\n").map((l) => l.replace(/^ /, "").replace(/\n/, ""));
  }
  // Deprecated comment should be added even if no other comment was added
  if (deprecated) {
    if (lines.length > 0) {
      lines.push("");
    }
    lines.push("@deprecated");
  }

  let comment: Code;
  if (lines.length === 1) {
    comment = code`/** ${lines[0]} */`;
  } else {
    comment = code`/**\n * ${lines.join("\n * ")}\n */`;
  }
  if (lines.length > 0) {
    chunks.push(code`\n\n${comment}\n\n`);
  }
}

// Comment block at the top of every source file, since these comments require specific
// syntax incompatible with ts-poet, we will hard-code the string and prepend to the
// generator output.
export function prefixDisableLinter(spec: string): string {
  return `/* eslint-disable */\n${spec}`;
}

export function maybePrefixPackage(fileDesc: FileDescriptorProto, rest: string): string {
  const prefix = fileDesc.package === "" ? "" : `${fileDesc.package}.`;
  return `${prefix}${rest}`;
}

/**
 * Asserts that an object is an instance of a certain class
 * @param obj The object to check
 * @param constructor The constructor of the class to check
 */
export function assertInstanceOf<T>(obj: unknown, constructor: { new (...args: any[]): T }): asserts obj is T {
  if (!(obj instanceof constructor)) {
    throw new Error(`Expected instance of ${constructor.name}`);
  }
}

/**
 * A MethodDescriptorProto subclass that adds formatted properties
 */
export class FormattedMethodDescriptor implements MethodDescriptorProto {
  public name: string;
  public inputType: string;
  public outputType: string;
  public options: MethodOptions | undefined;
  public clientStreaming: boolean;
  public serverStreaming: boolean;

  private original: MethodDescriptorProto;
  private ctxOptions: Options;
  /**
   * The name of this method with formatting applied according to the `Options` object passed to the constructor.
   * Automatically updates to any changes to the `Options` or `name` of this object
   */
  public get formattedName() {
    return FormattedMethodDescriptor.formatName(this.name, this.ctxOptions);
  }

  constructor(src: MethodDescriptorProto, options: Options) {
    this.ctxOptions = options;
    this.original = src;
    this.name = src.name;
    this.inputType = src.inputType;
    this.outputType = src.outputType;
    this.options = src.options;
    this.clientStreaming = src.clientStreaming;
    this.serverStreaming = src.serverStreaming;
  }

  /**
   * Retrieve the source `MethodDescriptorProto` used to construct this object
   * @returns The source `MethodDescriptorProto` used to construct this object
   */
  public getSource(): MethodDescriptorProto {
    return this.original;
  }

  /**
   * Applies formatting rules to a gRPC method name.
   * @param methodName The original method name
   * @param options The options object containing rules to apply
   * @returns The formatted method name
   */
  public static formatName(methodName: string, options: Options) {
    let result = methodName;

    if (options.lowerCaseServiceMethods || options.outputServices.includes(ServiceOption.GRPC)) {
      if (options.snakeToCamel) result = camelCaseGrpc(result);
    }

    return result;
  }
}

export function getFieldJsonName(
  field: Pick<FieldDescriptorProto, "name" | "jsonName">,
  options: Pick<Options, "snakeToCamel">
): string {
  // jsonName will be camelCased by the protocol compiler, plus can be overridden by the user,
  // so just use that instead of our own maybeSnakeToCamel
  if (options.snakeToCamel.includes("json")) {
    return field.jsonName;
  } else {
    // The user wants to keep snake case in the JSON, but we still want to see if the jsonName
    // attribute is set as an explicit override.
    const probableJsonName = snakeToCamel(field.name);
    const isJsonNameSet = probableJsonName !== field.jsonName;
    return isJsonNameSet ? field.jsonName : field.name;
  }
}

/**
 * Returns a snippet for reading an object's property, such as `foo.bar`, or `foo['bar']` if the property name contains unusual characters.
 * For simplicity, we don't match the ECMA 5/6 rules for valid identifiers exactly, and return array syntax liberally.
 * @param objectName
 * @param propertyName
 * @param optional
 */
export function getPropertyAccessor(objectName: string, propertyName: string, optional: boolean = false): string {
  let validIdentifier = /^[a-zA-Z_$][\w$]*$/;
  return validIdentifier.test(propertyName)
    ? `${objectName}${optional ? "?" : ""}.${propertyName}`
    : `${objectName}${optional ? "?." : ""}[${JSON.stringify(propertyName)}]`;
}

export function impFile(options: Options, spec: string) {
  return imp(`${spec}${options.importSuffix}`);
}

export function impProto(options: Options, module: string, type: string): Import {
  const prefix = options.onlyTypes ? "t:" : "";
  const protoFile = `${module}.proto`;
  if (options.M[protoFile]) {
    return imp(`${prefix}${type}@${options.M[protoFile]}`);
  }
  return imp(`${prefix}${type}@./${module}${options.fileSuffix}${options.importSuffix}`);
}
