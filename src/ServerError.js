import HTTPError from './HTTPError';
/**
 * ServerError
 */
class ServerError extends HTTPError{

  constructor(res) {
super(res);
this.response = response;
  }

}
export default ServerError

