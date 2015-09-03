import ErrorClass from './ErrorClass';
/**
 * TransportError indicates a lowlevel error.
 *
 * The error may be due to an abort on a request or the browser being unable to
 * honour it.
 */
  class TransportError extends ErrorClass {
	constructor(res) {
		super('An error occured during transport! Is the server down?');
	}
}
export default TransportError

