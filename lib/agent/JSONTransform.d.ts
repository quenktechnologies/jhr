import * as Promise from 'bluebird';
import { Transform } from '.';
/**
 * JSONTransform
 *
 * Note that this Transform makes absolutely no attempt to
 * guarantee that transformResponseBody() returns the type
 * of R.
 */
export declare class JSONTransform implements Transform<string, string> {
    prefix: RegExp;
    responseType: string;
    accepts: string;
    contentType: string;
    constructor(prefix?: RegExp);
    transformRequestBody<B>(body: B): Promise<string>;
    transformResponseBody<R>(body?: string): Promise<R>;
}
