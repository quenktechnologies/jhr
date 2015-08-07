import is from 'is';
import qs from 'qs';

var buildUrl = function(url, params){
    if(!params) return url;
    return url+'?'+qs.stringify(params);
}


/**
 * Http provides an api similar to angular's $http.
 * Uses promises for sanity and less suck.
 * @param {HTTPTransport} transport
 */
class Agent {

    constructor(transport) {
        this.transport = transport;
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    head(url, params) {
        url = buildUrl(url, params);
        return this.send({method:'HEAD', url:url, body:params});
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    get(url, params) {
        url = buildUrl(url, params);
        return this.send({method:'GET', url:url, body:params});
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    post(url, params) {
        return this.send({method:'POST', url:url, body:params});
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    put(url, params) {
        return this.send({method:'PUT', url:url, body:params});
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    delete(url, params) {
        return this.send({method:'DELETE', url:url, body:params});
    }

    setHeader(name, value) {
        this.headers[name] = value;
        return this;
    }

    /**
     *
     * @param {Object} req
     * @param {String} req.method
     * @param {String} req.url
     * @param {Object} [req.params]
     * @returns {Promise}
     */
    send(req) {
        return this.transport.send(req)
    }


}

export default Agent;

