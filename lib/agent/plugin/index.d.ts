import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../request/context';
import { TransportResponse } from '../transport';
/**
 * Plugin allow requests and responses to be modified before transfer.
 */
export interface Plugin<ReqBody, ResRaw, ResParsed> {
    /**
     * beforeRequest
     */
    beforeRequest(ctx: Context<ReqBody, ResRaw, ResParsed>): Future<Context<ReqBody, ResRaw, ResParsed>>;
    /**
     * afterResponse
     */
    afterResponse(r: TransportResponse<ResParsed>): Future<TransportResponse<ResParsed>>;
}
