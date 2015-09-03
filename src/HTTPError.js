import ErrorClass from './ErrorClass';

/**
 * HTTPError
 */
class HTTPError extends ErrorClass {

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

