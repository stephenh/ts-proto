import {
  Fixed64FieldOption,
  Int64FieldOption,
  SFixed64FieldOption,
  SInt64FieldOption,
  UInt64FieldOption,
} from "./fieldoption-jstype";
import { hexToUint8Array, uint8ArrayToHex } from "../utils";

describe("FieldOption jstype", () => {
  describe("Int64", () => {
    describe("encode", () => {
      it("should encode the message", () => {
        const message: Int64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const writer = Int64FieldOption.encode(message);
        const buffer = writer.finish();

        expect(uint8ArrayToHex(buffer)).toEqual("087b10c803189506");
      });
    });

    describe("decode", () => {
      it("should decode the message", () => {
        const buffer = hexToUint8Array("087b10c803189506");

        const decodedMessage = Int64FieldOption.decode(buffer);

        expect(decodedMessage).toEqual({
          normalField: 123,
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

        const message = Int64FieldOption.fromJSON(json);

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("toJSON", () => {
      it("should convert the message to JSON", () => {
        const message: Int64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const json = Int64FieldOption.toJSON(message);

        expect(json).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("create", () => {
      it("should create a message with default values", () => {
        const message = Int64FieldOption.create();

        expect(message).toEqual({
          normalField: 0,
          numberField: 0,
          stringField: "0",
        });
      });

      it("should create a message with provided values", () => {
        const message = Int64FieldOption.create({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("fromPartial", () => {
      it("should create a message from a partial object", () => {
        const partial = Int64FieldOption.fromPartial({
          normalField: 123,
          stringField: "789",
        });

        expect(partial).toEqual({
          normalField: 123,
          numberField: 0,
          stringField: "789",
        });
      });
    });
  });

  describe("UInt64", () => {
    describe("encode", () => {
      it("should encode the message", () => {
        const message: UInt64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const writer = UInt64FieldOption.encode(message);
        const buffer = writer.finish();

        expect(uint8ArrayToHex(buffer)).toEqual("087b10c803189506");
      });
    });

    describe("decode", () => {
      it("should decode the message", () => {
        const buffer = hexToUint8Array("087b10c803189506");

        const decodedMessage = UInt64FieldOption.decode(buffer);

        expect(decodedMessage).toEqual({
          normalField: 123,
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

        const message = UInt64FieldOption.fromJSON(json);

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("toJSON", () => {
      it("should convert the message to JSON", () => {
        const message: UInt64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const json = UInt64FieldOption.toJSON(message);

        expect(json).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("create", () => {
      it("should create a message with default values", () => {
        const message = UInt64FieldOption.create();

        expect(message).toEqual({
          normalField: 0,
          numberField: 0,
          stringField: "0",
        });
      });

      it("should create a message with provided values", () => {
        const message = UInt64FieldOption.create({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("fromPartial", () => {
      it("should create a message from a partial object", () => {
        const partial = UInt64FieldOption.fromPartial({
          normalField: 123,
          stringField: "789",
        });

        expect(partial).toEqual({
          normalField: 123,
          numberField: 0,
          stringField: "789",
        });
      });
    });
  });

  describe("SInt64", () => {
    describe("encode", () => {
      it("should encode the message", () => {
        const message: SInt64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const writer = SInt64FieldOption.encode(message);
        const buffer = writer.finish();

        expect(uint8ArrayToHex(buffer)).toEqual("08f60110900718aa0c");
      });
    });

    describe("decode", () => {
      it("should decode the message", () => {
        const buffer = hexToUint8Array("08f60110900718aa0c");

        const decodedMessage = SInt64FieldOption.decode(buffer);

        expect(decodedMessage).toEqual({
          normalField: 123,
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

        const message = SInt64FieldOption.fromJSON(json);

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("toJSON", () => {
      it("should convert the message to JSON", () => {
        const message: SInt64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const json = SInt64FieldOption.toJSON(message);

        expect(json).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("create", () => {
      it("should create a message with default values", () => {
        const message = SInt64FieldOption.create();

        expect(message).toEqual({
          normalField: 0,
          numberField: 0,
          stringField: "0",
        });
      });

      it("should create a message with provided values", () => {
        const message = SInt64FieldOption.create({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("fromPartial", () => {
      it("should create a message from a partial object", () => {
        const partial = SInt64FieldOption.fromPartial({
          normalField: 123,
          stringField: "789",
        });

        expect(partial).toEqual({
          normalField: 123,
          numberField: 0,
          stringField: "789",
        });
      });
    });
  });

  describe("Fixed64", () => {
    describe("encode", () => {
      it("should encode the message", () => {
        const message: Fixed64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const writer = Fixed64FieldOption.encode(message);
        const buffer = writer.finish();

        expect(uint8ArrayToHex(buffer)).toEqual("097b0000000000000011c801000000000000191503000000000000");
      });
    });

    describe("decode", () => {
      it("should decode the message", () => {
        const buffer = hexToUint8Array("097b0000000000000011c801000000000000191503000000000000");

        const decodedMessage = Fixed64FieldOption.decode(buffer);

        expect(decodedMessage).toEqual({
          normalField: 123,
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

        const message = Fixed64FieldOption.fromJSON(json);

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("toJSON", () => {
      it("should convert the message to JSON", () => {
        const message: Fixed64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const json = Fixed64FieldOption.toJSON(message);

        expect(json).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("create", () => {
      it("should create a message with default values", () => {
        const message = Fixed64FieldOption.create();

        expect(message).toEqual({
          normalField: 0,
          numberField: 0,
          stringField: "0",
        });
      });

      it("should create a message with provided values", () => {
        const message = Fixed64FieldOption.create({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("fromPartial", () => {
      it("should create a message from a partial object", () => {
        const partial = Fixed64FieldOption.fromPartial({
          normalField: 123,
          stringField: "789",
        });

        expect(partial).toEqual({
          normalField: 123,
          numberField: 0,
          stringField: "789",
        });
      });
    });
  });

  describe("SFixed64", () => {
    describe("encode", () => {
      it("should encode the message", () => {
        const message: SFixed64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const writer = SFixed64FieldOption.encode(message);
        const buffer = writer.finish();

        expect(uint8ArrayToHex(buffer)).toEqual("097b0000000000000011c801000000000000191503000000000000");
      });
    });

    describe("decode", () => {
      it("should decode the message", () => {
        const buffer = hexToUint8Array("097b0000000000000011c801000000000000191503000000000000");

        const decodedMessage = SFixed64FieldOption.decode(buffer);

        expect(decodedMessage).toEqual({
          normalField: 123,
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

        const message = SFixed64FieldOption.fromJSON(json);

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("toJSON", () => {
      it("should convert the message to JSON", () => {
        const message: SFixed64FieldOption = {
          normalField: 123,
          numberField: 456,
          stringField: "789",
        };

        const json = SFixed64FieldOption.toJSON(message);

        expect(json).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("create", () => {
      it("should create a message with default values", () => {
        const message = SFixed64FieldOption.create();

        expect(message).toEqual({
          normalField: 0,
          numberField: 0,
          stringField: "0",
        });
      });

      it("should create a message with provided values", () => {
        const message = SFixed64FieldOption.create({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });

        expect(message).toEqual({
          normalField: 123,
          numberField: 456,
          stringField: "789",
        });
      });
    });

    describe("fromPartial", () => {
      it("should create a message from a partial object", () => {
        const partial = SFixed64FieldOption.fromPartial({
          normalField: 123,
          stringField: "789",
        });

        expect(partial).toEqual({
          normalField: 123,
          numberField: 0,
          stringField: "789",
        });
      });
    });
  });
});
