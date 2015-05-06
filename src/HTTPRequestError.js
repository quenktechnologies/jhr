/**
 * HTTPError
 */
class HTTPRequestError extends Error{

    /**
     * @param {Response} res
     */
    constructor(res) {
        super(res.text);
        this.status = res.status;
    }

    /**
     * toResponse returns the HTTPResponse associated with this error.
     * @returns {Response} res
     */
    toResposne() {
        return res;
    }
}

export default HTTPRequestError

