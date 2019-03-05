import { Agent } from './agent';
/**
 * newAgent produces a new default Agent for use in the browser.
 */
export declare const newAgent: (host: string) => Agent<object, BodyInit, BodyInit, import("@quenk/noni/lib/data/json").Object>;
