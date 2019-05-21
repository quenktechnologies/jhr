import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { Options, Value, Cookies } from '../';
import { Container } from './';

const _defaults = {
    expires: 365, domain: '', path: '/', secure: true, httpOnly: false
};

//NOTE: This is originally based on code from another project, unfortunately
// we lost the source.
//
// If you recognize anything here from another project please send an email
// to info@quenk.com so we can update the LICENSE file.

/**
 * MemoryContainer stores cookie values in memory.
 */
export class MemoryContainer implements Container {

    constructor(
        public cookies: string = '',
        public defaults: Options = _defaults) { }

    set(name: string, value: Value, opts: Options = {}): Future<Container> {

        let defaults = this.defaults;

        // Apply default value for unspecified options
        let expires = opts.expires || defaults.expires;
        let domain = opts.domain || defaults.domain;

        let path = opts.path !== undefined ?
            opts.path : (defaults.path !== undefined ? defaults.path : '/');

        let secure = opts.secure !== undefined ? opts.secure : defaults.secure;

        let httpOnly = opts.httpOnly !== undefined ?
            opts.httpOnly : defaults.httpOnly;

        // Determine cookie expiration date
        // If succesful the result will be a valid Date, 
        // otherwise it will be an invalid Date or false(ish)
        let expDate = new Date(new Date().getTime() + (<number>expires * 864e5));

        // Set cookie
        this.cookies = name.replace(/[^+#$&^`|]/g, encodeURIComponent)
            .replace('(', '%28')
            .replace(')', '%29') +
            '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +
            (expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') +
            (domain ? ';domain=' + domain : '') +
            (path ? ';path=' + path : '') +
            (secure ? ';secure' : '') +
            (httpOnly ? ';httponly' : '');

        return pure(<Container>this);

    }

    /**
     * update the internal cookie string representation.
     */
    update(cookies: string): Future<Container> {

        this.cookies = cookies;
        return pure(<Container>this);

    }


    get(name: string): Future<Value> {

        return pure(this.getCookie(name));

    }

    getCookie(name: string): Value {

        let cookies = this.cookies.split(';');

        // Iterate all cookies
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let cookieLength = cookie.length;

            // Determine separator index ("name=value")
            let separatorIndex = cookie.indexOf('=');

            // IE<11 emits the equal sign when the cookie value is empty
            separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

            // Decode the cookie name and remove any leading/trailing spaces, 
            // then compare to the requested cookie name
            if (decodeURIComponent(cookie.substring(0, separatorIndex)
                .replace(/^\s+|\s+$/g, '')) === name) {

                return decodeURIComponent(cookie.substring(separatorIndex + 1,
                    cookieLength));

            }
        }

        return '';
    }

    /**
     * getAll the cookies as a map.
     */
    getAll(): Future<Cookies> {

        let o: Cookies = {};

        this
            .cookies
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
            .split(/\s*(?:\=[^;]*)?;\s*/)
            .forEach(k => { o[k] = this.getCookie(k) });

        return pure(o);

    }

}
