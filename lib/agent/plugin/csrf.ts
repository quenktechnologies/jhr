import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { merge } from '@quenk/noni/lib/data/record';
import { TransportResponse } from '../transport';
import { Context } from '../../request/context';
import { Plugin } from './';

/**
 * CSRFProtectionPlugin 
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
export class CSRFProtectionPlugin<ReqBody, ResParsed>
    implements Plugin<ReqBody,  ResParsed> {

    constructor(public cookie: string, public header: string) { }

    beforeRequest(ctx: Context<ReqBody>): Future<Context<ReqBody>> {

        return ctx
            .cookies
            .get(this.cookie)
            .chain((value: string) => {

                ctx.headers = merge(ctx.headers, {
                    [this.header]: value
                });

                return pure(ctx);

            });

    }

    afterResponse(r: TransportResponse<ResParsed>)
        : Future<TransportResponse<ResParsed>> {

        return pure(r);

    }

}
