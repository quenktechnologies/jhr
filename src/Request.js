import beof from 'beof';
import Promise from 'bluebird';
import Headers from './Headers';
import Url from './Url';
import TransportError from './TransportError';
import Response from './Response';
import HTTPError from './HTTPError';
import {create} from './HTTPError';

/**
 * Maco
 */
class Maco {

    /**
     * onResponse
     */
    onResponse() {

    }

    onError() {}

}

/**
 * ErrorMaco
 */
class ErrorMaco {


}

const defaultMaco = {

    onResponse(res) {

        return res;

    },

    onError(e) {

        throw e;

    }

}

/**
 * Request
 * @param {string} method
 * @param {string} url
 * @param {Agent} agent
 * @param {ResponseHandler} maco
 *
 * @property {string} url
 * @property {object} params
 * @property {Agent} agent
 * @property {string} method
 * @property {object} headers
 */
class Request {

    constructor(method, url, agent, maco = defaultMaco) {

        beof({ method }).string();
        beof({ url }).string();
        beof({ agent }).object();
        beof({ maco }).interface(Maco);

        this.url = url;
        this.query = {};
        this.body = null;
        this.agent = agent;
        this.method = '';
        this.headers = {};
        this.ttl = 0;
        this.maco = maco;

    }

    execute() {

        var xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {

            xhr.open(this.method, Url.fromString(this.url, this.query), true);

            xhr.onload = () => {

                var responseBody = null;

                if ((xhr.response != null) && xhr.response !== '')
                    responseBody = this.agent.transform.parseResponseBody(xhr.response);

                if (xhr.status >= 400)
                    return reject(create(xhr.status,
                        xhr.responseText, responseBody, xhr.response));

                resolve(Response.create(xhr, responseBody));

            };

            if (this.ttl > 0)
                xhr.timeout = this.ttl;

            Headers.set(xhr, this.agent.headers, this.headers);

            xhr.responseType = this.agent.transform.responseType || '';

            this.agent.adapters.forEach(a => a.beforeRequest(this, xhr, this.agent));

            xhr.onerror = () => reject(new TransportError());
            xhr.onabort = () => reject(new TransportError());
            xhr.send(this.body);

        }).
        then(res => this.maco.onResponse(res)).
        catch(HTTPError, e => this.maco.onError(e));

    }

}

export { Maco }
export default Request
