import { Except } from '@quenk/noni/lib/control/error';
import { Mime } from '../../mime';

/**
 * Parser applied to the body of a response.
 */
export interface Parser<Raw, Parsed> {

    /**
     * accepts is the mime type the Parser can process.
     */
    accepts: Mime,

    /**
     * apply the Parser to a raw response body.
     */
    apply(raw: Raw): Except<Parsed>

}

