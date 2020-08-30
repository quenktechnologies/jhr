import { stringify } from './qs';

/**
 * isObject test.
 */
export const isObject = (obj: any): obj is object =>
    typeof obj === 'object';

/**
 * isFile test.
 */
export const isFile = (obj: any): obj is File =>
    toString.call(obj) === '[object File]';

/**
 * isFormData test.
 */
export const isFormData = (obj: any): obj is FormData =>
    toString.call(obj) === '[object FormData]';

/**
 * isBlob test.
 */
export const isBlob = (obj: any): obj is Blob =>
    toString.call(obj) === '[object Blob]';

/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
export const urlFromString = (url: string, params: object = {}) =>
    `${url}?${stringify(params)}`;
