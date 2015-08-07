/**
 * HTTPError
 */
class HTTPError extends Error{

    /**
     * @param {Response} res
     */
    constructor(res) {
        super();
        this.message = res.text+(typeof res.body === 'string')?res.body:'';
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

export default HTTPError;
