import {
  basicTypeName,
  detectMapType,
  isMessage,
  isRepeated,
  isWithinOneOf,
  messageToTypeName,
  responseType,
  toReaderCall,
  TypeMap,
} from './types';
import SourceInfo from './sourceInfo';
import { Any, CodeBlock, InterfaceSpec, Member, Modifier, PropertySpec, TypeName, TypeNames, Union } from 'ts-poet';
import { maybeSnakeToCamel } from './case';
import { OneofOption, Options } from './main';
import { google } from '../build/pbjs';
import DescriptorProto = google.protobuf.DescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;

export function getMetaInterfaces() {
  return [
    InterfaceSpec.create('MetaBase')
      .addModifiers(Modifier.EXPORT)
      .addProperty(
        PropertySpec.create(
          'kind',
          TypeNames.unionType(`'object'`, `'array'`, `'map'`, `'union'`, `'builtin'`),
          false,
          Modifier.READONLY
        )
      ),
    InterfaceSpec.create('MetaMessage')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaBase'))
      .addProperty(PropertySpec.create('kind', TypeNames.anyType(`'object'`), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('type', TypeNames.STRING, false, Modifier.READONLY))
      .addProperty(PropertySpec.create('name', TypeNames.STRING, false, Modifier.READONLY)),
    InterfaceSpec.create('MetaArray')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaBase'))
      .addProperty(PropertySpec.create('kind', TypeNames.anyType(`'array'`), false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create('type', TypeNames.unionType('MetaBase', TypeNames.STRING), false, Modifier.READONLY)
      ),
    InterfaceSpec.create('MetaMap')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaBase'))
      .addProperty(PropertySpec.create('kind', TypeNames.anyType(`'map'`), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('key', TypeNames.STRING, false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create('value', TypeNames.unionType('MetaBase', TypeNames.STRING), false, Modifier.READONLY)
      ),
    InterfaceSpec.create('MetaUnion')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaBase'))
      .addProperty(PropertySpec.create('kind', TypeNames.anyType(`'union'`), false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create(
          'choices',
          TypeNames.arrayType(TypeNames.unionType('MetaBase', TypeNames.STRING, TypeNames.UNDEFINED)),
          false,
          Modifier.READONLY
        )
      ),
    InterfaceSpec.create('MetaService')
      .addModifiers(Modifier.EXPORT)
      .addTypeVariable(TypeNames.typeVariable('T'))
      .addTypeVariable(TypeNames.typeVariable('R'))
      .addProperty(PropertySpec.create('request', TypeNames.anyType('MetaMessage'), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('response', TypeNames.anyType('MetaMessage'), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('clientStreaming', TypeNames.BOOLEAN, false, Modifier.READONLY))
      .addProperty(PropertySpec.create('serverStreaming', TypeNames.BOOLEAN, false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create(
          'encodeRequest',
          TypeNames.lambda2(
            [
              ['message', TypeNames.typeVariable('T')],
              ['writer', TypeNames.anyType('Writer')],
            ],
            TypeNames.anyType('Writer')
          ),
          true,
          Modifier.READONLY
        )
      )
      .addProperty(
        PropertySpec.create(
          'decodeResponse',
          TypeNames.lambda2(
            [
              ['input', TypeNames.unionType('Uint8Array', 'Reader')],
              ['length?', TypeNames.NUMBER],
            ],
            TypeNames.typeVariable('R')
          ),
          true,
          Modifier.READONLY
        )
      ),
    InterfaceSpec.create('MetaPrimitive')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaBase'))
      .addProperty(PropertySpec.create('kind', TypeNames.anyType(`'builtin'`), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('type', TypeNames.STRING, false, Modifier.READONLY))
      .addProperty(PropertySpec.create('original', TypeNames.STRING, false, Modifier.READONLY)),
  ];
}

export function generateMetaTypings(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  sourceInfo: SourceInfo,
  options: Options
): PropertySpec {
  const metaTypings = PropertySpec.create(
    'meta' + fullName,
    TypeNames.anonymousType(
      new Member(`[key in keyof Required<${fullName}>]`, TypeNames.unionType('MetaBase', 'string'), false)
    )
  ).addModifiers(Modifier.EXPORT, Modifier.CONST);

  let initialValue = CodeBlock.empty().beginHash();
  messageDesc.field.forEach((field) => {
    initialValue = initialValue.addHashEntry(
      maybeSnakeToCamel(field.name, options),
      toMetaType(typeMap, messageDesc, field, options)
    );
  });

  return metaTypings.initializerBlock(initialValue.endHash());
}

export function generateServiceMetaTypings(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): PropertySpec {
  const metaTypings = PropertySpec.create(
    'meta' + serviceDesc.name,
    TypeNames.anonymousType(
      new Member(`[key in keyof ${serviceDesc.name}]`, TypeNames.anyType('MetaService<any, any>'), false)
    )
  ).addModifiers(Modifier.EXPORT, Modifier.CONST);

  let initialValue = CodeBlock.empty().beginHash();

  serviceDesc.method.forEach((method) => {
    const inputType = messageToTypeName(typeMap, method.inputType, options);
    const outputType = responseType(typeMap, method, options);

    let inner = ``;
    if (inputType instanceof Any && inputType.imported) {
      inner += `request: {kind:'object', type:'${method.inputType}', name:'${inputType.imported.value}'} as MetaMessage`;
    } else {
      inner += `request: {kind:'object', type:'${method.inputType}', name:''} as MetaMessage`;
    }

    if (outputType instanceof Any && outputType.imported) {
      inner += `, response: {kind:'object', type:'${method.outputType}', name:'${outputType.imported.value}'} as MetaMessage`;
    } else {
      inner += `, response: {kind:'object', type:'${method.outputType}', name:''} as MetaMessage`;
    }

    inner += `, clientStreaming: ${method.clientStreaming}`;
    inner += `, serverStreaming: ${method.serverStreaming}`;

    if (options.outputEncodeMethods) {
      inner += `, encodeRequest: ${inputType.toString()}.encode`;
      inner += `, decodeResponse: ${outputType.toString()}.decode`;
    }

    initialValue = initialValue.addHashEntry(
      method.name,
      `{${inner}} as MetaService<${inputType.toString()}, ${outputType.toString()}>`
    );
  });

  return metaTypings.initializerBlock(initialValue.endHash());
}

export function generateMetaTable(
  properties: { name: string; proto: string; obj: string; type: 'service' | 'message' | 'enum' }[],
  packageName: string
): PropertySpec {
  const metaTable = PropertySpec.create(
    'metadata',
    TypeNames.anonymousType(
      new Member(
        `[key: string]`,
        TypeNames.unionType(
          TypeNames.anyType(`['service', string, any, { [key: string]: MetaService<any, any> }]`),
          TypeNames.anyType(`['enum', string, any, any]`),
          TypeNames.anyType(`['message', string, any, { [key: string]: MetaBase | string }]`)
        ),
        false
      )
    )
  ).addModifiers(Modifier.EXPORT, Modifier.CONST);

  let initialValue = CodeBlock.empty().beginHash();
  properties.forEach((property) => {
    initialValue = initialValue.addHashEntry(
      property.proto,
      `['${property.type}', '.${packageName}.${property.proto.replace(/_/g, '.')}', ${property.obj}, ${property.name}]`
    );
  });

  return metaTable.initializerBlock(initialValue.endHash());
}

function toMetaType(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  options: Options
): string {
  const type = basicTypeName(typeMap, field, options, { keepValueType: false });
  const strType = metaTypeType(field, type);

  if (isRepeated(field)) {
    const mapType = detectMapType(typeMap, messageDesc, field, options);
    if (mapType) {
      let { keyType, valueType } = mapType;
      const value = metaTypeType(mapType.messageDesc.field[1], valueType);
      return `{kind:'map', key:'${keyType}', value:${value}} as MetaMap`;
    }

    return `{kind:'array', type:${strType}} as MetaArray`;
  }

  if (
    (!isWithinOneOf(field) && isMessage(field) && !options.useOptionals) ||
    (isWithinOneOf(field) && options.oneof === OneofOption.PROPERTIES) ||
    (isWithinOneOf(field) && field.proto3Optional)
  ) {
    return `{kind:'union', choices: [undefined, ${strType}]} as MetaUnion`;
  }

  return strType;
}

function metaTypeType(field: FieldDescriptorProto, type: TypeName): string {
  if (type instanceof Union) {
    let resultString = '';
    type.typeChoices.forEach((choice) => {
      if (resultString !== '') {
        resultString += ', ';
      }

      resultString += `'${choice.toString()}'`;
    });
    return `{kind:'union', choices: [${resultString.toString()}]} as MetaUnion`;
  } else if (type instanceof Any && type.imported) {
    return `{kind:'object', type:'${field.typeName}', name:'${type.imported.value}'} as MetaMessage`;
  } else {
    switch (type.toString()) {
      case 'function':
      case 'undefined':
      case 'object':
      case 'symbol':
        break;
      default:
        let original = '';
        try {
          original = toReaderCall(field);
        } catch (e) {
          original = field.typeName;
        }
        return `{kind:'builtin', type:'${type.toString()}', original:'${original}'} as MetaPrimitive`;
    }
  }
  return type.toString();
}
