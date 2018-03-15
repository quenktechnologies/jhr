import * as Promise from 'bluebird';
import { Agent, Envelope } from '../agent';
import { XHRTransport } from './XHRTransport';
export { XHRTransport };
/**
 * Options for the CSRF adapter.
 */
export declare type Options = {
    cookie: string;
    header: string;
};
export declare const createAgent: (headers?: {}) => Agent<string, string>;
/**
 * csrfAdapter for automatically updating a header used for CSRF
 * protection based on a cookie value.
 */
export declare const csrfAdapter: <O, I>(o: Options) => (e: Envelope<O, I>) => Promise<Envelope<O, I>>;
