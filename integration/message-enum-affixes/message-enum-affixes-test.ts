import { EAwesomeEnumKind, MsgAwesomeMessageData, MsgAwesomeMessage_InnerData } from "./message-enum-affixes";

describe("message and enum affixes", () => {
  it("affixes messages and enums separately", () => {
    const message = MsgAwesomeMessageData.fromPartial({
      inner: MsgAwesomeMessage_InnerData.fromPartial({ kind: EAwesomeEnumKind.AWESOME_ENUM_COOL }),
      kind: EAwesomeEnumKind.AWESOME_ENUM_COOL,
      value: null,
      timestamp: new Date(1000),
      guint64: 5,
    });

    const decoded = MsgAwesomeMessageData.decode(MsgAwesomeMessageData.encode(message).finish());

    expect(decoded).toEqual(message);
    expect(MsgAwesomeMessageData.toJSON(decoded)).toEqual({
      inner: { kind: "AWESOME_ENUM_COOL" },
      kind: "AWESOME_ENUM_COOL",
      value: null,
      timestamp: "1970-01-01T00:00:01.000Z",
      guint64: 5,
    });
  });
});
