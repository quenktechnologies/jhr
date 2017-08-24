import { OutGoingHeaders } from './Agent';

export const HEAD = 'HEAD'
export const GET = 'GET';
export const PUT = 'PUT';
export const POST = 'POST';
export const DELETE = 'DELETE';
export const PATCH = 'PATCH';

export interface Tags {

    [key: string]: string

}

export class Method<P>{

    public method: string;
    constructor(
        public params?: P,
        public headers?: OutGoingHeaders,
        public tags?: Tags,
        public ttl?: number) { }

}

export class Get<P> extends Method<P> {

    method = GET;

}

export class Head<P> extends Method<P> {

    method = HEAD;

}

export class Post<P> extends Method<P> {

    method = POST;

}

export class Put<P> extends Method<P> {

    method = PUT;

}

export class Patch<P> extends Method<P> {

    method = PATCH;

}

export class Delete<P> extends Method<P> {

    method = DELETE;

}
