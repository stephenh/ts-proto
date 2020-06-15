import {SimpleMessage} from "../../simple-message";

describe('simple-message', () => {

  it('fromPartial() should create message', () => {
    const message = SimpleMessage.fromPartial({
      numberField: 123
    })
    expect(message).toBeDefined();
  });

  it('should survive a binary format round trip', () => {
    const message = SimpleMessage.fromPartial({
      numberField: 123
    })
    const encoded = SimpleMessage.encode(message).finish();
    const decoded = SimpleMessage.decode(encoded);
    expect(decoded.numberField).toBe(123);
  })

});
