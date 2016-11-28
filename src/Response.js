import beof from 'beof';
import Headers from './Headers';

/**
 * Response
 * @property {number} status
 * @property {Object} body
 * @property {Object} headers
 */
class Response {

    constructor(status, body, headers) {

        beof({ status }).number();
        beof({ body }).optional().object();
        beof({ headers }).object();

        this.status = status;
        this.headers = headers;
        this.body = body;

    }

    /**
     * create a new HTTPResponse
     * @param {XMLHttpRequest} xhr
     * @param {object} body
     */
    static create(xhr, body) {

        return new Response(xhr.status, body,
            Headers.parse(xhr.getAllResponseHeaders()));

    }

}

export default Response
