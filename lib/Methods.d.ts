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
export declare class Method<A> {
    params: A;
    headers: OutGoingHeaders;
    tags: Tags;
    ttl: number;
    method: string;
    constructor(params: A, headers?: OutGoingHeaders, tags?: Tags, ttl?: number);
}
export declare class Get<A> extends Method<A> {
    method: string;
}
export declare class Head<A> extends Method<A> {
    method: string;
}
export declare class Post<A> extends Method<A> {
    method: string;
}
export declare class Put<A> extends Method<A> {
    method: string;
}
export declare class Patch<A> extends Method<A> {
    method: string;
}
export declare class Delete<A> extends Method<A> {
    method: string;
}
