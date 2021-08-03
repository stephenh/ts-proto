import { Simple, SimpleEnum as LocalSimpleEnum, SimpleEnums } from './simple';
import { SimpleEnum as ImportSimpleEnum } from './simple2';

describe('Simple', () => {
  it('type checking works correctly for interfaces', () => {
    const simple: Simple = {
      name: 'foo',
      otherSimple: {
        simple2Name: 'bar',
        simple2Age: 1,
      },
    }
  });

  it('type checking works correctly for enums', () => {
    const simpleEnum: SimpleEnums = {
      localEnum: LocalSimpleEnum.LOCAL_BAR,
      importEnum: ImportSimpleEnum.IMPORT_FOO,
    }
  });
})
