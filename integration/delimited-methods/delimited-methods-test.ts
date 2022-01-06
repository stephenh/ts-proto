import { Reader, Writer } from 'protobufjs';
import { AnotherSimple, Simple } from './delimited-methods';

describe('delimited-methods', () => {
  // normal size
  const messageA = Simple.fromPartial({
    age: 42,
    name: 'John Doe',
    children: ['Jane', 'Jack', 'Joe'],
  });

  // big size
  const messageB = Simple.fromPartial({
    age: 2147483647, // max int32
    name: 'A Very Long Name',
    children: ['Jane', 'Jack', 'Joe', 'Jill', 'Jane Jr.', 'Jack Jr.', 'Joe Jr.', 'Jill Jr.'],
  });

  // minimum size
  const messageC = Simple.fromPartial({});

  // different message type
  const messageD = AnotherSimple.fromPartial({
    num: 2147483.75,
    str: 'A Very Long Name',
  });

  it('encodes with a length delimiter', () => {
    const encoded = Simple.encodeDelimited(messageA).finish();

    // -1 for the length delimiter
    const length = encoded.length - 1;
    const delimiter = encoded[0];

    expect(length).toEqual(delimiter);
  });

  it('decodes a length-delimited message', () => {
    const encoded = Simple.encodeDelimited(messageA).finish();
    const decoded = Simple.decodeDelimited(encoded);

    expect(decoded).toEqual(messageA);
  });

  it('decodes a stream of same length-delimited messages', () => {
    const writer = new Writer();
    const messages = [messageA, messageB, messageC, messageB];

    messages.forEach((msg) => Simple.encodeDelimited(msg, writer));

    const stream = writer.finish();

    const reader = new Reader(stream);

    const decodedMessages = messages.map(() => Simple.decodeDelimited(reader));

    expect(decodedMessages).toEqual(messages);
  });

  /**
   * Requires knowing the type order of messages beforehand
   *
   * Could also be done programmatically by checking for unique properties
   */
  it('decodes a stream of different length-delimited messages', () => {
    const writer = new Writer();

    const messages = [messageA, messageD, messageC, messageD] as const;

    Simple.encodeDelimited(messages[0], writer);
    AnotherSimple.encodeDelimited(messages[1], writer);
    Simple.encodeDelimited(messages[2], writer);
    AnotherSimple.encodeDelimited(messages[3], writer);

    const stream = writer.finish();

    const reader = new Reader(stream);

    const decodedMessages = [
      Simple.decodeDelimited(reader),
      AnotherSimple.decodeDelimited(reader),
      Simple.decodeDelimited(reader),
      AnotherSimple.decodeDelimited(reader),
    ];

    expect(decodedMessages).toEqual(messages);
  });
});
