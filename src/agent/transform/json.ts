import * as util from '../../util';
import { Except, attempt } from '@quenk/noni/lib/control/error';
import { Transform } from './';

/**
 * Json type.
 */
export type Json = string;

/**
 * JSONTransform
 */
export class JSONTransform implements Transform<object, Json> {

    type = 'application/json;charset=utf-8';

    apply(body: object): Except<Json> {

      return attempt(()=> 
            (util.isObject(body) &&
            !util.isFile(body) &&
            !util.isBlob(body) &&
            !util.isFormData(body)) ?
            JSON.stringify(body) : ('' + body));

    }

}
