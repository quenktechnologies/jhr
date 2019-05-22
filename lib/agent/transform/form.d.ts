import { Except } from '@quenk/noni/lib/control/error';
import { Transform } from './';
/**
 * FormTransform transforms an object into the default format
 * browsers used for form submission.
 */
export declare class FormTransform implements Transform<object, string> {
    type: string;
    apply(body: object): Except<string>;
}
