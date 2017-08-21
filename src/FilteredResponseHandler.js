/**
 * FilteredResposneHandler
 */
export interface class FilteredResponseHandler {

    /**
     * onSuccess is called on status 200
     */
    onSuccess(r:Response);

    /**
     * onCreated is called on status 201.
     */
    onCreated(r:Response) ;

    /**
     * onNoContent is called on status 204.
     */
    onNoContent(r:Response) ;

    /**
     * onBadRequest is called on status 400.
     */
onBadRequest(e:ClientError) {}

    /**
     * onUnauthorized is called on status 401.
     */
    onUnauthorized(e:ClientError) {}

    /**
     * onForbidden is called on status 403.
     * The user does not have enough permissions to
     */
    onForbidden(e:ClientError) {}

    /**
     * onNotFound is called on status 404.
     * The resource was not found.
     */
    onNotFound(e:ClientError) {}

    /**
     * onConflict is called on status 409.
     */
    onConflict(e:ClientError) {}

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
