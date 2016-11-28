import parseHeaders from 'parse-headers';

/**
 * Headers
 */
class Headers {

    constructor() {

        this.CONTENT_TYPE = 'Content-Type';
        this.ACCEPTS = 'Accept';

    }

    /**
     * parse a string of headers into an object.
     * @param {string} str
     * returns {object}
     */
    parse(str) {

        return parseHeaders(str) || {};

    }

    /**
     * set headers on an XMLHttpRequest object.
     * @param {XMLHttpRequest} xhr
     * @param {object} ..headers
     */
    set(xhr) {

        var i = arguments.length;

        while (i--)
            if (i !== 0)
                Object.keys(arguments[i]).forEach(k => {

                    if (arguments[i][k] != null)
                        xhr.setRequestHeader(k, arguments[i][k])

                });

    }

}

export default new Headers()
