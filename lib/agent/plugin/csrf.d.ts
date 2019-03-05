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
export declare class CSRFProtectionPlugin<ReqBody, ResRaw, ResParsed> implements Plugin<ReqBody, ResRaw, ResParsed> {
    cookie: string;
    header: string;
    constructor(cookie: string, header: string);
    beforeRequest(ctx: Context<ReqBody, ResRaw, ResParsed>): Future<Context<ReqBody, ResRaw, ResParsed>>;
    afterResponse(r: TransportResponse<ResParsed>): Future<TransportResponse<ResParsed>>;
}
