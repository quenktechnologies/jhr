import { Tag } from './tag';
/**
 * Options for a Request.
 *
 * These options are used mostly to affect how the library treats with a Request.
 */
export interface Options {
    /**
     * ttl specifies how long to wait on the Request to complete.
     */
    ttl: number;
    /**
     * tags can be used to distinguish between multiple requests.
     */
    tags: Tag[];
    /**
     * context is used in the expansion of template variables in the Request's
     * path.
     */
    context: object;
}
