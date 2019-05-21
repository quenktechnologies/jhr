/// <reference types="node" />
import { Except } from '@quenk/noni/lib/control/error';
import { Parser } from '../../parser';
/**
 * BufferToStringAdapter adapts the buffer list
 * of the NodeHTTPTransport to a string that is passed
 * to another parser for final parsing.
 */
export declare class BufferToStringAdapter<Parsed> implements Parser<Buffer[], Parsed> {
    parser: Parser<string, Parsed>;
    constructor(parser: Parser<string, Parsed>);
    accepts: string;
    apply(raw: Buffer[]): Except<Parsed>;
}
