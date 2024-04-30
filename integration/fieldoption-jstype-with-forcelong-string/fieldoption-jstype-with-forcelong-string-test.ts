import { FieldOption } from "./fieldoption-jstype-with-forcelong-string";
import { hexToUint8Array, uint8ArrayToHex } from "../utils";

describe("FieldOption jstype with ForceLong string", () => {
  describe("encode", () => {
    it("should encode the message", () => {
      const message: FieldOption = {
        normalField: "123",
        numberField: 456,
        stringField: "789",
      };

      const writer = FieldOption.encode(message);
      const buffer = writer.finish();

      expect(uint8ArrayToHex(buffer)).toEqual("087b10c803189506");
    });
  });

  describe("decode", () => {
    it("should decode the message", () => {
      const buffer = hexToUint8Array("087b10c803189506");

      const decodedMessage = FieldOption.decode(buffer);

      expect(decodedMessage).toEqual({
        normalField: "123",
        numberField: 456,
        stringField: "789",
      });
    });
  });

  describe("fromJSON", () => {
    it("should create a message from JSON", () => {
      const json = {
        normalField: "123",
        numberField: "456",
        stringField: "789",
      };

      const message = FieldOption.fromJSON(json);

      expect(message).toEqual({
        normalField: "123",
        numberField: 456,
        stringField: "789",
      });
    });
  });

  describe("toJSON", () => {
    it("should convert the message to JSON", () => {
      const message: FieldOption = {
        normalField: "123",
        numberField: 456,
        stringField: "789",
      };

      const json = FieldOption.toJSON(message);

      expect(json).toEqual({
        normalField: "123",
        numberField: 456,
        stringField: "789",
      });
    });
  });

  describe("create", () => {
    it("should create a message with default values", () => {
      const message = FieldOption.create();

      expect(message).toEqual({
        normalField: "0",
        numberField: 0,
        stringField: "0",
      });
    });

    it("should create a message with provided values", () => {
      const message = FieldOption.create({
        normalField: "123",
        numberField: 456,
        stringField: "789",
      });

      expect(message).toEqual({
        normalField: "123",
        numberField: 456,
        stringField: "789",
      });
    });
  });

  describe("fromPartial", () => {
    it("should create a message from a partial object", () => {
      const partial = FieldOption.fromPartial({
        normalField: "123",
        numberField: 456,
      });

      expect(partial).toEqual({
        normalField: "123",
        numberField: 456,
        stringField: "0",
      });
    });
  });
});
