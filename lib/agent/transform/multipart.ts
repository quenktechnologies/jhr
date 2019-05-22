import { Except } from '@quenk/noni/lib/control/error';
import { right } from '@quenk/noni/lib/data/either';
import { Transform } from './';

/**
 * Part
 */
export type Part = string | Blob | FormData;

/**
 * MultipartTransform transforms data into the multi part format.
 */
export class MultipartTransform implements Transform<Part, Part> {

    type = 'multipart/form-data';

    apply(body: Part): Except<Part> {

        return right(body);

    }

}
