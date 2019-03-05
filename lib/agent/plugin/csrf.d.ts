import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../request/context';
import { Response } from '../../response';
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
    afterResponse(r: Response<ResParsed>): Future<Response<ResParsed>>;
}
