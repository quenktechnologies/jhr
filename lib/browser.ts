import { Object } from '@quenk/noni/lib/data/json';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { MemoryContainer } from './cookie/container/memory';
import { JSONTransform } from './agent/transform/json';
import { JSONParser } from './agent/parser/json';
import { XHRTransport } from './agent/transport/xhr';
import { Parameters } from './request/parameters';
import { Host } from './request/host';
import { Path } from './request/path';
import { Get } from './request';
import { OutgoingHeaders } from './header';
import { Response } from './response';
import { Url } from './url';
import { Agent } from './agent';

const HTTP = 'http://';
const HTTPS = 'https://';

/**
 * @private
 */
export const splitUrl = (url: Url): [Host, Path] => {

    let split = url.split(HTTP).join('').split(HTTPS).join('').split('/');

    if ((split.length === 1) || ((split.length === 2) && (split[1] === '')))
        return [split[0], '/'];

    return [split[0], '/' + split.slice(1).join('/')];

}

/**
 * createAgent produces a new default Agent for use in the browser.
 */
export const createAgent = <B extends Object>
    (host: Host = window.location.hostname, port = 80): Agent<object, B> =>
    new Agent(
        host,
        {},
        new MemoryContainer(),
        { ttl: 0, tags: {}, context: {}, port },
        new XHRTransport('', new JSONTransform(), new JSONParser()),
        []);

/**
 * get shorthand helper.
 *
 * Note that url should consist of the domain and path
 * combined or the path alone.
 */
export const get = <B extends Object>(
    url: Url,
    params: Parameters = {},
    headers: OutgoingHeaders = {}): Future<Response<B>> => {

    let [host, path] = splitUrl(url);

    return createAgent<B>(host).send(new Get(path, params, headers));

}
