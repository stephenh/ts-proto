import { OptionalsTest, StateEnum } from './test'

describe('useOptionals=all initializeFieldsAsUndefined=false', () => {
  it('has all optional members', () => {
    const test: OptionalsTest = {};
    const data = OptionalsTest.encode(test).finish();
    const test2 = OptionalsTest.decode(data);
    expect(test2).toEqual({});
  });

  it('allows setting all members, too', () => {
    const test: OptionalsTest = {
      id: 1,
      child: {},
      state: StateEnum.ON,
      long: 10,
      truth: true,
      description: "hello world",
      data: new Uint8Array(2).fill(0x32),

      repId: [1, 2],
      repChild: [{}, {}],
      repLong: [11, 12],
      repTruth: [true, false],
      repDescription: ["hello", "world"],
      repData: [new Uint8Array(3).fill(0x33), new Uint8Array(4).fill(0x34), new Uint8Array(5).fill(0x35)],

      optChild: {},
      optId: 2,
      optState: StateEnum.OFF,
      optTruth: true,
      optDescription: "mumble",
      optData: new Uint8Array(6).fill(0x36),

      translations: {
        "hello": "hallo",
        "world": "wereld",
      },
    };
    const data = OptionalsTest.encode(test).finish();
    const test2 = OptionalsTest.decode(data);
    expect(test2).toEqual({
      id: 1,
      child: {},
      state: StateEnum.ON,
      long: 10,
      truth: true,
      description: "hello world",
      data: new Uint8Array(2).fill(0x32),

      repId: [1, 2],
      repChild: [{}, {}],
      repLong: [11, 12],
      repTruth: [true, false],
      repDescription: ["hello", "world"],
      repData: [new Uint8Array(3).fill(0x33), new Uint8Array(4).fill(0x34), new Uint8Array(5).fill(0x35)],

      optChild: {},
      optId: 2,
      optState: StateEnum.OFF,
      optTruth: true,
      optDescription: "mumble",
      optData: new Uint8Array(6).fill(0x36),

      translations: {
        "hello": "hallo",
        "world": "wereld",
      },
    });
  });
})
