import parse from 'parse-headers';

/**
 * Response
 */
class Response {

    constructor(status, data, headers, text) {

        this.status = status;
        this.data = data;
        this.headers = headers;
        this.text = text;

    }

}

/**
 * create a new HTTPResponse
 * @param {XMLHttpRequest} xhr
 * @param {Transform} transform
 */
Response.create = function(xhr, transform) {
    return new Response(xhr.status, transform.transformResponseBody(xhr.response),
        parse(xhr.getAllResponseHeaders()), xhr.statusText);
}
export default Response;
