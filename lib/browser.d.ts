import { Object } from '@quenk/noni/lib/data/json';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Parameters } from './request/parameters';
import { Host } from './request/host';
import { Path } from './request/path';
import { OutgoingHeaders } from './header';
import { Response } from './response';
import { Url } from './url';
import { Agent } from './agent';
/**
 * @private
 */
export declare const splitUrl: (url: Url) => [Host, Path];
/**
 * createAgent produces a new default Agent for use in the browser.
 */
export declare const createAgent: <B extends Object>(host?: Host, port?: number) => Agent<object, B>;
/**
 * get shorthand helper.
 *
 * Note that url should consist of the domain and path
 * combined or the path alone.
 */
export declare const get: <B extends Object>(url: Url, params?: Parameters, headers?: OutgoingHeaders) => Future<Response<B>>;
