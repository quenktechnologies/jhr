import * as util from '../util';
import * as Promise from 'bluebird';
import { Transform } from '.';

/**
 * JSONTransform
 *
 * Note that this Transform makes absolutely no attempt to 
 * guarantee that transformResponseBody() returns the type
 * of R.
 */
export class JSONTransform implements Transform<string, string> {

    responseType = '';

    accepts = 'application/json';

    contentType = 'application/json;charset=utf-8';

    constructor(public prefix = /^\)\]\}',?\n/) { }

    transformRequestBody<B>(body: B): Promise<string> {

        return Promise
            .resolve((util.isObject(body) &&
                !util.isFile(body) &&
                !util.isBlob(body) &&
                !util.isFormData(body)) ?
                JSON.stringify(body) : ('' + body));

    }

    transformResponseBody<R>(body: string = ''): Promise<R> {

        //About prefix:
        //https://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
        return Promise.try(() => JSON.parse(body.replace(this.prefix, '').trim() || '{}'));

    }

}
