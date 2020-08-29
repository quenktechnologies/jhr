import { Maybe } from '@quenk/noni/lib/data/maybe';

import { Name, SetCookieHeader, Cookie, Cookies } from '../';

/**
 * Container for cookies received.
 *
 * Depending on the implementation, values stored here may be 
 * immutable or not.
 */
export interface Container {

    /**
     * getCookies provides all the Cookies stored currently in 
     * the Container.
     */
    getCookies(): Cookies

    /**
     * getCookie provides a Cookie given its name.
     */
    getCookie(name: Name): Maybe<Cookie>

    /**
     * setCookies updates the internal database of Cookies for the Container
     * from a Set-Cookie string.
     *
     * Some Containers may ignore calls to this method opting to source the
     * string elsewhere.
     */
    setCookies(str: SetCookieHeader[]): Container

}
