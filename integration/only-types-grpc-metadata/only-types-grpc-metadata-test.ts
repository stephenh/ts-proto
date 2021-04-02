import { Registration } from './reservation';

describe('Reservation', () => {
  it('has no JSON conversion', () => {
    const r: Registration = { eventName: 'Foo', date: undefined } as Registration;
    expect(r).toBeTruthy();
  });
});
