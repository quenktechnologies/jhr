import * as Promise from 'bluebird';
import { Request } from '../request';
import { Response } from '../response';
import { Agent } from './Agent';

export { JSONTransform } from './JSONTransform';
export { Agent }

/**
 * Envelope is passed to Transports to provide the info needed
 * to actually send a request on the wire.
 */
export interface Envelope<O, I> extends Request<O> {

    /**
     * url the request is sent to.
     */
    url: string,

    /**
     * agent instance used to send the request.
     */
    agent: Agent<O, I>

}

/**
 * Transport interface for sending off HTTP requests.
 *
 * A Transport is expected to preform three specific side effects:
 * 1. Send the request to the server using whatever infrastructure exists.
 * 2. Update the Agent's Jar as appropiate.
 * 3. Generate a Response object.
 */
export interface Transport<O, I> {

    /**
     * send an enveloped request using this Transport.
     */
    send<R>(env: Envelope<O, I>): Promise<Response<R>>

}

/**
 * Transform is responsible for converting the request and response bodies into
 * the desired formats.
 * @param <O> - The type the request body is transformed to.
 * @param <I> - The type of the incomming response body before transformation.
 */
export interface Transform<O, I> {

    /**
     * accepts provides the value used in the Accepts header.
     */
    accepts: string;

    /**
     * contentType provides the value used in the Content-Type header.
     */
    contentType: string;

    /**
     * transformRequestBody into the desired Request body.
     */
    transformRequestBody<B>(body: B): Promise<O>;

    /**
     * transformResponseBody into the desired Response body.
     */
    transformResponseBody<R>(body: I): Promise<R>;

}

/**
 * Adapter is allowed to shape the request before it is passed to the Transport.
 */
export type Adapter<O, I> = (env: Envelope<O, I>) => Promise<Envelope<O, I>>;
