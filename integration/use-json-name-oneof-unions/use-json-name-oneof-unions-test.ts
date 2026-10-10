import { RoomMessage } from "./use-json-name-oneof-unions";

describe("useJsonName with oneof=unions", () => {
  it("names the union property after the oneof", () => {
    const message: RoomMessage = { action: { $case: "join", join: { roomId: "lobby" } } };
    expect(Object.keys(RoomMessage.create(message))).toEqual(["action"]);
  });

  it("round-trips every oneof case through encode/decode", () => {
    const messages: RoomMessage[] = [
      { action: { $case: "create", create: { name: "lobby" } } },
      { action: { $case: "join", join: { roomId: "lobby" } } },
      { action: { $case: "leaveReason", leaveReason: "done" } },
    ];
    for (const message of messages) {
      expect(RoomMessage.decode(RoomMessage.encode(message).finish())).toEqual(message);
    }
  });

  it("round-trips through toJSON/fromJSON", () => {
    const message: RoomMessage = { action: { $case: "join", join: { roomId: "lobby" } } };
    const json = RoomMessage.toJSON(message);
    expect(json).toEqual({ join: { roomId: "lobby" } });
    expect(RoomMessage.fromJSON(json)).toEqual(message);
  });

  it("copies the oneof in fromPartial", () => {
    const message: RoomMessage = { action: { $case: "create", create: { name: "lobby" } } };
    expect(RoomMessage.fromPartial(message)).toEqual(message);
  });
});
