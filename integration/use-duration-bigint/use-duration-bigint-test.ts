import { Duration } from "./google/protobuf/duration";
import { DurationHolder } from "./use-duration-bigint";

describe("useDuration=string with forceLong=bigint", () => {
  describe("binary encoding", () => {
    it("round-trips a Duration as a field of an enclosing message", () => {
      const original: DurationHolder = {
        duration: { seconds: 9223372036854775807n, nanos: 999_999_999 },
      };
      expect(DurationHolder.decode(DurationHolder.encode(original).finish())).toEqual(original);
    });
  });

  describe("JSON encoding", () => {
    describe("round-trips Duration values exactly", () => {
      describe("multi-second values", () => {
        it.each<[string, Duration]>([
          ["2^23 seconds + 999_999_999 nanos", { seconds: 8388608n, nanos: 999_999_999 }],
          ["1_000_000_000 seconds + 1 nano", { seconds: 1_000_000_000n, nanos: 1 }],
          ["i64 max + 999_999_999 nanos", { seconds: 9223372036854775807n, nanos: 999_999_999 }],
          ["i64 min, 0 nanos", { seconds: -9223372036854775808n, nanos: 0 }],
        ])("round-trips %s exactly", (_label, duration) => {
          expect(Duration.fromJSON(Duration.toJSON(duration))).toEqual(duration);
        });
      });

      describe("sub-second values", () => {
        it.each<[string, Duration]>([
          ["1 nanosecond", { seconds: 0n, nanos: 1 }],
          ["999 nanoseconds", { seconds: 0n, nanos: 999 }],
        ])("round-trips %s exactly", (_label, duration) => {
          expect(Duration.fromJSON(Duration.toJSON(duration))).toEqual(duration);
        });
      });

      it("round-trips a Duration as a field of an enclosing message", () => {
        const original: DurationHolder = {
          duration: { seconds: 9223372036854775807n, nanos: 999_999_999 },
        };
        expect(DurationHolder.fromJSON(DurationHolder.toJSON(original))).toEqual(original);
      });
    });

    describe("fromJSON returns the seconds field with the declared TypeScript type", () => {
      it("returns seconds as a bigint", () => {
        const d = Duration.fromJSON("1s");
        expect(typeof d.seconds).toEqual("bigint");
        expect(d.seconds).toEqual(1n);
      });
    });

    describe("toJSON emits canonical 0/3/6/9 fractional digits", () => {
      it("emits 0 fractional digits when nanos is zero", () => {
        expect(Duration.toJSON({ seconds: 1n, nanos: 0 })).toEqual("1s");
        expect(Duration.toJSON({ seconds: 0n, nanos: 0 })).toEqual("0s");
      });

      it("emits 3 fractional digits for millisecond precision", () => {
        expect(Duration.toJSON({ seconds: 1n, nanos: 500_000_000 })).toEqual("1.500s");
      });

      it("emits 6 fractional digits for microsecond precision", () => {
        expect(Duration.toJSON({ seconds: 1n, nanos: 1_000 })).toEqual("1.000001s");
      });

      it("emits 9 fractional digits for nanosecond precision", () => {
        expect(Duration.toJSON({ seconds: 1n, nanos: 1 })).toEqual("1.000000001s");
        expect(Duration.toJSON({ seconds: 0n, nanos: 1 })).toEqual("0.000000001s");
      });
    });

    describe("toJSON formats negative durations with a single leading minus sign", () => {
      it("formats negative seconds and nanos as a single signed number", () => {
        expect(Duration.toJSON({ seconds: -1n, nanos: -500_000_000 })).toEqual("-1.500s");
        expect(Duration.toJSON({ seconds: -1n, nanos: 0 })).toEqual("-1s");
        expect(Duration.toJSON({ seconds: 0n, nanos: -1 })).toEqual("-0.000000001s");
      });
    });

    describe("fromJSON accepts non-canonical fractional digit counts", () => {
      it("parses 1, 2, 4 fractional digit forms", () => {
        expect(Duration.fromJSON("1.5s")).toEqual({ seconds: 1n, nanos: 500_000_000 });
        expect(Duration.fromJSON("1.50s")).toEqual({ seconds: 1n, nanos: 500_000_000 });
        expect(Duration.fromJSON("1.5000s")).toEqual({ seconds: 1n, nanos: 500_000_000 });
      });

      it("parses negative durations", () => {
        expect(Duration.fromJSON("-1.500s")).toEqual({ seconds: -1n, nanos: -500_000_000 });
        expect(Duration.fromJSON("-0.000000001s")).toEqual({ seconds: 0n, nanos: -1 });
      });
    });

    describe("fromJSON rejects malformed input", () => {
      it("throws on garbage", () => {
        expect(() => Duration.fromJSON("abc")).toThrow();
        expect(() => Duration.fromJSON("")).toThrow();
      });

      it("throws when the 's' suffix is missing", () => {
        expect(() => Duration.fromJSON("1.5")).toThrow();
      });

      it("throws when the seconds component is empty", () => {
        expect(() => Duration.fromJSON("s")).toThrow();
        expect(() => Duration.fromJSON(".s")).toThrow();
        expect(() => Duration.fromJSON("-s")).toThrow();
        expect(() => Duration.fromJSON("-.s")).toThrow();
      });
    });
  });
});
