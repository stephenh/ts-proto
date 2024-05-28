import {
  DescriptorProto,
  FileDescriptorProto,
  FieldDescriptorProto,
  FieldDescriptorProto_Type,
} from "ts-proto-descriptors";
import { imp, code, Code, joinCode, def } from "ts-poet";
import { visit, visitServices } from "./visit";
import { Context } from "./context";
import SourceInfo from "./sourceInfo";
import { impFile, maybePrefixPackage } from "./utils";
import { basicTypeName, toReaderCall } from "./types";
import { Reader } from "protobufjs/minimal";

const fileDescriptorProto = imp("FileDescriptorProto@ts-proto-descriptors");

const extensionCache: { [key: string]: { [key: string]: FieldDescriptorProto } } = {};

export function generateSchema(ctx: Context, fileDesc: FileDescriptorProto, sourceInfo: SourceInfo): Code[] {
  const { options } = ctx;
  const chunks: Code[] = [];

  fileDesc.extension.forEach((extension) => {
    if (!(extension.extendee in extensionCache)) {
      extensionCache[extension.extendee] = {};
    }
    extensionCache[extension.extendee][extension.number] = extension;
  });

  chunks.push(code`
    type ProtoMetaMessageOptions = {
      options?: { [key: string]: any };
      fields?: { [key: string]: { [key: string]: any } };
      oneof?: { [key: string]: { [key: string]: any } };
      nested?: { [key: string]: ProtoMetaMessageOptions };
    };

    export interface ProtoMetadata {
      ${
        ctx.options.outputSchema !== "no-file-descriptor" ? `fileDescriptor: ${fileDescriptorProto};\n` : ""
      }references: { [key: string]: any };
      dependencies?: ProtoMetadata[];
      options?: {
        options?: { [key: string]: any };
        services?: {
          [key: string]: {
            options?: { [key: string]: any };
            methods?: { [key: string]: { [key: string]: any } };
          }
        };
        messages?: {
          [key: string]: ProtoMetaMessageOptions;
        };
        enums?: {
          [key: string]: {
            options?: { [key: string]: any };
            values?: { [key: string]: { [key: string]: any } };
          };
        };
      };
    }
  `);

  const references: Code[] = [];

  function addReference(localName: string, symbol: string): void {
    references.push(code`'.${maybePrefixPackage(fileDesc, localName.replace(/_/g, "."))}': ${symbol}`);
  }

  visit(
    fileDesc,
    sourceInfo,
    (fullName) => {
      if (options.outputEncodeMethods) {
        addReference(fullName, fullName);
      }
    },
    options,
    (fullName) => {
      addReference(fullName, fullName);
    },
  );

  visitServices(fileDesc, sourceInfo, (serviceDesc) => {
    if (options.outputClientImpl) {
      addReference(serviceDesc.name, `${serviceDesc.name}ClientImpl`);
    }
  });

  const dependencies = fileDesc.dependency.map((dep) => {
    return code`${impFile(options, `protoMetadata@./${dep.replace(".proto", "")}`)}`;
  });

  // Use toObject so that we get enums as numbers (instead of the default toJSON behavior)
  const descriptor = FileDescriptorProto.fromPartial(fileDesc);

  // Only keep locations that include comments
  descriptor.sourceCodeInfo = {
    location:
      descriptor.sourceCodeInfo?.location.filter((loc) => loc["leadingComments"] || loc["trailingComments"]) || [],
  };

  let fileOptions: Code | undefined;
  if (fileDesc.options) {
    fileOptions = encodedOptionsToOptions(ctx, ".google.protobuf.FileOptions", fileDesc.options._unknownFields);
    delete fileDesc.options._unknownFields;
  }

  const messagesOptions: Code[] = [];
  (fileDesc.messageType || []).forEach((message) => {
    const resolvedMessage = resolveMessageOptions(ctx, message);
    if (resolvedMessage) {
      messagesOptions.push(resolvedMessage);
    }
  });

  const servicesOptions: Code[] = [];
  (fileDesc.service || []).forEach((service) => {
    const methodsOptions: Code[] = [];
    service.method.forEach((method) => {
      if (method.options) {
        const methodOptions = encodedOptionsToOptions(
          ctx,
          ".google.protobuf.MethodOptions",
          method.options._unknownFields,
        );
        delete method.options._unknownFields;
        if (methodOptions) {
          methodsOptions.push(code`'${method.name}': ${methodOptions}`);
        }
      }
    });

    let serviceOptions: Code | undefined;
    if (service.options) {
      serviceOptions = encodedOptionsToOptions(ctx, ".google.protobuf.ServiceOptions", service.options._unknownFields);
      delete service.options._unknownFields;
    }

    if (methodsOptions.length > 0 || serviceOptions) {
      servicesOptions.push(code`
        '${service.name}': {
          options: ${serviceOptions},
          methods: {${joinCode(methodsOptions, { on: "," })}}
        }
      `);
    }
  });

  const enumsOptions: Code[] = [];
  (fileDesc.enumType || []).forEach((Enum) => {
    const valuesOptions: Code[] = [];
    Enum.value.forEach((value) => {
      if (value.options) {
        const valueOptions = encodedOptionsToOptions(
          ctx,
          ".google.protobuf.EnumValueOptions",
          value.options._unknownFields,
        );
        delete value.options._unknownFields;
        if (valueOptions) {
          valuesOptions.push(code`'${value.name}': ${valueOptions}`);
        }
      }
    });

    let enumOptions: Code | undefined;
    if (Enum.options) {
      enumOptions = encodedOptionsToOptions(ctx, ".google.protobuf.EnumOptions", Enum.options._unknownFields);
      delete Enum.options._unknownFields;
    }

    if (valuesOptions.length > 0 || enumOptions) {
      enumsOptions.push(code`
        '${Enum.name}': {
          options: ${enumOptions},
          values: {${joinCode(valuesOptions, { on: "," })}}
        }
      `);
    }
  });

  chunks.push(code`
    export const ${def("protoMetadata")}: ProtoMetadata = {
      ${
        ctx.options.outputSchema !== "no-file-descriptor"
          ? `fileDescriptor: ${fileDescriptorProto}.fromPartial(${descriptor}),\n`
          : ""
      }references: { ${joinCode(references, { on: "," })} },
      dependencies: [${joinCode(dependencies, { on: "," })}],
      ${
        fileOptions || messagesOptions.length > 0 || servicesOptions.length > 0 || enumsOptions.length > 0
          ? code`options: {
          ${fileOptions ? code`options: ${fileOptions},` : ""}
          ${messagesOptions.length > 0 ? code`messages: {${joinCode(messagesOptions, { on: "," })}},` : ""}
          ${servicesOptions.length > 0 ? code`services: {${joinCode(servicesOptions, { on: "," })}},` : ""}
          ${enumsOptions.length > 0 ? code`enums: {${joinCode(enumsOptions, { on: "," })}}` : ""}
        }`
          : ""
      }
    }
  `);

  return chunks;
}

