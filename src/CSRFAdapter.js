import beof from 'beof';
import Cookies from './Cookies';

/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
 * @param {string} cookieName - The name of the cookie to read the token from.
 * @param {string} headerName - The name of the header to set.
 */
class CSRFAdapter {

    constructor(cookieName, headerName) {

        beof({ cookieName }).string();
        beof({ headerName }).string();

        this.cookieName = cookieName;
        this.headerName = headerName;

    }

    beforeRequest(req, xhr, agent) {

        xhr.setRequestHeader(this.headerName, Cookies.get(this.cookieName));

    }

}

export default CSRFAdapter
