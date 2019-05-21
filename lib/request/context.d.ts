import { Container } from '../cookie/container';
import { Host } from './host';
import { Path } from './path';
import { Method } from './method';
import { OutgoingHeaders } from '../header';
import { Options } from './options';
/**
 * Context a request is executed in.
 *
 * Contains all the information needed to send a request.
 */
export interface Context<ReqBody> {
    /**
     * host the request is bound for.
     */
    host: Host;
    /**
     * port
     */
    port: number;
    /**
     * method request type.
     */
    method: Method;
    /**
     * path requested.
     */
    path: Path;
    /**
     * headers to be sent.
     */
    headers: OutgoingHeaders;
    /**
     * body is the payload sent as part of the request.
     *
     * For reads (HEAD,GET,etc) use undefined.
     */
    body: ReqBody | undefined;
    /**
     * Options specified for the original Request.
     */
    options: Options;
    /**
     * cookies Container
     */
    cookies: Container;
}
