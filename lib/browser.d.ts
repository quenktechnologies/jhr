import { Object } from '@quenk/noni/lib/data/json';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { OutgoingHeaders } from './header';
import { Response } from './response';
import { Agent } from './agent';
/**
 * @private
 */
export declare const splitUrl: (url: string) => [string, string];
/**
 * createAgent produces a new default Agent for use in the browser.
 */
export declare const createAgent: <B extends Object>(host?: string, port?: number) => Agent<object, B>;
/**
 * get shorthand helper.
 *
 * Note that url should consist of the domain and path
 * combined or the path alone.
 */
export declare const get: <B extends Object>(url: string, params?: Object, headers?: OutgoingHeaders) => Future<Response<B>>;
