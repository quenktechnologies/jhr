/**
 * Cookies
 * Originally from:
 * https://github.com/voltace/browser-cookies/blob/master/src/browser-cookies.js
 * License: Public Domain
 */
export class Jar {

    defaults: any = {};

    set(name: string, value: any, options: any) {
        // Retrieve options and defaults
        var opts = options || {};
        var defaults = this.defaults;

        // Apply default value for unspecified options
        var expires = opts.expires || defaults.expires;
        var domain = opts.domain || defaults.domain;
        var path = opts.path !== undefined ? opts.path : (defaults.path !== undefined ? defaults.path : '/');
        var secure = opts.secure !== undefined ? opts.secure : defaults.secure;
        var httponly = opts.httponly !== undefined ? opts.httponly : defaults.httponly;

        // Determine cookie expiration date
        // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
        var expDate = expires ? new Date(
            // in case expires is an integer, it should specify the number of days till the cookie expires
            typeof expires === 'number' ? new Date().getTime() + (expires * 864e5) :
                // else expires should be either a Date object or in a format recognized by Date.parse()
                expires
        ) : '';

        // Set cookie
        document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent) // Encode cookie name
            .replace('(', '%28')
            .replace(')', '%29') +
            '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + // Encode cookie value (RFC6265)
            (expDate && (<any>expDate).getTime() >= 0 ? ';expires=' + (<any>expDate).toUTCString() : '') + // Add expiration date
            (domain ? ';domain=' + domain : '') + // Add domain
            (path ? ';path=' + path : '') + // Add path
            (secure ? ';secure' : '') + // Add secure option
            (httponly ? ';httponly' : ''); // Add httponly option
    }

    get(name: string) {
        var cookies = document.cookie.split(';');

        // Iterate all cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var cookieLength = cookie.length;

            // Determine separator index ("name=value")
            var separatorIndex = cookie.indexOf('=');

            // IE<11 emits the equal sign when the cookie value is empty
            separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

            // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
            if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) === name) {
                return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
            }
        }

        return null;
    }

    erase(name: string, options: any) {

        this.set(name, '', {
            expires: -1,
            domain: options && options.domain,
            path: options && options.path,
            secure: 0,
            httponly: 0
        });
    }

}

export const Cookies = new Jar();
