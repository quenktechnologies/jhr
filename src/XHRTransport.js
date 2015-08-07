import cookies from 'browser-cookies';
import Promise from 'bluebird';

import Utils from './Utils';
import ClientError from './ClientError';
import ServerError from './ServerError';
import TransportError from './TransportError';
import Response from './Response';

/**
 * XHRTransport
 * @param {Transform} transformer
 * @param {Object} config
 */
class XHRTransport {


    constructor(transformer, config) {
        this.transformer = transformer;
        this.config = config || {};
        this.headers = Object.create(null);
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    send(req) {

        var xhr = new XMLHttpRequest();
        var transformer = this.transformer;
        var headers = this.headers;
        var config = this.config;
        var method = req.method || 'get';
        var url = req.url;
        var body = req.body;


        if (body)
            body = transformer.transformRequestBody(body);

        headers['Content-Type'] = transformer.CONTENT_TYPE_HEADER || 'application/json;charset=utf-8';
        headers['Accept'] = transformer.ACCEPT_HEADER || 'application/json, text/plain, */*';

        this.headers['x-xsrf-token'] = cookies.get(config.xsrfCookieName || 'xsrf_token');

        return new Promise(function (resolve, reject) {

            xhr.onload = function () {

                //xhr.responseType = transformer.responseType;

                if (xhr.status > 499)
                    return reject(new ServerError(Response.create(xhr, transformer)));

                if (xhr.status > 399)
                    return reject(new ClientError(Response.create(xhr, transformer)));

                resolve(Response.create(xhr, transformer));

            };

            xhr.open(method, url, true);

            for (var key in headers)
                if (headers[key])
                    xhr.setRequestHeader(key, headers[key]);

            xhr.onerror = ()=>reject(new TransportError(Response.create(xhr, transformer)));
            xhr.onabort = ()=>reject(new TransportError(Response.create(xhr, transformer)));

            xhr.send(body);

        });


    }


}

export default XHRTransport;

