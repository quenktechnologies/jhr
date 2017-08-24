import { OutGoingHeaders } from './Agent';
export declare const HEAD = "HEAD";
export declare const GET = "GET";
export declare const PUT = "PUT";
export declare const POST = "POST";
export declare const DELETE = "DELETE";
export declare const PATCH = "PATCH";
export interface Tags {
    [key: string]: string;
}
export declare class Method<P> {
    params: P;
    headers: OutGoingHeaders;
    tags: Tags;
    ttl: number;
    method: string;
    constructor(params?: P, headers?: OutGoingHeaders, tags?: Tags, ttl?: number);
}
export declare class Get<P> extends Method<P> {
    method: string;
}
export declare class Head<P> extends Method<P> {
    method: string;
}
export declare class Post<P> extends Method<P> {
    method: string;
}
export declare class Put<P> extends Method<P> {
    method: string;
}
export declare class Patch<P> extends Method<P> {
    method: string;
}
export declare class Delete<P> extends Method<P> {
    method: string;
}
