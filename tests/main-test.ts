import { google } from '../build/pbjs';
import { messageToTypeName } from '../src/types';
import { TypeNames } from 'ts-poet';
import DescriptorProto = google.protobuf.DescriptorProto;

const fakeProto = (undefined as any) as DescriptorProto;

describe('main', () => {
  describe('messageToTypeName', () => {
    it('handles top-level messages', () => {
      // these are not very useful tests now that this is just a map lookup
      const typeMap = new Map<string, [string, string, DescriptorProto]>();
      typeMap.set('namespace.Message', ['namespace', 'Message', fakeProto]);
      expect(messageToTypeName(typeMap, '.namespace.Message')).toEqual(TypeNames.anyType('Message@./namespace'));
    });

    it('handles nested messages', () => {
      const typeMap = new Map<string, [string, string, DescriptorProto]>();
      typeMap.set('namespace.Message.Inner', ['namespace', 'Message_Inner', fakeProto]);
      expect(messageToTypeName(typeMap, '.namespace.Message.Inner')).toEqual(
        TypeNames.anyType('Message_Inner@./namespace')
      );
    });

    it('handles value types', () => {
      const typeMap = new Map<string, [string, string, DescriptorProto]>();
      expect(messageToTypeName(typeMap, '.google.protobuf.StringValue')).toEqual(
        TypeNames.unionType(TypeNames.STRING, TypeNames.UNDEFINED)
      );
    });
  });
});
