import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../request/context';
import { Response } from '../../response';
/**
 * Plugin allow requests and responses to be modified before transfer.
 */
export interface Plugin<ReqBody, ResParsed> {
    /**
     * beforeRequest
     */
    beforeRequest(ctx: Context<ReqBody>): Future<Context<ReqBody>>;
    /**
     * afterResponse
     */
    afterResponse(r: Response<ResParsed>): Future<Response<ResParsed>>;
}
