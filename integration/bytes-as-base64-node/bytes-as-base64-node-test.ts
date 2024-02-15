import { Message } from './message';

describe('bytes-as-base64', () => {
  type TestData = [string, Buffer];
  const testData: TestData[] = [
    ['3q2+7w==',                 Buffer.from([0xDE, 0xAD, 0xBE, 0xEF])],
    ['AAAAAAAAAAAAAAAAAAAAAA==', Buffer.alloc(16).fill(0x00)],
    ['/////////////////////w==', Buffer.alloc(16).fill(0xFF)],
    ['AAECAwQFBgcICQoLDA0ODw==', Buffer.from(Array.from({length: 16}).map((_, i) => i))],
  ];

  it('fromJSON can decode bytes from base64', () => {
    for (const entry of testData) {
      const message = Message.fromJSON({ data: entry[0] });
      expect(message).toEqual({ data: entry[1] });
    }
  });

  it('toJSON can encode bytes as base64', () => {
    for (const entry of testData) {
      const message = Message.toJSON({ data: entry[1] });
      expect(message).toEqual({ data: entry[0] });
    }
  });

  it('fromJSON and toJSON can handle "large" bytes fields', () => {
    const LENGTH = 1000000;  // 1 MB
    const messageA = { data: Buffer.alloc(LENGTH).fill(0xFF) };
    const json = Message.toJSON(messageA);
    expect(json).toHaveProperty('data');
    const messageB = Message.fromJSON(json);
    expect(messageA).toEqual(messageB);
  });
});
