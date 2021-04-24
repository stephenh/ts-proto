import { FileDescriptorProto } from 'ts-proto-descriptors';
import { imp, code, Code, joinCode, def } from 'ts-poet';
import { visit, visitServices } from './visit';
import { Context } from './context';
import SourceInfo from './sourceInfo';
import { maybePrefixPackage } from './utils';

const fileDescriptorProto = imp('FileDescriptorProto@ts-proto-descriptors');

export function generateSchema(ctx: Context, fileDesc: FileDescriptorProto, sourceInfo: SourceInfo): Code[] {
  const { options } = ctx;
  const chunks: Code[] = [];

  chunks.push(code`
    export interface ProtoMetadata {
      fileDescriptor: ${fileDescriptorProto};
      references: { [key: string]: any };
      dependencies?: ProtoMetadata[];
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

  chunks.push(code`
    export const ${def('protoMetadata')}: ProtoMetadata = {
      fileDescriptor: ${fileDescriptorProto}.fromPartial(${descriptor}),
      references: { ${joinCode(references, { on: ',' })} },
      dependencies: [${joinCode(dependencies, { on: ',' })}],
    }
  `);

  return chunks;
}
