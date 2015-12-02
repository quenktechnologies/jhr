import ErrorClass from './ErrorClass';

/**
 * HTTPError
 */
class HTTPError extends ErrorClass {

	/**
	 * @param {Response} res
	 */
	constructor(res) {
		super(res.body);
                this.status = res.status;
	}
}

export default HTTPError;

