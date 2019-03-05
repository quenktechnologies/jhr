import { Future } from '@quenk/noni/lib/control/monad/future';
import { Response } from '../../response';
import { Context } from '../../request/context';

/**
 * Transport is used to execute HTTP request via
 * the transports own mechanism.
 *
 * The mechanism may be XHR in the browser, the http module in the case 
 * of node or a mock transport during testing for example.
 */
export interface Transport<ReqRaw, ResParsed> {

    /**
     * send an enveloped request using this Transport.
     */
    send(ctx: Context<ReqRaw>): Future<Response<ResParsed>>

}
