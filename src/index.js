import Agent from './Agent';
import ClientError from './ClientError';
import ServerError from './ServerError';
import HTTPError from './HTTPError';
import TransportError from './TransportError';
import XHRTransport from './XHRTransport';
import JSONTransform from './JSONTransform';
import Response from './Response';

export default  {
    Agent: Agent,
    Response: Response,
    XHRTransport: XHRTransport,
    JSONTransform: JSONTransform,
    ClientError: ClientError,
    ServerError: ServerError,
    TransportError: TransportError,
    HTTPError: HTTPError,
    createAgent: function() {
        return new Agent(new XHRTransport(new JSONTransform()));
    }

}