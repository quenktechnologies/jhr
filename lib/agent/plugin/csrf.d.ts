import { Future } from '@quenk/noni/lib/control/monad/future';
import { TransportResponse } from '../transport';
import { Context } from '../../request/context';
import { Plugin } from './';
/**
 * CSRFProtectionPlugin
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
export declare class CSRFProtectionPlugin<ReqBody, ResParsed> implements Plugin<ReqBody, ResParsed> {
    cookie: string;
    header: string;
    constructor(cookie: string, header: string);
    beforeRequest(ctx: Context<ReqBody>): Future<Context<ReqBody>>;
    afterResponse(r: TransportResponse<ResParsed>): Future<TransportResponse<ResParsed>>;
}
