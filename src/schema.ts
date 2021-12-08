import {
  DescriptorProto,
  FileDescriptorProto,
  FieldDescriptorProto,
  FieldDescriptorProto_Type,
} from 'ts-proto-descriptors';
import { imp, code, Code, joinCode, def } from 'ts-poet';
import { visit, visitServices } from './visit';
import { Context } from './context';
import SourceInfo from './sourceInfo';
import { maybePrefixPackage } from './utils';
import { messageToTypeName, toReaderCall } from './types';
import { Reader } from 'protobufjs/minimal';

const fileDescriptorProto = imp('FileDescriptorProto@ts-proto-descriptors');

const extensionCache: { [key: string]: FieldDescriptorProto } = {};

export function generateSchema(ctx: Context, fileDesc: FileDescriptorProto, sourceInfo: SourceInfo): Code[] {
  const { options } = ctx;
  const chunks: Code[] = [];

  fileDesc.extension.forEach((extension) => {
    extensionCache[extension.number] = extension;
  });

  chunks.push(code`
    type ProtoMetaMessageOptions = {
      options?: { [key: string]: any };
      fields?: { [key: string]: { [key: string]: any } };
      oneof?: { [key: string]: { [key: string]: any } };
      nested?: { [key: string]: ProtoMetaMessageOptions };
    };

    export interface ProtoMetadata {
      fileDescriptor: ${fileDescriptorProto};
      references: { [key: string]: any };
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
    references.push(code`'.${maybePrefixPackage(fileDesc, localName.replace(/_/g, '.'))}': ${symbol}`);
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
    }
  );

  visitServices(fileDesc, sourceInfo, (serviceDesc) => {
    if (options.outputClientImpl) {
      addReference(serviceDesc.name, `${serviceDesc.name}ClientImpl`);
    }
  });

  const dependencies = fileDesc.dependency.map((dep) => {
    return code`${imp(`protoMetadata@./${dep.replace('.proto', '')}`)}`;
  });

  // Use toObject so that we get enums as numbers (instead of the default toJSON behavior)
  const descriptor = { ...fileDesc };

  // Only keep locations that include comments
  descriptor.sourceCodeInfo = {
    location:
      descriptor.sourceCodeInfo?.location.filter((loc) => loc['leadingComments'] || loc['trailingComments']) || [],
  };

  let fileOptions: Code | undefined;
  if (descriptor.options) {
    fileOptions = encodedOptionsToOptions(ctx, (descriptor.options as any)['encodedOptions']);
    delete (descriptor.options as any)['encodedOptions'];
  }

  const messagesOptions: Code[] = [];
  descriptor.messageType.forEach((message) => {
    const resolvedMessage = resolveMessageOptions(ctx, message);
    if (resolvedMessage) {
      messagesOptions.push(resolvedMessage);
    }
  });

  const servicesOptions: Code[] = [];
  descriptor.service.forEach((service) => {
    const methodsOptions: Code[] = [];
    service.method.forEach((method) => {
      if (method.options) {
        const methodOptions = encodedOptionsToOptions(ctx, (method.options as any)['encodedOptions']);
        delete (method.options as any)['encodedOptions'];
        if (methodOptions) {
          methodsOptions.push(code`'${method.name}': ${methodOptions}`);
        }
      }
    });

    let serviceOptions: Code | undefined;
    if (service.options) {
      serviceOptions = encodedOptionsToOptions(ctx, (service.options as any)['encodedOptions']);
      delete (service.options as any)['encodedOptions'];
    }

    if (methodsOptions.length > 0 || serviceOptions) {
      servicesOptions.push(code`
        '${service.name}': {
          options: ${serviceOptions},
          methods: {${joinCode(methodsOptions, { on: ',' })}}
        }
      `);
    }
  });

  const enumsOptions: Code[] = [];
  descriptor.enumType.forEach((Enum) => {
    const valuesOptions: Code[] = [];
    Enum.value.forEach((value) => {
      if (value.options) {
        const valueOptions = encodedOptionsToOptions(ctx, (value.options as any)['encodedOptions']);
        delete (value.options as any)['encodedOptions'];
        if (valueOptions) {
          valuesOptions.push(code`'${value.name}': ${valueOptions}`);
        }
      }
    });

    let enumOptions: Code | undefined;
    if (Enum.options) {
      enumOptions = encodedOptionsToOptions(ctx, (Enum.options as any)['encodedOptions']);
      delete (Enum.options as any)['encodedOptions'];
    }

    if (valuesOptions.length > 0 || enumOptions) {
      enumsOptions.push(code`
        '${Enum.name}': {
          options: ${enumOptions},
          values: {${joinCode(valuesOptions, { on: ',' })}}
        }
      `);
    }
  });

  chunks.push(code`
    export const ${def('protoMetadata')}: ProtoMetadata = {
      fileDescriptor: ${fileDescriptorProto}.fromPartial(${descriptor}),
      references: { ${joinCode(references, { on: ',' })} },
      dependencies: [${joinCode(dependencies, { on: ',' })}],
      ${
        fileOptions || messagesOptions.length > 0 || servicesOptions.length > 0 || enumsOptions.length > 0
          ? `options: {
          ${fileOptions ? `options: ${fileOptions},` : ''}
          ${messagesOptions.length > 0 ? `messages: {${joinCode(messagesOptions, { on: ',' })}},` : ''}
          ${servicesOptions.length > 0 ? `services: {${joinCode(servicesOptions, { on: ',' })}},` : ''}
          ${enumsOptions.length > 0 ? `enums: {${joinCode(enumsOptions, { on: ',' })}}` : ''}
        }`
          : ''
      }
    }
  `);

  return chunks;
}

function getExtensionValue(ctx: Context, extension: FieldDescriptorProto, data: Uint8Array[]): Code {
  if (extension.type == FieldDescriptorProto_Type.TYPE_MESSAGE) {
    const typeName = messageToTypeName(ctx, extension.typeName);
    const resultBuffer = Buffer.concat(
      data.map((d) => {
        // Skip length byte
        const reader = new Reader(d);
        reader.uint32();
        return (reader.buf as Buffer).slice(reader.pos);
      })
    );
    const result = resultBuffer.toString('base64');
    return code`'${extension.name}': ${typeName}.decode(Buffer.from('${result}', 'base64'))`;
  } else {
    const reader = new Reader(data[0]);
    let value = (reader as any)[toReaderCall(extension)]();
    if (typeof value === 'string') {
      value = `"${value}"`;
    }
    return code`'${extension.name}': ${value}`;
  }
}

function encodedOptionsToOptions(ctx: Context, encodedOptions: { [key: number]: Uint8Array[] }): Code | undefined {
  const resultOptions: Code[] = [];
  for (const key of Object.keys(encodedOptions)) {
    const extension = extensionCache[key];
    resultOptions.push(getExtensionValue(ctx, extension, encodedOptions[key as any]));
  }
  if (resultOptions.length == 0) {
    return undefined;
  }
  return code`{${joinCode(resultOptions, { on: ',' })}}`;
}

function resolveMessageOptions(ctx: Context, message: DescriptorProto): Code | undefined {
  const fieldsOptions: Code[] = [];
  message.field.forEach((field) => {
    if (field.options) {
      const fieldOptions = encodedOptionsToOptions(ctx, (field.options as any)['encodedOptions']);
      delete (field.options as any)['encodedOptions'];
      if (fieldOptions) {
        fieldsOptions.push(code`'${field.name}': ${fieldOptions}`);
      }
    }
  });

  const oneOfsOptions: Code[] = [];
  message.oneofDecl.forEach((oneOf) => {
    if (oneOf.options) {
      const oneOfOptions = encodedOptionsToOptions(ctx, (oneOf.options as any)['encodedOptions']);
      delete (oneOf.options as any)['encodedOptions'];
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
    messageOptions = encodedOptionsToOptions(ctx, (message.options as any)['encodedOptions']);
    delete (message.options as any)['encodedOptions'];
  }

  if (fieldsOptions.length > 0 || oneOfsOptions.length > 0 || nestedOptions.length > 0 || messageOptions) {
    return code`
      '${message.name}': {
        ${messageOptions ? `options: ${messageOptions},` : ''}
        ${fieldsOptions.length > 0 ? `fields: {${joinCode(fieldsOptions, { on: ',' })}},` : ''}
        ${oneOfsOptions.length > 0 ? `oneof: {${joinCode(oneOfsOptions, { on: ',' })}},` : ''}
        ${nestedOptions.length > 0 ? `nested: {${joinCode(nestedOptions, { on: ',' })}},` : ''}
      }
    `;
  }
}
