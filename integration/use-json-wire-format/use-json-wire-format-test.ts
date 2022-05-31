import { Todo } from './use-json-wire-format';

const jan1 = new Date('1970-01-01T00:00:00.000Z');
const feb1 = new Date('1970-02-01T00:00:00.000Z');

describe('useJsonWireFormat=true', () => {
  it('generates a type that compiles', () => {
    let t: Todo = {
      id: "1",
      timestamp: "1970-01-01T00:00:00.000Z",
      duration: "60s",
      updateMask: "id,timestamp,duration"
    }
  });
});
