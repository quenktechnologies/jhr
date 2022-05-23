import { Mock } from '@quenk/test/lib/mock';

import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { Type } from '@quenk/noni/lib/data/type';

import { Parameters } from '../request/parameters';
import { Path } from '../request/path';
import { Method } from '../request/method';
import { Request } from '../request';
import { Response, GenericResponse } from '../response';
import { HTTPAgent, Options } from './';

const res = <Future<Type>>pure(new GenericResponse(0, <unknown>{}, {}, {
    method: Method.Get,
    path: '/',
    options: { port: 0, ttl: 0, tags: {}, context: {}, headers: {} }
}));

/**
 * MockAgent is an HTTPAgent that can be used when testing projects that use
 * this library.
 */
export class MockAgent<Req, Res> implements HTTPAgent<Req, Res> {

    __MOCK__ = new Mock();

    head(
        path: Path,
        params: Parameters = {},
        options: Partial<Options> = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('head', [path, params, options], res);

    }

    get(
        path: Path,
        params: Parameters = {},
        options: Partial<Options> = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('get', [path, params, options], res);

    }

    post(
        path: Path,
        body?: Req,
        options: Partial<Options> = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('post', [path, <Type>body, options], res);

    }

    put(
        path: Path,
        body?: Req,
        options: Partial<Options> = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('put', [path, <Type>body, options], res);

    }

    patch(
        path: Path,
        body?: Req,
        options: Partial<Options> = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('patch', [path, <Type>body, options], res);

    }

    delete(
        path: Path,
        body?: Req,
        options: Partial<Options> = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('delete', [path, <Type>body, options], res);

    }

    send(req: Request<Req>): Future<Response<Res>> {

        return this.__MOCK__.invoke('send', [req], res);

    }

}
