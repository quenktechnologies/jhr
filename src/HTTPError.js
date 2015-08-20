import ES6Error from 'error-class';

/**
 * HTTPError
 */
class HTTPError extends ES6Error {

    /**
     * @param {Response} res
     */
    constructor(res) {
        super(res.body);
        this.status = res.status;
    }
}

export default HTTPError;
