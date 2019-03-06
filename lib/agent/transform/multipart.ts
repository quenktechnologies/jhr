import { Except } from '@quenk/noni/lib/control/error';
import { right } from '@quenk/noni/lib/data/either';
import { Transform } from './';

/**
 * Part
 */
export type Part = string | Blob | FormData;

/**
 * MultipartTransform
 */
export class MultipartTransform implements Transform<Part, Part> {

    type = 'multipart/form-data';

    apply(body: Part): Except<Part> {

        return right(body);

    }

}
