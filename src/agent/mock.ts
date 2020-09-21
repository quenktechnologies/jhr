import { Mock } from '@quenk/test/lib/mock';
import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { Type } from '@quenk/noni/lib/data/type';

import { Parameters } from '../request/parameters';
import { Path } from '../request/path';
import {Request} from '../request';
import { Response, GenericResponse } from '../response';
import { OutgoingHeaders } from '../header';
import { HTTPAgent } from './';

const res = <Future<Type>>pure(new GenericResponse(0, <unknown>{}, {},
    { port: 0, ttl: 0, tags: {}, context: {} }));

/**
 * MockAgent is an HTTPAgent that can be used when testing projects that use
 * this library.
 */
export class MockAgent<Req, Res> implements HTTPAgent<Req, Res> {

    __MOCK__ = new Mock();

    head(
        path: Path,
        params: Parameters = {},
        headers: OutgoingHeaders = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('head', [path, params, headers], res);

    }

    get(
        path: Path,
        params: Parameters = {},
        headers: OutgoingHeaders = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('get', [path, params, headers], res);

    }

    post(
        path: Path,
        body?: Req,
        headers: OutgoingHeaders = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('post', [path, <Type>body, headers], res);

    }

    put(
        path: Path,
        body?: Req,
        headers: OutgoingHeaders = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('put', [path, <Type>body, headers], res);

    }

    patch(
        path: Path,
        body?: Req,
        headers: OutgoingHeaders = {}): Future<Response<Res>> {

        return this.__MOCK__.invoke('patch', [path, <Type>body, headers], res);

    }

    delete(
        path: Path,
        body?: Req,
        headers?: OutgoingHeaders): Future<Response<Res>> {

        return this.__MOCK__.invoke('delete', [path, <Type>body, headers], res);

    }

    send(req: Request<Req>): Future<Response<Res >> {

      return this.__MOCK__.invoke('send', [req], res);

    }

}
