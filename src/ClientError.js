import HTTPError from './HTTPError';
/**
 * ClientError
 */
class ClientError extends HTTPError {
    constructor(res) {
        super(res);
        this.data = res.data;
        this.response = res;
    }
}
export default ClientError
