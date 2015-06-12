import HTTPError from './HTTPError';
/**
 * ClientError
 */
class ClientError extends HTTPError {
  constructor(res) {
    super(res);
    this.body = res.data;
  }
}
export default ClientError

