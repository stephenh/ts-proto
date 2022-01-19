import { maybeSnakeToCamel } from '../src/case';
import { Options, optionsFromParameter } from '../src/options';

const keys = optionsFromParameter('snakeToCamel=keys');

describe('case', () => {
  it('converts snake to camel by default', () => {
    expect(maybeSnakeToCamel('foo_bar', optionsFromParameter(undefined))).toEqual('fooBar');
  });

  it('leaves as-is if snakeToCamel is false', () => {
    expect(maybeSnakeToCamel('foo_bar', optionsFromParameter('snakeToCamel=false'))).toEqual('foo_bar');
  });

  it('de-upper cases', () => {
    expect(maybeSnakeToCamel('FOO_BAR', keys)).toEqual('FooBar');
  });

  it('leaves existing mixed cases', () => {
    expect(maybeSnakeToCamel('clientI_d', keys)).toEqual('clientID');
  });

  it('leaves the first character as it was', () => {
    expect(maybeSnakeToCamel('Foo_Bar', keys)).toEqual('FooBar');
  });

  it('does nothing is already camel', () => {
    expect(maybeSnakeToCamel('FooBar', keys)).toEqual('FooBar');
  });

  // deal with original protoc which converts
  // _uuid -> Uuid
  // __uuid -> Uuid
  // _uuid_foo -> UuidFoo
  it('converts snake to camel with first underscore', () => {
    expect(maybeSnakeToCamel('_uuid', { snakeToCamel: ['keys'] })).toEqual('Uuid');
  });

  it('converts snake to camel with first double underscore', () => {
    expect(maybeSnakeToCamel('__uuid', { snakeToCamel: ['keys'] })).toEqual('Uuid');
  });

  it('converts snake to camel with first underscore and camelize other', () => {
    expect(maybeSnakeToCamel('_uuid_foo', { snakeToCamel: ['keys'] })).toEqual('UuidFoo');
  });
});
