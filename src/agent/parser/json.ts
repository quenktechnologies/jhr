import * as json from '@quenk/noni/lib/data/json';

import { merge } from '@quenk/noni/lib/data/record';
import { Except, attempt } from '@quenk/noni/lib/control/error';
import { right } from '@quenk/noni/lib/data/either';
import { Type } from '@quenk/noni/lib/data/type';

import { Parser } from './';

/**
 * Options for the JSON parser.
 */
export interface Options {

    /**
     * prefix is a sequence that will be stripped from the payload before
     * parsing. 
     *
     * This is a counter-measure for avoiding a known exploit of JSON apis
     * the retunr arrays instead of objects however a top level array is actually
     * NOT valid JSON.
     */
    prefix?: RegExp,

    /**
     * lenient if true, will return undefined when parsing fails instead of 
     * raising an error.
     */
    lenient?: boolean

}

const defaultOptions: Options = {

    prefix: /^\)\]\}',?\n/,

    lenient: false

}

/**
 * JSONParser parse a string representing a request body into an object.
 *
 * The optional options argument can be specified to modify its behaviour.
 */
export class JSONParser<D extends json.Object> implements Parser<string, D> {

    responseType = '';

    accepts = 'application/json';

    constructor(public options: Partial<Options> = {}) { }

    opts = merge(defaultOptions, this.options);

    apply(body: string): Except<D> {

        let { prefix, lenient } = this.opts;
      let str = body.replace(<RegExp>prefix, '');
        let eresult = attempt(() => JSON.parse(str));

        return (eresult.isLeft() && lenient) ? right(<Type>undefined) : eresult;

    }

}
