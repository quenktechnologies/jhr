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
    type: Mime,

    /**
     * apply the Transform to a raw request body.
     */
    apply(raw: A): Except<B>

}
