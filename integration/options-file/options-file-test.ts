import { Event, Status } from "./options-file";

describe("options-file", () => {
  const event: Event = {
    eventId: "e1",
    createdAt: "2024-01-02T03:04:05.678Z",
    status: Status.STATUS_ACTIVE,
  };

  it("uses the options from the file", () => {
    expect(Status.STATUS_ACTIVE).toEqual("STATUS_ACTIVE");
    expect(Event.decode(Event.encode(event).finish())).toEqual(event);
    expect(Event.toJSON(event)).toEqual(event);
  });
});
