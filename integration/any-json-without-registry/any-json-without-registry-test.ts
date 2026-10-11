import { Any } from "./google/protobuf/any";
import { Duration } from "./google/protobuf/duration";
import { Holder, Person } from "./any-json-without-registry";

const personUrl = "type.googleapis.com/foo.bar.Person";
const person = Person.fromPartial({ firstName: "Ada", lastName: "Lovelace" });
const personBytes = Person.encode(person).finish();
const personAny = Any.fromPartial({ typeUrl: personUrl, value: personBytes });

const durationUrl = "type.googleapis.com/google.protobuf.Duration";
const durationAny = Any.fromPartial({
  typeUrl: durationUrl,
  value: Duration.encode(Duration.fromPartial({ seconds: 3, nanos: 500 })).finish(),
});

// Without the type registry the default anyType=@type cannot convert the packed message, so
// Any keeps the typeUrl/value form.
describe("anyType=@type without outputTypeRegistry", () => {
  it("writes the type URL and the base64 encoded bytes", () => {
    expect(Any.toJSON(personAny)).toEqual({ typeUrl: personUrl, value: Buffer.from(personBytes).toString("base64") });
  });

  it("reads the type URL and the base64 encoded bytes", () => {
    const any = Any.fromJSON({ typeUrl: personUrl, value: Buffer.from(personBytes).toString("base64") });
    expect(any.typeUrl).toEqual(personUrl);
    expect(Person.decode(any.value)).toEqual(person);
  });

  it("round-trips Any fields of other messages through JSON.stringify", () => {
    const holder = Holder.fromPartial({ item: personAny, items: [durationAny, personAny] });
    const json = JSON.parse(JSON.stringify(Holder.toJSON(holder)));
    expect(json.item).toEqual({ typeUrl: personUrl, value: Buffer.from(personBytes).toString("base64") });
    expect(Holder.fromJSON(json)).toEqual(holder);
  });

  it("converts any packed type", () => {
    const unknown = Any.fromPartial({ typeUrl: "type.googleapis.com/foo.bar.Unknown" });
    expect(Any.toJSON(unknown)).toEqual({ typeUrl: "type.googleapis.com/foo.bar.Unknown" });
  });
});
