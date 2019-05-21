import { Except } from '@quenk/noni/lib/control/error';
import { Parser } from '../../parser';

/**
 * StringBufferAdapterParser adapts the buffer list 
 * of the NodeHTTPTransport to a string that is passed
 * to another parser for final parsing.
 */
export class StringBufferAdapterParser<Parsed>
    implements
    Parser<Buffer[], Parsed> {

    constructor(public parser: Parser<string, Parsed>) { }

    accepts = this.parser.accepts;

    apply(raw: Buffer[]): Except<Parsed> {

        return this.parser.apply(raw.map(b => b.toString('utf8')).join(''));

    }

}
