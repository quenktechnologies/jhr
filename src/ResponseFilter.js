/**
 * ResponseFilter filters a response to determine what Requesthandler
 * method to call.
 * @param {FilteredResponseMaco} handler
 * @implements {ResponseMaco}
 */
class ResponseFilter {

    constructor(handler) {

        this.handler = handler;

    }

    onResponse(r) {

        switch (r.status) {

            case 200:
                this.handler.onSuccess(r);
                break;
            case 201:
                this.handler.onCreated(r);
                break;
            case 204:
                this.handler.onNoContent(r);
                break;

            default:
                throw new Error(`Unknown status ${r.status}`);

        }

    }

    onError(e) {

        switch (e.status) {

            case 400:
                this.handler.onBadRequest(e);
                break;

            case 401:
                this.handler.onUnauthorzied(e);
                break;

            case 403:
                this.handler.onForbidden(e);
                break;

            case 404:
                this.handler.onNotFound(e);
                break;

            case 409:
                this.handler.onConflict(e);
                break;

            case 500:
                this.handler.onInternalError(e);
                break;

            default:
                this.handler.onError(e);
                break;

        }

    }

}

export default ResponseFilter
