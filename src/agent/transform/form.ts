import { Record, reduce } from '@quenk/noni/lib/data/record';
import { Except } from '@quenk/noni/lib/control/error';
import { right } from '@quenk/noni/lib/data/either';
import { Transform } from './';

/**
 * FormTransform transforms an object into the default format
 * browsers used for form submission.
 */
export class FormTransform implements Transform<object, string> {

    type = 'application/x-www-form-urlencoded';

    apply(body: object): Except<string> {

        return right(reduce(<Record<string>>body, <string[]>[], (p, c, k) =>
            p.concat(encodeURIComponent(k) + '=' + encodeURIComponent(c)))
            .join('&'));

    }

}
