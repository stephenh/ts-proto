import { DefaultValuesTest } from './test'

describe("emit-default-values-json", () => {
    it("encodes to json correctly", () => {
        const output = DefaultValuesTest.toJSON(DefaultValuesTest.fromPartial({}))

        expect(output).toStrictEqual({
            data: "", 
            description: "", 
            id: 0, 
            long: 0, 
            state: "UNKNOWN", 
            truth: false
        })
    })
});
  