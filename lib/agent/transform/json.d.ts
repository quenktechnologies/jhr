import { Except } from '@quenk/noni/lib/control/error';
import { Transform } from './';
/**
 * Json type.
 */
export declare type Json = string;
/**
 * JSONTransform
 */
export declare class JSONTransform implements Transform<object, Json> {
    type: string;
    apply(body: object): Except<Json>;
}
