import is from 'is';
import Utils from './Utils';

/**
 * JSONTransform
 */
class JSONTransform {

    constructor(prefix) {

        this.prefix = prefix || /^\)\]\}',?\n/;
        this.responseType = 'json';
        this.ACCEPT_HEADER = 'application/json';
        this.CONTENT_TYPE_HEADER = 'application/json;charset=utf-8';
    }

    transformRequestBody(body) {
        return (is.object(body) && !Utils.isFile(body)
        && !Utils.isBlob(body) && !Utils.isFormData(body)) ? JSON.stringify(body) : body;
    }

    transformResponseBody(body) {

        if (is.string(body)) {

            body = body.replace(this.prefix, '').trim();

            if(body)
            body = JSON.parse(body);

            }

        return body;

    }

}

export default JSONTransform;

