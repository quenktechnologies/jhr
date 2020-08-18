import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { merge } from '@quenk/noni/lib/data/record';
import { Context } from '../../request/context';
import { Response } from '../../response';
import { Plugin } from './';

export const DEFAULT_CSRF_COOKIE_NAME = 'xsrf-token';
export const DEFAULT_CSRF_HEADER_NAME = 'x-xsrf-token';

/**
 * CSRFProtectionPlugin 
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
export class CSRFProtectionPlugin<ReqBody, ResParsed>
    implements Plugin<ReqBody, ResParsed> {

    constructor(
        public cookie: string = DEFAULT_CSRF_COOKIE_NAME,
        public header: string = DEFAULT_CSRF_HEADER_NAME) { }

    beforeRequest(ctx: Context<ReqBody>): Future<Context<ReqBody>> {

        let value = ctx.cookies.get(this.cookie);

        if(value != null )
        ctx.headers = merge(ctx.headers, {
            [this.header]: value
        });

        return pure(ctx);

    }

    afterResponse(r: Response<ResParsed>): Future<Response<ResParsed>> {

        return pure(r);

    }

}
