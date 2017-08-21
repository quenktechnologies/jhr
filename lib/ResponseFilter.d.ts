import * as Errors from './Errors';
import { Response } from './Agent';
export interface FilteredResponseHandler {
    /**
     * onSuccess is called on status 200
     */
    onSuccess<A>(r: Response<A>): void;
    /**
     * onCreated is called on status 201.
     */
    onCreated<A>(r: Response<A>): void;
    /**
     * onNoContent is called on status 204.
     */
    onNoContent<A>(r: Response<A>): void;
    /**
     * onBadRequest is called on status 400.
     */
    onBadRequest(e: Errors.ClientError): void;
    /**
     * onUnauthorized is called on status 401.
     */
    onUnauthorized(e: Errors.ClientError): void;
    /**
     * onForbidden is called on status 403.
     * The user does not have enough permissions to
     */
    onForbidden(e: Errors.ClientError): void;
    /**
     * onNotFound is called on status 404.
     * The resource was not found.
     */
    onNotFound(e: Errors.ClientError): void;
    /**
     * onConflict is called on status 409.
     */
    onConflict(e: Errors.ClientError): void;
    /**
     * onInternalError is called on status 500.
     * The back end died.
     * @param {ServerError} err
     */
    onInternalError(e: Errors.ServerError): void;
    /**
     * onError is called when a non http error occurs
     * @param {Error} err
     */
    onError(e: Error): void;
}
/**
 * ResponseFilter filters a response to determine what Requesthandler
 * method to call.
 * @param {FilteredResponseMaco} handler
 * @implements {ResponseMaco}
 */
export declare class ResponseFilter {
    handler: FilteredResponseHandler;
    constructor(handler: FilteredResponseHandler);
    onResponse<A>(r: Response<A>): void;
    onError(e: Errors.HTTPError): void;
}