import * as json from '@quenk/noni/lib/data/json';
import { Except, attempt } from '@quenk/noni/lib/control/error';
import { Parser } from './';

/**
 * JSONParser
 */
export class JSONParser<D extends json.Object>    implements Parser<string, D> {

    responseType = '';

    accepts = 'application/json';

    constructor(public prefix = /^\)\]\}',?\n/) { }

    apply(body: string): Except<D> {

        return attempt(() => JSON.parse(
            body.replace(this.prefix, '').trim() || '{}'));

    }

}
