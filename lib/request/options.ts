
/**
 * Tag type.
 */
export type Tag = string | number;

/**
 * Tags can be used to store information in a request.
 *
 * Tags are reproduced in the response object.
 */
export interface Tags {

  [key:string]: Tag 

}

/**
 * Options for a Request.
 *
 * These options are used mostly to affect how the library treats with a Request.
 */
export interface Options {

    /**
     * ttl specifies how long to wait on the Request to complete.
     */
    ttl: number,

    /**
     * tags can be used to distinguish between multiple requests.
     */
    tags: Tags,

    /**
     * context is used in the expansion of template variables in the Request's
     * path.
     */
    context: object

}
