import HTTPError from './HTTPError';
/**
 * ClientError
 */
class ClientError extends HTTPError {
  constructor(res) {
    super(res);
    this.data = res.data;
  }
}
export default ClientError

