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
        return this.send('HEAD', url, params);

    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    get(url, params) {
        url = buildUrl(url, params);
        return this.send('GET', url, params);
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    post(url, params) {
        return this.send('POST', url, params);
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    put(url, params) {
        return this.send('PUT', url, params);
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    delete(url, params) {
        return this.send('DELETE', url, params);
    }

    setHeader(name, value) {

        this.headers[name] = value;
        return this;

    }

    /**
     *
     * @param {String} method
     * @param {String} url
     * @param {Object} params
     * @returns {Promise}
     */
    send(method, url, params) {
        return this.transport.send(method, url, params)
    }


}

export default Agent;

