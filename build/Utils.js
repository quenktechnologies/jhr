'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _is = require('is');

var _is2 = _interopRequireDefault(_is);

/**
 * Utils
 */

var Utils = (function () {
    function Utils() {
        _classCallCheck(this, Utils);

        this.JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;
    }

    _createClass(Utils, [{
        key: 'clone',
        value: function clone(o) {
            return JSON.parse(JSON.stringify(o));
        }
    }, {
        key: 'isFile',
        value: function isFile(obj) {
            return toString.call(obj) === '[object File]';
        }
    }, {
        key: 'isFormData',
        value: function isFormData(obj) {
            return toString.call(obj) === '[object FormData]';
        }
    }, {
        key: 'isBlob',
        value: function isBlob(obj) {
            return toString.call(obj) === '[object Blob]';
        }
    }, {
        key: 'fromJson',
        value: function fromJson(json) {
            return _is2['default'].string(json) ? JSON.parse(json) : json;
        }
    }, {
        key: 'forEachSorted',
        value: function forEachSorted(obj, iterator, context) {
            var keys = Object.keys(obj).sort();
            for (var i = 0; i < keys.length; i++) {
                iterator.call(context, obj[keys[i]], keys[i]);
            }
            return keys;
        }
    }, {
        key: 'encodeUriQuery',

        /**
         * This method is intended for encoding *key* or *value* parts of query component. We need a custom
         * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
         * encoded per http://tools.ietf.org/html/rfc3986:
         *    query       = *( pchar / "/" / "?" )
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        value: function encodeUriQuery(val, pctEncodeSpaces) {
            return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%3B/gi, ';').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
        }
    }, {
        key: 'buildUrl',
        value: function buildUrl(url, params) {

            var self = this;
            if (!params) return url;
            var parts = [];

            self.forEachSorted(params, function (value, key) {

                if (value === null || _is2['default'].undefined(value)) return;

                if (!_is2['default'].array(value)) value = [value];

                value.forEach(function (v) {

                    if (_is2['default'].object(v)) {
                        console.log('messing with this object ,', v, ' stringingyt ', JSON.stringify(v));
                        if (_is2['default'].date(v)) {
                            v = v.toISOString();
                        } else {
                            v = JSON.stringify(v);
                        }
                    }
                    parts.push(self.encodeUriQuery(key) + '=' + self.encodeUriQuery(v));
                });
            });

            if (parts.length > 0) {
                url += (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
            }

            return url;
        }
    }, {
        key: 'getOriginUrl',
        value: function getOriginUrl() {
            return this.resolveUrl(window.location.href);
        }
    }, {
        key: 'resolveUrl',

        /**
         *
         * Implementation Notes for non-IE browsers
         * ----------------------------------------
         * Assigning a URL to the href property of an anchor DOM node, even one attached to the DOM,
         * results both in the normalizing and parsing of the URL.  Normalizing means that a relative
         * URL will be resolved into an absolute URL in the context of the application document.
         * Parsing means that the anchor node's host, hostname, protocol, port, pathname and related
         * properties are all populated to reflect the normalized URL.  This approach has wide
         * compatibility - Safari 1+, Mozilla 1+, Opera 7+,e etc.  See
         * http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
         *
         * Implementation Notes for IE
         * ---------------------------
         * IE >= 8 and <= 10 normalizes the URL when assigned to the anchor node similar to the other
         * browsers.  However, the parsed components will not be set if the URL assigned did not specify
         * them.  (e.g. if you assign a.href = "foo", then a.protocol, a.host, etc. will be empty.)  We
         * work around that by performing the parsing in a 2nd step by taking a previously normalized
         * URL (e.g. by assigning to a.href) and assigning it a.href again.  This correctly populates the
         * properties such as protocol, hostname, port, etc.
         *
         * IE7 does not normalize the URL when assigned to an anchor node.  (Apparently, it does, if one
         * uses the inner HTML approach to assign the URL as part of an HTML snippet -
         * http://stackoverflow.com/a/472729)  However, setting img[src] does normalize the URL.
         * Unfortunately, setting img[src] to something like "javascript:foo" on IE throws an exception.
         * Since the primary usage for normalizing URLs is to sanitize such URLs, we can't use that
         * method and IE < 8 is unsupported.
         *
         * References:
         *   http://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
         *   http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
         *   http://url.spec.whatwg.org/#urlutils
         *   https://github.com/angular/angular.js/pull/2902
         *   http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
         *
         * @param {string} url The URL to be parsed.
         * @description Normalizes and parses a URL.
         * @returns {object} Returns the normalized URL as a dictionary.
         *
         *   | member name   | Description    |
         *   |---------------|----------------|
         *   | href          | A normalized version of the provided URL if it was not an absolute URL |
         *   | protocol      | The protocol including the trailing colon                              |
         *   | host          | The host and port (if the port is non-default) of the normalizedUrl    |
         *   | search        | The search params, minus the question mark                             |
         *   | hash          | The hash string, minus the hash symbol
         *   | hostname      | The hostname
         *   | port          | The port, without ":"
         *   | pathname      | The pathname, beginning with "/"
         *
         */
        value: function resolveUrl(url) {

            var href = url;
            var urlParsingNode = document.createElement('a');

            urlParsingNode.setAttribute('href', href);

            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
                href: urlParsingNode.href,
                protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                host: urlParsingNode.host,
                search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                hostname: urlParsingNode.hostname,
                port: urlParsingNode.port,
                pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
            };
        }
    }, {
        key: 'urlIsSameOrigin',

        /**
         * Parse a request URL and determine whether this is a same-origin request as the application document.
         *
         * @param {string|object} requestUrl The url of the request as a string that will be resolved
         * or a parsed URL object.
         * @returns {boolean} Whether the request is for the same origin as the application document.
         */
        value: function urlIsSameOrigin(requestUrl) {
            var parsed = _is2['default'].string(requestUrl) ? this.resolveUrl(requestUrl) : requestUrl;
            return parsed.protocol === this.getOriginUrl.protocol && parsed.host === this.getOriginUrl.host;
        }
    }]);

    return Utils;
})();

