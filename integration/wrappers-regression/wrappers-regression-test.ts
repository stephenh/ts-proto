import { Clock } from './wrappers-regression';

const jan1 = new Date('1970-01-01T00:00:00.000Z');
const feb1 = new Date('1970-02-01T00:00:00.000Z');

describe('useDate=true', () => {
  it('generates a services that compiles', () => {
    let c: Clock = {
      Now: () => Promise.resolve(jan1),
      NowString: () => Promise.resolve("anything, really"),
      NowBool: () => Promise.resolve(true),
    };
  });
});
