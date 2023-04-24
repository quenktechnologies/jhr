import { Future, pure } from '@quenk/noni/lib/control/monad/future';

import { Context } from '../../request/context';
import { Response } from '../../response';

/**
 * Plugin allow outgoing requests and incomming responses to be intercepted.
 */
export abstract class Plugin<ReqBody, ResParsed> {

    /**
     * beforeRequest receives the request context before it is passed to the 
     * transport.
     */
    beforeRequest(ctx: Context<ReqBody>): Future<Context<ReqBody>> {

        return pure(ctx);

    }

    /**
     * afterResponse receives the response from the transport just before it 
     * is returned to the caller.
     */
    afterResponse(res: Response<ResParsed>): Future<Response<ResParsed>> {

        return pure(res);

    }

}
