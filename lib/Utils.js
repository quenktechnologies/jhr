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
    }, {
        key: 'encodeUriQuery',
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
    }, {
        key: 'resolveUrl',
        value: function resolveUrl(url) {

            var href = url;
            var urlParsingNode = document.createElement("a");

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

        /**
         * Parse a request URL and determine whether this is a same-origin request as the application document.
         *
         * @param {string|object} requestUrl The url of the request as a string that will be resolved
         * or a parsed URL object.
         * @returns {boolean} Whether the request is for the same origin as the application document.
         */
    }, {
        key: 'urlIsSameOrigin',
        value: function urlIsSameOrigin(requestUrl) {
            var parsed = _is2['default'].string(requestUrl) ? this.resolveUrl(requestUrl) : requestUrl;
            return parsed.protocol === this.getOriginUrl.protocol && parsed.host === this.getOriginUrl.host;
        }
    }]);

    return Utils;
})();

exports['default'] = new Utils();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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XG5cblxuXG4vKipcbiAqIFV0aWxzXG4gKi9cbmNsYXNzIFV0aWxzIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5KU09OX1BST1RFQ1RJT05fUFJFRklYID0gL15cXClcXF1cXH0nLD9cXG4vO1xuICAgIH1cblxuICAgIGNsb25lKG8pIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobykpO1xuICAgIH1cblxuICAgIGlzRmlsZShvYmopIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xuICAgIH1cblxuICAgIGlzRm9ybURhdGEob2JqKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZvcm1EYXRhXSc7XG4gICAgfVxuXG4gICAgaXNCbG9iKG9iaikge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCbG9iXSc7XG4gICAgfVxuXG4gICAgZnJvbUpzb24oanNvbikge1xuICAgICAgICByZXR1cm4gaXMuc3RyaW5nKGpzb24pXG4gICAgICAgICAgICA/IEpTT04ucGFyc2UoanNvbilcbiAgICAgICAgICAgIDoganNvbjtcbiAgICB9XG5cbiAgICBmb3JFYWNoU29ydGVkKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopLnNvcnQoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXlzW2ldXSwga2V5c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgaW50ZW5kZWQgZm9yIGVuY29kaW5nICprZXkqIG9yICp2YWx1ZSogcGFydHMgb2YgcXVlcnkgY29tcG9uZW50LiBXZSBuZWVkIGEgY3VzdG9tXG4gICAgICogbWV0aG9kIGJlY2F1c2UgZW5jb2RlVVJJQ29tcG9uZW50IGlzIHRvbyBhZ2dyZXNzaXZlIGFuZCBlbmNvZGVzIHN0dWZmIHRoYXQgZG9lc24ndCBoYXZlIHRvIGJlXG4gICAgICogZW5jb2RlZCBwZXIgaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NjpcbiAgICAgKiAgICBxdWVyeSAgICAgICA9ICooIHBjaGFyIC8gXCIvXCIgLyBcIj9cIiApXG4gICAgICogICAgcGNoYXIgICAgICAgICA9IHVucmVzZXJ2ZWQgLyBwY3QtZW5jb2RlZCAvIHN1Yi1kZWxpbXMgLyBcIjpcIiAvIFwiQFwiXG4gICAgICogICAgdW5yZXNlcnZlZCAgICA9IEFMUEhBIC8gRElHSVQgLyBcIi1cIiAvIFwiLlwiIC8gXCJfXCIgLyBcIn5cIlxuICAgICAqICAgIHBjdC1lbmNvZGVkICAgPSBcIiVcIiBIRVhESUcgSEVYRElHXG4gICAgICogICAgc3ViLWRlbGltcyAgICA9IFwiIVwiIC8gXCIkXCIgLyBcIiZcIiAvIFwiJ1wiIC8gXCIoXCIgLyBcIilcIlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgLyBcIipcIiAvIFwiK1wiIC8gXCIsXCIgLyBcIjtcIiAvIFwiPVwiXG4gICAgICovXG4gICAgZW5jb2RlVXJpUXVlcnkodmFsLCBwY3RFbmNvZGVTcGFjZXMpIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgICAgICAgICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgICAgICAgICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgICAgICAgICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgICAgICAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgICAgICAgICByZXBsYWNlKC8lM0IvZ2ksICc7JykuXG4gICAgICAgICAgICByZXBsYWNlKC8lMjAvZywgKHBjdEVuY29kZVNwYWNlcyA/ICclMjAnIDogJysnKSk7XG4gICAgfVxuXG4gICAgYnVpbGRVcmwodXJsLCBwYXJhbXMpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghcGFyYW1zKSByZXR1cm4gdXJsO1xuICAgICAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgICAgICBzZWxmLmZvckVhY2hTb3J0ZWQocGFyYW1zLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgaXMudW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoIWlzLmFycmF5KHZhbHVlKSkgdmFsdWUgPSBbdmFsdWVdO1xuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXMub2JqZWN0KHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtZXNzaW5nIHdpdGggdGhpcyBvYmplY3QgLCcsdiwnIHN0cmluZ2luZ3l0ICcsIEpTT04uc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzLmRhdGUodikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFydHMucHVzaChzZWxmLmVuY29kZVVyaVF1ZXJ5KGtleSkgKyAnPScgK1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuY29kZVVyaVF1ZXJ5KHYpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdXJsICs9ICgodXJsLmluZGV4T2YoJz8nKSA9PSAtMSkgPyAnPycgOiAnJicpICsgcGFydHMuam9pbignJicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBnZXRPcmlnaW5VcmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVVcmwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW1wbGVtZW50YXRpb24gTm90ZXMgZm9yIG5vbi1JRSBicm93c2Vyc1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBBc3NpZ25pbmcgYSBVUkwgdG8gdGhlIGhyZWYgcHJvcGVydHkgb2YgYW4gYW5jaG9yIERPTSBub2RlLCBldmVuIG9uZSBhdHRhY2hlZCB0byB0aGUgRE9NLFxuICAgICAqIHJlc3VsdHMgYm90aCBpbiB0aGUgbm9ybWFsaXppbmcgYW5kIHBhcnNpbmcgb2YgdGhlIFVSTC4gIE5vcm1hbGl6aW5nIG1lYW5zIHRoYXQgYSByZWxhdGl2ZVxuICAgICAqIFVSTCB3aWxsIGJlIHJlc29sdmVkIGludG8gYW4gYWJzb2x1dGUgVVJMIGluIHRoZSBjb250ZXh0IG9mIHRoZSBhcHBsaWNhdGlvbiBkb2N1bWVudC5cbiAgICAgKiBQYXJzaW5nIG1lYW5zIHRoYXQgdGhlIGFuY2hvciBub2RlJ3MgaG9zdCwgaG9zdG5hbWUsIHByb3RvY29sLCBwb3J0LCBwYXRobmFtZSBhbmQgcmVsYXRlZFxuICAgICAqIHByb3BlcnRpZXMgYXJlIGFsbCBwb3B1bGF0ZWQgdG8gcmVmbGVjdCB0aGUgbm9ybWFsaXplZCBVUkwuICBUaGlzIGFwcHJvYWNoIGhhcyB3aWRlXG4gICAgICogY29tcGF0aWJpbGl0eSAtIFNhZmFyaSAxKywgTW96aWxsYSAxKywgT3BlcmEgNyssZSBldGMuICBTZWVcbiAgICAgKiBodHRwOi8vd3d3LmFwdGFuYS5jb20vcmVmZXJlbmNlL2h0bWwvYXBpL0hUTUxBbmNob3JFbGVtZW50Lmh0bWxcbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIE5vdGVzIGZvciBJRVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIElFID49IDggYW5kIDw9IDEwIG5vcm1hbGl6ZXMgdGhlIFVSTCB3aGVuIGFzc2lnbmVkIHRvIHRoZSBhbmNob3Igbm9kZSBzaW1pbGFyIHRvIHRoZSBvdGhlclxuICAgICAqIGJyb3dzZXJzLiAgSG93ZXZlciwgdGhlIHBhcnNlZCBjb21wb25lbnRzIHdpbGwgbm90IGJlIHNldCBpZiB0aGUgVVJMIGFzc2lnbmVkIGRpZCBub3Qgc3BlY2lmeVxuICAgICAqIHRoZW0uICAoZS5nLiBpZiB5b3UgYXNzaWduIGEuaHJlZiA9IFwiZm9vXCIsIHRoZW4gYS5wcm90b2NvbCwgYS5ob3N0LCBldGMuIHdpbGwgYmUgZW1wdHkuKSAgV2VcbiAgICAgKiB3b3JrIGFyb3VuZCB0aGF0IGJ5IHBlcmZvcm1pbmcgdGhlIHBhcnNpbmcgaW4gYSAybmQgc3RlcCBieSB0YWtpbmcgYSBwcmV2aW91c2x5IG5vcm1hbGl6ZWRcbiAgICAgKiBVUkwgKGUuZy4gYnkgYXNzaWduaW5nIHRvIGEuaHJlZikgYW5kIGFzc2lnbmluZyBpdCBhLmhyZWYgYWdhaW4uICBUaGlzIGNvcnJlY3RseSBwb3B1bGF0ZXMgdGhlXG4gICAgICogcHJvcGVydGllcyBzdWNoIGFzIHByb3RvY29sLCBob3N0bmFtZSwgcG9ydCwgZXRjLlxuICAgICAqXG4gICAgICogSUU3IGRvZXMgbm90IG5vcm1hbGl6ZSB0aGUgVVJMIHdoZW4gYXNzaWduZWQgdG8gYW4gYW5jaG9yIG5vZGUuICAoQXBwYXJlbnRseSwgaXQgZG9lcywgaWYgb25lXG4gICAgICogdXNlcyB0aGUgaW5uZXIgSFRNTCBhcHByb2FjaCB0byBhc3NpZ24gdGhlIFVSTCBhcyBwYXJ0IG9mIGFuIEhUTUwgc25pcHBldCAtXG4gICAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDcyNzI5KSAgSG93ZXZlciwgc2V0dGluZyBpbWdbc3JjXSBkb2VzIG5vcm1hbGl6ZSB0aGUgVVJMLlxuICAgICAqIFVuZm9ydHVuYXRlbHksIHNldHRpbmcgaW1nW3NyY10gdG8gc29tZXRoaW5nIGxpa2UgXCJqYXZhc2NyaXB0OmZvb1wiIG9uIElFIHRocm93cyBhbiBleGNlcHRpb24uXG4gICAgICogU2luY2UgdGhlIHByaW1hcnkgdXNhZ2UgZm9yIG5vcm1hbGl6aW5nIFVSTHMgaXMgdG8gc2FuaXRpemUgc3VjaCBVUkxzLCB3ZSBjYW4ndCB1c2UgdGhhdFxuICAgICAqIG1ldGhvZCBhbmQgSUUgPCA4IGlzIHVuc3VwcG9ydGVkLlxuICAgICAqXG4gICAgICogUmVmZXJlbmNlczpcbiAgICAgKiAgIGh0dHA6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxBbmNob3JFbGVtZW50XG4gICAgICogICBodHRwOi8vd3d3LmFwdGFuYS5jb20vcmVmZXJlbmNlL2h0bWwvYXBpL0hUTUxBbmNob3JFbGVtZW50Lmh0bWxcbiAgICAgKiAgIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAqICAgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci5qcy9wdWxsLzI5MDJcbiAgICAgKiAgIGh0dHA6Ly9qYW1lcy5wYWRvbHNleS5jb20vamF2YXNjcmlwdC9wYXJzaW5nLXVybHMtd2l0aC10aGUtZG9tL1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZC5cbiAgICAgKiBAZGVzY3JpcHRpb24gTm9ybWFsaXplcyBhbmQgcGFyc2VzIGEgVVJMLlxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IFJldHVybnMgdGhlIG5vcm1hbGl6ZWQgVVJMIGFzIGEgZGljdGlvbmFyeS5cbiAgICAgKlxuICAgICAqICAgfCBtZW1iZXIgbmFtZSAgIHwgRGVzY3JpcHRpb24gICAgfFxuICAgICAqICAgfC0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tfFxuICAgICAqICAgfCBocmVmICAgICAgICAgIHwgQSBub3JtYWxpemVkIHZlcnNpb24gb2YgdGhlIHByb3ZpZGVkIFVSTCBpZiBpdCB3YXMgbm90IGFuIGFic29sdXRlIFVSTCB8XG4gICAgICogICB8IHByb3RvY29sICAgICAgfCBUaGUgcHJvdG9jb2wgaW5jbHVkaW5nIHRoZSB0cmFpbGluZyBjb2xvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgKiAgIHwgaG9zdCAgICAgICAgICB8IFRoZSBob3N0IGFuZCBwb3J0IChpZiB0aGUgcG9ydCBpcyBub24tZGVmYXVsdCkgb2YgdGhlIG5vcm1hbGl6ZWRVcmwgICAgfFxuICAgICAqICAgfCBzZWFyY2ggICAgICAgIHwgVGhlIHNlYXJjaCBwYXJhbXMsIG1pbnVzIHRoZSBxdWVzdGlvbiBtYXJrICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICogICB8IGhhc2ggICAgICAgICAgfCBUaGUgaGFzaCBzdHJpbmcsIG1pbnVzIHRoZSBoYXNoIHN5bWJvbFxuICAgICAqICAgfCBob3N0bmFtZSAgICAgIHwgVGhlIGhvc3RuYW1lXG4gICAgICogICB8IHBvcnQgICAgICAgICAgfCBUaGUgcG9ydCwgd2l0aG91dCBcIjpcIlxuICAgICAqICAgfCBwYXRobmFtZSAgICAgIHwgVGhlIHBhdGhuYW1lLCBiZWdpbm5pbmcgd2l0aCBcIi9cIlxuICAgICAqXG4gICAgICovXG4gICAgcmVzb2x2ZVVybCh1cmwpIHtcblxuICAgICAgICB2YXIgaHJlZiA9IHVybDtcbiAgICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKVxuICAgICAgICAgICAgICAgID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgICAgICAgICA6ICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYSByZXF1ZXN0IFVSTCBhbmQgZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBhIHNhbWUtb3JpZ2luIHJlcXVlc3QgYXMgdGhlIGFwcGxpY2F0aW9uIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZXF1ZXN0VXJsIFRoZSB1cmwgb2YgdGhlIHJlcXVlc3QgYXMgYSBzdHJpbmcgdGhhdCB3aWxsIGJlIHJlc29sdmVkXG4gICAgICogb3IgYSBwYXJzZWQgVVJMIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgcmVxdWVzdCBpcyBmb3IgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBhcHBsaWNhdGlvbiBkb2N1bWVudC5cbiAgICAgKi9cbiAgICB1cmxJc1NhbWVPcmlnaW4ocmVxdWVzdFVybCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKGlzLnN0cmluZyhyZXF1ZXN0VXJsKSkgPyB0aGlzLnJlc29sdmVVcmwocmVxdWVzdFVybCkgOiByZXF1ZXN0VXJsO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gdGhpcy5nZXRPcmlnaW5VcmwucHJvdG9jb2wgJiZcbiAgICAgICAgcGFyc2VkLmhvc3QgPT09IHRoaXMuZ2V0T3JpZ2luVXJsLmhvc3QpO1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBVdGlscygpO1xuXG4iXX0=