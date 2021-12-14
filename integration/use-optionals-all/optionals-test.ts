import { OptionalsTest, StateEnum } from './test'

describe('useOptionals=all', () => {
  it('has all optional members', () => {
    const test: OptionalsTest = {};
    const data = OptionalsTest.encode(test).finish();
    const test2 = OptionalsTest.decode(data);
    expect(test2).toEqual({
      id: 0,
      child: undefined,
      state: StateEnum.UNKNOWN,
      long: 0,
      truth: false,
      description: "",
      data: new Uint8Array(0),

      repId: [],
      repChild: [],
      repState: [],
      repLong: [],
      repTruth: [],
      repDescription: [],
      repData: [],

      optChild: undefined,
      optId: undefined,
      optState: undefined,
      optLong: undefined,
      optTruth: undefined,
      optDescription: undefined,
      optData: undefined,

      translations: {},
    });
  });

  it('allows setting all members, too', () => {
    const test: OptionalsTest = {
      id: 1,
      child: {},
      state: StateEnum.ON,
      long: 10,
      truth: true,
      description: "hello world",
      data: Buffer.alloc(2).fill(0x32),

      repId: [1, 2],
      repChild: [{}, {}],
      repState: [StateEnum.ON, StateEnum.OFF],
      repLong: [11, 12],
      repTruth: [true, false],
      repDescription: ["hello", "world"],
      repData: [Buffer.alloc(3).fill(0x33), Buffer.alloc(4).fill(0x34), Buffer.alloc(5).fill(0x35)],

      optChild: {},
      optId: 2,
      optState: StateEnum.OFF,
      optLong: 13,
      optTruth: true,
      optDescription: "mumble",
      optData: Buffer.alloc(6).fill(0x36),

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
      data: Buffer.alloc(2).fill(0x32),

      repId: [1, 2],
      repChild: [{}, {}],
      repState: [StateEnum.ON, StateEnum.OFF],
      repLong: [11, 12],
      repTruth: [true, false],
      repDescription: ["hello", "world"],
      repData: [Buffer.alloc(3).fill(0x33), Buffer.alloc(4).fill(0x34), Buffer.alloc(5).fill(0x35)],

      optChild: {},
      optId: 2,
      optState: StateEnum.OFF,
      optLong: 13,
      optTruth: true,
      optDescription: "mumble",
      optData: Buffer.alloc(6).fill(0x36),

      translations: {
        "hello": "hallo",
        "world": "wereld",
      },
    });
  });
})
