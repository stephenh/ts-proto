import {
  HeroServiceClientImpl
} from './hero';
import { Observable } from 'rxjs';

const heroService = new HeroServiceClientImpl({
  request(service: string, method: string, data: Uint8Array | Observable<Uint8Array>, expectObservable?: boolean): Promise<Uint8Array> | Observable<Uint8Array> {
    return expectObservable ? new Observable() : new Promise(resolve => {resolve()});
  }
});

describe('client-observables', () => {
  it('regular method returns promise', () => {
    expect(heroService.RegularMethod({})).toBeInstanceOf(Promise);
  });

  it('client streaming method returns promise', () => {
    expect(heroService.ClientStreamingMethod(new Observable)).toBeInstanceOf(Promise);
  });

  it('server streaming method returns observable', () => {
    expect(heroService.ServerStreamingMethod({})).toBeInstanceOf(Observable);
  });

  it('two way streaming method returns observable', () => {
    expect(heroService.TwoWayStreamingMethod(new Observable)).toBeInstanceOf(Observable);
  });
});
