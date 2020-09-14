import { mapWithEnums as pbjs } from './pbjs';
import { MapWithEnums } from './map-with-enums';

describe('map-with-enums', () => {
  it('can be read from a pbjs encoding', () => {
    const message = {
      enumsById: {
        0: pbjs.Enums.BAD,
      }
    }
    const encoded = pbjs.MapWithEnums.encode(pbjs.MapWithEnums.create(message));
    const decoded = MapWithEnums.decode(encoded);

    expect(decoded).toBeTruthy();
    expect(decoded.enumsById).toBeTruthy();
    expect(decoded.enumsById[0]).toBe(pbjs.Enums.BAD);
  });
})
