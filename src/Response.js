import parse from 'parse-headers';

/**
 * Response
 */
class Response {

    constructor(status, data, headers, body, statusText) {
        this.status = status;
        this.statusText = statusText;
        this.data = data;
        this.headers = headers;
        this.body = body;
    }

}

/**
 * create a new HTTPResponse
 * @param {XMLHttpRequest} xhr
 * @param {Transform} transform
 */
Response.create = function(xhr, transform) {
    return new Response(xhr.status, transform.transformResponseBody(xhr.response),
        parse(xhr.getAllResponseHeaders()), xhr.responseText, xhr.statusText);
}
export default Response;