function getExtensionValue(ctx: Context, extension: FieldDescriptorProto, data: Uint8Array[]): Code {
  if (extension.type == FieldDescriptorProto_Type.TYPE_MESSAGE) {
    const typeName = basicTypeName(ctx, extension);
    const resultBuffer = Buffer.concat(
      data.map((d) => {
        // Skip length byte
        const reader = new Reader(d);
        reader.uint32();
        return (reader.buf as Buffer).slice(reader.pos);
      }),
    );
    const result = resultBuffer.toString("base64");
    return code`'${extension.name}': ${typeName}.decode(Buffer.from('${result}', 'base64'))`;
  } else {
    const reader = new Reader(data[0]);
    let value = (reader as any)[toReaderCall(extension)]();
    if (typeof value === "string") {
      value = code`"${value}"`;
    }
    return code`'${extension.name}': ${value}`;
  }
}

/** Takes the protoc's input of options as proto-encoded messages, and turns them into embedded-able-in-source-code representations. */
function encodedOptionsToOptions(
  ctx: Context,
  extendee: string,
  encodedOptions?: { [key: number]: Uint8Array[] },
): Code | undefined {
  if (!encodedOptions) {
    return undefined;
  }
  const resultOptions: Code[] = [];
  for (const key in encodedOptions) {
    const value = encodedOptions[key];
    const extension = extensionCache[extendee][parseInt(key, 10) >>> 3];
    if (shouldAddOptionDefinition(ctx, extension)) {
      // todo: we should be able to create an option definition ALWAYS, however,
      // we currently cannot do that because the if the extension is a sub-message
      // (and thus, not just a straightforward value), we don't have an JSON object
      // representation of the option - just it's encoded value. Our approach in
      // getExtensionValue is to decode the encoded value into a message, but this
      // Message.decode(...) method is not always included in the generated code.
      // We should fix this so that we can always create an option definition by
      // somehow premptively decoding the encoded value and then inserting it into
      // the option defintion.
      // please refer to inteegration/options-types-only to see this in action
      resultOptions.push(getExtensionValue(ctx, extension, value));
    }
  }
  if (resultOptions.length == 0) {
    return undefined;
  }
  return code`{${joinCode(resultOptions, { on: "," })}}`;
}

