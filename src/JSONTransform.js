import Utils from './Utils';

/**
 * JSONTransform
 */
class JSONTransform {

    constructor(prefix = /^\)\]\}',?\n/) {

        this.prefix = prefix;
        this.responseType = '';

    }

    accepts() {

        return 'application/json';

    }

    contentType() {

        return 'application/json;charset=utf-8';

    }

    parseRequestBody(body) {

        return (Utils.isObject(body) &&
                !Utils.isFile(body) &&
                !Utils.isBlob(body) &&
                !Utils.isFormData(body)) ?
            JSON.stringify(body) : body;

    }

    parseResponseBody(body) {

        if (typeof body === 'string') {

            body = body.replace(this.prefix, '').trim();

            if (body) {

                try {

                    body = JSON.parse(body);

                } catch (e) {

                    //originally null set to undefined for ES2015 default values
                    body = undefined;

                }

            }

        }

        return body;

    }

}

export default JSONTransform;
