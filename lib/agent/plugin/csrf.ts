import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { merge } from '@quenk/noni/lib/data/record';
import { Context } from '../../request/context';
import { Response } from '../../response';
import { Plugin } from './';

/**
 * CSRFProtectionPlugin 
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
export class CSRFProtectionPlugin<ReqBody, ResParsed>
    implements Plugin<ReqBody, ResParsed> {

    constructor(public cookie: string, public header: string) { }

    beforeRequest(ctx: Context<ReqBody>): Future<Context<ReqBody>> {

        let value = ctx.cookies.get(this.cookie);

        ctx.headers = merge(ctx.headers, {
            [this.header]: value
        });

        return pure(ctx);

    }

    afterResponse(r: Response<ResParsed>): Future<Response<ResParsed>> {

        return pure(r);

    }

}
