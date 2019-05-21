import { Except } from '@quenk/noni/lib/control/error';
import { Mime } from '../../mime';
/**
 * Transform shapes a write request's body before sending it
 * to the server.
 */
export interface Transform<A, B> {
    /**
     * type of content being sent.
     *
     * This must be a valid MIME type.
     */
    type: Mime;
    /**
     * apply the Transform to a raw request body.
     */
    apply(raw: A): Except<B>;
}
/**
 * NoTransform does not modifiy the data in any way.
 *
 * Defaults to text/html mime type.
 */
export declare class JSONTransform<A> implements Transform<A, A> {
    type: string;
    constructor(type?: string);
    apply(body: A): Except<A>;
}
