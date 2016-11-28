/**
 * FilteredResposneHandler
 * @interface
 */
class FilteredResposneHandler {

    /**
     * onSuccess is called on status 200
     * @param {Response} response
     */
    onSuccess() {

    }

    /**
     * onCreated is called on status 201.
     * @param {Response} response
     */
    onCreated() {

    }

    /**
     * onNoContent is called on status 204.
     * @param {Response} response
     */
    onNoContent() {

    }

    /**
     * onBadRequest is called on status 400.
     * @param {ClientError} err
     */
onBadRequest() {}

    /**
     * onUnauthorized is called on status 401.
     * The user must authenticate to complete the request.
     * @param {ClientError} err
     */
    onUnauthorized() {}

    /**
     * onForbidden is called on status 403.
     * The user does not have enough permissions to
     * perform the request.
     * @param {ClientError} err
     */
    onForbidden() {}

    /**
     * onNotFound is called on status 404.
     * The resource was not found.
     * @param {ClientError} err
     */
    onNotFound() {}

    /**
     * onConflict is called on status 409.
     * @param {ClientError} err
     */
    onConflict() {}

    /**
     * onInternalError is called on status 500.
     * The back end died.
     * @param {ServerError} err
     */
    onInternalError() {}

    /**
     * onError is called when a non http error occurs
     * @param {Error} err
     */
    onError() {}



}

export default FilteredResposneHandler