exports['default'] = new Utils();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWUsSUFBSTs7Ozs7Ozs7SUFPYixLQUFLO0FBRUksYUFGVCxLQUFLLEdBRU87OEJBRlosS0FBSzs7QUFHSCxZQUFJLENBQUMsc0JBQXNCLEdBQUcsY0FBYyxDQUFDO0tBQ2hEOztpQkFKQyxLQUFLOztlQU1GLGVBQUMsQ0FBQyxFQUFFO0FBQ0wsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7OztlQUVLLGdCQUFDLEdBQUcsRUFBRTtBQUNSLG1CQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBZSxDQUFDO1NBQ2pEOzs7ZUFFUyxvQkFBQyxHQUFHLEVBQUU7QUFDWixtQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1CQUFtQixDQUFDO1NBQ3JEOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUU7QUFDUixtQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQWUsQ0FBQztTQUNqRDs7O2VBRU8sa0JBQUMsSUFBSSxFQUFFO0FBQ1gsbUJBQU8sZ0JBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUNoQixJQUFJLENBQUM7U0FDZDs7O2VBRVksdUJBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDbEMsZ0JBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkMsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xDLHdCQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakQ7QUFDRCxtQkFBTyxJQUFJLENBQUM7U0FDZjs7Ozs7Ozs7Ozs7Ozs7O2VBYWEsd0JBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRTtBQUNqQyxtQkFBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FDMUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDckIsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FDcEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDckIsT0FBTyxDQUFDLE1BQU0sRUFBRyxlQUFlLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBRSxDQUFDO1NBQ3hEOzs7ZUFFTyxrQkFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVsQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3hCLGdCQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsZ0JBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUcsRUFBRTs7QUFFN0Msb0JBQUksS0FBSyxLQUFLLElBQUksSUFBSSxnQkFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTzs7QUFFbEQsb0JBQUksQ0FBQyxnQkFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXRDLHFCQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztBQUV2Qix3QkFBSSxnQkFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDZCwrQkFBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBQyxDQUFDLEVBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRSw0QkFBSSxnQkFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDWiw2QkFBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt5QkFDdkIsTUFBTTtBQUNILDZCQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekI7cUJBQ0o7QUFDRCx5QkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7O0FBRUgsZ0JBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDbEIsbUJBQUcsSUFBSSxDQUFDLEFBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBSSxHQUFHLEdBQUcsR0FBRyxDQUFBLEdBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuRTs7QUFFRCxtQkFBTyxHQUFHLENBQUM7U0FDZDs7O2VBRVcsd0JBQUc7QUFDWCxtQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFxRFMsb0JBQUMsR0FBRyxFQUFFOztBQUVaLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFDZixnQkFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFakQsMEJBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7QUFHMUMsbUJBQU87QUFDSCxvQkFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO0FBQ3pCLHdCQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUNsRixvQkFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO0FBQ3pCLHNCQUFNLEVBQUUsY0FBYyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUM3RSxvQkFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7QUFDdEUsd0JBQVEsRUFBRSxjQUFjLENBQUMsUUFBUTtBQUNqQyxvQkFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO0FBQ3pCLHdCQUFRLEVBQUUsQUFBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQzlDLGNBQWMsQ0FBQyxRQUFRLEdBQ3ZCLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUTthQUN0QyxDQUFDO1NBQ0w7Ozs7Ozs7Ozs7O2VBU2MseUJBQUMsVUFBVSxFQUFFO0FBQ3hCLGdCQUFJLE1BQU0sR0FBRyxBQUFDLGdCQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUNoRixtQkFBUSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUN0RCxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1NBQzNDOzs7V0FuTEMsS0FBSzs7O3FCQXdMSSxJQUFJLEtBQUssRUFBRSIsImZpbGUiOiJzcmMvVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXMgZnJvbSAnaXMnO1xuXG5cblxuLyoqXG4gKiBVdGlsc1xuICovXG5jbGFzcyBVdGlscyB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuSlNPTl9QUk9URUNUSU9OX1BSRUZJWCA9IC9eXFwpXFxdXFx9Jyw/XFxuLztcbiAgICB9XG5cbiAgICBjbG9uZShvKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG8pKTtcbiAgICB9XG5cbiAgICBpc0ZpbGUob2JqKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZpbGVdJztcbiAgICB9XG5cbiAgICBpc0Zvcm1EYXRhKG9iaikge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGb3JtRGF0YV0nO1xuICAgIH1cblxuICAgIGlzQmxvYihvYmopIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xuICAgIH1cblxuICAgIGZyb21Kc29uKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGlzLnN0cmluZyhqc29uKVxuICAgICAgICAgICAgPyBKU09OLnBhcnNlKGpzb24pXG4gICAgICAgICAgICA6IGpzb247XG4gICAgfVxuXG4gICAgZm9yRWFjaFNvcnRlZChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKS5zb3J0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5c1tpXV0sIGtleXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGludGVuZGVkIGZvciBlbmNvZGluZyAqa2V5KiBvciAqdmFsdWUqIHBhcnRzIG9mIHF1ZXJ5IGNvbXBvbmVudC4gV2UgbmVlZCBhIGN1c3RvbVxuICAgICAqIG1ldGhvZCBiZWNhdXNlIGVuY29kZVVSSUNvbXBvbmVudCBpcyB0b28gYWdncmVzc2l2ZSBhbmQgZW5jb2RlcyBzdHVmZiB0aGF0IGRvZXNuJ3QgaGF2ZSB0byBiZVxuICAgICAqIGVuY29kZWQgcGVyIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODY6XG4gICAgICogICAgcXVlcnkgICAgICAgPSAqKCBwY2hhciAvIFwiL1wiIC8gXCI/XCIgKVxuICAgICAqICAgIHBjaGFyICAgICAgICAgPSB1bnJlc2VydmVkIC8gcGN0LWVuY29kZWQgLyBzdWItZGVsaW1zIC8gXCI6XCIgLyBcIkBcIlxuICAgICAqICAgIHVucmVzZXJ2ZWQgICAgPSBBTFBIQSAvIERJR0lUIC8gXCItXCIgLyBcIi5cIiAvIFwiX1wiIC8gXCJ+XCJcbiAgICAgKiAgICBwY3QtZW5jb2RlZCAgID0gXCIlXCIgSEVYRElHIEhFWERJR1xuICAgICAqICAgIHN1Yi1kZWxpbXMgICAgPSBcIiFcIiAvIFwiJFwiIC8gXCImXCIgLyBcIidcIiAvIFwiKFwiIC8gXCIpXCJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIC8gXCIqXCIgLyBcIitcIiAvIFwiLFwiIC8gXCI7XCIgLyBcIj1cIlxuICAgICAqL1xuICAgIGVuY29kZVVyaVF1ZXJ5KHZhbCwgcGN0RW5jb2RlU3BhY2VzKSB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICAgICAgICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICAgICAgICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICAgICAgICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgICAgICAgICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgICAgICAgICAgcmVwbGFjZSgvJTNCL2dpLCAnOycpLlxuICAgICAgICAgICAgcmVwbGFjZSgvJTIwL2csIChwY3RFbmNvZGVTcGFjZXMgPyAnJTIwJyA6ICcrJykpO1xuICAgIH1cblxuICAgIGJ1aWxkVXJsKHVybCwgcGFyYW1zKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXBhcmFtcykgcmV0dXJuIHVybDtcbiAgICAgICAgdmFyIHBhcnRzID0gW107XG5cbiAgICAgICAgc2VsZi5mb3JFYWNoU29ydGVkKHBhcmFtcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IGlzLnVuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKCFpcy5hcnJheSh2YWx1ZSkpIHZhbHVlID0gW3ZhbHVlXTtcblxuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodikge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzLm9iamVjdCh2KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWVzc2luZyB3aXRoIHRoaXMgb2JqZWN0ICwnLHYsJyBzdHJpbmdpbmd5dCAnLCBKU09OLnN0cmluZ2lmeSh2KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpcy5kYXRlKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goc2VsZi5lbmNvZGVVcmlRdWVyeShrZXkpICsgJz0nICtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmNvZGVVcmlRdWVyeSh2KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHVybCArPSAoKHVybC5pbmRleE9mKCc/JykgPT0gLTEpID8gJz8nIDogJyYnKSArIHBhcnRzLmpvaW4oJyYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgZ2V0T3JpZ2luVXJsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlVXJsKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIE5vdGVzIGZvciBub24tSUUgYnJvd3NlcnNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQXNzaWduaW5nIGEgVVJMIHRvIHRoZSBocmVmIHByb3BlcnR5IG9mIGFuIGFuY2hvciBET00gbm9kZSwgZXZlbiBvbmUgYXR0YWNoZWQgdG8gdGhlIERPTSxcbiAgICAgKiByZXN1bHRzIGJvdGggaW4gdGhlIG5vcm1hbGl6aW5nIGFuZCBwYXJzaW5nIG9mIHRoZSBVUkwuICBOb3JtYWxpemluZyBtZWFucyB0aGF0IGEgcmVsYXRpdmVcbiAgICAgKiBVUkwgd2lsbCBiZSByZXNvbHZlZCBpbnRvIGFuIGFic29sdXRlIFVSTCBpbiB0aGUgY29udGV4dCBvZiB0aGUgYXBwbGljYXRpb24gZG9jdW1lbnQuXG4gICAgICogUGFyc2luZyBtZWFucyB0aGF0IHRoZSBhbmNob3Igbm9kZSdzIGhvc3QsIGhvc3RuYW1lLCBwcm90b2NvbCwgcG9ydCwgcGF0aG5hbWUgYW5kIHJlbGF0ZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFyZSBhbGwgcG9wdWxhdGVkIHRvIHJlZmxlY3QgdGhlIG5vcm1hbGl6ZWQgVVJMLiAgVGhpcyBhcHByb2FjaCBoYXMgd2lkZVxuICAgICAqIGNvbXBhdGliaWxpdHkgLSBTYWZhcmkgMSssIE1vemlsbGEgMSssIE9wZXJhIDcrLGUgZXRjLiAgU2VlXG4gICAgICogaHR0cDovL3d3dy5hcHRhbmEuY29tL3JlZmVyZW5jZS9odG1sL2FwaS9IVE1MQW5jaG9yRWxlbWVudC5odG1sXG4gICAgICpcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBOb3RlcyBmb3IgSUVcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBJRSA+PSA4IGFuZCA8PSAxMCBub3JtYWxpemVzIHRoZSBVUkwgd2hlbiBhc3NpZ25lZCB0byB0aGUgYW5jaG9yIG5vZGUgc2ltaWxhciB0byB0aGUgb3RoZXJcbiAgICAgKiBicm93c2Vycy4gIEhvd2V2ZXIsIHRoZSBwYXJzZWQgY29tcG9uZW50cyB3aWxsIG5vdCBiZSBzZXQgaWYgdGhlIFVSTCBhc3NpZ25lZCBkaWQgbm90IHNwZWNpZnlcbiAgICAgKiB0aGVtLiAgKGUuZy4gaWYgeW91IGFzc2lnbiBhLmhyZWYgPSBcImZvb1wiLCB0aGVuIGEucHJvdG9jb2wsIGEuaG9zdCwgZXRjLiB3aWxsIGJlIGVtcHR5LikgIFdlXG4gICAgICogd29yayBhcm91bmQgdGhhdCBieSBwZXJmb3JtaW5nIHRoZSBwYXJzaW5nIGluIGEgMm5kIHN0ZXAgYnkgdGFraW5nIGEgcHJldmlvdXNseSBub3JtYWxpemVkXG4gICAgICogVVJMIChlLmcuIGJ5IGFzc2lnbmluZyB0byBhLmhyZWYpIGFuZCBhc3NpZ25pbmcgaXQgYS5ocmVmIGFnYWluLiAgVGhpcyBjb3JyZWN0bHkgcG9wdWxhdGVzIHRoZVxuICAgICAqIHByb3BlcnRpZXMgc3VjaCBhcyBwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQsIGV0Yy5cbiAgICAgKlxuICAgICAqIElFNyBkb2VzIG5vdCBub3JtYWxpemUgdGhlIFVSTCB3aGVuIGFzc2lnbmVkIHRvIGFuIGFuY2hvciBub2RlLiAgKEFwcGFyZW50bHksIGl0IGRvZXMsIGlmIG9uZVxuICAgICAqIHVzZXMgdGhlIGlubmVyIEhUTUwgYXBwcm9hY2ggdG8gYXNzaWduIHRoZSBVUkwgYXMgcGFydCBvZiBhbiBIVE1MIHNuaXBwZXQgLVxuICAgICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ3MjcyOSkgIEhvd2V2ZXIsIHNldHRpbmcgaW1nW3NyY10gZG9lcyBub3JtYWxpemUgdGhlIFVSTC5cbiAgICAgKiBVbmZvcnR1bmF0ZWx5LCBzZXR0aW5nIGltZ1tzcmNdIHRvIHNvbWV0aGluZyBsaWtlIFwiamF2YXNjcmlwdDpmb29cIiBvbiBJRSB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICAgICAqIFNpbmNlIHRoZSBwcmltYXJ5IHVzYWdlIGZvciBub3JtYWxpemluZyBVUkxzIGlzIHRvIHNhbml0aXplIHN1Y2ggVVJMcywgd2UgY2FuJ3QgdXNlIHRoYXRcbiAgICAgKiBtZXRob2QgYW5kIElFIDwgOCBpcyB1bnN1cHBvcnRlZC5cbiAgICAgKlxuICAgICAqIFJlZmVyZW5jZXM6XG4gICAgICogICBodHRwOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MQW5jaG9yRWxlbWVudFxuICAgICAqICAgaHR0cDovL3d3dy5hcHRhbmEuY29tL3JlZmVyZW5jZS9odG1sL2FwaS9IVE1MQW5jaG9yRWxlbWVudC5odG1sXG4gICAgICogICBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIuanMvcHVsbC8yOTAyXG4gICAgICogICBodHRwOi8vamFtZXMucGFkb2xzZXkuY29tL2phdmFzY3JpcHQvcGFyc2luZy11cmxzLXdpdGgtdGhlLWRvbS9cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWQuXG4gICAgICogQGRlc2NyaXB0aW9uIE5vcm1hbGl6ZXMgYW5kIHBhcnNlcyBhIFVSTC5cbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBSZXR1cm5zIHRoZSBub3JtYWxpemVkIFVSTCBhcyBhIGRpY3Rpb25hcnkuXG4gICAgICpcbiAgICAgKiAgIHwgbWVtYmVyIG5hbWUgICB8IERlc2NyaXB0aW9uICAgIHxcbiAgICAgKiAgIHwtLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLXxcbiAgICAgKiAgIHwgaHJlZiAgICAgICAgICB8IEEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoZSBwcm92aWRlZCBVUkwgaWYgaXQgd2FzIG5vdCBhbiBhYnNvbHV0ZSBVUkwgfFxuICAgICAqICAgfCBwcm90b2NvbCAgICAgIHwgVGhlIHByb3RvY29sIGluY2x1ZGluZyB0aGUgdHJhaWxpbmcgY29sb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICogICB8IGhvc3QgICAgICAgICAgfCBUaGUgaG9zdCBhbmQgcG9ydCAoaWYgdGhlIHBvcnQgaXMgbm9uLWRlZmF1bHQpIG9mIHRoZSBub3JtYWxpemVkVXJsICAgIHxcbiAgICAgKiAgIHwgc2VhcmNoICAgICAgICB8IFRoZSBzZWFyY2ggcGFyYW1zLCBtaW51cyB0aGUgcXVlc3Rpb24gbWFyayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICAqICAgfCBoYXNoICAgICAgICAgIHwgVGhlIGhhc2ggc3RyaW5nLCBtaW51cyB0aGUgaGFzaCBzeW1ib2xcbiAgICAgKiAgIHwgaG9zdG5hbWUgICAgICB8IFRoZSBob3N0bmFtZVxuICAgICAqICAgfCBwb3J0ICAgICAgICAgIHwgVGhlIHBvcnQsIHdpdGhvdXQgXCI6XCJcbiAgICAgKiAgIHwgcGF0aG5hbWUgICAgICB8IFRoZSBwYXRobmFtZSwgYmVnaW5uaW5nIHdpdGggXCIvXCJcbiAgICAgKlxuICAgICAqL1xuICAgIHJlc29sdmVVcmwodXJsKSB7XG5cbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG4gICAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJylcbiAgICAgICAgICAgICAgICA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgOiAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGEgcmVxdWVzdCBVUkwgYW5kIGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgYSBzYW1lLW9yaWdpbiByZXF1ZXN0IGFzIHRoZSBhcHBsaWNhdGlvbiBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVxdWVzdFVybCBUaGUgdXJsIG9mIHRoZSByZXF1ZXN0IGFzIGEgc3RyaW5nIHRoYXQgd2lsbCBiZSByZXNvbHZlZFxuICAgICAqIG9yIGEgcGFyc2VkIFVSTCBvYmplY3QuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIHJlcXVlc3QgaXMgZm9yIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgYXBwbGljYXRpb24gZG9jdW1lbnQuXG4gICAgICovXG4gICAgdXJsSXNTYW1lT3JpZ2luKHJlcXVlc3RVcmwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9IChpcy5zdHJpbmcocmVxdWVzdFVybCkpID8gdGhpcy5yZXNvbHZlVXJsKHJlcXVlc3RVcmwpIDogcmVxdWVzdFVybDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IHRoaXMuZ2V0T3JpZ2luVXJsLnByb3RvY29sICYmXG4gICAgICAgIHBhcnNlZC5ob3N0ID09PSB0aGlzLmdldE9yaWdpblVybC5ob3N0KTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVXRpbHMoKTtcblxuIl19