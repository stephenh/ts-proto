import { Reader } from 'protobufjs';
import { OneOfMessage } from './simple';
import { simple as pbjs } from './pbjs';
import PbOneOfMessage = pbjs.OneOfMessage;

describe('simple', () => {
  it('can encode oneofs', () => {
    const s1: OneOfMessage = {
      first: 'bob',
      last: undefined,
    };
    const s2 = PbOneOfMessage.toObject(PbOneOfMessage.decode(OneOfMessage.encode(s1).finish()));
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "first": "bob",
      }
    `);
  });

  it('can decode oneofs', () => {
    const s1 = PbOneOfMessage.fromObject({
      last: 'smith',
    });
    const s2 = OneOfMessage.decode(Reader.create(PbOneOfMessage.encode(s1).finish()));
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "first": undefined,
        "last": "smith",
      }
    `);
  });

  it('can encode oneofs to json', () => {
    const s1: OneOfMessage = {
      first: 'bob',
      last: undefined,
    };
    const ourJson = s1;
    const pbJson = PbOneOfMessage.decode(OneOfMessage.encode(s1).finish()).toJSON();
    expect(ourJson).toEqual(pbJson);
  });

  it('can decode oneofs from json', () => {
    const s1 = PbOneOfMessage.fromObject({
      last: 'smith',
    });
    const fromJson = s1.toJSON() as OneOfMessage;
    const fromPb = OneOfMessage.decode(Reader.create(PbOneOfMessage.encode(s1).finish()));
    expect(fromJson).toEqual(fromPb);
  });
});
