import { OutGoingHeaders } from './Agent';

export const HEAD = 'HEAD'
export const GET = 'GET';
export const PUT = 'PUT';
export const POST = 'POST';
export const DELETE = 'DELETE';
export const PATCH = 'PATCH';

/**
 * Options for a request method.
 */
export interface Options {

    tags?: Tags,
    ttl?: number,
    headers?: OutGoingHeaders,
    context?: Context

}

/**
 * Tags for keeping track of requests
 */
export interface Tags {

    [key: string]: string

}

/**
 * Context is an interface used for expanding uri templates.
 */
export interface Context {

    [key: string]: string

}

export const defaultOptions = {

  tags: {},
  ttl:0,
  context: {},
  headers:{}

}

export class Method<P>{

    public method: string;

    constructor(public params?: P, public options: Options =defaultOptions) { }

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


