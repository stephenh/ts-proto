import { imp, code, Code, joinCode } from 'ts-poet';
import { google } from '../build/pbjs';
import { ImportsName } from 'ts-poet/build/Import';
import { visit, visitServices } from './visit';
import { Context } from './context';
import SourceInfo from './sourceInfo';
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import IFileDescriptorProto = google.protobuf.IFileDescriptorProto;

export function generateSchema(ctx: Context, fileDesc: FileDescriptorProto, sourceInfo: SourceInfo): Code[] {
  const { options } = ctx;
  const chunks: Code[] = [];

  chunks.push(code`
    export interface ProtoMetadata {
      fileDescriptor: ${imp('IFileDescriptorProto@protobufjs/ext/descriptor')};
      references: { [key: string]: any };
      dependencies?: ProtoMetadata[];
    }
  `);

  const outputFileDesc: IFileDescriptorProto = {
    ...fileDesc,
    sourceCodeInfo: null,
  };

  if (fileDesc.sourceCodeInfo) {
    outputFileDesc.sourceCodeInfo = {
      location: fileDesc.sourceCodeInfo.location.filter((loc) => loc['leadingComments'] || loc['trailingComments']),
    } as any;
  }

  const references: Code[] = [];
  function addReference(localName: string, symbol: string): void {
    references.push(code`'.${fileDesc.package}.${localName.replace(/_/g, '.')}': ${symbol}`);
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
    const mod = dep.replace('.proto', '');
    const localName = mod.replace(/\//g, '_') + '_protoMetadata';
    return code`${new ImportsName(localName, './' + mod, 'protoMetadata')}`;
  });

  chunks.push(code`
    export const protoMetadata: ProtoMetadata = {
      fileDescriptor: ${outputFileDesc} as any,
      references: { ${joinCode(references, { on: ',' })} },
      dependencies: [${joinCode(dependencies, { on: ',' })}],
    }
  `);

  return chunks;
}
