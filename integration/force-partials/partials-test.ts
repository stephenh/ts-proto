import { Hero, HeroServiceClientImpl } from './hero';
import { Observable } from "rxjs";

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
    clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
    serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
    bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}


describe('client with forcePartials on', () => {
    it('understands partials', async () => {
        let rpc = {
            request(service: string, method: string, data: Uint8Array): Promise<Uint8Array> {
                return Promise.resolve(new Uint8Array());
            }
        } as Rpc
        let impl = new HeroServiceClientImpl(rpc)
        expect(await impl.FindOneHero({})).toEqual(Hero.fromPartial({}));
    });
});
