export declare class JHRError extends Error {
    __proto__: object;
    constructor(message?: string);
}
export declare class AbortError extends JHRError {
}
export declare class TransportError extends JHRError {
}
export declare class HTTPError extends JHRError {
    status: number;
    text: string;
    body: any;
    rawResponse: string;
    constructor(status: number, text: string, body?: any, rawResponse?: string);
}
export declare class ClientError extends HTTPError {
}
export declare class BadRequest extends ClientError {
}
export declare class Unauthorized extends ClientError {
}
export declare class Forbidden extends ClientError {
}
export declare class NotFound extends ClientError {
}
export declare class Conflict extends ClientError {
}
export declare class ServerError extends HTTPError {
}
export declare class InternalServerError extends ServerError {
}
export interface ErrorMap {
    [key: number]: any;
}
/**
 * create is a helper function for creating the correct error from a
 * response.
 */
export declare function create(status: number, text: string, body: any, rawResponse: string): any;