function shouldAddOptionDefinition(ctx: Context, extension: FieldDescriptorProto) {
  return (
    extension.type !== FieldDescriptorProto_Type.TYPE_MESSAGE ||
    ctx.options.outputEncodeMethods === true ||
    ctx.options.outputEncodeMethods == "decode-only"
  );
}

function resolveMessageOptions(ctx: Context, message: DescriptorProto): Code | undefined {
  const fieldsOptions: Code[] = [];
  message.field.forEach((field) => {
    if (field.options) {
      const fieldOptions = encodedOptionsToOptions(ctx, ".google.protobuf.FieldOptions", field.options._unknownFields);
      delete field.options._unknownFields;
      if (fieldOptions) {
        fieldsOptions.push(code`'${field.name}': ${fieldOptions}`);
      }
    }
  });

  const oneOfsOptions: Code[] = [];
  message.oneofDecl.forEach((oneOf) => {
    if (oneOf.options) {
      const oneOfOptions = encodedOptionsToOptions(ctx, ".google.protobuf.OneofOptions", oneOf.options._unknownFields);
      delete oneOf.options._unknownFields;
      if (oneOfOptions) {
        oneOfsOptions.push(code`'${oneOf.name}': ${oneOfOptions}`);
      }
    }
  });

  let nestedOptions: Code[] = [];
  if (message.nestedType && message.nestedType.length > 0) {
    message.nestedType.forEach((nested) => {
      const resolvedMessage = resolveMessageOptions(ctx, nested);
      if (resolvedMessage) {
        nestedOptions.push(resolvedMessage);
      }
    });
  }

  let messageOptions: Code | undefined;
  if (message.options) {
    messageOptions = encodedOptionsToOptions(ctx, ".google.protobuf.MessageOptions", message.options._unknownFields);
    delete message.options._unknownFields;
  }

  if (fieldsOptions.length > 0 || oneOfsOptions.length > 0 || nestedOptions.length > 0 || messageOptions) {
    return code`
      '${message.name}': {
        ${messageOptions ? code`options: ${messageOptions},` : ""}
        ${fieldsOptions.length > 0 ? code`fields: {${joinCode(fieldsOptions, { on: "," })}},` : ""}
        ${oneOfsOptions.length > 0 ? code`oneof: {${joinCode(oneOfsOptions, { on: "," })}},` : ""}
        ${nestedOptions.length > 0 ? code`nested: {${joinCode(nestedOptions, { on: "," })}},` : ""}
      }
    `;
  }
}
