import ES6Error from 'error-class';

/**
 * HTTPError
 */
class HTTPError extends ES6Error {

    /**
     * @param {Response} res
     */
    constructor(res) {
        super('HTTPError');
        this.status = res.status;
        this.message = res.body;
    }
}

export default HTTPError;
