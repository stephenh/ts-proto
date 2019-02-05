import { mapMessageType } from '../src/main';
import { TypeNames } from 'ts-poet';

describe('main', () => {
  describe('mapMessageType', () => {
    it('handles top-level messages', () => {
      // these are not very useful tests now that this is just a map lookup
      const typeMap = new Map<string, [string, string]>();
      typeMap.set('.namespace.Message', ['Message', 'namespace']);
      expect(mapMessageType(typeMap, '.namespace.Message')).toEqual(TypeNames.anyType('Message@namespace'));
    });

    it('handles nested messages', () => {
      const typeMap = new Map<string, [string, string]>();
      typeMap.set('.namespace.Message.Inner', ['Message_Inner', 'namespace']);
      expect(mapMessageType(typeMap, '.namespace.Message.Inner')).toEqual(TypeNames.anyType('Message_Inner@namespace'));
    });
  });
});
