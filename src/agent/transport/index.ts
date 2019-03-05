import { Future } from '@quenk/noni/lib/control/monad/future';
import { Response } from '../../response';
import { Context } from '../../request/context';

/**
 * TransportResponse
 */
export type TransportResponse<B> 
  = Response<B>
  | Response<undefined>
  ;

/**
 * Transport is used to execute HTTP request via
 * the transports own mechanism.
 *
 * The mechanism may be XHR in the browser, the http module in the case 
 * of node or a mock transport during testing for example.
 */
export interface Transport<ReqBody, ResParsed> {

    /**
     * send an enveloped request using this Transport.
     */
  send(ctx: Context<ReqBody>)  : Future<TransportResponse<ResParsed>>

}
