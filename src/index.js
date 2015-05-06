import Agent from './Agent';
import ClientError from './ClientError';
import ServerError from './ServerError';
import TransportError from './TransportError';
import XHRTransport from './Transport';
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
    createAgent: function() {
        return new Agent(new XHRTransport(new JSONTransform()));
    }

}