import { mapMessageType } from "../src/main";
import { TypeNames } from "ts-poet";

describe('main', () => {
  describe('mapMessageType', () => {
    it('handles top-level messages', () => {
      expect(mapMessageType('.namespace.Message')).toEqual(TypeNames.anyType('Message@namespace'));
    });

    it('handles nested messages', () => {
      expect(mapMessageType('.namespace.Message.Inner')).toEqual(TypeNames.anyType('Message_Inner@namespace'));
    });
  });
});
