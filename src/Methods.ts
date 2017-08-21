import { OutGoingHeaders } from './Agent';

export const HEAD = 'HEAD'
export const GET = 'GET';
export const PUT = 'PUT';
export const POST = 'POST';
export const DELETE = 'DELETE';
export const PATCH = 'PATCH';

export class Method<A>{

    public method: string;
    constructor(public url: string, public params: A, public headers?: OutGoingHeaders, public ttl?: number) { }

}

export class Get<A> extends Method<A> {

    method = GET;

}

export class Head<A> extends Method<A> {

    method = HEAD;

}

export class Post<A> extends Method<A> {

    method = POST;

}

export class Put<A> extends Method<A> {

    method = PUT;

}

export class Patch<A> extends Method<A> {

    method = PATCH;

}

export class Delete<A> extends Method<A> {

    method = DELETE;

}
