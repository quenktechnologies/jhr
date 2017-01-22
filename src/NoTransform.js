import Utils from './Utils';

/**
 * NoTransform lets the browser do everything.
 */
class NoTransform {

    constructor() {

        this.responseType = '';

    }

    accepts() {

        return;

    }

    contentType() {

        return;

    }

    parseRequestBody(body) {

        return body;

    }

    parseResponseBody(body={}) {

        return body;

    }

}

export default NoTransform;
