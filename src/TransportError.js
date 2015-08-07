import ES6Error from 'es6-error';
/**
 * TransportError indicates a lowlevel error.
 *
 * The error may be due to an abort on a request or the browser being unable to
 * honour it.
 */
class TransportError extends ES6Error {
    constructor(res){
        super('An error occured during transport! Is the server down?');
    }
}
export default TransportError

