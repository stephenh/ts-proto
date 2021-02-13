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

  const values = [code`fileDescriptor: ${JSON.stringify(outputFileDesc)} as any`];

  const references: Code[] = [];
  visit(
    fileDesc,
    sourceInfo,
    (fullName, message, sInfo) => {
      if (options.outputEncodeMethods) {
        references.push(code`'.${fileDesc.package}.${fullName.replace(/_/g, '.')}': ${fullName}`);
      }
    },
    options,
    (fullName, enumDesc, sInfo) => {
      references.push(code`'.${fileDesc.package}.${fullName.replace(/_/g, '.')}': ${fullName}`);
    }
  );

  visitServices(fileDesc, sourceInfo, (serviceDesc, sInfo) => {
    if (options.outputClientImpl) {
      references.push(
        code`'.${fileDesc.package}.${serviceDesc.name.replace(/_/g, '.')}': ${serviceDesc.name}ClientImpl`
      );
    }
  });

  values.push(code`
      references: {${joinCode(references, { on: ',\n' })}}
    `);

  if (fileDesc.dependency) {
    const dependencies = fileDesc.dependency.map((dep) => {
      const mod = dep.replace('.proto', '');
      const localName = mod.replace(/\//g, '_') + '_protoMetadata';
      return code`${new ImportsName(localName, './' + mod, 'protoMetadata')}`;
    });

    values.push(code`dependencies: [${joinCode(dependencies, { on: ', ' })}]`);
  }

  chunks.push(code`
      export const protoMetadata: ProtoMetadata = {
        ${joinCode(values, { on: ',\n' })}
      }
    `);

  return chunks;
}
