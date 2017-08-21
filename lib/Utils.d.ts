export declare const isObject: (obj: any) => obj is object;
export declare const isFile: (obj: any) => obj is File;
export declare const isFormData: (obj: any) => obj is FormData;
export declare const isBlob: (obj: any) => obj is Blob;
/**
 * fromString will construct a url mergining any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
export declare const urlFromString: (url: string, params?: any) => string;
