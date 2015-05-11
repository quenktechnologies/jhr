import is from 'is';

import Utils from './Utils';




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

        url = Utils.buildUrl(url, params);
        return this.send('HEAD', url);

    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */
    get(url, params) {
        url = Utils.buildUrl(url, params);
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

        var self = this;

        return new Promise(function (resolve, reject) {

            self.transport.send(method, url, params, function(err, res) {

                if(err) return reject(err, res);
                resolve(res);

            });
        });
    }


}

export default Agent;

