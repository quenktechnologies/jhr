import ES6Error from 'es6-error';

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
