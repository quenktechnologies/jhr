import { Except } from '@quenk/noni/lib/control/error';
import { right } from '@quenk/noni/lib/data/either';
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

/**
 * NoParser does no actual parsing instead just
 * yielding the data as given.
 */
export class NoParser<A> implements Parser<A, A> {

    constructor(public accepts = '*/*') { }

    apply(raw: A): Except<A> {

        return right(raw);

    }

}
