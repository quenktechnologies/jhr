import { Except } from '@quenk/noni/lib/control/error';
import { Transform } from './';
/**
 * Part
 */
export declare type Part = string | Blob | FormData;
/**
 * MultipartTransform transforms data into the multi part format.
 */
export declare class MultipartTransform implements Transform<Part, Part> {
    type: string;
    apply(body: Part): Except<Part>;
}
