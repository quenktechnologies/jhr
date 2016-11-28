function JHRError(message) {

    this.message = message;
    this.stack = (new Error(message)).stack;

    if (Error.hasOwnProperty('captureStackTrace'))
        Error.captureStackTrace(this, this.constructor);

}

JHRError.prototype = Object.create(Error.prototype);
JHRError.prototype.constructor = JHRError;
export default JHRError
