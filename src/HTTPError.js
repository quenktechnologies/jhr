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
	}
}

export default HTTPError;

