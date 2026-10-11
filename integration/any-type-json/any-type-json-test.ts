import { Any } from "./google/protobuf/any";
import { Duration } from "./google/protobuf/duration";
import { Holder, Person } from "./any-type-json";

const personUrl = "type.googleapis.com/foo.bar.Person";
const person = Person.fromPartial({ firstName: "Ada", lastName: "Lovelace" });
const personAny = Any.fromPartial({ typeUrl: personUrl, value: Person.encode(person).finish() });

const durationUrl = "type.googleapis.com/google.protobuf.Duration";
const duration = Duration.fromPartial({ seconds: 3, nanos: 500 });
const durationAny = Any.fromPartial({ typeUrl: durationUrl, value: Duration.encode(duration).finish() });

describe("anyType=@type", () => {
  it("writes the packed message's fields next to @type", () => {
    expect(Any.toJSON(personAny)).toEqual({ "@type": personUrl, firstName: "Ada", lastName: "Lovelace" });
  });

  it("reads the packed message back from its fields", () => {
    const any = Any.fromJSON({ "@type": personUrl, firstName: "Ada", lastName: "Lovelace" });
    expect(any.typeUrl).toEqual(personUrl);
    expect(Person.decode(any.value)).toEqual(person);
  });

  it("puts a well-known type with its own JSON form under value", () => {
    const json = Any.toJSON(durationAny);
    expect(json).toEqual({ "@type": durationUrl, value: Duration.toJSON(duration) });
    expect(Duration.decode(Any.fromJSON(json).value)).toEqual(duration);
  });

  it("round-trips Any fields of other messages through JSON.stringify", () => {
    const holder = Holder.fromPartial({ item: personAny, items: [durationAny, personAny] });
    const json = JSON.parse(JSON.stringify(Holder.toJSON(holder)));
    expect(json.item).toEqual({ "@type": personUrl, firstName: "Ada", lastName: "Lovelace" });
    expect(Holder.fromJSON(json)).toEqual(holder);
  });

  it("writes an Any without a type as an empty object", () => {
    expect(Any.toJSON(Any.fromPartial({}))).toEqual({});
    expect(Any.fromJSON({})).toEqual(Any.fromPartial({}));
  });

  it("rejects types missing from the registry", () => {
    const unknown = Any.fromPartial({ typeUrl: "type.googleapis.com/foo.bar.Unknown" });
    expect(() => Any.toJSON(unknown)).toThrow("foo.bar.Unknown");
    expect(() => Any.fromJSON({ "@type": "type.googleapis.com/foo.bar.Unknown" })).toThrow("foo.bar.Unknown");
  });
});
