import { OptionalsTest, StateEnum } from './test'

describe('useOptionals=deprecatedOnly', () => {
  it('has deprecated fields optional members', () => {
    const test: OptionalsTest = {
      id: 1,
      long: 10,
      repId: [1, 2],
      repStateV2: [StateEnum.ON, StateEnum.OFF],
      repLong: [11, 12],
      repTruth: [true, false],
      repDescription: ["hello", "world"],
      repData: [new Uint8Array(3).fill(0x33), new Uint8Array(4).fill(0x34), new Uint8Array(5).fill(0x35)],

      optId: 2,
      optLong: 13,
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
      state: StateEnum.UNKNOWN,
      long: 10,
      truth: false,
      description: "",
      data: new Uint8Array(0),

      repId: [1, 2],
      repState: [],
      repStateV2: [StateEnum.ON, StateEnum.OFF],
      repLong: [11, 12],
      repTruth: [true, false],
      repDescription: ["hello", "world"],
      repData: [new Uint8Array(3).fill(0x33), new Uint8Array(4).fill(0x34), new Uint8Array(5).fill(0x35)],

      optId: 2,
      optLong: 13,
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
