import beof from 'beof';
import Headers from './Headers';
import Methods from './Methods';
import Transform from './Transform';
import JSONTransform from './JSONTransform';
import Adapter from './Adapter';
import Request from './Request';

const COPIED = ['method', 'headers', 'ttl', 'query'];

/**
 * @param {Transform} [transform]
 */
class Agent {

    constructor(transform = new JSONTransform()) {

        beof({ transform }).interface(Transform);

        this.transform = transform;
        this.headers = {};
        this.adapters = [];

    }

    /**
     * create
     * @param {Transform} transform
     */
    static create(transform) {

        return new Agent(transform);

    }

    /**
     * send
     * @param {object} request
     * @param {Maco} maco
     */
    static send(request, maco) {

        return Agent.create().send(request);

    }

    /**
     * add
     * @param {Adapter} a
     */
    add(a) {

        beof({ a }).interface(Adapter);
        this.adapters.push(a);
        return this;

    }

    /**
     * @param {String} url
     * @param {Object} [query]
     * @param {Object} [headers]
     * @param {Maco} [maco]
     * @param {ErrorMaco} [errorMaco]
     * @return {Promise}
     */
    head(url, query, headers, maco) {

        return this.send({ method: Methods.HEAD, url, query, headers }, maco);

    }

    /**
     *
     * @param {String} url
     * @param {Object} [query]
     * @param {Object} [headers]
     * @param {Maco} [maco]
     * @param {ErrorMaco} [errorMaco]
     * @return {Promise}
     */
    get(url, query, headers, maco) {

        return this.send({ method: Methods.GET, url, query, headers }, maco);

    }

    /**
     * @param {String} url
     * @param {Object} body
     * @param {Object} [headers]
     * @param {Maco} [maco]
     * @param {ErrorMaco} [errorMaco]
     * @return {Promise}
     */
    post(url, body, headers, maco) {

        return this.send({ method: Methods.POST, url, body, headers }, maco);

    }

    /**
     * @param {String} url
     * @param {Object} body
     * @param {Object} [headers]
     * @param {Maco} [maco]
     * @param {ErrorMaco} [errorMaco]
     * @return {Promise}
     */
    put(url, body, headers, maco) {

        return this.send({ method: Methods.PUT, url, body, headers }, maco);

    }

    /**
     * @param {String} url
     * @param {Object} body
     * @param {Object} [headers]
     * @param {Maco} [maco]
     * @param {ErrorMaco} [errorMaco]
     * @return {Promise}
     */
    delete(url, body, headers, maco, ErrorMaco) {

        return this.send({ method: Methods.DELETE, url, body, headers }, maco);

    }

    /**
     * @param {Object} req
     * @param {Maco} [maco]
     * @param {ErrorMaco} [errorMaco]
     * @returns {Promise}
     */
    send(req, maco) {

        return this.newRequest(req, maco).execute();
    }

    /**
     * newRequest creates a new Request from an object descriptor.
     * @param {object} req
     * @param {Request.Maco} [maco]
     * @param {Request.ErrorMaco} [errorMaco]
     */
    newRequest(req, maco) {

        var ret = new Request(req.method, req.url, this, maco);

        COPIED.forEach(k => {
            if (req.hasOwnProperty(k))
                if (req[k] != null)
                    ret[k] = req[k];
        });

        if (!req.method)
            throw new ReferenceError(`No method supplied!`);

        if (!req.method)
            throw new ReferenceError(`No url specified!`);

        if ((ret.method === Methods.GET) || (ret.method === Methods.HEAD)) {

            ret.headers[Headers.ACCEPT] = this.transform.accepts();

        } else {

            ret.headers[Headers.CONTENT_TYPE] = this.transform.contentType();
            ret.body = this.transform.parseRequestBody(req.body);

        }

        return ret;

    }

}

/* jshint ignore: start */
export * as Status from './Status';
export * as HTTPError from './HTTPError';
export TransportError from './TransportError';
export JHRError from './JHRError';
export JSONTransform from './JSONTransform';
export NoTransform from './NoTransform';
export Response from './Response';
export CSRFAdapter from './CSRFAdapter';
export ResponseFilter from './ResponseFilter';
/* jshint ignore: end */

export { Request, Methods, Headers };
export default Agent
