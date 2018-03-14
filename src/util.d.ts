/**
 * isObject test.
 */
export declare const isObject: (obj: any) => obj is object;
/**
 * isFile test.
 */
export declare const isFile: (obj: any) => obj is File;
/**
 * isFormData test.
 */
export declare const isFormData: (obj: any) => obj is FormData;
/**
 * isBlob test.
 */
export declare const isBlob: (obj: any) => obj is Blob;
/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
export declare const urlFromString: (url: string, params?: object) => string;
