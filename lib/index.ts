import { Agent } from './agent';
import { MemoryContainer } from './cookie/container/memory';
import { JSONTransform } from './agent/transform/json';
import { JSONParser } from './agent/parser/json';
import { XHRTransport } from './agent/transport/xhr';
import { Host } from './request/host';

/**
 * newAgent produces a new default Agent for use in the browser.
 */
export const newAgent = (host: Host) => new Agent(
    host,
    {},
    new MemoryContainer(),
    { ttl: 0, tags: [], context: {} },
    new JSONTransform(),
    new JSONParser(),
    new XHRTransport(),
    []);
