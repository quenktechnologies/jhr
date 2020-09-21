import { Mock } from '@quenk/test/lib/mock';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Parameters } from '../request/parameters';
import { Path } from '../request/path';
import { Request } from '../request';
import { Response } from '../response';
import { OutgoingHeaders } from '../header';
import { HTTPAgent } from './';
/**
 * MockAgent is an HTTPAgent that can be used when testing projects that use
 * this library.
 */
export declare class MockAgent<Req, Res> implements HTTPAgent<Req, Res> {
    __MOCK__: Mock;
    head(path: Path, params?: Parameters, headers?: OutgoingHeaders): Future<Response<Res>>;
    get(path: Path, params?: Parameters, headers?: OutgoingHeaders): Future<Response<Res>>;
    post(path: Path, body?: Req, headers?: OutgoingHeaders): Future<Response<Res>>;
    put(path: Path, body?: Req, headers?: OutgoingHeaders): Future<Response<Res>>;
    patch(path: Path, body?: Req, headers?: OutgoingHeaders): Future<Response<Res>>;
    delete(path: Path, body?: Req, headers?: OutgoingHeaders): Future<Response<Res>>;
    send(req: Request<Req>): Future<Response<Res>>;
}
