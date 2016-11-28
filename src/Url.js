import qs from 'qs';

/**
 * Url provides useful methods for handling url strings.
 */
class Url {

    /**
     * fromString will construct a url mergining any parameters passed.
     * @param {string} url
     * @param {object} [params]
     */
    fromString(url, params = {}) {

            return `${url}?${qs.stringify(params)}`;

  }

}

export default new Url()
