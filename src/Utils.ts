import * as qs from 'qs';

export const isObject = (obj: any): obj is object =>
    typeof obj === 'object';

export const isFile = (obj: any): obj is File =>
    toString.call(obj) === '[object File]';


export const isFormData = (obj: any): obj is FormData =>
    toString.call(obj) === '[object FormData]';

export const isBlob = (obj: any): obj is Blob =>
    toString.call(obj) === '[object Blob]';

/**
 * fromString will construct a url mergining any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
export const urlFromString = (url: string, params: any = {}) =>
    `${url}?${qs.stringify(params)}`;



